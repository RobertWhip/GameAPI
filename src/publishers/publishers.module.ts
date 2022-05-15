// External
import { Module } from "@nestjs/common";

// Internal
import { PublishersController } from "./publishers.controller";
import { PublishersService } from "./publishers.service";
import { ErrorService } from '../components/errors.service';
import { DBService } from '../components/db.service';

@Module({
    imports: [],
    controllers: [ PublishersController ],
    providers: [ PublishersService, ErrorService, DBService ]
})

export class PublishersModule {}