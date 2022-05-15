// External
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

// Internal
import { PublishersModule } from './publishers/publishers.module';
import { GamesModule } from './games/games.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ GamesModule, PublishersModule, ConfigModule.forRoot({isGlobal: true}) ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}