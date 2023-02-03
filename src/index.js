import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import accountsRouter from './accounts.js';
import accountTypesRouter from './account-types.js';

const app = express();
const port = 3456;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
// app.options('*', cors()); // Not needed

app.use('/accounts', accountsRouter);
app.use('/account-types', accountTypesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
