import { Injectable } from "@nestjs/common";
const db = require('../components/db');
const TABLE = 'publishers';


@Injectable()
export class PublishersService {
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
            name, siret
        } = filters;

        if (name) {
            query.where('name', 'like', `%${name}%`);
        }

        if (siret) {
            query.where('siret', siret);
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

    async create(publisher) {
        const [{ id }] = await db()
            .table(TABLE)
            .insert(publisher)
            .returning('id');

        return id;
    }

    async update(id, publisher) {
        const updated = await db()
            .table(TABLE)
            .update(publisher)
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
}