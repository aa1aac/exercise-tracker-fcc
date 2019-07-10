const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));

const postUser = (req, res, next) => {
  console.log(req.body.username);
};

// route handeling
app.get("/", (req, res, next) => {
  res.sendFile("index.html");
});

app.post("/api/exercise/new-user", postUser);

const port = 3000;

app.listen(port, () => console.log(`deployed on port ${port}`));
