import express from 'express';
import upload from '../../middlewares/uploads/uploadfile.middleware.js';
import UploadFileController from '../../controllers/uploadfile.controller.js';

const router = express.Router();

router.post('/upload', upload.single('file'), UploadFileController.uploadFile);
router.get('/upload/:filename', UploadFileController.getFile);

export default router;
