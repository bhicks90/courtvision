import { fetchPlayers, fetchPlayerById } from "../apiClients/ballDontLie";

export const getPlayers = async (perPage: number, search?: string) => {
  const players = await fetchPlayers(perPage, search || "");

  return { data: players || [] };
};

export const getPlayerById = async (id: number) => {
  const player = await fetchPlayerById(id);

  return { data: player || null };
};