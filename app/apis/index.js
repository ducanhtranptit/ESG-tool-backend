import express from "express";

//Upload Router
import UploadRouter from "./upload/upload.api.js";

//Auth Router
import AuthRouter from "./auth/auth.api.js";
import UserRouter from "./auth/user.api.js";

//Webapp Router
import WebappESGReportRouter from "./webapp/esg-report.api.js";
import WebappQuestionRouter from "./webapp/question.api.js";
import WebappEnvironmentRouter from "./webapp/environment.api.js";
import WebappSocialRouter from "./webapp/social.api.js";
import WebappGovernanceRouter from "./webapp/governance.api.js";
import WebappDashboardRouter from "./webapp/dashboard.api.js";
import WebappCompanyInforRouter from "./webapp/companyinfor.api.js";
import WebappReportRouter from "./webapp/report.api.js";
import WebappTargetRouter from "./webapp/target.api.js";

//Admin Router
import AdminUserRouter from "./admin/user.api.js";
import AdminQuestionRouter from "./admin/question.api.js";

const router = express.Router();

router.use("/", UploadRouter);

router.use("/", AuthRouter);
router.use("/", UserRouter);

router.use("/", WebappESGReportRouter);
router.use("/", WebappQuestionRouter);
router.use("/", WebappEnvironmentRouter);
router.use("/", WebappSocialRouter);
router.use("/", WebappGovernanceRouter);
router.use("/", WebappDashboardRouter);
router.use("/", WebappCompanyInforRouter);
router.use("/", WebappReportRouter);
router.use("/", WebappTargetRouter);

router.use("/", AdminUserRouter);
router.use("/", AdminQuestionRouter);

export default router;
