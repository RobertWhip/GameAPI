// External
import { Injectable } from "@nestjs/common";

// Internal
import { DBService } from "../components/db.service";


@Injectable()
export class PublishersService {
    private db;

    constructor(
        private readonly dbService: DBService
    ) {
        this.db = this.dbService.db();
    }

    getTableName() {
        return 'publishers';
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
        const query = this.db
            .from(this.getTableName())
            .select()
            .where('id', id)
            .first();

        return query;
    }

    async create(publisher) {
        const [{ id }] = await this.db
            .table(this.getTableName())
            .insert(publisher)
            .returning('id');

        return id;
    }

    async update(id, publisher) {
        const updated = await this.db
            .table(this.getTableName())
            .update(publisher)
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
}