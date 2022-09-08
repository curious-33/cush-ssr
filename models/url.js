const mongoose = require("mongoose");
const timzone = require("../helpers/timezone");

const Schema = mongoose.Schema;

const urlSchema = new Schema({
  url: { type: String, required: true },
  generated_url: { type: String, required: true },
  created_at: { type: Date, default: timzone },
  updated_at: { type: Date, default: timzone },
});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
