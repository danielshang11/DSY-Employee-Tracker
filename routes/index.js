const express = require("express");

const userRouter = require("./users.js");
const postRouter = require("./posts.js");

const app = express();

app.use("/users", userRouter);
app.use("/posts", postRouter);

module.exports = app;