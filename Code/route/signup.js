const route = require("express").Router();
const fs = require("fs");
const { Auth } = require("two-step-auth");
const Joi = require("joi");

// remove data

let otp;
route.post("/", (req, res) => {
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

module.exports = route;
