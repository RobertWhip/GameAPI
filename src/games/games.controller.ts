// External
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// Internal
import { ErrorService } from '../components/errors.service';
import { GamesService } from './games.service';
import { GameDto } from './dto/game.dto';

/* This component will expose a REST api providing CRUD operations to fetch one or several games,
create, update and delete a game. */

@Controller('games')
export class GamesController {
    constructor(
        private readonly gamesService: GamesService,
        private readonly errors: ErrorService
    ) {}

    @Get()
    async getListWithStats(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('tag') tag: string,
        @Query('title') title: string,
        @Query('publisherId') publisherId: number,
    ) {
        const filters = {
            page, 
            pageSize,
            tag,
            title,
            publisherId
        };

        const [ stats, games ] = await Promise.all([
            this.gamesService.getStats(filters),
            this.gamesService.getList(filters)
        ]);

        return { stats, games };
    }

    @Get(':id')
    async get(@Param('id') id) {
        const game = await this.gamesService.get(id);
        return game ? game : this.errors.notFound();
    }

    /* Fetch only the publisher data for a given game (without any publishers dedicated API – i.e. only by
    using the game API) */
    @Get(':id/publisher')
    async getPublisherOfGame(@Param('id') id) {
        const publisher = await this.gamesService.getPublisherOfGame(id);
        return publisher ? publisher : this.errors.notFound();
    }

    @Post()
    async create(@Body() game: GameDto) {
        const id = await this.gamesService.create(game);
        return { success: !!id, id };
    }

    @Put(':id')
    async update(
        @Body() game: GameDto,
        @Param('id') id: number
    ) {
        const updated = await this.gamesService.update(id, game);
        return { updated };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const deleted = await this.gamesService.delete(id);
        return { deleted };
    }
    
    /* Trigger a process which will automatically remove the games having a release date older than 18
    months and apply a discount of 20% to all games having a release date between 12 and 18 months */
    @Post('trigger_discount_procedure')
    async triggerDiscountProcedure() {
        return await this.gamesService.triggerDiscountProcedure();
    }
}