import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Index,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Slot } from '../slots/slot.entity';
import { Payment } from '../payments/payment.entity';

export enum BookingStatus {
  Pending = 'PENDING',
  Confirmed = 'CONFIRMED',
  Cancelled = 'CANCELLED',
  RefundPending = 'REFUND_PENDING',
  Refunded = 'REFUNDED',
}

@Index('bookings_active_slot_uidx', ['slotId'], {
  unique: true,
  where: `"status" IN ('PENDING', 'CONFIRMED')`,
})
@Index('bookings_user_id_idx', ['userId'])
@Index('bookings_status_created_at_idx', ['status', 'createdAt'])
@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @Column({ name: 'slot_id', type: 'uuid' })
  slotId: string;

  @Column({
    type: 'enum',
    enum: BookingStatus,
    default: BookingStatus.Pending,
  })
  status: BookingStatus;

  @Column({
    name: 'stripe_session_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  stripeSessionId?: string | null;

  @Column({
    name: 'stripe_payment_intent_id',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  stripePaymentIntentId?: string | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamptz' })
  deletedAt: Date | null;

  @Column({
    name: 'reminder_sent_at',
    type: 'timestamptz',
    nullable: true,
  })
  reminderSentAt: Date | null;

  @ManyToOne(() => User, (u) => u.bookings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Slot, (s) => s.bookings)
  @JoinColumn({ name: 'slot_id' })
  slot: Slot;

  @OneToMany(() => Payment, (p) => p.booking)
  payments: Payment[];
}
