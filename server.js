const express = require("express");
const bodyParser = require("body-parser");

const tweet = require("./routes/tweet");

const app = express();

const cors = require("cors")

//middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "base route response" });
});

app.use("/api/tweet/", tweet);

app.listen(4000, (req, res) => {
  console.log(`Server Started at http://localhost:4000`);
});
