"use client";

import { useState } from "react";
import MenuScreen from "./components/MenuScreen";
import GameScreen from "./components/GameScreen";
import InfoScreen from "./components/InfoScreen";

type Screen = "menu" | "game" | "info";

export default function Home() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [playerName, setPlayerName] = useState("");

  if (screen === "game")  return <GameScreen playerName={playerName} onExit={() => setScreen("menu")} />;
  if (screen === "info")  return <InfoScreen onBack={() => setScreen("menu")} />;

  return (
    <MenuScreen
      onStart={(name) => { setPlayerName(name); setScreen("game"); }}
      onInfo={() => setScreen("info")}
    />
  );
}
