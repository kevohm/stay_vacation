const authenticate = require("./authenticate")
const errorHandler = require("./ErrorHandler");
const notFound = require("./notfound");
const authAdmin = require("./admin")
const checkAdmin = require("./checkAdmin")
const securePay = require("./securePay")
module.exports = {
  authAdmin,
  authenticate,
  notFound,
  errorHandler,
  checkAdmin,
  securePay 
};