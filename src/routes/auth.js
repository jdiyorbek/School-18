const router = require("express").Router()
const { login } = require("../Controllers/authController")
const adminChecker = require("../middleware/adminChecker")

router.get("/login", login)

module.exports = router