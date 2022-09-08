const URLSchema = require("../models/url");
const Console = require("../helpers/console");
const urlGenerator = require("../helpers/urlGenerator");

const mapData = (result) => ({
  id: result._id,
  url: result.url,
  generated_url: result.generated_url,
  created_at: result.created_at,
  updated_at: result.updated_at,
});

const shortenApiPost = (req, res) => {
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
            .then((result) => res.status(201).json(mapData(result)))
            .catch((err) =>
              res.status(500).json({ error: "Something went wrong" })
            );
        }
      })
      .catch((err) => Console.errorLogger(err, req));
  }
};

const shortenApiGet = (req, res) => {
  const id = req.params.id;

  URLSchema.findOne({ generated_url: id })
    .then((result) => {
      res.json(mapData(result));
    })
    .catch((err) => (err) => Console.errorLogger(err, req));
};

module.exports = {
  shortenApiGet,
  shortenApiPost,
};
