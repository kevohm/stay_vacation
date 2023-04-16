
require("dotenv").config()
require("express-async-errors");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const express = require("express")
const helmet = require("helmet");
const xss = require("xss-clean")
var morgan = require("morgan");
const app = express();
const fs = require("fs")
const path = require("path");
const {
  authRouter,
  eventRouter,
  usersRouter,
  paymentRouter,
  statsRouter,
  reportRouter,
  commentsRouter,
  CategoryRouter 
} = require("./router/index");
const connectDB = require("./db/connect")
const {
  errorHandler,
  notFound,
  authenticate,
  authAdmin,
} = require("./middleware/index");
const cors = require("cors")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs.json");


app.disable("x-powered-by"); 

//logs
 if (process.env.NODE_ENV === "production") {
   const accessLogStream = fs.createWriteStream( 
     __dirname + "/logs/" + "access.log",
     { flags: "a" }
   );
   app.use(morgan("combined", { stream: accessLogStream }));
 }

const corOpt = {
  origin: ["http://localhost:3000","https://stay-vacation.netlify.app","https://stay-vacations.tyrantx.me"],
  credentials: true,
};




//utils
app.use(express.json()); 
app.use(cors(corOpt));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss())

//routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/v1/auth", authRouter)
app.use("/v1/event", eventRouter);
app.use("/v1/users", authenticate, usersRouter);
app.use("/v1/payments", authenticate, paymentRouter);
app.use("/v1/stats", authenticate, authAdmin, statsRouter);
app.use("/v1/reports", authenticate, authAdmin, reportRouter);
app.use("/v1/comments",commentsRouter)
app.use("/v1/categories",CategoryRouter)

//middleware
app.use(notFound)
app.use(errorHandler)
const port = process.env.PORT || 5000
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`server listening at ${port}...`));
    } catch (error) {
        console.log(error)
    }
}
start();