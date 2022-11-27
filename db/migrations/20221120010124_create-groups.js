/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('groups', (t) => {
    t.increments('id').primary().unsigned();
    t.string('name');
    t.string('email').unique().index();
    t.timestamp('created_at').defaultTo(knex.fn.now());
    t.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists('groups');
}

// THIS IS FOR A FUTURE IMPLEMENTATION, MAYBE
