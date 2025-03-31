/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Order } from "src/orders/entities/order.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Report {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    front_date: string;

    @Column({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP",
    })
    end_date: string;

    @Column({
        type: "varchar",
        length: 300,
    })
    summary_of_activities: string;

    @Column({
        type: "varchar",
        length: 200,
    })
    used_spare_parts: string;

    @Column({
        type: "varchar",
        length: 300,
    })
    remarks: string;

    @Column({
        type: "boolean",
        default: false,
    })
    maintenance_approval: boolean;
    
    @Column({
        type: "boolean",
        default: false,
    })
    production_approval: boolean;
    
    @ManyToOne(
        () => User, 
        (user) => user.report)
        user: User;

    @OneToOne(
        () => Order, 
        (order) => order.report)
        order: Order;
}
