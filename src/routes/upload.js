const router = require("express").Router();
const adminChecker = require("../middleware/adminChecker");
const { uploadImage, uploadPDF} = require("../Controllers/uploadController");
const multer = require("multer")

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/image", upload.single("image"), adminChecker, uploadImage);
router.post("/book", upload.single("book"), adminChecker, uploadPDF);

module.exports = router;