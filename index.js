const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const userRouter = require("./routes/users.js");
const authRouter = require("./routes/auth.js");
const postRouter = require("./routes/posts.js")

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("CONNECTED TO MONGODB");
});

// mongoose
//     .connect(process.env.MONGO_PROD_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,   })
//     .then(() => console.log("Database connected!"))
//     .catch(err => console.log(err));

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

app.listen(9900, () => {
  console.log(`Backend server is running!`);
});
