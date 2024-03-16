const router = require("express").Router();
const adminChecker = require("../middleware/adminChecker");
const {create, getAll, updateById, deleteById} = require("../Controllers/eventController");

router.post("/", adminChecker, create);
router.get("/", getAll);
router.put("/:id", adminChecker, updateById);
router.delete("/:id", adminChecker, deleteById);

module.exports = router;