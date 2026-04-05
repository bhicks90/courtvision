"use client";

import { useMemo } from "react";
import { BallDontLiePlayer } from "@/types/balldontlie";
import PlayerCard from "./PlayerCard";

interface PlayerListProps {
  players: BallDontLiePlayer[];
  loading?: boolean;
  error?: string | null;
  search?: string;
}

export default function PlayerList({
  players,
  loading = false,
  error = null,
  search = "",
}: PlayerListProps) {
  // Memoize filtered players
  const filteredPlayers = useMemo(
    () =>
      players.filter((player) =>
        `${player.first_name} ${player.last_name}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [players, search],
  );

  if (loading) return <p className="text-center py-4">Loading players...</p>;
  if (error) return <p className="text-red-500 text-center py-4">{error}</p>;
  if (filteredPlayers.length === 0)
    return <p className="text-center py-4">No players found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {filteredPlayers.map((player) => (
        <PlayerCard key={player.id} player={player} />
      ))}
    </div>
  );
}
