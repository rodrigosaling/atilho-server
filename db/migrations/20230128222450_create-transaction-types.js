import { TABLE_ACCOUNTS } from './20221120010128_create-accounts.js';
import { TABLE_TRANSACTIONS } from './20230125181629_create-transactions.js';

export const TABLE_TRANSACTION_TYPES = 'transactionTypes';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_TRANSACTION_TYPES, (t) => {
    t.increments('id').primary().unsigned();
    t.integer('accountId').unsigned();
    t.foreign('accountId').references('id').inTable(TABLE_ACCOUNTS);
    t.integer('transactionId').unsigned();
    t.foreign('transactionId').references('id').inTable(TABLE_TRANSACTIONS);
    t.decimal('amount').defaultTo(0).notNullable();
    t.timestamp('createAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_TRANSACTION_TYPES);
}
