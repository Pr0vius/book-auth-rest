const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  firstname: String,
  lastname: String,
});

module.exports = model("authors", authorSchema);
