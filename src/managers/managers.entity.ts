import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RestaurantEntity } from '../restaurants/restaurants.entity';
import { SubscriptionEntity } from 'src/subscriptions/subscriptions.entity';

@Entity('manager')
export class ManagerEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  gender: 'male' | 'female';

  @Column({ type: 'varchar', nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  file: string;

  @Column({ default: 'active', type: 'enum', enum: ['active', 'inactive'] })
  status: 'active' | 'inactive';

  @OneToMany(() => RestaurantEntity, (restaurant) => restaurant.manager, {
    cascade: true,
  })
  @JoinColumn()
  restaurants: RestaurantEntity[];

  @ManyToOne(() => SubscriptionEntity, (subscription) => subscription.managers)
  subscription: SubscriptionEntity;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
