/* eslint-disable indent */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Team } from "src/team/entities/team.entity";
import { Report } from "src/reports/entities/report.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { Client } from "src/client/entities/client.entity";
import { ApiProperty } from "@nestjs/swagger";
import { StatusOrder } from "../interface/status-order";

@Entity()
export class Order {
    // @ApiProperty({
    //     description: "The unique identifier for the order",
    //     example: "e7c6d8f9-0a1b-2c3d-4e5f-6g7h8i9j0k1l",
    //     uniqueItems: true,
    //     type: "string"
    // })
    // @PrimaryGeneratedColumn("uuid")
    // id: string;

    @ApiProperty({
        description: "The unique code for the order",
        example: "20121209-001",
        uniqueItems: true,
        type: "string"
    })
    @PrimaryColumn({
        unique: true
    })
    id: string

    @ApiProperty({
        description: "Date when the order was noticed",
        example: "2023-08-15T10:30:00.000Z",
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
    notice_date: string;

    @ApiProperty({
        description: "Description of the fault",
        example: "Machine not functioning properly",
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 200,
    })
    fault_description: string;

    @ApiProperty({
        description: "Current state of the order",
        enum: StatusOrder,
        example: "done",
        default: StatusOrder.not_tarted,
        type: "string"
    })
    @Column({
        type: "enum",
        enum: StatusOrder,
        default: StatusOrder.not_tarted
    })
    order_state: StatusOrder;

    @Column({
        type: "varchar",
        default: ""
    })
    observation?:string

    @ApiProperty({
        description: "Team assigned to the order",
        type: () => Team
    })
    @ManyToOne(
        () => Team,
        (team) => team.order
    )
    team: Team;

    @ApiProperty({
        description: "Client who created the order",
        type: () => Client
    })
    @ManyToOne(
        () => Client,
        (client) => client.order
    )
    client: Client;

    @ApiProperty({
        description: "Report associated with the order",
        type: () => Report
    })
    @OneToOne(
        () => Report,
        (report) => report.order
    )
    report: Report;
}
