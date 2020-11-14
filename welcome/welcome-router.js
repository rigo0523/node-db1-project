const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({ Welcome: "Welcome, the accounts server is working" });
});

module.exports = router;
