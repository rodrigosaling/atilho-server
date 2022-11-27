/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('accounts', (t) => {
    t.increments('id').primary().unsigned();
    t.string('name').notNullable();
    t.string('currency').notNullable();
    t.decimal('initial_amount').defaultTo(0).notNullable();
    t.decimal('current_amount').defaultTo(0).notNullable();
    t.boolean('is_deleted').defaultTo(false);
    t.timestamp('create_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('accounts');
}
