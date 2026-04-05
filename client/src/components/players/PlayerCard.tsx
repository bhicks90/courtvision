"use client";

import { memo } from "react";
import { BallDontLiePlayer } from "@/types/balldontlie";

interface Props {
  player: BallDontLiePlayer;
}

function PlayerCardComponent({ player }: Props) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg">
      <h2 className="font-bold">
        {player.first_name} {player.last_name}
      </h2>
      <p>{player.team.full_name}</p>
      <p>Position: {player.position || "N/A"}</p>
      <p>College: {player.college || "N/A"}</p>
    </div>
  );
}

// Memoize with React.memo to avoid unnecessary re-renders
export default memo(
  PlayerCardComponent,
  (prev, next) => prev.player.id === next.player.id,
);
