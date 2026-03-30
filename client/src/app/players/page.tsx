// client/src/app/players/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchPlayers } from "@/store/playersSlice";
import PlayerCard from "@/components/players/PlayerCard";

export default function PlayersPage() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.players);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchPlayers({ perPage: 25 }));
  }, [dispatch]);

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
        <button
          onClick={() => dispatch(fetchPlayers({ search }))}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {list.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
    </div>
  );
}
