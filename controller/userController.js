const unique = require("uniqid");

const User = require("../model/userModel");

exports.postUser = (req, res, next) => {
  const username = req.body.username;
  User.findOne({ username: username }).then(result => {
    if (result) {
      res.json("The user already exists. Please try another username");
    }
    if (!result) {
      const id = unique();
      const user = new User({ username, id });
      user.save().then(result => {
        console.log(result);
        res.json({ username: result.username, id: user.id });
      });
    }
  });
};
