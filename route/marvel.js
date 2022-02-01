let marvelCharactersMale = [
  {
    name: "Captain America",
    imgUrl: "/male/captain-america.jpg",
    about:
      "Recipient of the Super Soldier serum, World War II hero Steve Rogers fights for American ideals as one of the world’s mightiest heroes and the leader of the Avengers.",
  },
  {
    name: "Iron Man",
    imgUrl: "/male/iron-man.jpg",
    about:
      "Genius. Billionaire. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man. ",
  },
  {
    name: "Thor Odinson",
    imgUrl: "/male/thor.jpg",
    about:
      "The son of Odin uses his mighty abilities as the God of Thunder to protect his home Asgard and planet Earth alike.",
  },
  {
    name: "SuperMan",
    imgUrl: "/male/super-man.jpg",
    about:
      "Exposed to heavy doses of gamma radiation, scientist Bruce Banner transforms into the mean, green rage machine called the Hulk.",
  },
  {
    name: "BatMan",
    imgUrl: "/male/batman.jpg",
    about:
      "An expert marksman and fighter, Clint Barton puts his talents to good use by working for S.H.I.E.L.D. as a special agent. The archer known as Hawkeye also boasts a strong moral compass that at times leads him astray from his direct orders.",
  },
  {
    name: "Doctor Strange",
    imgUrl: "/male/doctor-strange.jpg",
    about:
      "Once a highly successful, yet notably egotistical, surgeon, Doctor Stephen Strange endured a terrible accident that led him to evolve in ways he could have never foreseen.",
  },
];

let marvelCharactersFemale = [
  {
    name: "Captain Marvel",
    imgUrl: "/female/captain-marvel.jpg",
    about:
      "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races.",
  },
  {
    name: "Hela",
    imgUrl: "/female/hela.jpg",
    about:
      "A deadly assassin is closing in on Natasha Romanoff. Now Natasha must reunite with an unlikely group of spies from her past in order to survive and stop a lethal force from being unleashed on the world.",
  },
  {
    name: "Wanda",
    imgUrl: "/female/wanda.jpg",
    about:
      "Notably powerful, Wanda Maximoff has fought both against and with the Avengers, attempting to hone her abilities and do what she believes is right to help the world.",
  },
  {
    name: "Black Widow",
    imgUrl: "/female/black-widow.jpg",
    about:
      "Notably powerful, Wanda Maximoff has fought both against and with the Avengers, attempting to hone her abilities and do what she believes is right to help the world.",
  },
  {
    name: "Super Girl",
    imgUrl: "/female/super-girl.jpg",
    about:
      "Notably powerful, Wanda Maximoff has fought both against and with the Avengers, attempting to hone her abilities and do what she believes is right to help the world.",
  },
  {
    name: "Wonder Woman",
    imgUrl: "/female/wonder-woman.jpg",
    about:
      "Notably powerful, Wanda Maximoff has fought both against and with the Avengers, attempting to hone her abilities and do what she believes is right to help the world.",
  },
];

const app = require("express").Router();
const UserDetails = require("../model/UserDetails");

app.post("/", async (req, res) => {
  const { email, password } = req.body;
  const userLogin = await UserDetails.find({ email: email });
  if (email.length && password.length) {
    if (userLogin.length) {
      if (password == userLogin[0].password1) {
        let userName;
        let about;
        let imgUrl;
        if (userLogin[0].gender == "Male") {
          let indexnumber = Math.floor(Math.random() * marvelCharactersMale.length);
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

module.exports = app;
