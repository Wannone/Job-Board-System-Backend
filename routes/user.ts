import express from 'express';
import { UserController } from '../controllers/user_controller';

const router = express.Router();

router.post('/registerApplicants', UserController.registerApplicants);
router.post('/registerRecruiters', UserController.registerRecruiters);
router.post('/login', UserController.login);

module.exports = router;