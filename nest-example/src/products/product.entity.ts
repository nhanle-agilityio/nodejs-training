import {
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Product Name', maxLength: 120 })
  @Column({ length: 120 })
  name: string;

  @ApiProperty({ example: 10.5, minimum: 0 })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @ApiPropertyOptional({ example: 'Product Description', maxLength: 200 })
  @Column({ length: 200, nullable: true })
  description?: string;

  @ApiProperty({ type: String, format: 'date-time' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ type: String, format: 'date-time' })
  @UpdateDateColumn()
  updatedAt: Date;
}
