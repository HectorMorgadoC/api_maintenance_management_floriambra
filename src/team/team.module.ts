/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import { forwardRef, 
        Module 
} from "@nestjs/common";
import { TeamService } from "./team.service";
import { TeamController } from "./team.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Team } from "./entities/team.entity";
import { ProcessModule } from "src/process/process.module";
import { ClientModule } from "src/client/client.module";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Teams')
@Module({
    controllers: [TeamController],
    providers: [TeamService],
    imports: [
        TypeOrmModule.forFeature([Team]), 
        ProcessModule,
        forwardRef(() => ClientModule )
    ],
    exports: [ TeamService ]
})
export class TeamModule {}
