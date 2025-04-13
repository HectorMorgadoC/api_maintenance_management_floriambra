/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Order } from "src/orders/entities/order.entity";
import { Process } from "src/process/entities/process.entity";
import { Column, Entity, ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
    @PrimaryGeneratedColumn("uuid")
        id: string;

    @Column({
        type: "varchar",
        length: 50,
        unique: true,
    })
        name: string;

    @Column({
        type: "varchar",
        length: 200,
    })
        description: string;

    @Column({
        type: "varchar",
        length: 40,
    })
        march: string;

    @Column({
        type: "varchar",
        length: 40,
    })
        model: string;

    @Column({
        type: "int",
    })
        working_voltage: number;

    @Column({
        type: "int",
    })
        kilowatts: number;

    @Column('bool',{
        default: true
    })
    is_active: boolean;

    @ManyToOne(
        () => Process, 
        (process) => process.id,
        { onDelete: "CASCADE" })
        process: Process;

    @OneToMany(() => Order, 
        (order) => order.team)
        order: Order;
    
}

