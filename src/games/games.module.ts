// External
import { Module } from "@nestjs/common";

// Internal
import { ErrorService } from '../components/errors.service';
import { DBService } from "src/components/db.service";
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";
import { PublishersService } from "src/publishers/publishers.service";

@Module({
    controllers: [ GamesController ],
    providers: [ GamesService, ErrorService, DBService, PublishersService ]
})

export class GamesModule {}