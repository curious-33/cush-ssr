const express = require("express");
const urlShortenController = require("../controllers/shorten");

const router = express.Router();

router.get("/", urlShortenController.shortenView);
router.post("/", urlShortenController.shortenPost);
router.get("/:id", urlShortenController.shortenGet);

module.exports = router;
