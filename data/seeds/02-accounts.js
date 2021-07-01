exports.seed = function (knex) {
  return knex("accounts").insert([
    { name: "account-01", budget: 4000.0, user_id: 1 },
    { name: "account-02", budget: 206.75, user_id: 1 },
    { name: "account-03", budget: 6789.0, user_id: 1 },
    { name: "account-04", budget: 199.99, user_id: 2 },
    { name: "account-05", budget: 22.34, user_id: 2 },
    { name: "account-06", budget: 300.0, user_id: 2 },
    { name: "account-07", budget: 7000.0, user_id: 3 },
    { name: "account-08", budget: 78800.0, user_id: 3 },
    { name: "account-09", budget: 3030.3, user_id: 3 },
    { name: "account-10", budget: 19.56, user_id: 4 },
    { name: "account-11", budget: 19.91, user_id: 4 },
    { name: "account-12", budget: 7080.0, user_id: 4 },
    { name: "account-13", budget: 1234.0, user_id: 4 },
  ]);
};
