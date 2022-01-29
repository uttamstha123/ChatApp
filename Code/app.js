const express = require("express");
const app = express();
const path = require("path");
const mongo = require("mongoose");
const dotEnv = require("dotenv");
const bodyParser = require("body-parser");
const Joi = require("joi");
const { Auth } = require("two-step-auth");

dotEnv.config({ path: "./config/config" });

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
  console.log("helloww");
  res.sendFile(__dirname + "/public/index.html");
});

let storedMail;
app.post("/signup.html", (req, res) => {
  console.log(req.body)
  const { email, inputOTP } = req.body;
//   console.log(email);

  // lets validate it using joi
  
  const schema = Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
    }),
  });
  try {
    const { error, value } = schema.validate({ email });
    console.log(value.email)
    // let errorMsg = error.details[0].message;
    console.log(error);
    // if (error) {
    //   console.log("some error")
    //   }else{
        let otp;
        const sendOTP = async (value) => {
            const res = await Auth(value, "ChatApp");
            console.log(res);
            // console.log(res.mail, res.OTP, res.success);
            otp = res.OTP;
        };

        sendOTP(value.email)
        if(inputOTP){
            // console.log(inputOTP)
            console.log(otp)
            if(otp == inputOTP){
                console.log("good")
            }
        }

    // }
  } catch (err) {
    console.log(err);
  }
  res.redirect("/signup.html");
});
