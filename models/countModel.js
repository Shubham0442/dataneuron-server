const mongoose = require("mongoose");

const countSchema = mongoose.Schema({
  count: { type: Number },
  window: { type: String }
});

const Count = mongoose.model("count", countSchema);

module.exports = { Count };
