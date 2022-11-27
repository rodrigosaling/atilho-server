// https://stackoverflow.com/a/62892482/785985
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = dirname(FILENAME);

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/dev.sqlite3',
    },
    useNullAsDefault: true, // https://stackoverflow.com/questions/41030694/how-does-knex-handle-default-values-in-sqlite
    migrations: {
      tableName: 'knex_migrations',
      directory: `${DIRNAME}/db/migrations`,
    },
    seeds: {
      directory: `${DIRNAME}/db/seeds`,
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
