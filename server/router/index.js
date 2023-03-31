const authRouter = require("./auth");
const eventRouter = require("./event");
const usersRouter = require("./users")
const paymentRouter = require("./payments")
const statsRouter = require("./stats")
const reportRouter = require("./report")
const commentsRouter = require("./comments")
const CategoryRouter = require("./Category")
module.exports = {
  authRouter,
  eventRouter,
  usersRouter,
  paymentRouter,
  statsRouter,
  reportRouter,
  commentsRouter,
  CategoryRouter
};
