"use client";

import { useState } from "react";

interface MenuScreenProps {
  onStart: (name: string) => void;
  onInfo: () => void;
}

export default function MenuScreen({ onStart, onInfo }: MenuScreenProps) {
  const [name, setName] = useState("");

  function handleStart() {
    if (!name.trim()) return;
    onStart(name.trim());
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-sm flex flex-col items-center gap-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold tracking-tight text-white">Game</h1>
          <p className="mt-2 text-gray-400 text-sm">Enter your name to begin</p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleStart()}
            placeholder="Your name"
            maxLength={30}
            className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white placeholder-gray-500 text-base outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
          />
          <button
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Start Game
          </button>
          <button
            onClick={onInfo}
            className="w-full rounded-lg border border-gray-700 bg-transparent px-4 py-3 text-base text-gray-400 hover:text-white hover:border-gray-500 transition"
          >
            How to Play
          </button>
        </div>
      </div>
    </div>
  );
}
