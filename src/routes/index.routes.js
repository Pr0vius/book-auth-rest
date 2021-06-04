const { Router } = require("express");
const router = Router();
const { getIndex } = require("../controllers/index.controller");

router
    .route("/")
    .get(getIndex);
module.exports = router;
