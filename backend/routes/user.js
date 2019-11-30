const express = require("express");
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

var hash;

router.post("/signup", (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);

  this.hash = bcrypt.hashSync(req.body.password, salt)
  const user = new User({
    email: req.body.email,
    password: this.hash
  });
  user.save()
    .then(result => {
      res.status(201).json({
        message: "User created",
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email }).then(user => {

    if (!user) {
      res.status(401).json({
        message: "Auth failed"
      });
    }
    fetchedUser = user;
    return bcrypt.compareSync(req.body.password, this.hash);
  })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        })
      }
      const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id }, "secret_this_should_be_longer");
      console.log(token)
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Auth failed"
      });
    });
});


module.exports = router;
