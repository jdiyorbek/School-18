const router = require("express").Router();
const adminChecker = require("../middleware/adminChecker");
const { uploadImage, uploadFile} = require("../Controllers/uploadController");
const multer = require("multer")

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/image", upload.single("image"), adminChecker, uploadImage);
router.post("/file", upload.single("book"), adminChecker, uploadFile);

module.exports = router;