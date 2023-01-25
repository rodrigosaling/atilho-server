// src/index.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import knex from "knex";

// knexfile.js
import { fileURLToPath } from "url";
import { dirname } from "path";
var FILENAME = fileURLToPath(import.meta.url);
var DIRNAME = dirname(FILENAME);
var knexfile_default = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./db/dev.sqlite3"
    },
    useNullAsDefault: true,
    migrations: {
      tableName: "knex_migrations",
      directory: `${DIRNAME}/db/migrations`
    },
    seeds: {
      directory: `${DIRNAME}/db/seeds`
    }
  },
  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};

// src/index.js
var env = process.env.NODE_ENV || "development";
var sql = knex(knexfile_default[env]);
var app = express();
var port = 3456;
app.use(bodyParser.json());
app.use(cors());
var TABLE_ACCOUNTS = "accounts";
var TABLE_ACCOUNT_TYPES = "accountTypes";
app.get("/accounts", async (_, response) => {
  try {
    response.send(
      await sql.select().from(TABLE_ACCOUNTS).where("isDeleted", false)
    );
  } catch (error) {
    response.status(500).json(error);
  }
});
app.get("/accounts/:id", async (request, response) => {
  response.send(
    await sql.select().from(TABLE_ACCOUNTS).where("id", request.params.id)
  );
});
app.post("/accounts", async (request, response) => {
  const { name, amount, accountTypeId } = request.body;
  const transaction = await sql(TABLE_ACCOUNTS).insert({
    accountTypeId,
    name,
    currency: "R$",
    initialAmount: amount,
    currentAmount: amount
  });
  response.status(201).json(transaction);
});
app.put("/accounts/:id", async (request, response) => {
  const { name, amount, accountTypeId, currency } = request.body;
  try {
    const transaction = await sql(TABLE_ACCOUNTS).where("id", request.params.id).update({
      accountTypeId,
      name,
      currency,
      currentAmount: amount
    });
    response.sendStatus(200);
  } catch (error) {
    response.status(500).json(error);
  }
});
app.put("/accounts/:id/delete", async (request, response) => {
  const { name, updatedAmount } = request.body;
  response.send(
    await sql.from(TABLE_ACCOUNTS).where("id", request.params.id).update({ isDeleted: true })
  );
});
app.get("/account-types", async (_, response) => {
  response.send(await sql.select("id", "name").from(TABLE_ACCOUNT_TYPES));
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
