import { TABLE_TAGS } from './20221119225404_create-tags.js';
import { TABLE_TRANSACTIONS } from './20230125181629_create-transactions.js';

export const TABLE_TRANSACTION_TAGS = 'transactionTags';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_TRANSACTION_TAGS, (t) => {
    t.increments('id').primary().unsigned();
    t.integer('tagId').unsigned();
    t.foreign('tagId').references('id').inTable(TABLE_TAGS);
    t.integer('transactionId').unsigned();
    t.foreign('transactionId').references('id').inTable(TABLE_TRANSACTIONS);
    t.timestamp('createAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_TRANSACTION_TAGS);
}
