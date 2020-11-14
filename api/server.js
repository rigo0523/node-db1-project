const express = require("express");
const server = express();

//routers
const welcomeRouter = require("../welcome/welcome-router");
const accountsRouter = require("../accounts/accounts-router");

//middleware
server.use(express.json());

//welcome and accounts routers
server.use("/", welcomeRouter);
server.use("/api/accounts", accountsRouter);

//middleware for CATCH ERROR on all endpoints of /api/accounts
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "500 error: Something went wrong",
  });
});

module.exports = server;
