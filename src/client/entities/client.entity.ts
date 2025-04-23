/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { Process } from "src/process/entities/process.entity";
import { Order } from "src/orders/entities/order.entity";
import { Report } from "src/reports/entities/report.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Client {
    @ApiProperty({
        example: "ce216e7e-edc2-4e18-aead-dd8187987a6a",
        description: "User id",
        uniqueItems: true,
        type: "string"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        example: "JuanPerez",
        description: "user name",
        uniqueItems: true,
        type: "string"
    })
    @Column({
        unique: true,
        type: "text"
    })
    username: string;

    @ApiProperty({
        example: "juanperez@gmail.com",
        description: "email user",
        uniqueItems: true,
        type: "string"
    })
    @Column({
        type: "text",
        nullable: true
    })
    email: string;

    @ApiProperty({
        example: "operator",
        description: "access level user",
        uniqueItems: true,
        default: "operator",
        type: "string"
    })
    @Column({
        default: "operator",
        type: "text"
    })
    access_level: string;

    @ApiProperty({
        example: "Elementary2021",
        description: "Password user",
        uniqueItems: true,
        type: "string"
    })
    @Column({
        type: "text"
    })
    password: string;

    @ApiProperty({
        example: true,
        description: "true",
        type: "boolean",
        default: true
    })
    @Column("bool", {
        default: true
    })
    is_active: boolean;

    @ApiProperty({
        type: () => Process,
        description: "Process associated with the user"
    })
    @ManyToOne(() => Process, (process) => process.id, { onDelete: "CASCADE" })
    process: Process;

    @ApiProperty({
        type: () => [Order],
        description: "Orders created by the user",
        isArray: true
    })
    @OneToMany(() => Order, (order) => order.client)
    order: Order;

    @ApiProperty({
        type: () => [Report],
        description: "Reports created by the user",
        isArray: true
    })
    @OneToMany(() => Report, (report) => report.client, { cascade: true })
    report: Report;
}
