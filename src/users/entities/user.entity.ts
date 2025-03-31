/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { Process } from "src/process/entities/process.entity";
import { Order } from "src/orders/entities/order.entity";
import { Report } from "src/reports/entities/report.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";



@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        unique: true,
        type: "text"
    })
    username: string;

    @Column({
        type: "text",
        nullable: true
    })
    email: string;

    @Column({
        default: "operator",
        type: "text"
    })
    access_level: string;

    @Column({
        type: "text"
    })
    password: string;

    @Column('bool',{
        default: true
    })
    isActive: boolean;
    @ManyToOne(() => Process, 
    (process) => process.id,
    { onDelete: "CASCADE" })
    process: Process; 
    
    @OneToMany(() => Order, 
    (order) => order.user)
    order: Order;

    @OneToMany(() => Report, 
    (report) => report.user)
    report: Report;
    
}
