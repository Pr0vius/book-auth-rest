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
  img: {
    type: String,
    match: [
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
      "Debe ser la url de una imagen",
    ],
    required: [true, "Ingrese una url para la imagen"],
  },
});

module.exports = model("books", bookSchema);
