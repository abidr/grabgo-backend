import { Entity, Column, PrimaryGeneratedColumn, Unique, PrimaryColumn, BeforeInsert} from "typeorm";

@Entity('customer')
export class CustomerEntity{
  @PrimaryColumn({type: 'varchar'})
  id: string;

  @BeforeInsert()
  generateId() {
    if(!this.id){
      this.id = 'CU-' + Math.floor(Math.random() * 1000000);
    }
  }

  @Column({default: true})
  isActive: boolean;

  @Column ({nullable: true, type: 'varchar'})
  fullName: string | null; 

  @Column( {unique: true} )
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  gender: string;

  @Column({ type: 'bigint', unsigned: true, unique: true })
  phoneNumber: string;
}