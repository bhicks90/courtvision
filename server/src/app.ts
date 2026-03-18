import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import balldontlieRouter from './routes/balldontlieRouter';
import { seedPlayers } from './seed/seedPlayers';
import { seedTeams } from './seed/seedTeams';

const app = express();

app.use(cors());
app.use(express.json());

// Use the unified balldontlie router
app.use('/api', balldontlieRouter);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = 5001;
const HOST = '0.0.0.0';

(async () => { await seedTeams(); })();
(async () => { await seedPlayers(); })();

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});