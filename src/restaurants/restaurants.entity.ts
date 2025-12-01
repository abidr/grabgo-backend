import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ManagerEntity } from '../managers/managers.entity';

@Entity('restaurant')
export class RestaurantEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column()
  address: string;

  @Column()
  phoneNumber: string;

  @OneToOne(() => ManagerEntity, (manager) => manager.restaurant)
  manager: ManagerEntity;
}
