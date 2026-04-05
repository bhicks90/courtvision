import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { playersApi } from "@/services/playersApi";
import { BallDontLiePlayer } from "@/types/balldontlie";
import { THUNKS, SLICE_NAMES } from "@/constants/redux";
import { handleApiError } from "@/utils/handleApiError";
import { AsyncState } from "@/types/asyncState";

interface FetchPlayersParams {
  perPage?: number;
  search?: string;
}

export const fetchPlayers = createAsyncThunk<
  BallDontLiePlayer[],
  FetchPlayersParams,
  { rejectValue: string }
>(THUNKS.FETCH_PLAYERS, async (params = {}, { rejectWithValue }) => {
  try {
    return await playersApi.getPlayers(params);
  } catch (error) {
    return rejectWithValue(handleApiError(error));
  }
});

const initialState: AsyncState<BallDontLiePlayer[]> = {
  data: [],
  status: "idle",
  error: null,
};

const playersSlice = createSlice({
  name: SLICE_NAMES.PLAYERS,
  initialState,
  reducers: {
    clearPlayers: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchPlayers.fulfilled,
        (state, action: PayloadAction<BallDontLiePlayer[]>) => {
          state.status = "succeeded";
          state.data = action.payload;
        },
      )
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Failed to fetch players";
      });
  },
});

export const { clearPlayers } = playersSlice.actions;
export default playersSlice.reducer;
