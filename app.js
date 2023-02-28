
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
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
const {
  authRouter,
  eventRouter,
  usersRouter,
  paymentRouter,
  statsRouter,
  reportRouter,
} = require("./router/index");
const connectDB = require("./db/connect")
const {
  errorHandler,
  notFound,
  authenticate,
  authAdmin,
} = require("./middleware/index");
const cors = require("cors")

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
  origin: ["http://localhost:3000", "http://localhost:3007"],
  credentials: true,
};

const __dirname = dirname(fileURLToPath(import.meta.url));

// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));

//utils
app.use(express.json()); 
app.use(cors(corOpt));
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss())
//routes
app.use("/v1/auth", authRouter)
app.use("/v1/event", eventRouter);
app.use("/v1/users", authenticate, usersRouter);
app.use("/v1/payments", authenticate, paymentRouter);
app.use("/v1/stats", authenticate, authAdmin, statsRouter);
app.use("/v1/reports", authenticate, authAdmin, reportRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

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