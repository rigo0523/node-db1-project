const db = require("../data/dbConfig");

module.exports = {
  getUsers,
  getUsersById,
  addUser,
  updateUser,
  deleteUser,
  getUserAccounts,
};

//GET /api/users
function getUsers() {
  return db("users").select("users.*");
}

//GET /api/users/:id
function getUsersById(id) {
  return db("users").where({ id }).first();
}

//POST /api/users/:id
function addUser(bodyUser) {
  return db("users")
    .insert(bodyUser, "ids")
    .then((ids) => {
      console.log("ids----->", ids);
      return db("users").where({ id: ids }).first();
      //ids returns single post instead of an array
    });
}

//UPDATE /api/users/:id
function updateUser(id, user) {
  return db("users")
    .update(user)
    .where({ id })
    .then((ids) => {
      return db("users").where({ id: id }).first();
      //ids does not work here but only works on post, need to return the ID itself
    });
}

//DELETE /api/users/:id
function deleteUser(id) {
  return db("users").where({ id }).del();
}

//GET /api/users/:id/comments
function getUserAccounts(id) {
  return db("users")
    .join("accounts", "accounts.user_id", "=", "users.id")
    .select("users.*", "accounts.budget", "accounts.name as account_name")
    .where("accounts.user_id", id); //will be using {id} from params to target the user
}
