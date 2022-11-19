import express from 'express';
import knex from 'knex';
import knexfile from '../knexfile.js';

const env = process.env.NODE_ENV || 'development';

const sql = knex(knexfile[env]);
// const sql = knex({
//   client: 'sqlite3',
//   connection: {
//     filename: './mydb.sqlite',
//   },
//   useNullAsDefault: true, // https://stackoverflow.com/questions/41030694/how-does-knex-handle-default-values-in-sqlite
// });

const app = express();
const port = 3456;

app.get('/', (request, response) => {
  response.send('Hello World!');
});

app.get('/create', async (request, response) => {
  await sql.schema.createTable('users', function (table) {
    table.increments();
    table.string('name');
    table.timestamps();
  });
  response.send('ok');
});

app.get('/insert', async (request, response) => {
  await sql('users').insert({ name: 'Michele' });
  response.send('ok');
});

app.get('/select', async (_, response) => {
  const result = await sql.select().from('users');
  response.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
