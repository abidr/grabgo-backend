import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('manager')
export class ManagerEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  gender: 'male' | 'female';

  @Column({ type: 'int', unsigned: true })
  age: number;

  @Column()
  file: string;

  @Column({ default: 'active', type: 'enum', enum: ['active', 'inactive'] })
  status: 'active' | 'inactive';
}
