import { useState } from "react";
import { Trophy, Medal, Crown, Gamepad2 } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  gamesPlayed: number;
  wins: number;
}

const weeklyData: LeaderboardEntry[] = [
  { rank: 1, name: "ShadowBlade99", points: 98450, gamesPlayed: 142, wins: 97 },
  { rank: 2, name: "NeonHunter", points: 87200, gamesPlayed: 130, wins: 85 },
  { rank: 3, name: "VoidWalker", points: 76800, gamesPlayed: 120, wins: 78 },
  { rank: 4, name: "CryptoGhost", points: 65400, gamesPlayed: 110, wins: 60 },
  { rank: 5, name: "PixelRaider", points: 54300, gamesPlayed: 98, wins: 52 },
  { rank: 6, name: "IronFang", points: 48900, gamesPlayed: 90, wins: 44 },
  { rank: 7, name: "StarDrifter", points: 43200, gamesPlayed: 85, wins: 40 },
  { rank: 8, name: "ChaosKnight", points: 38700, gamesPlayed: 80, wins: 35 },
  { rank: 9, name: "GhostSniper", points: 34100, gamesPlayed: 75, wins: 30 },
  { rank: 10, name: "LunarAce", points: 29500, gamesPlayed: 70, wins: 26 },
];

const allTimeData: LeaderboardEntry[] = weeklyData.map((e) => ({
  ...e,
  points: e.points * 12,
  gamesPlayed: e.gamesPlayed * 12,
  wins: e.wins * 12,
}));

const rankIcon = (rank: number) => {
  if (rank === 1) return <Crown size={16} className="text-yellow-400" />;
  if (rank === 2) return <Medal size={16} className="text-gray-300" />;
  if (rank === 3) return <Medal size={16} className="text-amber-600" />;
  return <span className="text-purple-400 text-sm font-bold w-4 text-center">{rank}</span>;
};

const rankRowBg = (rank: number) => {
  if (rank === 1) return "bg-yellow-500/5 border-yellow-500/15";
  if (rank === 2) return "bg-gray-500/5 border-gray-500/10";
  if (rank === 3) return "bg-amber-700/5 border-amber-700/10";
  return "border-transparent";
};

const Leaderboard = () => {
  const [tab, setTab] = useState<"weekly" | "alltime">("weekly");
  const data = tab === "weekly" ? weeklyData : allTimeData;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-2xl font-bold">Leaderboard</h1>
          <p className="text-purple-400 text-sm mt-1">Top performing players on the platform.</p>
        </div>
        <div className="flex bg-[#130020] border border-purple-900/40 rounded-lg p-1 gap-1">
          {(["weekly", "alltime"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                tab === t
                  ? "bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-600/30"
                  : "text-purple-400 hover:text-white"
              }`}
            >
              {t === "alltime" ? "All Time" : "This Week"}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4">
        {/* 2nd */}
        <div className="flex flex-col items-center pt-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-bold text-lg border-2 border-gray-400/40">
              {data[1].name[0]}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gray-500 border-2 border-[#0d0015] flex items-center justify-center">
              <span className="text-white text-xs font-bold">2</span>
            </div>
          </div>
          <p className="text-white text-xs font-semibold mt-3 text-center truncate w-full px-1">{data[1].name}</p>
          <p className="text-gray-400 text-xs">{data[1].points.toLocaleString()} pts</p>
          <div className="mt-2 w-full bg-gray-500/20 border border-gray-500/20 rounded-t-lg h-16" />
        </div>

        {/* 1st */}
        <div className="flex flex-col items-center">
          <Crown size={20} className="text-yellow-400 mb-2" />
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white font-bold text-xl border-2 border-yellow-400/60 shadow-lg shadow-yellow-500/20">
              {data[0].name[0]}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-yellow-500 border-2 border-[#0d0015] flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          </div>
          <p className="text-white text-xs font-bold mt-3 text-center truncate w-full px-1">{data[0].name}</p>
          <p className="text-yellow-400 text-xs font-semibold">{data[0].points.toLocaleString()} pts</p>
          <div className="mt-2 w-full bg-yellow-500/10 border border-yellow-500/20 rounded-t-lg h-24" />
        </div>

        {/* 3rd */}
        <div className="flex flex-col items-center pt-10">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold text-lg border-2 border-amber-600/40">
              {data[2].name[0]}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-700 border-2 border-[#0d0015] flex items-center justify-center">
              <span className="text-white text-xs font-bold">3</span>
            </div>
          </div>
          <p className="text-white text-xs font-semibold mt-3 text-center truncate w-full px-1">{data[2].name}</p>
          <p className="text-amber-500 text-xs">{data[2].points.toLocaleString()} pts</p>
          <div className="mt-2 w-full bg-amber-700/10 border border-amber-700/20 rounded-t-lg h-10" />
        </div>
      </div>

      {/* Full Table */}
      <div className="bg-[#130020] border border-purple-900/40 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-purple-900/40 flex items-center gap-2">
          <Trophy size={16} className="text-fuchsia-400" />
          <h2 className="text-white font-semibold text-sm">Full Rankings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-900/30">
                {["Rank", "Player", "Points", "Games Played", "Wins"].map((h) => (
                  <th key={h} className="text-left text-purple-400 text-xs uppercase tracking-wider font-medium px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20">
              {data.map((entry) => (
                <tr key={entry.rank} className={`border ${rankRowBg(entry.rank)} hover:bg-purple-900/10 transition-colors`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-center w-6">{rankIcon(entry.rank)}</div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {entry.name[0]}
                      </div>
                      <span className="text-white font-medium">{entry.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-fuchsia-400 font-semibold">{entry.points.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 text-purple-300">
                      <Gamepad2 size={13} />
                      {entry.gamesPlayed}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-green-400 font-medium">{entry.wins}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;