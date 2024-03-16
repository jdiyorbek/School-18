const router = require("express").Router();
const adminChecker = require("../middleware/adminChecker");
const {publishBook, getAll, getById, deleteById} = require("../Controllers/libraryController");

router.post("/", adminChecker, publishBook)
router.get("/", adminChecker, getAll)
router.get("/:id", adminChecker, getById)
router.delete("/:id", adminChecker, deleteById)

module.exports = router