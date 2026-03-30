

export const THUNKS = {
  FETCH_PLAYERS: "players/fetchPlayers",
};
export const API_ENDPOINTS = {
  PLAYERS: "/players",
  PLAYER_BY_ID: (id: number) => `/api/players/${id}`,
  TEAMS: "/teams",
  TEAM_BY_ID: (id: number) => `/api/teams/${id}`,
};