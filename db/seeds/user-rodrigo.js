/* eslint-disable import/prefer-default-export */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    { id: 1, name: 'Rodrigo', email: 'rodrigo@something.com' },
  ]);
}
