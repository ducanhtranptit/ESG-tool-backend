const path = require("path");

class UploadFileController {
	uploadFile(req, res) {
		if (!req.file) {
			return res.status(400).send("No file uploaded.");
		}
		res.send({
			fileName: req.file.filename,
			filePath: `/uploads/${req.file.filename}`,
		});
	}

	getFile(req, res) {
		const filename = req.params.filename;
		const filepath = path.join(__dirname, "../../uploads", filename);
		res.sendFile(filepath);
	}
}

module.exports = new UploadFileController();
