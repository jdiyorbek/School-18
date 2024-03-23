const router = require("express").Router()
const adminChecker = require("../middleware/adminChecker")
const {create, getById, getAll, updateById, deleteById} = require("../Controllers/additionalLessonController");

router.post("/", adminChecker, create)
router.get("/", getAll)
router.get("/:id", getById)
router.put("/:id", adminChecker, updateById)
router.delete("/:id", adminChecker, deleteById)

module.exports = router