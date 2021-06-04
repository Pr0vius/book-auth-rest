const Author = require("../models/author.schema");
const ErrorResponse = require("../helpers/errorResponse");
//POST
exports.createAuthor = async (req, res, next) => {
  try {
    const authorData = await Author.create(req.body);
    res.status(200).json({
      status: 200,
      data: authorData,
    });
  } catch (err) {
    next(
      new ErrorResponse("Error: Can't create author now: " + err.message, 500),
    );
  }
};
//GET
exports.getAuthors = async (req, res, next) => {
  try {
    const authorList = await Author.find();
    res.status(200).json( authorList );
  } catch (err) {
    next(
      new ErrorResponse("Error: Can't find authors now: " + err.message, 500),
    );
  }
};
//GET BY ID
exports.getAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      return next(
        new ErrorResponse("Author Not Fount ID: " + req.params.id, 404),
      );
    }
    res.status(200).json({ author });
  } catch (err) {
    next(
      new ErrorResponse(
        "Author Not Fount ID: " +req.params.id +", please write a correct Author ID",
        404,
      ),
    );
  }
};
//PUT
exports.putAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body);
    if (!author) {
      return next(
        new ErrorResponse("Author Not Fount ID: " + req.params.id, 404),
      );
    }
    res.status(200).json({ author });
  } catch (err) {
    next(new ErrorResponse("Author Not Fount ID: " + req.params.id, 404));
  }
};
//DELETE
exports.deleteAuthor = async (req, res, next) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return next(
        new ErrorResponse("Author Not Fount ID: " + req.params.id, 404),
      );
    }
    res.status(200).json({ author });
  } catch (err) {
    next(new ErrorResponse("Author Not Fount ID: " + req.params.id, 404));
  }
};
