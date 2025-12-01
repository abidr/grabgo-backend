import { ManagerEntity } from 'src/managers/managers.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  type: string;

  @Column({ type: 'int', unsigned: true })
  duration: number;

  @Column({ type: 'int' })
  price: number;

  @OneToMany(() => ManagerEntity, (manager) => manager.subscription)
  managers: ManagerEntity[];
}
