import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Slot, SlotStatus } from './slot.entity';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { SlotsQueryDto } from './dto/slots-query.dto';
import { PaginatedResult } from '../common/pagination/map-paginated-items';
import { resolvePagination } from '../common/pagination/resolve-pagination';
import { SlotsCacheService } from './slots-cache.service';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot)
    private readonly slots: Repository<Slot>,
    private readonly cache: SlotsCacheService,
  ) {}

  private assertValidSlot(startTime: Date, endTime: Date): void {
    if (endTime <= startTime) {
      throw new BadRequestException('endTime must be after startTime');
    }

    if (startTime <= new Date()) {
      throw new BadRequestException('startTime must be in the future');
    }
  }

  async createSlot(dto: CreateSlotDto): Promise<Slot> {
    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);

    this.assertValidSlot(startTime, endTime);

    const slot = this.slots.create({
      title: dto.title,
      startTime: startTime,
      endTime: endTime,
      price: dto.price,
      status: SlotStatus.Open,
    });

    const saved = await this.slots.save(slot);
    await this.cache.invalidateAll();
    return saved;
  }

  async getAllSlots(query: SlotsQueryDto): Promise<PaginatedResult<Slot>> {
    const cached = await this.cache.get(query);
    if (cached) return cached;

    const { page, limit, skip, take } = resolvePagination(query);
    const where: FindOptionsWhere<Slot> = {};

    if (query.status) where.status = query.status;

    const [items, total] = await this.slots.findAndCount({
      where,
      order: { startTime: 'DESC' },
      skip,
      take,
    });

    const result: PaginatedResult<Slot> = { items, total, page, limit };
    await this.cache.set(result, query);
    return result;
  }

  async getSlotById(id: string): Promise<Slot> {
    const slot = await this.slots.findOne({ where: { id } });

    if (!slot) throw new NotFoundException('Slot not found');

    return slot;
  }

  async updateSlot(id: string, dto: UpdateSlotDto): Promise<Slot> {
    const slot = await this.getSlotById(id);

    if (dto.startTime || dto.endTime) {
      const startTime = dto.startTime
        ? new Date(dto.startTime)
        : slot.startTime;
      const endTime = dto.endTime ? new Date(dto.endTime) : slot.endTime;

      this.assertValidSlot(startTime, endTime);

      slot.startTime = startTime;
      slot.endTime = endTime;
    }

    if (dto.title !== undefined) slot.title = dto.title;
    if (dto.price !== undefined) slot.price = dto.price;
    if (dto.status !== undefined) slot.status = dto.status;

    const saved = await this.slots.save(slot);
    await this.cache.invalidateAll();
    return saved;
  }

  async deleteSlot(id: string): Promise<void> {
    const result = await this.slots.softDelete({ id });

    if (!result.affected) throw new NotFoundException('Slot not found');

    await this.cache.invalidateAll();
  }
}
