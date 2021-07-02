const express = require("express");
const router = express.Router();
const { getById, checkPostData } = require("../middleware/middleware-stack");

//database access using knex
const db = require("../data/dbConfig");

//GET /api/accounts/  --- promise based
router.get("/", (req, res, next) => {
  db("accounts")
    .then((account) => {
      console.log("acount-->", account);
      account
        ? res.status(200).json(account)
        : res.status(404).json({ message: "404 error, accounts not found" });
    })
    .catch((err) => next(err));
});

//GET BY ID /api/accounts/:id --- async based middleware
router.get("/:id", getById(), async (req, res, next) => {
  res.status(200).json(req.account);
});

//POST /api/accounts/ Make sure it posts as an object, not as an array with an object
router.post("/", checkPostData(), (req, res, next) => {
  const postBody = req.body;
  db("accounts")
    .insert(postBody, "id")
    .then((ids) => {
      return db("accounts")
        .where({ id: ids })
        .first()
        .then((post) => {
          post
            ? res.status(201).json({ post_created: post })
            : res.status(404).json({ message: "cant post account" });
        })
        .catch((err) => next(err));
    });

  ///THIS METHOD WORKS TOO
  //     const [id] = await db.insert(name, budget, "ids").into("accounts");

  //     const message = await db("accounts").where({ id: id }).first();
  //     res.status(201).json({ data: message });
  //   } catch (err) {
  //     next(err);
  //   }
});

//UPDATE /api/accounts/:id
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, budget, user_id } = req.body;

  const body = req.body;

  if (!name || !budget || !user_id) {
    return res.status(400).json({ message: "name OR budget input missing" });
  }

  try {
    await db("accounts").update(body).where({ id: id });

    const account = await db("accounts").where({ id }).first();
    account
      ? res.status(200).json({ updated: account })
      : res.status(404).json({ message: `can't update id # ${id}` });
  } catch (err) {
    next(err);
  }
});

//DELETE /api/accounts/:id
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let deletedAccount = await db("accounts").where({ id: id }).del();
    deletedAccount
      ? res.status(204).json({ deleted: deletedAccount })
      : res.status(404).json({ message: `can't delete that id# of${id}` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
