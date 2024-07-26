const express = require("express");
const upload = require("../middlewares/uploads/uploadfile.middleware.js");
const UploadFileController = require("../controllers/uploadfile.controller.js");

const router = express.Router();

router.post("/", upload.single("file"), UploadFileController.uploadFile);
router.get("/:filename", UploadFileController.getFile);

module.exports = router;
