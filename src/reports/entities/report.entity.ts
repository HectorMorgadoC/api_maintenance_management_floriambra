/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Order } from "src/orders/entities/order.entity";
import { Client } from "src/client/entities/client.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Report {
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
    from_date: string;

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
    end_date: string;

    @Column({
        type: "varchar",
        length: 50,
        nullable: true
    })
        collaborators: string;
    
    @Column({
        type: "varchar",
        length: 30,
        nullable: true
    })
        fault_type: string;
    
    @Column({
        type: "varchar",
        length: 30,
        nullable: true
    })
        type_of_maintenance: string;
    
    @Column({
        type: "varchar",
        length: 300,
    })
    summary_of_activities: string;

    @Column({
        type: "varchar",
        length: 200,
        nullable: true
    })
    used_spare_parts: string;

    @Column({
        type: "varchar",
        length: 300,
        nullable: true
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
        () => Client, 
        (client) => client.report
        )
        client: Client;

    @OneToOne(
        () => Order, 
        (order) => order.report)
        @JoinColumn() // define la clave foranea  
        order: Order;
}
