const route = require("express").Router();
const fs = require("fs");
const { Auth } = require("two-step-auth");
const Joi = require("joi");
const User = require("../model/User");
// const mongoose = require("mongoose");

// remove data
route.get("/", (req, res) => {
  res.render("signup");
});
let mail;
let otp;
route.post("/", async (req, res) => {
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
          __dirname.substr(0, __dirname.indexOf("route")) +
            "/public/serverResponse.env",
          "true",
          (err) => {
            if (err) console.log(err);
            else {
              console.log("File written successfully\n");
            }
          }
        );
        // save to db
        // saveEmail(email);
        const user = new User({
          email: mail,
        });
        await user.save((err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
          }
        });
        // res.send(user);

        // res.send("SignUp successfull");
        // signUp = true;
      } else {
        console.log("Not good");
        fs.writeFile(
          __dirname.substr(0, __dirname.indexOf("route")) +
            "/public/serverResponse.env",
          "false",
          (err) => {
            if (err) console.log(err);
            else {
              console.log("File written successfully\n");
            }
          }
        );
      }
    } else if (email) {
      const { error, value } = schema.validate({ email });
      if (!error) {
        const sendOTP = async (value) => {
          const res = await Auth(value, "ChatApp");
          console.log(res);
          otp = res.OTP;
        };
        sendOTP(value.email);
      } else {
        let errorMsg = "Invalid Email";
        // console.log();
        return res.status(504).render("signup", {
          place: errorMsg,
        });
      }

      mail = email;
    }
  } catch (err) {
    console.log(err);
  }
  res.render("signup", {
    email: mail,
    inputOtp: inputOTP,
  });
});

// async function saveEmail(email) {

// }
module.exports = route;
