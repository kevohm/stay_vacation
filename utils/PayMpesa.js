const mpesaExpress = require("tajiri-mpesa-express")

const environment = process.env.ENV_MPESA; 
// If your Application is live set this to live
//const environment="live" :
const conf = {
  BUSINESS_SHORT_CODE: process.env.BUSINESS_CODE,
  TRANSACTION_TYPE: process.env.TRANSACTION_TYPE,
  CALLBACK_URL: process.env.CALLBACK_URL,
  AMOUNT: 1,
  PHONE_NUMBER: 254708374149,
  ACCOUNT_REFERENCE: process.env.ACCOUNT_REFERENCE,
  TRANSACTION_DESCRIPTION: process.env.TRANSACTION_DESCRIPTION,
  CONSUMER_KEY: process.env.CONSUMER_KEY,
  CONSUMER_SECRET: process.env.CONSUMER_SECRET,
  PASS_KEY: process.env.PASS_KEY,
};

const Mpesa = new mpesaExpress(conf, environment);
module.exports = Mpesa