const express = require("express");
const urlShortenController = require("../controllers/api");

const router = express.Router();

router.post("/", urlShortenController.shortenApiPost);
router.get("/:id", urlShortenController.shortenApiGet);

module.exports = router;
