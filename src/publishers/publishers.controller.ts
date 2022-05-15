// External
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// Internal
import { ErrorService } from '../components/errors.service';
import { PublishersService } from './publishers.service';
import { PublisherDto } from './dto/publisher.dto';

@Controller('publishers')
export class PublishersController {
    constructor(
        private readonly publisherService: PublishersService,
        private readonly errors: ErrorService,
    ) {}

    @Get()
    async getListWithStats(
        @Query('page') page: number,
        @Query('pageSize') pageSize: number,
        @Query('name') name: string,
        @Query('siret') siret: number,
    ) {
        const filters = {
            page, 
            pageSize,
            name,
            siret,
        };

        const [ stats, publishers ] = await Promise.all([
            this.publisherService.getStats(filters),
            this.publisherService.getList(filters)
        ]);

        return { stats, publishers };
    }

    @Get(':id')
    async get(@Param('id') id) {
        const publisher = await this.publisherService.get(id);
        return publisher ? publisher : this.errors.notFound();
    }

    @Post()
    async create(@Body() publisher: PublisherDto) {
        const id = await this.publisherService.create(publisher);
        return { success: !!id, id };
    }

    @Put(':id')
    async update(
        @Body() game: PublisherDto,
        @Param('id') id: number
    ) {
        const updated = await this.publisherService.update(id, game);
        return { updated };
    }

    @Delete(':id')
    async delete(@Param('id') id: number) {
        const deleted = await this.publisherService.delete(id);
        return { deleted };
    }
}
