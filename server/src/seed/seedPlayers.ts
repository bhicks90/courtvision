// server/src/scripts/seedPlayers.ts
import axios from 'axios';
import chalk from 'chalk';
import { CacheManager } from '../utils/CacheManager';
import { BallDontLiePlayer } from '../types/balldontlie';
import { PLAYER_CACHE_FILE } from '../constants/cache';
import { RequestHandler } from '../utils/RequestHandler';
import { BALLDONTLIE_KEY, BASE_URL, BALLDONTLIE_PATHS, BALLDONTLIE_PARAMS } from '../constants';
import { ApiRequestBuilder } from '../utils/ApiRequestBuilder';

const playerCache = new CacheManager<BallDontLiePlayer>({
    fileName: PLAYER_CACHE_FILE,
});

const SOURCE_URL = 'https://raw.githubusercontent.com/bttmly/nba/refs/heads/master/data/players.json';

interface RawPlayer {
    firstName: string;
    lastName: string;
}

// Setup request handler to query BallDontLie directly
const requestHandler = new RequestHandler({
    headers: { Authorization: `Bearer ${BALLDONTLIE_KEY}` },
});

// Normalize names for comparison (lowercase, remove hyphens/apostrophes, trim, collapse spaces)
const normalize = (str: string) =>
    str
        .toLowerCase()
        .trim()
        .replace(/[-.'’]/g, '')
        .replace(/\s+/g, ' ');

const isExactMatch = (apiPlayer: BallDontLiePlayer, sourcePlayer: RawPlayer) => {
    return (
        normalize(`${apiPlayer.first_name} ${apiPlayer.last_name}`) ===
        normalize(`${sourcePlayer.firstName} ${sourcePlayer.lastName}`)
    );
};

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const seedPlayers = async () => {
    // Read cache once
    const cachedPlayers = playerCache.read() || [];
    console.log(chalk.green(`[CACHE] Loaded ${cachedPlayers.length} players from cache`));

    // If cache already has players, skip seeding
    if (cachedPlayers.length > 0) {
        console.log(chalk.yellow('[SEED] Player cache is already populated. Skipping seeding.'));
        return;
    }

    console.log(chalk.blue('[SEED] Downloading player list from source...'));
    const response = await axios.get<RawPlayer[]>(SOURCE_URL);
    const sourcePlayers = response.data;

    console.log(chalk.green(`[SEED] Loaded ${sourcePlayers.length} players from source`));

    for (const player of sourcePlayers) {
        const name = `${player.firstName} ${player.lastName}`;
        console.log(chalk.blue(`[SEED] Fetching: ${name}`));

        try {
            const url = new ApiRequestBuilder(BASE_URL, BALLDONTLIE_PATHS.PLAYERS)
                .addParam(BALLDONTLIE_PARAMS.SEARCH, player.lastName)
                .addParam(BALLDONTLIE_PARAMS.PER_PAGE, 10)
                .build();

            const result = await requestHandler.get<{ data: BallDontLiePlayer[] }>(url);

            // Find exact match
            const match = result.data.find((p) =>
                normalize(`${p.first_name} ${p.last_name}`) ===
                normalize(`${player.firstName} ${player.lastName}`)
            );

            if (match) {
                cachedPlayers.push(match);
                playerCache.write(cachedPlayers);
                console.log(
                    chalk.green(`[CACHE] Cached player: ${match.first_name} ${match.last_name}`),
                );
            } else {
                console.log(chalk.yellow(`[SEED] No exact match found for: ${name}`));
            }
        } catch (error: any) {
            console.log(chalk.red(`[ERROR] Failed to fetch ${name}: ${error.message}`));
        }

        // Respect API rate limits
        await sleep(12_000);
    }

    console.log(chalk.green('[SEED] Player seeding complete'));
};
