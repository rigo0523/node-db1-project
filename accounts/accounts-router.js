const express = require("express");
const { restart } = require("nodemon");
const { orWhereNotExists } = require("../data/dbConfig");

//database access using knex
const db = require("../data/dbConfig");

const router = express.Router();

//GET /api/accounts/
router.get("/", async (req, res, next) => {
  const sql = await db("accounts").toString();
  console.log("sql", sql);
  try {
    const account = await db("accounts");
    account
      ? res.status(200).json({ data: account })
      : res.status(404).json({ message: "account list not found" });
  } catch (err) {
    next(error);
  }
});

//GET BY ID /api/accounts/:id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    let account = await db("accounts").where({ id: id }).first();
    account
      ? res.status(200).json({ data: account })
      : res.status(404).json({ message: `can't find id #${id}` });
  } catch (err) {
    next(err);
  }
});

//POST /api/accounts/ Make sure it posts as an object, not as an array with an object
router.post("/", async (req, res, next) => {
  const name = req.body;
  const budget = req.body;

  if (!name || !budget) {
    return res.status(400).json({ message: "name OR budget input missing" });
  }

  try {
    const account = await db("accounts")
      .insert(name, budget, "id")
      .then((ids) => {
        db("accounts")
          .where({ id: ids })
          .first()
          .then((post) => {
            post
              ? res.status(201).json({ post_created: post })
              : res.status(404).json({ message: "cant post account" });
          });
      });
  } catch (err) {
    next(err);
  }
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
  const name = req.body;
  const budget = req.body;

  if (!name || !budget) {
    return res.status(400).json({ message: "name OR budget input missing" });
  }

  try {
    await db("accounts").update(name, budget).where({ id: id });

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
