const ErrorResponse = require("../helpers/errorResponse");
const jwt = require("jsonwebtoken");
const USER = require("../models/user.model");

exports.authSecurity = async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization;
  }
  if (token.startsWith("Bearer")) {
    token = token.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("The client didn't send the token", 400));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD);
    const usr = await USER.findOne({ username: decoded.username });
    req.user = usr;

    next();
  } catch (err) {
    return next(new ErrorResponse("Error in token process: " + err, 400));
  }
};
