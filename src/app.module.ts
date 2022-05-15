import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { PublishersModule } from './publishers/publishers.module';

@Module({
  imports: [ GamesModule, PublishersModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
