const express = require("express");
const app = express();
const path = require("path");
const mongo = require("mongoose");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const Joi = require("joi");
const { Auth } = require("two-step-auth");
const fs = require("fs");

dotEnv.config({ path: "./config/config" });
dotEnv.config({ path: "./config/serverResponse" });

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false })); //parses form inputted value
app.use(bodyParser.json()); //parsing json
// app.use(express.json())                           // this can also be used in order to parse json

// mongo
//   .connect(
//     "mongodb+srv://event618horizon:After%40123glow@cluster0.8evbz.mongodb.net/SignUp?retryWrites=true&w=majority",
//     { useNewUrlParser: true }
//   )
//   .then(() => {
//     console.log("Database connected successfully...");
// });
const PORT = dotEnv.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server is on the track...");
});

app.get("/", (req, res) => {
  //   console.log("helloww");
  res.sendFile(__dirname + "/public/index.html");
});

// remove data
fs.writeFile(__dirname + "/public/serverResponse.env", "", (err) => {
  if (err) console.log(err);
  else {
    console.log("File written successfully\n");
  }
});

let signUp = false;
let otp;
app.post("/signup.html", (req, res) => {
  const { email, inputOTP } = req.body;

  // lets validate it using joi

  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
    }),
  });
  try {
    if (inputOTP) {
      if (otp == inputOTP) {
        console.log("good");
        fs.writeFile(
          __dirname + "/public/serverResponse.env",
          "true",
          (err) => {
            if (err) console.log(err);
            else {
              console.log("File written successfully\n");
            }
          }
        );

        // res.send("SignUp successfull");
        // signUp = true;
      } else {
        console.log("Not good");
        fs.writeFile(
          __dirname + "/public/serverResponse.env",
          "false",
          (err) => {
            if (err) console.log(err);
            else {
              console.log("File written successfully\n");
            }
          }
        );
      }
    } else {
      const { error, value } = schema.validate({ email });

      const sendOTP = async (value) => {
        const res = await Auth(value, "ChatApp");
        console.log(res);
        otp = res.OTP;
      };

      sendOTP(value.email);
    }

    // }
  } catch (err) {
    console.log(err);
  }
  res.redirect("/signup.html");
});

app.get("/userDetails.html", (req, res) => {
  res.redirect(__dirname + "public/userDetails.html");
});
