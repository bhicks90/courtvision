import { RequestHandler } from '../utils/RequestHandler';
import { FileCache } from '../utils/FileCache';

const BASE_URL = 'https://api.balldontlie.io/v1';
const API_KEY = process.env.BALLDONTLIE_KEY;

const requestHandler = new RequestHandler({
    headers: { Authorization: API_KEY },
});

// Local file cache for players
const playerCache = new FileCache<{ data: any[] }>('players.json');

// Fetch players with optional cache
export const fetchPlayers = async (perPage: number, search: string) => {
    try {
        // Only use cache when search is empty (full list)
        if (!search) {
            const cached = playerCache.read();

            if (cached && Array.isArray(cached.data)) {
                return cached;
            }
        }

        const url = `${BASE_URL}/players?per_page=${perPage}&search=${search}`;
        const data = await requestHandler.get<{ data: any[] }>(url);

        // Save full list to cache if no search query
        if (!search && data && Array.isArray(data.data)) {
            playerCache.write(data);
        }
        return data;
    } catch (error: any) {
        console.error('Failed to fetch players:', error.message);
        return { data: [] }; // fallback empty array
    }
};

/**
 * Fetch a player by ID (uses cache first)
 */
export const fetchPlayerById = async (id: number) => {
    const cached = playerCache.read();
    // Check cache first
    if (cached && cached.data) {
        const found = cached.data.find((player: any) => player.id === id);

        if (found) {
            return { data: found };
        }
    }

    // If not found in cache, fetch from API
    const url = `${BASE_URL}/players/${id}`;
    const data = await requestHandler.get(url);

    return data;
};
