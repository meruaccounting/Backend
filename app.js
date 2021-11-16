const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const connectDB = require("./config/db");

dotenv.config({ path: "./config/config.env" });
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
