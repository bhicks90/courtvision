import chalk from 'chalk';
import { CacheManager } from '../utils/CacheManager';
import {
    BallDontLiePlayer,
    BallDontLieSinglePlayerResponse,
    BallDontLiePlayersResponse,
    BallDontLieTeam,
} from '../types/balldontlie';import { PLAYER_CACHE_FILE, TEAM_CACHE_FILE } from '../constants/cache';
import { RequestHandler } from '../utils/RequestHandler';
import { BASE_URL, BALLDONTLIE_KEY, BALLDONTLIE_PATHS, BALLDONTLIE_PARAMS } from '../constants';
import { ApiRequestBuilder } from '../utils/ApiRequestBuilder';

// --------------------
// Player cache & API
// --------------------
const playerCacheManager = new CacheManager<BallDontLiePlayer>({
    fileName: PLAYER_CACHE_FILE,
});

const requestHandler = new RequestHandler({
    headers: { Authorization: `Bearer ${BALLDONTLIE_KEY}` },
});

const normalize = (str: string) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[-.'’]/g, '')
        .replace(/\s+/g, ' ');

/**
 * Get all cached players
 */
export const fetchAllPlayers = (): BallDontLiePlayer[] => {
    const cachedPlayers = playerCacheManager.read() || [];
    console.log(chalk.green(`[CACHE] Loaded ${cachedPlayers.length} players from cache`));
    return cachedPlayers;
};

/**
 * Fetch players from cache first, then API if not found
 */
export const fetchPlayers = async (perPage: number, search?: string) => {
    try {
        let filtered = fetchAllPlayers();

        if (search) {
            filtered = filtered.filter((player) =>
                normalize(`${player.first_name} ${player.last_name}`).includes(normalize(search)),
            );

            // Cache miss: query API
            if (filtered.length === 0) {
                console.log(
                    chalk.blue(`[API] Cache miss for "${search}". Searching BallDontLie API...`),
                );

                const url = new ApiRequestBuilder(BASE_URL, BALLDONTLIE_PATHS.PLAYERS)
                    .addParam(BALLDONTLIE_PARAMS.SEARCH, search)
                    .addParam(BALLDONTLIE_PARAMS.PER_PAGE, perPage)
                    .build();

                const apiResult = await requestHandler.get<{ data: BallDontLiePlayer[] }>(url);

                if (apiResult.data.length > 0) {
                    playerCacheManager.append(apiResult.data);
                    console.log(
                        chalk.green(
                            `[CACHE] Added ${apiResult.data.length} player(s) to cache from API`,
                        ),
                    );
                    filtered = apiResult.data;
                }
            }
        }

        return { data: filtered.slice(0, perPage) };
    } catch (error: any) {
        console.log(chalk.red(`[ERROR] Failed to fetch players: ${error.message}`));
        return { data: [] };
    }
};

/**
 * Fetch a single player by ID (cache first, then API)
 */
export const fetchPlayerById = async (id: number): Promise<BallDontLiePlayer | null> => {
    try {
        const allPlayers = fetchAllPlayers();
        let found = allPlayers.find((player) => player.id === id);

        if (found) {
            console.log(
                chalk.green(
                    `[CACHE] Player ${id} found in cache: ${found.first_name} ${found.last_name}`,
                ),
            );
            return found; // plain player object
        }

        console.log(
            chalk.blue(`[API] Cache miss for player ID ${id}. Searching BallDontLie API...`),
        );

        const url = new ApiRequestBuilder(BASE_URL, BALLDONTLIE_PATHS.PLAYER_BY_ID + id).build();

        const apiResponse = await requestHandler.get<BallDontLieSinglePlayerResponse>(url);

        if (apiResponse.data) {
            const apiPlayer: BallDontLiePlayer = apiResponse.data; // unwrap safely
            playerCacheManager.append([apiPlayer]);
            console.log(
                chalk.green(
                    `[CACHE] Added player ${apiPlayer.first_name} ${apiPlayer.last_name} to cache`,
                ),
            );
            found = apiPlayer;
        } else {
            console.log(chalk.red(`[API] Player ID ${id} not found in BallDontLie`));
        }

        return found ?? null;
    } catch (error: any) {
        console.log(chalk.red(`[ERROR] Failed to fetch player ${id}: ${error.message}`));
        return null;
    }
};

// --------------------
// Team cache only
// --------------------
const teamCacheManager = new CacheManager<BallDontLieTeam>({
    fileName: TEAM_CACHE_FILE,
});

/**
 * Get all cached teams
 */
export const fetchAllTeams = (): BallDontLieTeam[] => {
    const cachedTeams = teamCacheManager.read() || [];
    console.log(chalk.green(`[CACHE] Loaded ${cachedTeams.length} teams from cache`));
    return cachedTeams;
};

/**
 * Get a team by ID (cache only)
 */
export const fetchTeamById = (id: number): BallDontLieTeam | null => {
    const cachedTeams = fetchAllTeams();
    const found = cachedTeams.find((team) => team.id === id) || null;

    if (found) {
        console.log(chalk.green(`[CACHE] Team ${id} found in cache: ${found.full_name}`));
    } else {
        console.log(chalk.red(`[CACHE] Team ${id} not found in cache`));
    }

    return found;
};
