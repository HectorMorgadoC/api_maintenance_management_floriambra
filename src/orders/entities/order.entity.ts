/* eslint-disable indent */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Team } from "src/team/entities/team.entity";
import { Report } from "src/reports/entities/report.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";


@Entity()
export class Order {
    @PrimaryGeneratedColumn("uuid")
        id: string;

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

    @Column({
        type: "varchar",
        length: 200,
    })
        fault_description: string;

    @Column({
        type: "boolean",
        default: false,
    })
        order_state: boolean;

    @ManyToOne(
        () => Team, 
        (team) => team.order)
        team: Team;

    @ManyToOne(
        () => User, 
        (user) => user.order)
        user: User;

    @OneToOne(
        () => Report, 
        (report) => report.order)
        report: Report;
}
