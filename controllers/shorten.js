const URLSchema = require("../models/url");
const Console = require("../helpers/console");
const urlGenerator = require("../helpers/urlGenerator");

const shortenView = (req, res) => {
  res.render("index");
};

const shortenPost = (req, res) => {
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
};

const shortenGet = (req, res) => {
  const id = req.params.id;

  URLSchema.findOne({ generated_url: id })
    .then((result) => {
      if (result) {
        res.redirect(result.url);
      }

      res.redirect("/");
    })
    .catch((err) => (err) => Console.errorLogger(err, req));
};

module.exports = {
  shortenView,
  shortenGet,
  shortenPost,
};
