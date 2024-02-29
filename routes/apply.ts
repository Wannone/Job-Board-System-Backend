import express from "express";
import { authLevelApplier } from "../middlewares/auth-middleware";
import { ApplyController } from "../controllers/apply_controller";

const router = express.Router();

router.post('/:id', authLevelApplier, ApplyController.create);
router.get('/', authLevelApplier, ApplyController.get);

module.exports = router;