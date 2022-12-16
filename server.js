const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", require("./routes"));

app.listen(3001);