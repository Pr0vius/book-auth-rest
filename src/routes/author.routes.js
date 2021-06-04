const { Router } = require("express");
const { authSecurity } = require("../middlewares/auth-security");
const router = Router();

const {
  createAuthor,
  getAuthors,
  getAuthor,
  putAuthor,
  deleteAuthor
} = require("../controllers/author.controller");

router
    .route("/")
    .get(authSecurity, getAuthors)
    .post(authSecurity, createAuthor)
;
router
    .route("/:id")
    .get(authSecurity, getAuthor)
    .put(authSecurity, putAuthor)
    .delete(authSecurity, deleteAuthor)
;


module.exports = router;
