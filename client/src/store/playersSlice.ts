import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "../services/api";
import { BallDontLiePlayer } from "../types/balldontlie";

import { isAxiosError } from "axios";
import { API_ENDPOINTS, THUNKS } from "../constants/api";
import { SLICE_NAMES } from "@/constants/redux";

export const fetchPlayers = createAsyncThunk<
  BallDontLiePlayer[],
  { perPage?: number; search?: string },
  { rejectValue: string }
>(
  THUNKS.FETCH_PLAYERS,
  async ({ perPage = 25, search = "" }, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_ENDPOINTS.PLAYERS, {
        params: { perPage, search },
      });
      
      return response.data.data as BallDontLiePlayer[];
    } catch (error: unknown) {
      let message = "Unknown error";

      if (isAxiosError(error))
        message = error.response?.data?.error || error.message;
      else if (error instanceof Error) message = error.message;

      return rejectWithValue(message);
    }
  },
);

interface PlayersState {
  list: BallDontLiePlayer[];
  loading: boolean;
  error: string | null;
}

const initialState: PlayersState = {
  list: [],
  loading: false,
  error: null,
};

const playersSlice = createSlice({
  name: SLICE_NAMES.PLAYERS,
  initialState,
  reducers: {
    clearPlayers: (state) => {
      state.list = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPlayers.fulfilled,
        (state, action: PayloadAction<BallDontLiePlayer[]>) => {
          state.loading = false;
          state.list = action.payload;
        },
      )
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearPlayers } = playersSlice.actions;
export default playersSlice.reducer;
