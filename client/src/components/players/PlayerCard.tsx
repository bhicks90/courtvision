"use client";

import { BallDontLiePlayer } from "@/types/balldontlie";

interface Props {
  player: BallDontLiePlayer;
}

export default function PlayerCard({ player }: Props) {
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
