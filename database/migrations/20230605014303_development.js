/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = function(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.increments('userId');
            table.string('phoneNumber').notNullable();
            table.string('user_type', 40).nullable();
            table.string('role', 40).nullable();
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
        .createTable('requettes', function (table) {
            table.increments('id');
            table.integer('mobile_user_id').checkPositive();
            table.integer('taxi_user_id').checkPositive();
            table.string('lieu_depart', 150).notNullable();
            table.string('lieu_arrive', 255).notNullable();
            table.timestamp('heure_depart', { precision: 6 }).defaultTo(knex.fn.now(6));
            table.float('distance').notNullable();
            table.decimal('prix').notNullable();
            table.timestamp('agree_or_desagree_at', { precision: 6 }).nullable();
            table.boolean('status').nullable();
            table.timestamp('paid_at', { precision: 6 }).nullable();
            table.timestamps();
        })
        .createTable('locations', function (table) {
            table.increments('id');
            table.integer('user_id').checkPositive();
            table.string('latitude', 150).notNullable();
            table.string('longitude', 150).notNullable();
            table.string('altitude', 150).notNullable();
            table.string('speed', 10).notNullable();
            table.string('heart', 10).notNullable();
            table.string('name', 10).notNullable();
            table.text('description').nullable();
            table.timestamps();
        })
        .createTable('notifications', function (table) {
            table.increments('id');
            table.integer('user_id').checkPositive();
            table.text('description').notNullable();
            table.boolean('status').nullable();
            table.timestamps();
        })
        .createTable('favoris', function (table) {
            table.increments('id');
            table.integer('mobile_user_id').checkPositive();
            table.integer('taxi_user_id').checkPositive();
            table.text('commentaires').notNullable();
            table.boolean('status');
            table.timestamps();
        })
        .createTable('notes', function (table) {
            table.increments('id');
            table.integer('mobile_user_id').checkPositive();
            table.integer('taxi_user_id').checkPositive().nullable();
            table.string('note', 10).notNullable();
            table.text('commentaires').notNullable();
            table.boolean('status');
            table.timestamps();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("users")
        .dropTableIfExists("posts")
        .dropTableIfExists("requettes")
        .dropTableIfExists("locations")
        .dropTableIfExists("notifications")
        .dropTableIfExists("favoris")
        .dropTableIfExists('notes');
};
