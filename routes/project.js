import express from 'express';

import { fetchProjects, createProject, invest } from '../controllers/projects.js'; 
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', fetchProjects);
router.post('/', createProject);
router.patch('/:id/invest', auth, invest)


export default router;