/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable prettier/prettier */
import { Process } from "src/process/entities/process.entity";
import { Column, Entity, ManyToOne,PrimaryGeneratedColumn } from "typeorm";

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
        type: "uuid",
    })
        id_process: string;

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
        type: "varchar",
        length: 10,
    })
        working_voltage: string;

    @Column({
        type: "varchar",
        length: 10,
    })
        kilowatts: string;

    @ManyToOne(
        () => Process, 
        (process) => process.team)
        process: Process;    
}

