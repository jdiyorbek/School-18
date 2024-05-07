const router = require("express").Router();
const adminChecker = require("../middleware/adminChecker");
const {publishBook, getAll, getById, deleteById} = require("../Controllers/libraryController");
const analyst = require("../middleware/analyst")

router.post("/", adminChecker, publishBook)
router.get("/", getAll)
router.get("/:id", analyst, getById)
router.delete("/:id", adminChecker, deleteById)

module.exports = router