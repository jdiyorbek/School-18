const { getByView } = require("../Controllers/analyticsController")

const router = require("express").Router()

router.get("/views", getByView)
router.get("/region")

module.exports = router