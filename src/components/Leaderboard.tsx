import React from "react";

/* ============================================
   TYPES
============================================ */

export interface PodiumPlayer {
  name: string;
  avatar: string;
  requiredPoints: number;
  prize: number;
}

export interface Player {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  lastSession: string;
  active: boolean;
  reward?: string | number; // optional
}

export interface LeaderboardProps {
  podium: [PodiumPlayer, PodiumPlayer, PodiumPlayer]; 
  players: Player[];
}

/* Podium card props */
interface PodiumCardProps {
  position: string;
  data: PodiumPlayer;
  height: string;
  bg: string;
  isChampion?: boolean;
}

/* ============================================
   COMPONENT
============================================ */

export default function Leaderboard({ podium, players }: LeaderboardProps) {
  return (
    <div className="w-full max-w-6xl mx-auto text-white">

        <p className="text-center text-4xl font-bold py-10 " >LEADERBOARD</p>
      {/* ====== PODIUM ====== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 mt-10">

        {/* 2nd Place */}
        <PodiumCard
          position="2nd"
          data={podium[1]}
          height="h-64"
          bg="bg-[#1c2333]"
        />

        {/* 1st Place */}
        <PodiumCard
          position="1st"
          data={podium[0]}
          height="h-72"
          bg="bg-[#222b3e]"
          isChampion={true}
        />

        {/* 3rd Place */}
        <PodiumCard
          position="3rd"
          data={podium[2]}
          height="h-64"
          bg="bg-[#1c2333]"
        />

      </div>

      {/* ====== PLAYERS TABLE ====== */}
   <div className="bg-[#141a24] p-6 rounded-xl shadow-lg">
  <div className="overflow-x-auto">
    <table className="min-w-[700px] w-full table-auto">
      <thead>
        <tr className="text-left text-gray-400 text-sm border-b border-gray-700">
          <th className="py-3 whitespace-nowrap">Rank</th>
          <th className="py-3 whitespace-nowrap">Player</th>
          <th className="py-3 whitespace-nowrap">Score</th>
          <th className="py-3 whitespace-nowrap">Last Session</th>
          <th className="py-3 whitespace-nowrap">Status</th>
          <th className="py-3 whitespace-nowrap text-right">Reward</th>
        </tr>
      </thead>

      <tbody>
        {players.map((player) => (
          <tr
            key={player.rank}
            className="border-b border-gray-800 hover:bg-[#1b2230]/50 transition"
          >
            <td className="py-4 text-gray-300 whitespace-nowrap">
              {player.rank}
            </td>

            <td className="py-4 flex items-center gap-3 whitespace-nowrap">
              <img
                src={player.avatar}
                className="w-10 h-10 rounded-full border border-gray-700"
                alt="avatar"
              />
              <span className="text-gray-200">{player.username}</span>
            </td>

            <td className="py-4 text-blue-400 font-medium whitespace-nowrap">
              {player.score.toLocaleString()}
            </td>

            <td className="py-4 text-gray-400 whitespace-nowrap">
              {player.lastSession}
            </td>

            <td className="py-4 whitespace-nowrap">
              {player.active ? (
                <span className="text-green-400">Active</span>
              ) : (
                <span className="text-gray-500">Inactive</span>
              )}
            </td>

            <td className="py-4 text-right text-blue-400 font-semibold whitespace-nowrap">
              {player.reward ?? "—"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Mobile scroll hint */}
  <p className="text-gray-400 text-xs mt-2 block md:hidden text-center">
    ← scroll to view more →
  </p>
</div>



    </div>
  );
}

/* ============================================
   PODIUM CARD
============================================ */

function PodiumCard({
  position,
  data,
  height,
  bg,
  isChampion
}: PodiumCardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-end ${bg} ${height} p-6 rounded-2xl relative`}
    >
      <img
        src={data.avatar}
        className="w-20 h-20 rounded-full border-4 border-gray-700 absolute object-cover -top-10"
        alt="avatar"
      />

      <div className="mt-14 text-center">
        <h3 className="text-xl font-semibold">{data.name}</h3>

        <p className="text-blue-300 mt-2">
          Earn {data.requiredPoints.toLocaleString()} points
        </p>

        <p className="text-blue-400 text-2xl mt-3 font-semibold">
          💎 {data.prize.toLocaleString()}
        </p>

        <div className="mt-3 text-gray-400 text-sm">
          {isChampion ? (
            <span className="text-yellow-400">🏆 Champion</span>
          ) : (
            position
          )}
        </div>
      </div>
    </div>
  );
}
