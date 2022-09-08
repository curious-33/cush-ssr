const { DateTime } = require("luxon");

const defaultTimeZone = DateTime.local().setZone("Asia/Karachi");

module.exports = defaultTimeZone;
