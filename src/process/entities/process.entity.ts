/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { Team } from "src/team/entities/team.entity";
import { User } from "src/users/entities/user.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    
    @OneToMany(
        () => Team,
        (team) => team.process,
        { cascade: true }
    )
        team: Team;

    @OneToMany(
        () => User,
        (user) => user.process,
        { cascade: true, eager: true }
    )
        user: User;
    
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

