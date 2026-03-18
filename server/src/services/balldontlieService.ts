import * as apiClient from '../apiClients/ballDontLie';
import { BallDontLiePlayer, BallDontLieTeam } from '../types/balldontlie';

const normalize = (str: string) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[-.'’]/g, '')
        .replace(/\s+/g, ' ');

/**
 * Get players, optionally filtered by search term
 */
export const getPlayers = async (
    perPage: number,
    search?: string,
): Promise<BallDontLiePlayer[]> => {
    let players = apiClient.fetchAllPlayers(); // cache only

    if (search) {
        players = players.filter((p) =>
            normalize(`${p.first_name} ${p.last_name}`).includes(normalize(search)),
        );

        // Cache miss -> call API
        if (players.length === 0) {
            const result = await apiClient.fetchPlayers(perPage, search);
            players = result.data;
        }
    }

    return players.slice(0, perPage);
};

export const getPlayerById = async (id: number): Promise<BallDontLiePlayer | null> => {
    const result = await apiClient.fetchPlayerById(id);

    return result.data || null;
};
export const getTeams = (): BallDontLieTeam[] => apiClient.fetchAllTeams();
export const getTeamById = (id: number): BallDontLieTeam | null => apiClient.fetchTeamById(id);
