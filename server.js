const express = require("express");
const bodyParser = require("body-parser");

const tweet = require("./routes/tweet");

const app = express();

const cors = require("cors")

port = process.env.PORT || 4000

//middleware
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "base route response" });
});

app.use("/api/tweet/", tweet);

app.listen(port, (req, res) => {
  console.log(`Server Started at ${port}`);
});
