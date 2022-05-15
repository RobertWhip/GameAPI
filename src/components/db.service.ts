// External
import { Injectable } from '@nestjs/common';
import knex from 'knex';

@Injectable()
export class DBService {
  private readonly _db;

  constructor() {
    const {
      DB_USER,
      DB_PSWD,
      DB_HOST,
      DB_PORT,
      DB_NAME
    } = process.env;

    this._db = knex({
      client: 'pg',
      connection: `postgres://${DB_USER}:${DB_PSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
    });
  }

  db() {
    return this._db;
  }
}
