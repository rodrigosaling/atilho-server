/* eslint-disable import/prefer-default-export */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('account_types').del();
  await knex('account_types').insert([
    { id: 1, name: 'Checking' },
    { id: 2, name: 'Credit Card' },
    { id: 3, name: 'Investment' },
  ]);
}
