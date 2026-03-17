import chalk from 'chalk';
import { RequestHandler } from '../utils/RequestHandler';
import { CacheManager } from '../utils/CacheManager';
import { BALLDONTLIE_KEY, BASE_URL } from '../constants';
import { BallDontLiePlayer, BallDontLiePlayersResponse } from '../types/balldontlie';

const requestHandler = new RequestHandler({
    headers: { Authorization: `Bearer ${BALLDONTLIE_KEY}` },
});

const playerCacheManager = new CacheManager<BallDontLiePlayer>({ fileName: 'players.json' });

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

/**
 * Fetch all players incrementally, filter only active ones (have a team),
 * and cache them
 */
export const fetchAllPlayers = async (): Promise<BallDontLiePlayer[]> => {
    const cachedPlayers = playerCacheManager.read();
    let allPlayers: BallDontLiePlayer[] = cachedPlayers ?? [];
    let nextCursor: number | null = 0;

    console.log(
        chalk.blue(`[CACHE] Starting fetch. Currently cached players: ${allPlayers.length}`),
    );

    do {
        const url: string = `${BASE_URL}/players?per_page=100${nextCursor ? `&cursor=${nextCursor}` : ''}`;
        console.log(chalk.blue(`[GET] Requesting: ${url}`));

        const response: BallDontLiePlayersResponse =
            await requestHandler.get<BallDontLiePlayersResponse>(url);

        // Filter only players with a team (active players)
        const activePlayers = response.data.filter((p) => p.team && p.team.id);

        // Append only new active players
        const newPlayers = activePlayers.filter((p) => !allPlayers.find((cp) => cp.id === p.id));

        if (newPlayers.length) {
            playerCacheManager.append(newPlayers);
            allPlayers.push(...newPlayers);
            console.log(
                chalk.green(
                    `[CACHE] Added ${newPlayers.length} new active players. Total cached: ${allPlayers.length}`,
                ),
            );
        } else {
            console.log(chalk.yellow(`[CACHE] No new active players to add from this batch.`));
        }

        nextCursor = response.meta.next_cursor ?? null;

        if (nextCursor) {
            console.log(
                chalk.blue(`[RATE LIMIT] Waiting 12 seconds before next request to avoid limit...`),
            );
            await sleep(12_000);
        }
    } while (nextCursor);

    console.log(
        chalk.green(`[CACHE] Fetch complete. Total active players cached: ${allPlayers.length}`),
    );
    return allPlayers;
};

/**
 * Fetch players with optional search and limit
 */
export const fetchPlayers = async (perPage: number, search?: string) => {
    try {
        const allPlayers = await fetchAllPlayers();

        const filtered = search
            ? allPlayers.filter((player) =>
                  `${player.first_name} ${player.last_name}`
                      .toLowerCase()
                      .includes(search.toLowerCase()),
              )
            : allPlayers;

        return { data: filtered.slice(0, perPage) };
    } catch (error: any) {
        console.log(chalk.red(`[ERROR] Failed to fetch players: ${error.message}`));
        return { data: [] };
    }
};

/**
 * Fetch a single player by ID
 */
export const fetchPlayerById = async (id: number) => {
    try {
        const allPlayers = await fetchAllPlayers();
        const found = allPlayers.find((player) => player.id === id);

        if (found) {
            console.log(
                chalk.green(
                    `[CACHE] Player ${id} found in cache: ${found.first_name} ${found.last_name}`,
                ),
            );
            return { data: found };
        }

        console.log(chalk.red(`[CACHE] Player ${id} not found in cache`));
        return { data: null };
    } catch (error: any) {
        console.log(chalk.red(`[ERROR] Failed to fetch player ${id}: ${error.message}`));
        return { data: null };
    }
};
