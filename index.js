const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userController = require("./controller/userController");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// route handeling
app.get("/", (req, res, next) => {
  res.sendFile("index.html");
});

app.post("/api/exercise/new-user", userController.postUser);

app.post("/api/exercise/add", userController.postData);

app.get("/api/exercise/log", userController.getLog);

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => {
  app.listen(port, () => console.log(`deployed on port ${port}`));
});
