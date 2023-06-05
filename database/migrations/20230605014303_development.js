/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('userId');
            table.string('phoneNumber').notNullable();
            table.string('user_type', 40).notNullable();
            table.text('password').notNullable();
            table.timestamps();
        })
        .createTable('posts', function (table) {
            table.integer('author').unsigned().notNullable();
            table.string('title', 30);
            table.string('content');
            table.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
          
            table.foreign('author').references('userId').inTable('users');
        })
        .createTable('user', function (table) {
            table.increments('id');
            table.string('first_name', 255).notNullable();
            table.string('last_name', 255).notNullable();
        })
        .createTable('product', function (table) {
            table.increments('id');
            table.decimal('price').notNullable();
            table.string('name', 1000).notNullable();
            table.text('bio');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("product")
        .dropTableIfExists('user');
};
