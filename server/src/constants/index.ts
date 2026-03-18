import { getEnv } from '../utils/getEnv';

// API keys and base URLs
export const BALLDONTLIE_KEY = getEnv('BALLDONTLIE_KEY');
export const BASE_URL = 'https://api.balldontlie.io';

// BallDontLie endpoints
export const BALLDONTLIE_PATHS = {
    PLAYERS: 'v1/players',
    PLAYER_BY_ID: 'v1/players/',
    TEAMS: 'v1/teams'
};

// Query parameter keys
export const BALLDONTLIE_PARAMS = {
    SEARCH: 'search',
    PER_PAGE: 'per_page',
};
