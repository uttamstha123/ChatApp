const express = require("express");
const app = express();
const path = require("path");
const mongo = require("mongoose");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const fs = require("fs");
const hbs = require("express-handlebars");

// router
// const userDetailsRoute = require('./route/userdetails')
const signupRoute = require("./route/signup");
// configuration
dotEnv.config({ path: "./config/config" });
dotEnv.config({ path: "./config/serverResponse" });

// set static files
app.use(express.static(__dirname + "/public"));

// making view engine
// app.set('views', path.join(__dirname,"views"))
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
// app.use('/userDetails.html',userDetailsRoute)

mongo
  .connect(
    "mongodb+srv://event618horizon:After%40123glow@cluster0.8evbz.mongodb.net/SignUp?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Database connected successfully...");
  });
const PORT = dotEnv.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is on the track...");
});

fs.writeFile(__dirname + "/public/serverResponse.env", "", (err) => {
  if (err) console.log(err);
  else {
    console.log("File written successfully\n");
  }
});

app.get("/", (req, res) => {
  //   console.log("helloww");
  // res.sendFile(__dirname + "/public/index.html");

  // let's render the template
  res.render("index",{
    page:'Login'
  });
});


