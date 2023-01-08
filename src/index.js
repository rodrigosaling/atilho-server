import express from 'express';
import knex from 'knex';
import cors from 'cors';
// eslint-disable-next-line import/extensions
import knexfile from '../knexfile.js';

const env = process.env.NODE_ENV || 'development';

const sql = knex(knexfile[env]);

const app = express();
const port = 3456;

app.use(cors());

const TABLE_ACCOUNTS = 'accounts';

app.get('/', (request, response) => {
  response.send({
    id: '238j91832h9da8w3h423',
    name: 'John Doe',
    age: 232,
  });
});

// app.get('/create', async (request, response) => {
//   await sql.schema.createTable('users', (table) => {
//     table.increments();
//     table.string('name');
//     table.timestamps();
//   });
//   response.send('ok');
// });

// app.get('/insert', async (request, response) => {
//   await sql('users').insert({ name: 'Michele' });
//   response.send('ok');
// });

// app.get('/select', async (_, response) => {
//   const result = await sql.select().from('users');
//   response.send(result);
// });

app.get('/accounts', async (_, response) => {
  response.send(await sql.select().from(TABLE_ACCOUNTS));
});

app.get('/accounts/:id', async (request, response) => {
  response.send(
    await sql
      .select('id', 'name', 'currency')
      .from(TABLE_ACCOUNTS)
      .where('id', request.params.id)
  );
});

app.post('/accounts', async (request, response) => {
  response.send(
    await sql.select('id').from(TABLE_ACCOUNTS).where('id', request.params.id)
  );
});

app.put('/accounts', async (request, response) => {
  response.send(
    await sql.select('id').from(TABLE_ACCOUNTS).where('id', request.params.id)
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
