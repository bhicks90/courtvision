import { Router } from 'express';
import * as balldontlieController from '../controllers/balldontlieController';

const router = Router();

// Players endpoints
router.get('/players', balldontlieController.getPlayers);
router.get('/players/:id', balldontlieController.getPlayerById);

// Teams endpoints
router.get('/teams', balldontlieController.getTeams);
router.get('/teams/:id', balldontlieController.getTeamById);

export default router;