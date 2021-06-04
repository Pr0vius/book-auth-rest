const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDatabase = require("./config/database");
const app = express();
//Settings
app.set("port", process.env.PORT || 4000);
//Middlewares
if (process.env.NODE_ENV === "DEVELOPMENT") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cors());
app.use(require("./middlewares/error"));

//Database
connectDatabase();
//Routes
const books = require("./routes/books.routes");
const author = require("./routes/author.routes");
const user = require("./routes/user.routes");

app.use(require("./routes/index.routes"));
app.use("/books", books);
app.use("/author", author);
app.use("/user", user);

module.exports = app;
