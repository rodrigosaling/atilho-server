/* eslint-disable import/extensions */
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import knex from 'knex';

import knexfile from '../knexfile.js';

const env = process.env.NODE_ENV || 'development';

const sql = knex(knexfile[env]);

const app = express();
const port = 3456;

app.use(bodyParser.json());

app.use(cors());
// app.options('*', cors()); // Not needed

const TABLE_ACCOUNTS = 'accounts';
const TABLE_ACCOUNT_TYPES = 'accountTypes';

app.get('/accounts', async (_, response) => {
  try {
    response.send(
      await sql.select().from(TABLE_ACCOUNTS).where('isDeleted', false)
    );
  } catch (error) {
    response.status(500).json(error);
  }
});

app.get('/accounts/:id', async (request, response) => {
  response.send(
    await sql
      .select(/* 'id', 'name', 'currency' */)
      .from(TABLE_ACCOUNTS)
      .where('id', request.params.id)
  );
});

app.post('/accounts', async (request, response) => {
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

app.put('/accounts/:id', async (request, response) => {
  const { name, amount, accountTypeId, currency } = request.body;
  // TODO: if the currentAmount is different from the current amount,
  // create a new transaction based on the type of the account
  try {
    const transaction = await sql(TABLE_ACCOUNTS)
      .where('id', request.params.id)
      .update({
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
// Not a real delete, just a logical delete
app.put('/accounts/:id/delete', async (request, response) => {
  const { name, updatedAmount } = request.body;
  response.send(
    await sql
      .from(TABLE_ACCOUNTS)
      .where('id', request.params.id)
      .update({ isDeleted: true })
  );
});

app.patch('/accounts/:id', async (request, response) => {
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
    const transaction = await sql(TABLE_ACCOUNTS)
      .where('id', request.params.id)
      .update(propsToUpdate);
    response.sendStatus(200);
  } catch (error) {
    response.status(500).json(error);
  }
});

app.get('/account-types', async (_, response) => {
  response.send(await sql.select('id', 'name').from(TABLE_ACCOUNT_TYPES));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
