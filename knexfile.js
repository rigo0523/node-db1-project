require("dotenv").config();
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/budget.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      // for foreign keys only // added users to database now, this is needed to reference
      //each users budgets
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run("PRAGMA foreign_keys = ON", done); // turn on FK enforcement
      },
    },
  },

  // update the following configuration to use PostgreSQL
  production: {
    client: "pg",
    // connection: {
    //   host: "localhost", // if the server is not running on your computer provide the network address
    //   database: "the name of the database to use in the postgres server", // <-- update
    //   user: "a user that has access to the server and database", // <-- update
    //   password: "the password for the user", // <-- update
    // },
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./data/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool: {
      min: 2,
      max: 10,
    },
  },
};
