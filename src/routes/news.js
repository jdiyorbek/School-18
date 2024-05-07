const router = require("express").Router();
const { create, getAll, getById, updateById, deleteById, getByIdForAdmin } = require("../Controllers/newsController.js");
const adminChecker = require("../middleware/adminChecker")
const analyst = require("../middleware/analyst")

router.post("/", adminChecker, create)
router.get("/", getAll)
router.get("/for-admin/:id", adminChecker, getByIdForAdmin)
router.get("/:id", analyst, getById)
router.put("/:id", adminChecker, updateById)
router.delete("/:id", adminChecker, deleteById)

module.exports = router