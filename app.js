const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

const Console = require("./helpers/console");
const urlGenerator = require("./helpers/urlGenerator");
const URLSchema = require("./models/url");

const app = express();
const PORT = 8080;

urlGenerator("hello");

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

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

const logPath = path.join(__dirname, "logs", "request.log");
const accessLogStream = fs.createWriteStream(logPath, { flags: "a" });
app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const url = req.body.url;
  if (url) {
    URLSchema.find()
      .then((result) => {
        const existingUrls = result.map((obj) => obj.generated_url);
        const generateUrl = urlGenerator(url, existingUrls);
        const newGeneratedUrl = new URLSchema({
          url: req.body.url,
          generated_url: generateUrl,
        });

        if (generateUrl) {
          newGeneratedUrl
            .save()
            .then((result) => res.json({ generated_url: result.generated_url }))
            .catch((err) =>
              res.status(500).json({ error: "Something went wrong" })
            );
        }
      })
      .catch((err) => Console.errorLogger(err, req));
  }
});

app.get("/redirect/:id", (req, res) => {
  const id = req.params.id;

  URLSchema.findOne({ generated_url: id })
    .then((result) => {
      if (result) {
        res.redirect(result.url);
      }

      res.redirect("/");
    })
    .catch((err) => (err) => Console.errorLogger(err, req));
});

app.use((req, res) => {
  res.status(404).render("404");
});
