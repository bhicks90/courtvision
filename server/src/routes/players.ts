import { Router } from 'express';
import { fetchPlayers, fetchPlayerById } from '../apiClients/ballDontLie';

const router = Router();

router.get('/', async (req, res) => {
    const perPage = Number(req.query.per_page) || 10;
    const search = String(req.query.search || '');

    try {
        const playersData = await fetchPlayers(perPage, search);

        res.json(playersData);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    if (!id) return res.status(400).json({ error: 'Invalid player ID' });

    try {
        const player = await fetchPlayerById(id);

        res.json(player);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
