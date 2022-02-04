let marvelCharactersMale = [
  {
    name: "Captain America",
    imgUrl: "/male/captain-america.jpg",
    about:
      "When Steve Rogers enlisted to fight in World War II, he didn’t do it to become a hero, or an icon, or a legend; he did it because he felt it was the right thing to do. Captain America’s Super-Soldier treatment dramatically slowed his aging process, allowing him to survive decades frozen in ice near the Arctic circle before emerging to resume life as one of Earth’s most powerful Super Heroes.",
  },
  {
    name: "Iron Man",
    imgUrl: "/male/iron-man.jpg",
    about:
      "Genius. Billionaire. Playboy. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man on this week's Marvel 101. Having created a wondrous suit of armor to keep himself alive, Tony has revised it dozens of times, each version with increased capabilities, faster operation, reduced energy usage, and adaptability to the greatest threats the universe has to offer.",
  },
  {
    name: "Thor Odinson",
    imgUrl: "/male/thor.jpg",
    about:
      "Thor was born to the King of the Asgardian Gods, Odin Borson, and the Earth Goddess Gaea. He grew up in Asgard under Odin's tutelage and trained in his footsteps to one day lead Asgard. Besides Odin, his stepmother Frigga and his adopted brother Loki are the only family he know, alongside his best friends Sif, Balder, and the Warriors Three.",
  },
  {
    name: "SuperMan",
    imgUrl: "/male/super-man.jpg",
    about:
      "Faster than a speeding bullet, more powerful than a locomotive… The Man of Steel fights a never-ending battle for truth, justice, and the American way. From his blue uniform to his flowing red cape to the S shield on his chest, Superman is one of the most immediately recognizable and beloved DC Super Heroes of all time. The Man of Steel is the ultimate symbol of truth, justice, and hope. He is the world's first Super Hero and a guiding light to all.",
  },
  {
    name: "BatMan",
    imgUrl: "/male/batman.jpg",
    about:
      "In the name of his murdered parents, Bruce Wayne wages eternal war on the criminals of Gotham City. He is vengeance. He is the night. He is Batman. One of the most iconic fictional characters in the world, Batman has dedicated his life to an endless crusade, a war on all criminals in the name of his murdered parents, who were taken from him when he was just a child. Since that tragic night, he has trained his body and mind to near physical perfection to be a self-made Super Hero.",
  },
  {
    name: "Doctor Strange",
    imgUrl: "/male/doctor-strange.jpg",
    about:
      "Recognized the world over as one of the most brilliant neurosurgeons, Stephen Strange’s arrogance and self-centered nature grew alongside his skill until his ego far outweighed his career, proceeding to close himself off from only the most wealthy and influential patients. Everything changed for the man one fateful night when a near-fatal car crash left Strange with severely damaged nerves in both hands and a diagnosis of never being able to operate again.",
  },
];

let marvelCharactersFemale = [
  {
    name: "Captain Marvel",
    imgUrl: "/female/captain-marvel.jpg",
    about:
      "Former Air Force pilot and intelligence agent Carol Danvers pursued her dream of space exploration as a NASA employee, but her life forever changed when she was accidentally transformed into a human-Kree hybrid with extraordinary powers.Now, Carol is the latest warrior to embrace the mantle of Captain Marvel, and she has taken her place as one of the world’s mightiest heroes.",
  },
  {
    name: "Hela",
    imgUrl: "/female/hela.jpg",
    about:
      "Hela, the Asgardian Goddess of Death, rules two of the nine realms: Hel, land of the dead, and Niffleheim, land of eternal ice. With a simple touch, she can cause gods to perish, but Hela's purpose is to receive Asgardian souls, as well as their followers. She is known for her jealous wrath, her lust for ruling Valhalla, and her perpetual quest for both Thor and Odin's souls. Though, as she holds power over life as well, she can be forgiving when it comes to matters of the heart and personal sacrifice.",
  },
  {
    name: "Wanda",
    imgUrl: "/female/wanda.jpg",
    about:
      "Although much of the Scarlet Witch’s true origins remain elusive to her thanks to manipulations by others, she can still recall her early days as a child with her twin brother Pietro. The two lived on Wundagore Mountain in Eastern Europe, believing themselves born as mutants to a Romani couple named the Maximoffs. Given the name Wanda, she lived for a short time in childish innocence until local troubles involving her parents separated her and her brother from them and forced her to hide her growing powers.",
  },
  {
    name: "Black Widow",
    imgUrl: "/female/black-widow.jpg",
    about:
      "Gifted spy Natasha Romanoff is more than worthy of her moniker, Black Widow. Ruthless, efficient, and exceptionally skilled, Natasha strikes fear into the hearts of her enemies. Although she once operated on the side of evil, her innate heroism allowed her to overcome her upbringing and defect, setting her on a lifelong path of redemption.",
  },
  {
    name: "Super Girl",
    imgUrl: "/female/super-girl.jpg",
    about:
      "Teenager Kara Zor-el was rocketed to Earth from the dying planet Krypton. Faced with an entire world completely unrecognizable from the one she grew up in, she’s the ultimate new girl in school—with a planet-splitting right hook. A lonely girl with astounding might, she struggles to find her identity on her new reluctant home.",
  },
  {
    name: "Wonder Woman",
    imgUrl: "/female/wonder-woman.jpg",
    about:
      "Beautiful as Aphrodite, wise as Athena, swifter than Hermes, and stronger than Hercules, Princess Diana of Themyscira fights for peace in Man's World. One of the most beloved and iconic DC Super Heroes of all time, Wonder Woman has stood for nearly eighty years as a symbol of truth, justice and equality to people everywhere. Raised on the hidden island of Themyscira, also known as Paradise Island, Diana is an Amazon, like the figures of Greek legend, and her people's gift to humanity.",
  },
];

const app = require("express").Router();
const { render } = require("express/lib/response");
const UserDetails = require("../model/UserDetails");

const isSign = require("./signup");

app.get("/", (req, res) => {
  if (isSign.isSignUp) {
    return res.render("login", {
      isSignUp: true,
    });
  }
  res.render("login");
});

let getEmail;
let mailSent = false;

// handle delete request
// let isDeleted = false;
// app.get("/delete", async (req, res) => {
//   // show the popup
//   // let i = 0;
//   // while(i <= 1){
//   //   if(i == 0){
//   //     alert();
//   //   }
//   //   if(i == 1){

//   //   }
//   // }

//   const popups = require("popups");
//   popups.alert({
//     content: "Hello",
//   });
//   res.redirect('../')
// });

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await UserDetails.find({ email: email });
  if (email.length && password.length) {
    // sending this email to forgetpassword
    getEmail = email;
    // console.log(getEmail);
    // sending done
    if (userLogin.length) {
      if (password == userLogin[0].password1) {
        let userName;
        let about;
        let imgUrl;
        if (userLogin[0].gender == "Male") {
          let indexnumber = Math.floor(
            Math.random() * marvelCharactersMale.length
          );
          userName = marvelCharactersMale[indexnumber].name;
          about = marvelCharactersMale[indexnumber].about;
          imgUrl = marvelCharactersMale[indexnumber].imgUrl;
        } else if (userLogin[0].gender == "Female") {
          let indexnumber = Math.floor(
            Math.random() * marvelCharactersFemale.length
          );
          userName = marvelCharactersFemale[indexnumber].name;
          about = marvelCharactersFemale[indexnumber].about;
          imgUrl = marvelCharactersFemale[indexnumber].imgUrl;
        }
        res.render("profile", {
          name: userLogin[0].fullName,
          bio: userLogin[0].bio,
          userName: userName,
          about: about,
          imgUrl: imgUrl,
        });
      } else {
        res.render("login", {
          incorrectLogin: true,
        });
      }
    } else {
      res.render("login", {
        notRegistered: true,
      });
    }
  }
});
app.post("/forgetpassword", async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await UserDetails.find({ email: email });
  if (email.length && password.length) {
    // sending this email to forgetpassword
    getEmail = email;
    // console.log(getEmail);
    // sending done
    if (userLogin.length) {
      if (password == userLogin[0].password1) {
        let userName;
        let about;
        let imgUrl;
        if (userLogin[0].gender == "Male") {
          let indexnumber = Math.floor(
            Math.random() * marvelCharactersMale.length
          );
          userName = marvelCharactersMale[indexnumber].name;
          about = marvelCharactersMale[indexnumber].about;
          imgUrl = marvelCharactersMale[indexnumber].imgUrl;
        } else if (userLogin[0].gender == "Female") {
          let indexnumber = Math.floor(
            Math.random() * marvelCharactersFemale.length
          );
          userName = marvelCharactersFemale[indexnumber].name;
          about = marvelCharactersFemale[indexnumber].about;
          imgUrl = marvelCharactersFemale[indexnumber].imgUrl;
        }
        res.render("profile", {
          name: userLogin[0].fullName,
          bio: userLogin[0].bio,
          userName: userName,
          about: about,
          imgUrl: imgUrl,
        });
      } else {
        res.render("login", {
          incorrectLogin: true,
        });
      }
    } else {
      res.render("login", {
        notRegistered: true,
      });
    }
  }
});

const forgotPass = (mail, password) => {
  const nodeMailer = require("nodemailer");
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_ID,
      pass: process.env.PASSWORD,
    },
  });
  const composeMail = {
    from: "progsake@gmail.com",
    to: mail,
    subject: "Forgot your password?",
    text:
      "We heard you forgot your ProgSake password. Well, how irresponsible of you.\nPlease find your password below:\n\nYour password is " +
      password,
  };
  transporter.sendMail(composeMail, (err, info) => {
    if (err) console.log(err);
    else console.log("Forgot Password mail sent");
  });
};

app.get("/forgetpassword", async (req, res) => {
  const userDetails = await UserDetails.find({ email: getEmail });
  const password = userDetails[0].password1;
  forgotPass(getEmail, password);
  mailSent = true;
  res.status(200).render("login", {
    mailSent: true,
  });
});
module.exports = app;
