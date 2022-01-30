const route = require("express").Router();
const fs = require("fs");
const { Auth } = require("two-step-auth");
const Joi = require("joi");
const User = require("../model/User");
const UserDetails = require("../model/UserDetails");
// const mongoose = require("mongoose");

// remove data
route.get("/", (req, res) => {
  res.render("signup", {
    page: "SignUp",
  });
});

route.get("/userDetails.html", (req, res) => {
  res.render("userDetails", {
    page: "Create Profile",
  });
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
        // await user.save((err, result) => {
        //   if (err) {
        //     console.log(err);
        //   } else {
        //     console.log(result);
        //   }
        // });
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
          page: "SignUp",
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
    page: "SignUp",
  });
});

route.post("/userDetails.html", async (req, res) => {
  const { password, confirm } = req.body;
  const userDetails = new UserDetails({
    email: mail,
    fullName: req.body.name,
    password1: req.body.password,
    password2: req.body.confirm,
    gender: req.body.gender,
    bio: req.body.bio,
  });
  if (password == confirm) {
    await userDetails.save((err, result) => {
      if (err) {
        console.log(err);
        return res.status(504).render("userDetails", {
          page: "Create Profile",
        });
      } else {
        res.status(200).send(result);
      }
    });
  } else {
    res.render("userDetails", {
      fail: true,
      page: "Create Profile",
    });
  }
});
// async function saveEmail(email) {

// }
module.exports = route;
