/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('accounts').del();
  await knex('accounts').insert([
    { name: 'Itaú', amount: 18273.99 },
    { name: 'Bradesco', amount: 232.77 },
    { name: 'Banco do Brasil', amount: -236.1 },
  ]);
}
