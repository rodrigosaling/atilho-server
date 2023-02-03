import express from 'express';
import knex from 'knex';
import { TABLE_ACCOUNTS } from '../db/migrations/20221120010128_create-accounts.js';

import knexfile from '../knexfile.js';

const env = process.env.NODE_ENV || 'development';

const sql = knex(knexfile[env]);

const router = express.Router();

router.get('/', async (_, response) => {
  try {
    response.send(
      await sql.select().from(TABLE_ACCOUNTS).where('isDeleted', false)
    );
  } catch (error) {
    response.status(500).json(error);
  }
});

router.post('/', async (request, response) => {
  const { name, amount, accountTypeId } = request.body;
  const transaction = await sql(TABLE_ACCOUNTS).insert({
    accountTypeId,
    name,
    currency: 'R$',
    initialAmount: amount,
    currentAmount: amount,
  });

  response.status(201).json(transaction);
});

router.get('/:id', async (request, response) => {
  response.send(
    await sql
      .select(/* 'id', 'name', 'currency' */)
      .from(TABLE_ACCOUNTS)
      .where('id', request.params.id)
  );
});

router.put('/:id', async (request, response) => {
  const { name, amount, accountTypeId, currency } = request.body;
  // TODO: if the currentAmount is different from the current amount,
  // create a new transaction based on the type of the account
  try {
    await sql(TABLE_ACCOUNTS).where('id', request.params.id).update({
      accountTypeId,
      name,
      currency,
      currentAmount: amount,
    });
    response.sendStatus(200);
  } catch (error) {
    response.status(500).json(error);
  }
});

router.patch('/:id', async (request, response) => {
  const { body } = request;

  const validColumns = [
    'email',
    'currency',
    'currentAmount',
    'color',
    'accountTypeId',
  ];

  const propsToUpdate = Object.fromEntries(
    validColumns
      .filter((column) => body[column])
      .map((column) => [column, body[column]])
  );

  try {
    await sql(TABLE_ACCOUNTS)
      .where('id', request.params.id)
      .update(propsToUpdate);
    response.sendStatus(200);
  } catch (error) {
    response.status(500).json(error);
  }
});

// Not a real delete, just a logical delete
router.put('/:id/delete', async (request, response) => {
  response.send(
    await sql
      .from(TABLE_ACCOUNTS)
      .where('id', request.params.id)
      .update({ isDeleted: true })
  );
});

export default router;
