import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Admin } from "./admins.entity";

@Entity("menu_items")
export class MenuItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    price: number;

    @Column({ default: true })
    isAvailable: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    // Many MenuItems belong to one Admin
    @ManyToOne(() => Admin, admin => admin.MenuItems)
    admin: Admin;
}
