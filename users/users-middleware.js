const Users = require("./users-helper");

module.exports = {
  checkUserID,
};

function checkUserID() {
  return (req, res, next) => {
    const { id } = req.params;
    Users.getUsersById(id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({ message: `no user of ${id} found` });
        }
      })
      .catch((err) => next(err));
  };
}
