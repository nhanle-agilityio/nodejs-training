import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slot, SlotStatus } from './slot.entity';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { SlotsQueryDto } from './dto/slots-query.dto';

@Injectable()
export class SlotsService {
  constructor(
    @InjectRepository(Slot)
    private readonly slots: Repository<Slot>,
  ) {}

  async createSlot(dto: CreateSlotDto): Promise<Slot> {
    const startTime = new Date(dto.startTime);
    const endTime = new Date(dto.endTime);

    if (endTime <= startTime) {
      throw new BadRequestException('endTime must be after startTime');
    }

    const slot = this.slots.create({
      title: dto.title,
      startTime: startTime,
      endTime: endTime,
      price: dto.price,
      status: SlotStatus.Open,
    });

    return this.slots.save(slot);
  }

  async getAllSlots(query: SlotsQueryDto): Promise<Slot[]> {
    const where: Record<string, unknown> = {};
    if (query.status) where.status = query.status;

    return this.slots.find({ where, order: { startTime: 'ASC' } });
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
      if (endTime <= startTime) {
        throw new BadRequestException('endTime must be after startTime');
      }
      slot.startTime = startTime;
      slot.endTime = endTime;
    }

    if (dto.title !== undefined) slot.title = dto.title;
    if (dto.price !== undefined) slot.price = dto.price;
    if (dto.status !== undefined) slot.status = dto.status;

    return this.slots.save(slot);
  }

  async deleteSlot(id: string): Promise<void> {
    const result = await this.slots.softDelete({ id });
    if (!result.affected) throw new NotFoundException('Slot not found');
  }
}
