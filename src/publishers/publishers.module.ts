import { Module } from "@nestjs/common";
import { PublishersController } from "./publishers.controller";
import { PublishersService } from "./publishers.service";
import { ErrorService } from '../components/errors.service';

@Module({
    controllers: [ PublishersController ],
    providers: [ PublishersService, ErrorService ]
})

export class PublishersModule {}