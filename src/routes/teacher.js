const router = require("express").Router();
const adminChecker = require("../middleware/adminChecker")
const {addTeacher, getAll, deleteById, updateById} = require("../Controllers/teacherController");

router.post("/", adminChecker, addTeacher)
router.get("/", adminChecker, getAll)
router.put("/:id", adminChecker, updateById)
router.delete("/:id", adminChecker, deleteById)

module.exports = router;