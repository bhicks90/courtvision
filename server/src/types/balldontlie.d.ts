// Represents an NBA team
export interface BallDontLieTeam {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
}

// Represents an NBA player
export interface BallDontLiePlayer {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    height: string | null;
    weight: string | null;
    jersey_number: string | null;
    college: string | null;
    country: string | null;
    draft_year: number | null;
    draft_round: number | null;
    draft_number: number | null;
    team: BallDontLieTeam;
}

// Response for multiple players
export interface BallDontLiePlayersResponse {
    data: BallDontLiePlayer[];
    meta: {
        next_cursor: number | null;
        per_page: number;
    };
}

// Response for a single player
export interface BallDontLieSinglePlayerResponse {
    data: BallDontLiePlayer;
}
