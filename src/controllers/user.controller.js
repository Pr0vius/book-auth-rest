const ErrorResponse = require("../helpers/errorResponse");
const USER = require("../models/user.model");

exports.userRegister = async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    const usr = await USER.create({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    const token = usr.createJWT();

    res.status(200).json({
      status: 200,
      id: usr._id,
      firstname,
      lastname,
      username,
      email,
      token: token,
    });
  } catch (err) {
    next(new ErrorResponse("Error on Response: " + err, 400));
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorResponse("Complete email and password field", 400));
    }

    const user = await USER.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("This user doesn't exist", 400));
    }

    const pwBool = await user.validatePW(password);

    if (!pwBool) {
      return next(new ErrorResponse("This user doesn't exist", 400));
    }

    const token = user.createJWT();

    res.status(200).json({
      status: 200,
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      token: token,
    });
  } catch (err) {
    next(new ErrorResponse("Error on Response: " + err, 400));
  }
};

exports.getUser = async(req, res, next) => {
  try {
    const userToken = req.user;
    const token = await userToken.createJWT();

    res.status(200).json({
      status: 200,
      id: userToken._id,
      firstname: userToken.firstname,
      lastname: userToken.lastname,
      username: userToken.username,
      email: userToken.email,
      token: token,
    });
  } catch (err) {
    next(new ErrorResponse("Error on Response: " + err, 400));
  }
};
