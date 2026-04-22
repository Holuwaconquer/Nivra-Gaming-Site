import { useState } from "react";
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Gamepad2, X, Save } from "lucide-react";

interface Game {
  id: number;
  name: string;
  category: string;
  activePlayers: number;
  totalPlays: number;
  active: boolean;
}

const initialGames: Game[] = [
  { id: 1, name: "Trivia Blitz", category: "Trivia", activePlayers: 48, totalPlays: 12400, active: true },
  { id: 2, name: "Die Roller", category: "Chance", activePlayers: 12, totalPlays: 5300, active: true },
  { id: 3, name: "Coin Flip", category: "Chance", activePlayers: 30, totalPlays: 9800, active: true },
  { id: 4, name: "Spin the Bottle", category: "Social", activePlayers: 8, totalPlays: 3200, active: false },
  { id: 5, name: "Tic Tac Toe", category: "Strategy", activePlayers: 22, totalPlays: 7600, active: true },
  { id: 6, name: "Rock Paper Scissors", category: "Chance", activePlayers: 15, totalPlays: 4500, active: true },
];

const categories = ["Trivia", "Chance", "Strategy", "Social", "Action", "Puzzle"];

const GamesManager = () => {
  const [games, setGames] = useState(initialGames);
  const [showForm, setShowForm] = useState(false);
  const [editGame, setEditGame] = useState<Game | null>(null);
  const [form, setForm] = useState({ name: "", category: categories[0] });

  const toggleActive = (id: number) => {
    setGames((prev) => prev.map((g) => (g.id === id ? { ...g, active: !g.active } : g)));
  };

  const deleteGame = (id: number) => {
    setGames((prev) => prev.filter((g) => g.id !== id));
  };

  const openEdit = (game: Game) => {
    setEditGame(game);
    setForm({ name: game.name, category: game.category });
    setShowForm(true);
  };

  const openAdd = () => {
    setEditGame(null);
    setForm({ name: "", category: categories[0] });
    setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editGame) {
      setGames((prev) =>
        prev.map((g) => (g.id === editGame.id ? { ...g, name: form.name, category: form.category } : g))
      );
    } else {
      setGames((prev) => [
        ...prev,
        { id: Date.now(), name: form.name, category: form.category, activePlayers: 0, totalPlays: 0, active: true },
      ]);
    }
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-2xl font-bold">Games</h1>
          <p className="text-purple-400 text-sm mt-1">Manage games available on the Nivra platform.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Game
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-[#130020] border border-purple-900/40 rounded-xl w-full max-w-md p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold">{editGame ? "Edit Game" : "Add New Game"}</h2>
              <button onClick={() => setShowForm(false)} className="text-purple-400 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-purple-300 text-xs font-medium uppercase tracking-wider block mb-2">Game Name</label>
                <input
                  type="text"
                  placeholder="e.g. Speed Quiz"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full bg-[#0d0015] border border-purple-900/40 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-purple-700 focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                />
              </div>
              <div>
                <label className="text-purple-300 text-xs font-medium uppercase tracking-wider block mb-2">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full bg-[#0d0015] border border-purple-900/40 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-fuchsia-500/50 transition-colors"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-[#130020]">{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 border border-purple-900/40 text-purple-300 hover:text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-lg py-2.5 text-sm font-semibold transition-colors"
              >
                <Save size={15} />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className={`bg-[#130020] border rounded-xl p-5 space-y-4 transition-all ${
              game.active ? "border-purple-900/40" : "border-purple-900/20 opacity-60"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-fuchsia-600/10 border border-fuchsia-600/20 flex items-center justify-center">
                  <Gamepad2 size={18} className="text-fuchsia-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{game.name}</p>
                  <span className="text-xs text-purple-400 bg-purple-900/30 border border-purple-800/30 px-2 py-0.5 rounded-full">
                    {game.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleActive(game.id)}
                className="flex-shrink-0 transition-colors"
                title={game.active ? "Deactivate" : "Activate"}
              >
                {game.active
                  ? <ToggleRight size={24} className="text-fuchsia-400" />
                  : <ToggleLeft size={24} className="text-purple-600" />
                }
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-900/20 rounded-lg p-3">
                <p className="text-purple-400 text-xs uppercase tracking-wider">Active Players</p>
                <p className="text-white font-bold text-lg mt-0.5">{game.activePlayers}</p>
              </div>
              <div className="bg-purple-900/20 rounded-lg p-3">
                <p className="text-purple-400 text-xs uppercase tracking-wider">Total Plays</p>
                <p className="text-white font-bold text-lg mt-0.5">{game.totalPlays.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => openEdit(game)}
                className="flex-1 flex items-center justify-center gap-1.5 border border-purple-900/40 text-purple-300 hover:text-white hover:border-purple-600/40 rounded-lg py-2 text-xs font-medium transition-all"
              >
                <Pencil size={13} />
                Edit
              </button>
              <button
                onClick={() => deleteGame(game.id)}
                className="flex items-center justify-center gap-1.5 border border-red-900/30 text-red-400/70 hover:text-red-400 hover:border-red-900/50 rounded-lg px-3 py-2 text-xs font-medium transition-all"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GamesManager;