const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  title: {
    type: String,
    required: [true, "Ingrese un titulo"],
    maxlength: [200, "Maximo 200 caracteres"],
  },
  description: String,
  price: Number,
  author: { id: String, fullName: String },
  publishedAt: Date,
});

module.exports = model("books", bookSchema);
