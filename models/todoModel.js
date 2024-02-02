const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: { type: String },
  isCompleted: { Type: Boolean },
  window: { type: String }
});

const Todo = mongoose.model("todo", todoSchema);

module.exports = { Todo };
