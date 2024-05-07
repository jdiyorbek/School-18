const { getByView, getByRegion } = require("../Controllers/analyticsController")
const adminChecker = require("../middleware/adminChecker")
const router = require("express").Router()

router.get("/views", adminChecker, getByView)
router.get("/region", adminChecker, getByRegion)

module.exports = router