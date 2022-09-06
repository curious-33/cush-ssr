const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const logPath = path.join(__dirname, "logs", "request.log");
const accessLogStream = fs.createWriteStream(logPath, { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
  res.sendFile("./views/index.html", { root: __dirname });
});

app.post("/shorten", (req, res) => {
  const newUrl = req.body;
  console.log("post request", newUrl);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log("Server's listening port:", PORT);
});
