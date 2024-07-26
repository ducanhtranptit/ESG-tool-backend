import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, path.join(process.cwd(), "uploads"));
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({ storage });

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir);
}

export default upload;
