// External
import { Injectable } from "@nestjs/common";

// Internal
import { PublishersService } from "../publishers/publishers.service";
import { DBService } from "../components/db.service";

@Injectable()
export class GamesService {
    private db;

    constructor(
        private readonly publishersService: PublishersService,
        private readonly dbService: DBService
    ){
        this.db = this.dbService.db();
    }

    getTableName() {
        return 'games';
    }

    async getStats(filters) {
        const query = this.db
            .from(this.getTableName())
            .count()
            .first();

        this.applyFilters(query, filters);

        return query;
    }

    async getList(filters) {
        const { page, pageSize } = filters;

        const query = this.db
            .from(this.getTableName())
            .select()
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .orderBy('id', 'desc');

        this.applyFilters(query, filters);

        return query;
    }

    applyFilters(query, filters) {
        const {
            tag,
            title,
            publisherId,
        } = filters;

        if (tag) {
            query.whereRaw(`'${tag}'::text = ANY (tags::text[])`);
        }

        if (title) {
            query.where('title', 'like', `%${title}%`);
        }

        if (publisherId) {
            query.where('publisher_id', publisherId);
        }
    }

    async get(id) {
        const query = this.db
            .from(this.getTableName())
            .select()
            .where('id', id)
            .first();

        return query;
    }

    async getPublisherOfGame(id) {
        const query = this.db
            .select(this.publishersService.getTableName()+'.*') // select all fields from publishers table
            .from(this.getTableName())
            .leftJoin( // join publishers table on its id
                this.publishersService.getTableName(), 
                this.publishersService.getTableName()+'.id', 
                'publisher_id'
            ) 
            .where(this.getTableName()+'.id', id) // find by id of a specific game
            .first();

        return query;
    }

    async create(game) {
        const {
            title,
            price,
            tags,
            publisherId,
            releaseDate
        } = game;

        const [{ id }] = await this.db
            .table(this.getTableName())
            .insert({
                title: title,
                price: price,
                tags: tags,
                publisher_id: publisherId,
                release_date: releaseDate
            })
            .returning('id');

        return id;
    }

    async update(id, game) {
        const {
            title,
            price,
            tags,
            publisherId,
            releaseDate
        } = game;

        const updated = await this.db
            .table(this.getTableName())
            .update({
                title: title,
                price: price,
                tags: tags,
                publisher_id: publisherId,
                release_date: releaseDate
            })
            .where('id', id);

        return !!updated;
    }

    async delete(id) {
        const deleted = await this.db
            .table(this.getTableName())
            .where('id', id)
            .delete();
            
        return !!deleted;
    }


    /* Trigger a process which will automatically remove the games having a release date older than 18
    months and apply a discount of 20% to all games having a release date between 12 and 18 months */
    async triggerDiscountProcedure() {
        return await this.db.transaction(async trx => {
            // Delete games where the sum of years*12 and months between 'now' and release date is more than 18
            const deleted = await trx()
                .from(this.getTableName())
                .delete()
                .whereRaw(`
                    extract(year from age(now(), release_date)) * 12 + 
                    extract(month from age(now(), release_date)) > 18
                `);
            

            // Delete games where the sum of years*12 and months between 'now' and release date is more than 12
            const updated = await trx()
                .table(this.getTableName())
                .update({
                    price: this.db.raw('price * 0.8') // 20% off
                })
                .whereRaw(`
                    extract(year from age(now(), release_date)) * 12 + 
                    extract(month from age(now(), release_date)) > 12
                `);

            return { deleted, updated };
        });
    }
}