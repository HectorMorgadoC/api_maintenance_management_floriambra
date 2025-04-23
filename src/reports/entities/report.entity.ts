/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Order } from "src/orders/entities/order.entity";
import { Client } from "src/client/entities/client.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Report {
    @ApiProperty({ description: "Unique identifier UUID" })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({ 
        description: "Start date of the report",
        type: "string"
    })
    @Column({
        type: "varchar",
        transformer: {
            to: (value: Date | string | null): string | null => {
                if (!value) return null;
                const date = new Date(value);
                return date.toISOString();
            },
            from: (value: string | null): string | null => {
                return value;
            }
        }
    })
    from_date: string;

    @ApiProperty({ 
        description: "End date of the report", 
        type: "string"
    })
    @Column({
        type: "varchar",
        transformer: {
            to: (value: Date | string | null): string | null => {
                if (!value) return null;
                const date = new Date(value);
                return date.toISOString();
            },
            from: (value: string | null): string | null => {
                return value;
            }
        }
    })
    end_date: string;

    @ApiProperty({ 
        description: "Collaborators involved", 
        nullable: true, 
        maxLength: 50, 
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 50,
        nullable: true
    })
    collaborators: string;

    @ApiProperty({ 
        description: "Type of fault", 
        nullable: true, 
        maxLength: 30, 
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 30,
        nullable: true
    })
    fault_type: string;

    @ApiProperty({ 
        description: "Type of maintenance", 
        nullable: true, 
        maxLength: 30,
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 30,
        nullable: true
    })
    type_of_maintenance: string;

    @ApiProperty({ 
        description: "Summary of maintenance activities", 
        maxLength: 300,
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 300,
    })
    summary_of_activities: string;

    @ApiProperty({ 
        description: "Spare parts used", 
        nullable: true, 
        maxLength: 200,
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 200,
        nullable: true
    })
    used_spare_parts: string;

    @ApiProperty({ 
        description: "Additional remarks", 
        nullable: true, 
        maxLength: 300, 
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 300,
        nullable: true
    })
    remarks: string;

    @ApiProperty({ 
        description: "Maintenance approval status", 
        default: false,
        type: "boolean"
    })
    @Column({
        type: "boolean",
        default: false,
    })
    maintenance_approval: boolean;

    @ApiProperty({ 
        description: "Production approval status", 
        default: false,
        type: "boolean"
    })
    @Column({
        type: "boolean",
        default: false,
    })
    production_approval: boolean;

    @ApiProperty({ description: "Associated client" })
    @ManyToOne(
        () => Client,
        (client) => client.report
    )
    client: Client;

    @ApiProperty({ description: "Associated order" })
    @OneToOne(
        () => Order,
        (order) => order.report
    )
    @JoinColumn()
    order: Order;
}
