import api from "./api";
import { API_ENDPOINTS } from "@/constants/api";
import { BallDontLiePlayer } from "@/types/balldontlie";

export const playersApi = {
  async getPlayers(params: { perPage?: number; search?: string }) {
    const response = await api.get(API_ENDPOINTS.PLAYERS, { params });
    
    return response.data.data as BallDontLiePlayer[];
  },
};