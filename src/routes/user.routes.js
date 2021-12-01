const { Router } = require("express");
const { authSecurity } = require("../middlewares/auth-security");
const router = Router();

const { userRegister, userLogin, getUser } = require("../controllers/user.controller");

router.get("/", authSecurity, getUser);
router.post("/login", userLogin);
router.post("/register", userRegister);

module.exports = router;