const { Router } = require("express");
const { authSecurity } = require("../middlewares/auth-security");
const router = Router();

const { userRegister, userLogin, getUser } = require("../controllers/user.controller");

router.get("/", authSecurity, getUser);
router.post("/singin", userLogin);
router.post("/singup", userRegister);

module.exports = router;