import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Booking } from '../bookings/booking.entity';

export enum PaymentStatus {
  Succeeded = 'SUCCEEDED',
  Failed = 'FAILED',
  Refunded = 'REFUNDED',
}

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'booking_id', type: 'uuid' })
  bookingId: string;

  @Column({
    name: 'stripe_event_id',
    type: 'varchar',
    length: 255,
    unique: true,
  })
  stripeEventId: string;

  @Column({
    name: 'stripe_refund_id',
    type: 'varchar',
    length: 255,
    nullable: true,
    unique: true,
  })
  stripeRefundId: string | null;

  @Column({ name: 'amount', type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'enum', enum: PaymentStatus })
  status: PaymentStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Booking, (b) => b.payments)
  @JoinColumn({ name: 'booking_id' })
  booking: Booking;
}
