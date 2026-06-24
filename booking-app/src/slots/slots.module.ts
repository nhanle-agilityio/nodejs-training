import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './slot.entity';
import { SlotsService } from './slots.service';
import { SlotsCacheService } from './slots-cache.service';
import { SlotsController } from './slots.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Slot])],
  providers: [SlotsCacheService, SlotsService],
  controllers: [SlotsController],
  exports: [SlotsService, SlotsCacheService],
})
export class SlotsModule {}
