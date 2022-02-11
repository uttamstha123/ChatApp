const express = require("express");
const app = express();
const path = require("path");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const hbs = require("express-handlebars");
const UserDetails = require("./model/UserDetails");
require("dotenv").config();

// router
const signupRoute = require("./route/signup");
const displayUser = require("./route/marvel");

// set static files
app.use(express.static("./public"));
app.use(express.static("./Images"));

// making view engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  hbs.engine({
    defaultLayout: "main",
    extname: ".hbs",
  })
);

//middlewares
app.use(bodyParser.urlencoded({ extended: false })); //parses form inputted value
app.use(bodyParser.json()); //parsing json

// routes
app.use("/signup", signupRoute);
app.use("/login", displayUser);

mongo.connect(process.env.DB_URI, {useNewUrlParser: true}).then(() => {
  console.log("Database connected successfully...");
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log("Server is on the track...");
  });
});


app.get("/", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
  // let's render the template
  res.render("login", {
    page: "Login",
  });
});


