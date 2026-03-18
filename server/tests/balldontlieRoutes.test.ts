import request from 'supertest';
import express from 'express';
import balldontlieRouter from '../src/routes/balldontlieRouter';

const app = express();
app.use(express.json());
app.use('/api', balldontlieRouter);

describe('Balldontlie API', () => {
    it('should return a list of players', async () => {
        const res = await request(app).get('/api/players?perPage=5');

        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return a single player by ID', async () => {
        const res = await request(app).get('/api/players/1');

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 404 for non-existent player', async () => {
        const res = await request(app).get('/api/players/999999');

        expect(res.statusCode).toBe(404);
    });

    it('should return all teams', async () => {
        const res = await request(app).get('/api/teams');

        expect(res.statusCode).toBe(200);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should return a team by ID', async () => {
        const res = await request(app).get('/api/teams/1');

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('id', 1);
    });

    it('should return 404 for non-existent team', async () => {
        const res = await request(app).get('/api/teams/999');
        
        expect(res.statusCode).toBe(404);
    });
});
