import express from 'express';

import { fetchProjects, createProject } from '../controllers/projects.js'; 
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', fetchProjects);
router.post('/', createProject);

export default router;