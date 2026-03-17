import { Request, Response } from "express";
import * as playerService from "../services/playerService";

export const getPlayers = async (req: Request, res: Response) => {
  const search = (req.query.search as string) || undefined;
  const perPage = Number(req.query.perPage) || 25;

  try {
    const result = await playerService.getPlayers(perPage, search);

    res.json(result);
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ data: [], error: "Failed to fetch players" });
  }
};

export const getPlayerById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  try {
    const result = await playerService.getPlayerById(id);

    if (!result.data) {
      return res.status(404).json({ data: null, error: "Player not found" });
    }
    res.json(result);
  } catch (error) {
    console.error(`Error fetching player ${id}:`, error);
    res.status(500).json({ data: null, error: "Failed to fetch player" });
  }
};