/* eslint-disable indent */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Team } from "src/team/entities/team.entity";
import { Report } from "src/reports/entities/report.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";


@Entity()
export class Order {
    @ApiProperty({
        description: 'The unique identifier for the order',
        example: 'e7c6d8f9-0a1b-2c3d-4e5f-6g7h8i9j0k1l',
        uniqueItems: true,
        type: "string"
    })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({
        description: 'Date when the order was noticed',
        example: '2023-08-15T10:30:00.000Z',
        type: "string"
    })
    @Column({
        type: 'varchar', 
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
        description: 'Description of the fault',
        example: 'Machine not functioning properly',
        type: "string"
    })
    @Column({
        type: "varchar",
        length: 200,
    })
    fault_description: string;

    @ApiProperty({
        description: 'Current state of the order',
        example: false,
        default: false,
        type: "boolean"
    })
    @Column({
        type: "boolean",
        default: false,
    })
    order_state: boolean;

    @ApiProperty({
        description: 'Team assigned to the order',
        type: () => Team
    })
    @ManyToOne(
        () => Team, 
        (team) => team.order)
    team: Team;

    @ApiProperty({
        description: 'User who created the order',
        type: () => User
    })
    @ManyToOne(
        () => User, 
        (user) => user.order)
    user: User;

    @ApiProperty({
        description: 'Report associated with the order',
        type: () => Report
    })
    @OneToOne(
        () => Report, 
        (report) => report.order)
    report: Report;
}
