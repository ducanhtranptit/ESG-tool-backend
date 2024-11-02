import express from "express";

//Upload Router
import UploadRouter from "./upload/upload.api.js";

//Auth Router
import AuthRouter from "./auth/auth.api.js";
import UserRouter from "./auth/user.api.js";

//Webapp Router
import ESGReportRouter from "./webapp/esg-report.api.js";
import QuestionRouter from "./webapp/question.api.js";
import EnvironmentRouter from "./webapp/environment.api.js";
import SocialRouter from "./webapp/social.api.js";
import GovernanceRouter from "./webapp/governance.api.js";
import DashboardRouter from "./webapp/dashboard.api.js";
import CompanyInforRouter from "./webapp/companyinfor.api.js";

const router = express.Router();

router.use("/", UploadRouter);

router.use("/", AuthRouter);
router.use("/", UserRouter);

router.use("/", ESGReportRouter);
router.use("/", QuestionRouter);
router.use("/", EnvironmentRouter);
router.use("/", SocialRouter);
router.use("/", GovernanceRouter);
router.use("/", DashboardRouter);
router.use("/", CompanyInforRouter);

export default router;
