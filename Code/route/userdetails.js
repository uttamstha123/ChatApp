const router = require("express").Router();
const UserDetails = require("../model/UserDetails");
router.get("/", (req, res) => {
  res.render("userDetails");
});

router.post("/", async (req, res) => {
  const {password, confirm} = req.body;
  const userDetails = new UserDetails({
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
        return res.status(504).render("userDetails");
      } else {
        res.status(200).send(result);
      }
    });
  }
  else {
    res.render("userDetails", {
      fail: true
    })
  }

});
module.exports = router;
