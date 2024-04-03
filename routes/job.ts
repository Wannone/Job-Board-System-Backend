import express from "express";
import { authLevelApplier, authLevelRecruiter } from "../middlewares/auth-middleware";
import { JobsController } from "../controllers/jobs_controller";

const router = express.Router();


router.get("/search", authLevelApplier, JobsController.search );
router.get("/getByRec", authLevelApplier, JobsController.getByRecId);
router.get("/:id", authLevelRecruiter, JobsController.getById);
router.get("/",  authLevelApplier, JobsController.getAll);
router.post("/", authLevelRecruiter, JobsController.create);
router.put("/:id", authLevelRecruiter, JobsController.update);
router.delete("/:id", authLevelRecruiter, JobsController.delete);

module.exports = router;
