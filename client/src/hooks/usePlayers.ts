"use client";

import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchPlayers } from "@/store/playersSlice";

export function usePlayers() {
  const dispatch = useAppDispatch();
  const { list, loading, error } = useAppSelector((state) => state.players);

  useEffect(() => {
    dispatch(fetchPlayers({ perPage: 25 }));
  }, [dispatch]);

  return { list, loading, error };
}
