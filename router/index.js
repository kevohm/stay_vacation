const authRouter = require("./auth");
const eventRouter = require("./event");
const usersRouter = require("./users")
const paymentRouter = require("./payments")
const statsRouter = require("./stats")
const reportRouter = require("./report")
module.exports = {
  authRouter,
  eventRouter,
  usersRouter,
  paymentRouter,
  statsRouter,
  reportRouter,
};
