const ErrorResponse = require("../helpers/errorResponse");
const BOOK = require("../models/books.schema");

//GET
exports.getBooks = async (req, res, next) => {
  try {
    const books = await BOOK.find();
    res.status(200).json({ books });
  } catch (err) {
    next(new ErrorResponse("Can't find book list" + err.message, 400));
  }
};
//POST
exports.postBook = async (req, res, next) => {
  try {
    const bookData = await BOOK.create(req.body);
    res.status(200).json({
      status: 200,
      data: bookData,
    });
  } catch (err) {
    next(
      new ErrorResponse("Error: Can't create the book now: " + err.message, 500)
    );
  }
};
//GET BY ID
exports.getBook = async (req, res, next) => {
  try {
    const book = await BOOK.findById(req.params.id);
    if (!book) {
      return next(
        new ErrorResponse("Book Not Fount ID: " + req.params.id, 404)
      );
    }
    res.status(200).json({
      status: 200,
      data: book,
    });
  } catch (err) {
    next(new ErrorResponse("Can't find book list" + err.message, 400));
  }
};
//PUT
exports.putBook = async (req, res, next) => {
  try {
    const book = await BOOK.findByIdAndUpdate(req.params.id, req.body);
    if (!book) {
      return next(
        new ErrorResponse("Book Not Fount ID: " + req.params.id, 404)
      );
    }
    res.status(200).json({ status: 200, data: book });
  } catch (err) {
    next(new ErrorResponse("Book Not Fount ID: " + req.params.id, 404));
  }
};
//DELETE
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await BOOK.findByIdAndDelete(req.params.id);
    if (!book) {
      return next(
        new ErrorResponse("Book Not Fount ID: " + req.params.id, 404)
      );
    }
    res.status(200).json({ status: 200, data: book });
  } catch (err) {
    next(new ErrorResponse("Book Not Fount ID: " + req.params.id, 404));
  }
};

//PAGINATION
exports.pagination = async (req, res, next) => {
  try {
    const sort = req.body.sort;
    const sortDirection = req.body.sortDirection;
    const page = parseInt(req.body.page);
    const pageSize = parseInt(req.body.pageSize);

    let FilterValue = "";
    let filterProp = "";
    let Books = [];

    let totalRows = 0;
    let pagesQuantity = Math.ceil(totalRows / pageSize);
    //filterValue = {value:"", property=""}

    //LOGIC
    if (req.body.filterValue) {
      filterProp = req.body.filterValue.property;
      FilterValue = req.body.filterValue.value;

      Books = await BOOK.find({
        [filterProp]: new RegExp(FilterValue, "i"),
      })
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);

      totalRows = await BOOK.find({
        [filterProp]: new RegExp(FilterValue, "i"),
      }).count();
      console.log(totalRows);
    } else {
      Books = await BOOK.find()
        .sort({ [sort]: sortDirection })
        .skip((page - 1) * pageSize)
        .limit(pageSize);
      totalRows = await BOOK.find().count();
    }

    res.status(200).json({
      status: 200,
      pageSize,
      page,
      sort,
      sortDirection,
      //filterValue,
      pagesQuantity,
      totalRows,
      data: Books,
    });
  } catch {
    next(
      new ErrorResponse("Couldn't procces the request: " + req.params.id, 404)
    );
  }
};
