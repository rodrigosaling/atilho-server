export const TABLE_TRANSACTIONS = 'transactions';
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable(TABLE_TRANSACTIONS, (t) => {
    t.increments('id').primary().unsigned();
    // TODO: add the slug/id based on nanoid so we don't use the regular ID, call it "hash"
    t.string('description').notNullable();
    t.decimal('totalAmount').defaultTo(0).notNullable();
    t.datetime('date').notNullable();
    t.boolean('isDeleted').defaultTo(false);
    t.timestamp('createAt').defaultTo(knex.fn.now());
    t.timestamp('updatedAt').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists(TABLE_TRANSACTIONS);
}
