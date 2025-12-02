import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, OneToMany } from "typeorm";
import { AdminProfile } from './AdminProfile.entity';
import { MenuItem } from "./MenuItems.entity";

@Entity("admins")
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: 'varchar', length: 150, unique: true, default: () => "gen_random_uuid()" })
    uniqueID: string;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column({ unique: true })
    email: string;
    @Column()
    phoneNumber: string
    @Column()
    password: string;
    @Column()
    gender: "male" | "female";
    @Column()
    dateOfBirth: Date
    @Column()
    socialMediaURL: string;
    @Column({type:'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    joiningDate: Date;
    @Column({type:'varchar', length:30, default:'unknown'})
    country: string;
    @OneToOne(() => AdminProfile, (profile) => profile.admin)
    profile: AdminProfile;
    @OneToMany(() => MenuItem, menuItem => menuItem.admin)
    MenuItems: MenuItem[];
    @CreateDateColumn()
    createdAt: Date;
}