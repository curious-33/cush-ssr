const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Console = require("./helpers/console");
const urlShortenRoutes = require("./routes/shorten");
const urlShortenApiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 8080;

const dbURI =
  "mongodb+srv://curious:cush@cluster0.winwmn8.mongodb.net/cush?retryWrites=true&w=majority";

mongoose
  .connect(dbURI)
  .then((res) => {
    app.listen(PORT, (err) => {
      if (err) Console.errorLogger(err);
      console.log("Server's listening port:", PORT);
    });
  })
  .catch((err) => Console.errorLogger(err));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

if (fs.existsSync("./logs")) {
  const logPath = path.join(__dirname, "logs", "request.log");
  const accessLogStream = fs.createWriteStream(logPath, { flags: "a" });
  app.use(morgan("combined", { stream: accessLogStream }));
} else {
  fs.mkdirSync("logs", { recursive: true });
}

// console.log(require("luxon").DateTime.local())
app.use(urlShortenRoutes);
app.use("/api/v1/shorten", urlShortenApiRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});
