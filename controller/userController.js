const unique = require("uniqid");

const User = require("../model/userModel");
const Data = require("../model/dataModel");

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
        res.json({ username: result.username, id: user.id });
      });
    }
  });
};

exports.postData = (req, res, next) => {
  const userId = req.body.userId;
  const description = req.body.description;
  const date = req.body.date;
  const durations = req.body.durations;

  User.findOne({ id: userId }).then(result => {
    if (result) {
      const data = new Data({
        id: userId,
        description,
        date,
        durations,
        username: result.username
      });

      data.save().then(result => {
        res.json({
          id: result.id,
          description: result.description,
          date: result.date,
          durations: result.durations,
          username: result.username
        });
      });
    }
  });
};

exports.getLog = (req, res, next) => {
  const userId = req.query.userId;
  const from = new Date(req.query.from || null);
  let to;
  if (req.query.to) {
    to = new Date(req.query.to);
  } else {
    to = new Date();
  }

  const limit = Number(req.query.limit) || null;
  let dataSet = [];

  if (userId) {
    User.findOne({ id: userId }).then(result => {
      if (result) {
        Data.find({
          id: userId,
          username: result.username,
          date: { $gt: from, $lt: to }
        })
          .limit(limit)
          .then(result => {
            return result.forEach(value => {
              dataSet.push({
                duration: value.durations,
                date: value.date,
                description: value.description
              });
            });
          })
          .then(() => {
            res.json(dataSet);
          });
      }
    });
  }
};
