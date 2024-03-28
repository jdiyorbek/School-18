const router = require("express").Router()
const { profile, updateUsername, updatePassword} = require("../Controllers/adminController")
const adminChecker = require("../middleware/adminChecker")

router.get("/profile", adminChecker, profile)
router.put("/settings/change-username", adminChecker, updateUsername)
router.put("/settings/change-password", adminChecker, updatePassword)

module.exports = router