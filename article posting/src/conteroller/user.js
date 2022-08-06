const { auth } = require("../middlewere/auth");
const bcrypt = require("bcrypt");
const signup = require("../module/user");
const validator = require("email-validator");
const { default: mongoose } = require("mongoose");
let isMatch = "";

//sign up router.....
const register = async (req, res) => {
  try {
    let haspass = "";
    haspass = await bcrypt.hash(req.body.password, 10);
    let data = new signup({ email: req.body.email, password: haspass });
    let result = "";

    if (req.body.email == null) {
      res.status(400).json("please enter email");
    } else if (validator.validate(req.body.email) == false) {
      res.status(400).json("please enter valid email");
    } else if (req.body.password == null) {
      res.status(400).json("please enter password");
    } else {
      result = await data
        .save()
        .then((result) => res.status(201).json("sign up done..."))
        .catch((err) =>
          res.status(400).json("ERROR:" + "email is already exit...")
        );
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

//sign in router...
const login = async (req, res) => {
  try {
    let data = await signup.find({
      email: req.body.email,
    });
    if (data.length != 0) {
      isMatch = await bcrypt.compare(req.body.password, data[0].password);
    }

    if (req.body.email == null) {
      res.status(400).status(202).send("please enter email..");
    } else if (validator.validate(req.body.email) == false) {
      res.status(400).status.send("please enter valid email");
    } else if (req.body.password == null) {
      res.status(400).send("please enter password..");
    } else if (data.length != 0) {
      if (isMatch == true)
        res.status(200).json({
          login: "successfully login... ",
          Token: auth(req.body.email, req.body.password),
        });
      else res.status(400).send("Wrong Credentials..");
    } else if (data.length == 0) {
      res.status(400).send("Wrong Credentials..");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { register, login };
