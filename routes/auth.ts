import express from 'express';
import RegisterApplicants from '../controllers/auth/register_applicants';
import RegisterRecruiters from '../controllers/auth/register_recruiters';
import LoginUser from '../controllers/auth/login';

const router = express.Router();

router.post('/registerApplicants', RegisterApplicants());
router.post('/registerRecruiters', RegisterRecruiters());
router.post('/login', LoginUser());

module.exports = router;