// server/src/scripts/seedTeams.ts
import chalk from 'chalk';
import { CacheManager } from '../utils/CacheManager';
import { RequestHandler } from '../utils/RequestHandler';
import { BALLDONTLIE_KEY, BASE_URL, BALLDONTLIE_PATHS } from '../constants';
import { ApiRequestBuilder } from '../utils/ApiRequestBuilder';
import { TEAM_CACHE_FILE } from '../constants/cache';

interface Team {
    id: number;
    conference: string;
    division: string;
    city: string;
    name: string;
    full_name: string;
    abbreviation: string;
}

const teamCache = new CacheManager<Team>({ fileName: TEAM_CACHE_FILE });
const requestHandler = new RequestHandler({
    headers: { Authorization: `Bearer ${BALLDONTLIE_KEY}` },
});

export const seedTeams = async () => {
    const cachedTeams = teamCache.read() || [];

    // Prevent re-seeding
    if (cachedTeams.length > 0) {
        console.log(chalk.yellow('[SEED] Teams already cached. Skipping seed.'));
        return;
    }

    console.log(chalk.blue('[SEED] Fetching all teams from BallDontLie API...'));

    try {
        const url = new ApiRequestBuilder(BASE_URL, BALLDONTLIE_PATHS.TEAMS).build();
        const response = await requestHandler.get<{ data: Team[] }>(url);

        if (response.data.length > 0) {
            teamCache.write(response.data);
            console.log(chalk.green(`[CACHE] Cached ${response.data.length} teams successfully`));
        } else {
            console.log(chalk.yellow('[SEED] No teams returned from API'));
        }
    } catch (error: any) {
        console.log(chalk.red(`[ERROR] Failed to fetch teams: ${error.message}`));
    }
};
