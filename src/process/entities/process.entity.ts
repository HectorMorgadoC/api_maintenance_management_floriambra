/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Process {
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


        @BeforeInsert()
        checkNaneInsert() { 
            this.name = this.name
            .toLocaleLowerCase()
            .replaceAll(" ","_")
        }

        @BeforeInsert()
        checkDescriptionInsert() {
            this.description = this.description
            .toLocaleLowerCase()
        }
}

