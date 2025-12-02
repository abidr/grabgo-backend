import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import { Admin } from './admins.entity';

@Entity('admin_profiles')
export class AdminProfile {
  @PrimaryGeneratedColumn()
  id: number;

  // Foreign key to Admin (unique)
  @Column({ type: 'int', unique: true })
  adminId: number;

  @OneToOne(() => Admin)
  @JoinColumn({ name: 'adminId' })
  admin: Admin;

  @Column({ type: 'text' })
  address: string;

  @Column({ nullable: true })
  // removed profilePictureURL per request

  @Column({ nullable: true })
  emergencyContactName: string;

  @Column({ nullable: true })
  emergencyContactPhone: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', nullable: true })
  // removed joiningNotes per request

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
