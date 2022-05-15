// External
import { Module } from "@nestjs/common";

// Internal
import { ErrorService } from '../components/errors.service';
import { GamesController } from "./games.controller";
import { GamesService } from "./games.service";

@Module({
    controllers: [ GamesController ],
    providers: [ GamesService, ErrorService ]
})

export class GamesModule {}