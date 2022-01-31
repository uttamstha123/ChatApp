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
// const userDetailsRoute = require('./route/userdetails')
const signupRoute = require("./route/signup");
const { profile } = require("console");


// set static files
app.use(express.static("./public"));

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
    process.env.DB_URI,
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Database connected successfully...");
  });
const PORT = process.env.PORT || 3000;
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
  // let's render the template
  res.render("index", {
    page: "Login",
  });
});

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  if (email.length && password.length) {
    const userLogin = await UserDetails.find({ email: email });
    if (password == userLogin[0].password1) {
      return res.render('profile', {
        name: userLogin[0].fullName,
        bio: userLogin[0].bio,
      })
    }
  }
    res.render("index", {
      incorrectLogin: true,
    });
  }
);
