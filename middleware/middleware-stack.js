const db = require("../data/dbConfig");

module.exports = {
  getById,
  checkPostData,
};

// /api/accounts/:id --- get by ID
function getById(id) {
  return async (req, res, next) => {
    const { id } = req.params;
    try {
      let account = await db("accounts").where({ id: id }).first();
      if (account) {
        req.account = account;
        next();
      } else {
        res.status(404).json({ message: `can't find id #${id}` });
      }
    } catch (err) {
      next(err);
    }
  };
}

//check post data for name and budge
function checkPostData() {
  return (req, res, next) => {
    const { name, budget, user_id } = req.body;
    if (!name || !budget || !user_id) {
      return res
        .status(400)
        .json({ message: "name, user_id OR budget input missing.." });
    }
    next();
  };
}
