import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './slot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Slot])],
  providers: [],
  controllers: [],
  exports: [],
})
export class SlotsModule {}
