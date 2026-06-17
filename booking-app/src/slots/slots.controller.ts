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
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CheckPolicies } from '../casl/policies.decorator';
import { Action } from '../casl/casl.types';
import { BadRequestResponseDto } from '../common/dto/bad-request-response.dto';
import { UnauthorizedResponseDto } from '../common/dto/unauthorized-response.dto';
import { ForbiddenResponseDto } from '../common/dto/forbidden-response.dto';
import { NotFoundResponseDto } from '../common/dto/not-found-response.dto';
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
  @ApiOperation({
    summary: 'List all available slots',
    description:
      'Returns a paginated list of slots. Publicly accessible — no authentication required. Supports filtering by status.',
  })
  @ApiOkResponse({
    description: 'Paginated list of slots',
    type: PaginatedSlotsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid query parameters',
    type: BadRequestResponseDto,
  })
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
  @ApiOperation({
    summary: 'Get a slot by ID',
    description:
      'Returns a single slot. Publicly accessible — no authentication required.',
  })
  @ApiParam({ name: 'id', description: 'Slot ID', format: 'uuid' })
  @ApiOkResponse({ description: 'Slot details', type: SlotResponseDto })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format',
    type: BadRequestResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Slot not found',
    type: NotFoundResponseDto,
  })
  async getSlotById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<SlotResponseDto> {
    const slot = await this.slotsService.getSlotById(id);

    return plainToInstance(SlotResponseDto, slot, {
      excludeExtraneousValues: true,
    });
  }

  @Post()
  @CheckPolicies((ability) => ability.can(Action.Create, Slot))
  @ApiBearerAuth('clerk-jwt')
  @ApiOperation({
    summary: 'Create a new slot',
    description: 'Admin only. Creates a new bookable time slot.',
  })
  @ApiCreatedResponse({
    description: 'Slot created successfully',
    type: SlotResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error in request body',
    type: BadRequestResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid token',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'Admin role required',
    type: ForbiddenResponseDto,
  })
  async createSlot(@Body() dto: CreateSlotDto): Promise<SlotResponseDto> {
    const slot = await this.slotsService.createSlot(dto);

    return plainToInstance(SlotResponseDto, slot, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  @CheckPolicies((ability) => ability.can(Action.Update, Slot))
  @ApiBearerAuth('clerk-jwt')
  @ApiOperation({
    summary: 'Update a slot',
    description:
      'Admin only. Partially updates an existing slot. All fields are optional.',
  })
  @ApiParam({ name: 'id', description: 'Slot ID', format: 'uuid' })
  @ApiOkResponse({
    description: 'Slot updated successfully',
    type: SlotResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error or invalid UUID',
    type: BadRequestResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid token',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'Admin role required',
    type: ForbiddenResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Slot not found',
    type: NotFoundResponseDto,
  })
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
  @CheckPolicies((ability) => ability.can(Action.Delete, Slot))
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth('clerk-jwt')
  @ApiOperation({
    summary: 'Delete a slot',
    description:
      'Admin only. Soft-deletes a slot. The slot will no longer appear in listings.',
  })
  @ApiParam({ name: 'id', description: 'Slot ID', format: 'uuid' })
  @ApiNoContentResponse({ description: 'Slot deleted successfully' })
  @ApiBadRequestResponse({
    description: 'Invalid UUID format',
    type: BadRequestResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid token',
    type: UnauthorizedResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'Admin role required',
    type: ForbiddenResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Slot not found',
    type: NotFoundResponseDto,
  })
  async deleteSlot(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.slotsService.deleteSlot(id);
  }
}
