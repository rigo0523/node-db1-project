const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

//server export to index
const server = express();

//import routerss
const welcomeRouter = require("../welcome/welcome-router");
const accountsRouter = require("../accounts/accounts-router");

//global middleware
server.use(cors());
server.use(helmet());
server.use(express.json());

//server endpoints ----->
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
