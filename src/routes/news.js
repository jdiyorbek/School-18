const router = require("express").Router();
const { create, getAll, getById, updateById, deleteById, getByIdForAdmin } = require("../Controllers/newsController.js");
const adminChecker = require("../middleware/adminChecker")

router.post("/", adminChecker, create)
router.get("/", getAll)
router.get("/for-admin", adminChecker, getByIdForAdmin)
router.get("/:id", getById)
router.put("/:id", adminChecker, updateById)
router.delete("/:id", adminChecker, deleteById)

module.exports = router