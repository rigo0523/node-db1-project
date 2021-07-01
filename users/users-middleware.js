const Users = require("./users-helper");

module.exports = {
  checkUserID,
  checkPostData,
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

//check post data for name and budge
function checkPostData() {
  return (req, res, next) => {
    const { name, age, location } = req.body;

    if (!name || !age || !location) {
      return res
        .status(400)
        .json({ message: "name, location OR budget input missing.." });
    }
    next();
  };
}
