const express = require("express");
const router = express.Router();
const User = require("./users-helper");
const { checkUserID } = require("./users-middleware");

//GET api/users
router.get("/", (req, res, next) => {
  User.getUsers()
    .then((user) => {
      user
        ? res.status(200).json(user)
        : res.status(404).json({ message: "no users found" });
    })
    .catch((err) => next(err));
});

//GET api/users/:id
router.get("/:id", checkUserID(), (req, res, next) => {
  res.status(200).json(req.user);
});

//POST api/users
router.post("/", (req, res, next) => {
  const postBody = req.body;
  console.log("post body--->", postBody);
  if (!postBody.name || !postBody.age || !postBody.location) {
    res.status(404).json({ message: "please check post properties" });
  }
  User.addUser(postBody)
    .then((user) => {
      user
        ? res.status(201).json(user)
        : res.status(404).json({ message: "cant post user" });
    })
    .catch((err) => next(err));
});

module.exports = router;
