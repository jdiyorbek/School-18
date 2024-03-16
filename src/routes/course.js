const router = require("express").Router()
const adminChecker = require("../middleware/adminChecker")
const { create, getALl, getById, updateById, deleteById} = require("../Controllers/courseController");

router.post("/", adminChecker, create)
router.get("/", getALl)
router.get("/:id", getById)
router.put("/:id", adminChecker, updateById)
router.delete("/:id", adminChecker, deleteById)

module.exports = router