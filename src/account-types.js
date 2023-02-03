import express from 'express';
import knex from 'knex';
import { TABLE_ACCOUNT_TYPES } from '../db/migrations/20221119155137_create-account-types.js';

import knexfile from '../knexfile.js';

const env = process.env.NODE_ENV || 'development';

const sql = knex(knexfile[env]);
const router = express.Router();

router.get('/', async (_, response) => {
  response.send(await sql.select('id', 'name').from(TABLE_ACCOUNT_TYPES));
});

export default router;
