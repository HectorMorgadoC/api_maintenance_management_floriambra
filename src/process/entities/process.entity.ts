/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { Team } from "src/team/entities/team.entity";
import { Client } from "src/client/entities/client.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Process {
    @ApiProperty({
        description: "Unique identifier for the process",
        example: "123e4567-e89b-12d3-a456-426614174000",
    })
    @PrimaryGeneratedColumn("uuid")
        id: string;

    @ApiProperty({
        description: "Name of the process",
        example: "maintenance_process",
    })
    @Column({
        type: "varchar",
        length: 50,
        unique: true,
    })
        name: string;

    @ApiProperty({
        description: "Description of the process",
        example: "This process handles maintenance tasks.",
    })
    @Column({
        type: "varchar",
        length: 200,
    })
        description: string;
    
    @ApiProperty({
        description: "Indicates if the process is active",
        example: true,
    })
    @Column('bool',{
        default: true
    })
    is_active: boolean;

    @ApiProperty({
        description: "Teams associated with the process",
        type: () => [Team],
    })
    @OneToMany(
        () => Team,
        (team) => team.process,
        { cascade: true }
    )
        team: Team;

    @ApiProperty({
        description: "Users associated with the process",
        type: () => [Client],
    })
    @OneToMany(
        () => Client,
        (client) => client.process,
        { cascade: true, eager: true }
    )
        client: Client;
    
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
