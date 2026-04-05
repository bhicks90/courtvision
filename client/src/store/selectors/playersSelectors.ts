import { createSelector } from "reselect";
import { RootState } from "../store";

const playersState = (state: RootState) => state.players;

export const selectPlayers = createSelector(
  [playersState],
  (players) => players.data,
);

export const selectPlayersStatus = createSelector(
  [playersState],
  (players) => players.status,
);

export const selectPlayersError = createSelector(
  [playersState],
  (players) => players.error,
);

export const selectPlayersBySearch = (search: string) =>
  createSelector([selectPlayers], (players) =>
    players.filter((p) =>
      `${p.first_name} ${p.last_name}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    ),
  );
