import { Request, Response } from 'express';
import * as balldontlieService from '../services/balldontlieService';
import { handleApiError } from '../utils/handleApiError';

export const getPlayers = async (req: Request, res: Response) => {
    const perPage = Number(req.query.perPage) || 25;
    const search = (req.query.search as string) || undefined;

    try {
        const players = await balldontlieService.getPlayers(perPage, search);

        res.json({ data: players });
    } catch (error) {
        handleApiError(res, {
            message: 'Failed to fetch players',
            data: [],
            error,
        });
    }
};

export const getPlayerById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const player = await balldontlieService.getPlayerById(id);

        if (!player) {
            return handleApiError(res, { message: 'Player not found', status: 404 });
        }

        res.json({ data: player });
    } catch (error) {
        handleApiError(res, {
            message: 'Failed to fetch player',
            data: null,
            error,
        });
    }
};

export const getTeams = async (_req: Request, res: Response) => {
    try {
        const teams = balldontlieService.getTeams();
        
        res.json({ data: teams });
    } catch (error) {
        handleApiError(res, {
            message: 'Failed to fetch teams',
            data: [],
            error,
        });
    }
};

export const getTeamById = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
        const team = balldontlieService.getTeamById(id);

        if (!team) {
            return handleApiError(res, { message: 'Team not found', status: 404 });
        }

        res.json({ data: team });
    } catch (error) {
        handleApiError(res, {
            message: 'Failed to fetch team',
            data: null,
            error,
        });
    }
};
