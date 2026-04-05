"use client";

import { useState, useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchPlayers } from "@/store/playersSlice";
import PlayerList from "@/components/players/PlayerList";
import {
  selectPlayersBySearch,
  selectPlayersStatus,
  selectPlayersError,
} from "@/store/selectors/playersSelectors";

export default function PlayersPage() {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");

  const status = useAppSelector(selectPlayersStatus);
  const error = useAppSelector(selectPlayersError);

  const players = useAppSelector(selectPlayersBySearch(search));

  const fetch = useCallback(() => {
    dispatch(fetchPlayers({ perPage: 25 }));
  }, [dispatch]);

  // Trigger fetch on mount
  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Players</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full"
          placeholder="Search players..."
        />
      </div>

      <PlayerList
        {...{players, error, search}}
        loading={status === "loading"}
      />
    </div>
  );
}