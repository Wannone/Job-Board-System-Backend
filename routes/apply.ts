import express from "express";
import { AuthenticateTokenApplier } from "../middlewares/auth-middleware";
import ApplyJobs from "../controllers/apply/apply_jobs";
import ShowApply from "../controllers/apply/show_apply";

const router = express.Router();

router.post('/:id', AuthenticateTokenApplier, ApplyJobs());
router.get('/', AuthenticateTokenApplier, ShowApply());

module.exports = router;