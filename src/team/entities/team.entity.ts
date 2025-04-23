/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Order } from "src/orders/entities/order.entity";
import { Process } from "src/process/entities/process.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Team {
    @ApiProperty({
        example: "123e4567-e89b-12d3-a456-426614174000",
        description: "Unique identifier for the team",
        uniqueItems: true
    })
    @PrimaryGeneratedColumn("uuid")
        id: string;


    @ApiProperty({
        example: "Team A",
        description: "Name of the team",
        uniqueItems: true,
        maxLength: 50,
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 50,
        unique: true,
    })
        name: string;


    @ApiProperty({
        example: "This team handles maintenance for production line A.",
        description: "Description of the team",
        maxLength: 200,
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 200,
    })
        description: string;


    @ApiProperty({
        example: "March2023as",
        description: "March of the team",
        maxLength: 40,
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 40,
    })
        march: string;


    @ApiProperty({
        example: "ModelX",
        description: "Model of the team",
        maxLength: 40,
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 40,
    })
        model: string;


    @ApiProperty({
        example: 220,
        description: "Working voltage of the team",
        type: "number"
    })
    @Column({
        type: "int",
    })
        working_voltage: number;


    @ApiProperty({
        example: 15,
        description: "Kilowatts used by the team",
        type: "number"
    })
    @Column({
        type: "int",
    })
        kilowatts: number;


    @ApiProperty({
        example: true,
        description: "Indicates if the team is active",
        default: true,
        type: "boolean"
    })
    @Column('bool',{
        default: true
    })
    is_active: boolean;


    @ApiProperty({
        description: "Process associated with the team",
        type: () => Process,
    })
    @ManyToOne(
        () => Process, 
        (process) => process.id,
        { onDelete: "CASCADE" })
        process: Process;


    @ApiProperty({
        description: "Orders associated with the team",
        type: () => [Order],
    })
    @OneToMany(() => Order, 
        (order) => order.team)
        order: Order;
}
