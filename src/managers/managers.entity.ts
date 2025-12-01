import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RestaurantEntity } from '../restaurants/restaurants.entity';
import { SubscriptionEntity } from 'src/subscriptions/subscriptions.entity';

@Entity('manager')
export class ManagerEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
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

  @OneToOne(() => RestaurantEntity, (restaurant) => restaurant.manager)
  @JoinColumn()
  restaurant: RestaurantEntity;

  @ManyToOne(() => SubscriptionEntity, (subscription) => subscription.managers)
  subscription: SubscriptionEntity;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
