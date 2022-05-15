// External
import { Injectable } from "@nestjs/common";

// Internal
const db = require('../components/db');
const PUBLISHERS_TABLE = 'publishers';
const TABLE = 'games';


@Injectable()
export class GamesService {
    async getStats(filters) {
        const query = db()
            .from(TABLE)
            .count()
            .first();

        this.applyFilters(query, filters);

        return query;
    }

    async getList(filters) {
        const { page, pageSize } = filters;

        const query = db()
            .from(TABLE)
            .select()
            .limit(pageSize)
            .offset((page - 1) * pageSize)
            .orderBy('id', 'desc');

        this.applyFilters(query, filters)

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
        const query = db()
            .from(TABLE)
            .select()
            .where('id', id)
            .first();

        return query;
    }

    async getPublisherOfGame(id) {
        const query = db()
            .select(PUBLISHERS_TABLE+'.*') // select all fields from publishers table
            .from(TABLE)
            .leftJoin( // join publishers table on its id
                PUBLISHERS_TABLE, 
                PUBLISHERS_TABLE+'.id', 
                'publisher_id'
            ) 
            .where(TABLE+'.id', id) // find by id of a specific game
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

        const [{ id }] = await db()
            .table(TABLE)
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

        const updated = await db()
            .table(TABLE)
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
        const deleted = await db()
            .table(TABLE)
            .where('id', id)
            .delete();
            
        return !!deleted;
    }


    /* Trigger a process which will automatically remove the games having a release date older than 18
    months and apply a discount of 20% to all games having a release date between 12 and 18 months */
    async triggerDiscountProcedure() {
        return await db().transaction(async trx => {
            // Delete games where the sum of years*12 and months between 'now' and release date is more than 18
            const deleted = await trx()
                .from(TABLE)
                .delete()
                .whereRaw(`
                    extract(year from age(now(), release_date)) * 12 + 
                    extract(month from age(now(), release_date)) > 18
                `);
            

            // Delete games where the sum of years*12 and months between 'now' and release date is more than 12
            const updated = await trx()
                .table(TABLE)
                .update({
                    price: db().raw('price * 0.8') // 20% off
                })
                .whereRaw(`
                    extract(year from age(now(), release_date)) * 12 + 
                    extract(month from age(now(), release_date)) > 12
                `);

            return { deleted, updated };
        });
    }
}