import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import playersRouter from './routes/players';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/players', playersRouter);

app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

const PORT = 5001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});
