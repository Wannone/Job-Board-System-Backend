import express from "express";
import GetAllJobs from "../controllers/jobs/get_all";
import GetJobsById from "../controllers/jobs/get_by_id";
import CreateJobs from "../controllers/jobs/create";
import UpdateJobs from "../controllers/jobs/update";
import DeleteJobs from "../controllers/jobs/delete";
import SearchJobs from "../controllers/jobs/search";
import { AuthenticateTokenApplier, AuthenticateTokenRecruiters } from "../middlewares/auth-middleware";

const router = express.Router();

router.get("/search", AuthenticateTokenApplier, SearchJobs());
router.get("/:id", AuthenticateTokenApplier, GetJobsById());
router.get("/", AuthenticateTokenApplier, GetAllJobs());
router.post("/", AuthenticateTokenRecruiters, CreateJobs());
router.put("/:id", AuthenticateTokenRecruiters, UpdateJobs());
router.delete("/:id", AuthenticateTokenRecruiters, DeleteJobs());

module.exports = router;
