'use strict';

exports.up = async function(knex) {
    await knex.schema.raw(`
        CREATE TABLE publishers (
            id SERIAL NOT NULL,
            name TEXT NOT NULL,
            siret INTEGER NOT NULL,
            phone TEXT,
            CONSTRAINT publishers_pkey PRIMARY KEY (id)
        );
        CREATE INDEX publishers_full_index on publishers (id, name, siret);

        CREATE TABLE games (
            id SERIAL NOT NULL,
            title TEXT NOT NULL,
            price FLOAT,
            release_date TIMESTAMP NOT NULL,
            tags TEXT[],
            publisher_id INTEGER NOT NULL REFERENCES publishers (id) ON DELETE CASCADE,
            CONSTRAINT games_pkey PRIMARY KEY (id)
        );
        CREATE INDEX games_full_index on games (id, title, publisher_id, release_date);
    `);
};
    
exports.down = async function(knex) {
    await knex.schema.raw(`
        DROP TABLE games;
        DROP TABLE publishers;
    `);
};