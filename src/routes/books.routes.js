const { Router } = require("express");
const router = Router();

const { authSecurity } = require("../middlewares/auth-security");
const {
  getBooks,
  postBook,
  getBook,
  putBook,
  deleteBook,
  pagination
} = require("../controllers/books.controller");

router
    .route('/')
    .get(authSecurity, getBooks)
    .post(authSecurity, postBook)
;

router
    .route('/:id')
    .get(authSecurity, getBook)
    .put(authSecurity, putBook)
    .delete(authSecurity, deleteBook)
;
router
    .route("/pagination")
    .post(authSecurity, pagination)
;
module.exports = router;
