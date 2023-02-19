
require("dotenv").config()
require("express-async-errors");
const express = require("express")
const app = express();
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

const corOpt = {
  origin: ["http://localhost:3000", "https://tyrantx-blog-app.netlify.app"],
  credentials: true,
};


//utils
app.use(express.json()); 
app.use(cors(corOpt));
//routes
app.use("/v1/auth", authRouter)
app.use("/v1/event", eventRouter);
app.use("/v1/users", authenticate, usersRouter);
app.use("/v1/payments", authenticate, paymentRouter);
app.use("/v1/stats", authenticate, authAdmin, statsRouter);
app.use("/v1/reports", authenticate, authAdmin, reportRouter);
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