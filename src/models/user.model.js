const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Firstname field is required"],
    match: [
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      "Min:2 Max:16. Special Symbols are not allowed",
    ],
  },
  lastname: {
    type: String,
    required: [true, "Lastname field is required"],
    match: [
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/,
      "Min:2 Max:16. Special Symbols are not allowed",
    ],
  },
  username: {
    type: String,
    required: [true, "Username field is required"],
    match: [
      /^[a-z0-9_-]{5,16}$/,
      "Min:5 Max:16. Special Symbols are not allowed",
    ],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    unique: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please, enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
  },
});

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ username: this.username }, process.env.JWT_SECRET_WORD, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.validatePW = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};
module.exports = model("users", UserSchema);
