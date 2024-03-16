const router = require("express").Router();
const { create, getAll, getById, updateById, deleteById } = require("../Controllers/newsController.js");
const adminChecker = require("../middleware/adminChecker")

router.post("/", adminChecker, create)
router.get("/", adminChecker, getAll)
router.get("/:id", adminChecker, getById)
router.put("/:id", adminChecker, updateById)
router.delete("/:id", adminChecker, deleteById)

module.exports = router