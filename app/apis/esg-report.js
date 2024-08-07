import express from "express";
import EsgReportController from "../controllers/esg-report.controller.js";

const router = express.Router();

router.get("/", EsgReportController.calculateESGReport);

export default router;
