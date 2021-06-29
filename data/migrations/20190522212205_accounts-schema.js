exports.up = function (knex, Promise) {
  return (
    knex.schema
      .createTable("users", (tbl) => {
        tbl.increments("id");
        tbl.string("name", 128).notNull().unique();
        tbl.integer("age", 128).notNull();
        tbl.string("location", 128).notNull();
      })
      //will have a foreign key on KNEXFILE.JS
      .createTable("accounts", (tbl) => {
        tbl.increments();
        tbl.string("name").notNullable().unique();
        tbl.decimal("budget").notNullable();
        tbl
          .integer("user_id")
          .unsigned()
          .notNull()
          // OR IT can be .references('id').inTable('users), no need for table
          .references("users.id")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
      })
  );
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists("accounts").dropTableIfExists("users");
};
