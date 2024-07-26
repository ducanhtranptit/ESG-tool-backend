import express from 'express';
import upload from '../middlewares/uploads/uploadfile.middleware.js';
import UploadFileController from '../controllers/uploadfile.controller.js';

const router = express.Router();

router.post('/', upload.single('file'), UploadFileController.uploadFile);
router.get('/:filename', UploadFileController.getFile);

export default router;
