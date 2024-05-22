const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "./config.env" });
}

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.originURL,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow credentials (cookies, headers) to be sent with the request
    optionsSuccessStatus: 204, // Set the status code for preflight requests (HTTP OPTIONS)
  })
);

// Route Imports
const user = require("./route/userRoute");
const product = require("./route/productRoute");
const cart = require("./route/cartRoute");

app.use("/api/user", user);
app.use("/api/product", product);
app.use("/api/cart", cart);

module.exports = app;
