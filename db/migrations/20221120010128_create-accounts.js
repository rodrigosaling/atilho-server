/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('accounts', (t) => {
    t.increments('id').primary().unsigned();
    t.integer('accountTypeId').unsigned();
    t.foreign('accountTypeId').references('id').inTable('accountTypes');
    t.string('name').notNullable();
    t.string('currency').notNullable();
    t.decimal('initialAmount').defaultTo(0).notNullable();
    t.decimal('currentAmount').defaultTo(0).notNullable();
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
  return knex.schema.dropTableIfExists('accounts');
}
