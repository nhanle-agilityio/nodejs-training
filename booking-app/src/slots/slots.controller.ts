import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CheckPolicies } from '../casl/policies.decorator';
import { Action } from '../casl/casl.types';
import { Slot } from './slot.entity';
import { SlotsService } from './slots.service';
import { CreateSlotDto } from './dto/create-slot.dto';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { SlotResponseDto } from './dto/slot-response.dto';
import { SlotsQueryDto } from './dto/slots-query.dto';
import { PaginatedSlotsResponseDto } from './dto/paginated-slots-response.dto';
import { mapPaginatedItems } from '../common/pagination/map-paginated-items';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('slots')
@Controller('slots')
export class SlotsController {
  constructor(private readonly slotsService: SlotsService) {}

  @Public()
  @Get()
  @ApiOkResponse({ type: PaginatedSlotsResponseDto })
  async getAllSlots(
    @Query() query: SlotsQueryDto,
  ): Promise<PaginatedSlotsResponseDto> {
    const result = await this.slotsService.getAllSlots(query);

    return mapPaginatedItems(result, (s) =>
      plainToInstance(SlotResponseDto, s, { excludeExtraneousValues: true }),
    );
  }

  @Public()
  @Get(':id')
  @ApiOkResponse({ type: SlotResponseDto })
  async getSlotById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<SlotResponseDto> {
    const slot = await this.slotsService.getSlotById(id);

    return plainToInstance(SlotResponseDto, slot, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @ApiBearerAuth('clerk-jwt')
  @CheckPolicies((ability) => ability.can(Action.Create, Slot))
  @ApiCreatedResponse({ type: SlotResponseDto })
  async createSlot(@Body() dto: CreateSlotDto): Promise<SlotResponseDto> {
    const slot = await this.slotsService.createSlot(dto);

    return plainToInstance(SlotResponseDto, slot, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @ApiBearerAuth('clerk-jwt')
  @CheckPolicies((ability) => ability.can(Action.Update, Slot))
  @ApiOkResponse({ type: SlotResponseDto })
  async updateSlot(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSlotDto,
  ): Promise<SlotResponseDto> {
    const slot = await this.slotsService.updateSlot(id, dto);

    return plainToInstance(SlotResponseDto, slot, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  @ApiBearerAuth('clerk-jwt')
  @CheckPolicies((ability) => ability.can(Action.Delete, Slot))
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteSlot(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.slotsService.deleteSlot(id);
  }
}
