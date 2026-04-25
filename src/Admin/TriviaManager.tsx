import { useState } from "react";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Circle,
  HelpCircle,
  X,
  Save,
} from "lucide-react";
import { QUESTION_BANK } from "../trivia/triviaData";
import type { TriviaQuestion } from "../trivia/triviaData";

interface TriviaOption {
  id: string;
  text: string;
}

const games = [
  { id: 1, name: "Trivia Blitz" },
  { id: 2, name: "Speed Quiz" },
  { id: 3, name: "Knowledge Bowl" },
];

const difficulties = ["easy", "medium", "hard"] as const;
type Difficulty = (typeof difficulties)[number];

const difficultyBadge: Record<Difficulty, string> = {
  easy: "bg-green-500/15 text-green-400 border-green-500/20",
  medium: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  hard: "bg-red-500/15 text-red-400 border-red-500/20",
};

const emptyForm = () => ({
  question: "",
  difficulty: "easy" as Difficulty,
  options: [
    { id: "a", text: "" },
    { id: "b", text: "" },
    { id: "c", text: "" },
    { id: "d", text: "" },
  ] as TriviaOption[],
  correctOptionId: "a",
});

const TriviaManager = () => {
  const [selectedGameId, setSelectedGameId] = useState(1);
  const [questions, setQuestions] = useState<TriviaQuestion[]>(QUESTION_BANK);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [formError, setFormError] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | "all">(
    "all",
  );

  const filtered = questions
    .filter((q) => q.gameId === selectedGameId)
    .filter(
      (q) => difficultyFilter === "all" || q.difficulty === difficultyFilter,
    );

  const openForm = () => {
    setForm(emptyForm());
    setFormError("");
    setShowForm(true);
  };

  const updateOption = (optionId: string, text: string) => {
    setForm((f) => ({
      ...f,
      options: f.options.map((o) => (o.id === optionId ? { ...o, text } : o)),
    }));
  };

  const handleSave = () => {
    if (!form.question.trim()) {
      setFormError("Question is required.");
      return;
    }
    if (form.options.some((o) => !o.text.trim())) {
      setFormError("All 4 options must be filled.");
      return;
    }
    setQuestions((prev) => [
      ...prev,
      {
        id: Date.now(),
        gameId: selectedGameId,
        question: form.question,
        options: form.options,
        correctOptionId: form.correctOptionId,
        difficulty: form.difficulty,
      },
    ]);
    setShowForm(false);
  };

  const deleteQuestion = (id: number) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const counts = {
    easy: questions.filter(
      (q) => q.gameId === selectedGameId && q.difficulty === "easy",
    ).length,
    medium: questions.filter(
      (q) => q.gameId === selectedGameId && q.difficulty === "medium",
    ).length,
    hard: questions.filter(
      (q) => q.gameId === selectedGameId && q.difficulty === "hard",
    ).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-white text-2xl font-bold">Trivia Manager</h1>
          <p className="text-purple-400 text-sm mt-1">
            Add and manage trivia questions for your games.
          </p>
        </div>
        <button
          onClick={openForm}
          className="flex items-center gap-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Question
        </button>
      </div>

      {/* Game Selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-purple-400 text-sm">Game:</span>
        <div className="flex gap-2 flex-wrap">
          {games.map((g) => (
            <button
              key={g.id}
              onClick={() => setSelectedGameId(g.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                selectedGameId === g.id
                  ? "bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-600/30"
                  : "bg-[#130020] text-purple-300 border-purple-900/40 hover:border-purple-600/40"
              }`}
            >
              {g.name}
              <span className="text-xs bg-purple-900/40 px-1.5 py-0.5 rounded-full">
                {questions.filter((q) => q.gameId === g.id).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Difficulty filter + stats */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-purple-400 text-sm">Difficulty:</span>
        {(["all", "easy", "medium", "hard"] as const).map((d) => (
          <button
            key={d}
            onClick={() => setDifficultyFilter(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border capitalize transition-all ${
              difficultyFilter === d
                ? "bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-600/30"
                : "bg-[#130020] text-purple-400 border-purple-900/30 hover:border-purple-600/30"
            }`}
          >
            {d === "all"
              ? `All (${questions.filter((q) => q.gameId === selectedGameId).length})`
              : `${d} (${counts[d]})`}
          </button>
        ))}
      </div>

      {/* Add Question Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4">
          <div className="bg-[#130020] border border-purple-900/40 rounded-xl w-full max-w-lg p-4 sm:p-6 space-y-5 max-h-[90vh] overflow-y-auto overflow-x-hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-white font-semibold">New Trivia Question</h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-purple-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {formError && (
              <p className="text-red-400 text-xs bg-red-900/20 border border-red-900/30 rounded-lg px-4 py-2">
                {formError}
              </p>
            )}

            {/* Difficulty selector */}
            <div>
              <label className="text-purple-300 text-xs font-medium uppercase tracking-wider block mb-2">
                Difficulty
              </label>
              <div className="flex gap-2">
                {difficulties.map((d) => (
                  <button
                    key={d}
                    onClick={() => setForm((f) => ({ ...f, difficulty: d }))}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize border transition-all ${
                      form.difficulty === d
                        ? difficultyBadge[d]
                        : "bg-[#0d0015] border-purple-900/30 text-purple-500 hover:border-purple-700/40"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Question */}
            <div>
              <label className="text-purple-300 text-xs font-medium uppercase tracking-wider block mb-2">
                Question
              </label>
              <textarea
                rows={3}
                placeholder="Type your question here..."
                value={form.question}
                onChange={(e) =>
                  setForm((f) => ({ ...f, question: e.target.value }))
                }
                className="w-full bg-[#0d0015] border border-purple-900/40 rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-purple-700 focus:outline-none focus:border-fuchsia-500/50 transition-colors resize-none"
              />
            </div>

            {/* Options */}
            <div>
              <label className="text-purple-300 text-xs font-medium uppercase tracking-wider block mb-3">
                Options — tap circle to mark correct answer
              </label>
              <div className="space-y-2">
                {form.options.map((opt) => (
                  <div key={opt.id} className="flex items-center gap-2 min-w-0">
                    <button
                      onClick={() =>
                        setForm((f) => ({ ...f, correctOptionId: opt.id }))
                      }
                      className="flex-shrink-0 transition-colors"
                    >
                      {form.correctOptionId === opt.id ? (
                        <CheckCircle2 size={18} className="text-fuchsia-400" />
                      ) : (
                        <Circle size={18} className="text-purple-600" />
                      )}
                    </button>
                    <div className="w-6 h-6 rounded-md bg-purple-900/40 flex items-center justify-center text-purple-300 text-xs font-bold uppercase flex-shrink-0">
                      {opt.id}
                    </div>
                    <input
                      type="text"
                      placeholder={`Option ${opt.id.toUpperCase()}`}
                      value={opt.text}
                      onChange={(e) => updateOption(opt.id, e.target.value)}
                      className={`flex-1 min-w-0 bg-[#0d0015] border rounded-lg px-3 py-2 text-white text-sm placeholder:text-purple-700 focus:outline-none transition-colors ${
                        form.correctOptionId === opt.id
                          ? "border-fuchsia-500/40 focus:border-fuchsia-500/60"
                          : "border-purple-900/40 focus:border-purple-700/50"
                      }`}
                    />
                  </div>
                ))}
              </div>
              <p className="text-purple-500 text-xs mt-2">
                Correct answer:{" "}
                <span className="text-fuchsia-400 font-semibold uppercase">
                  Option {form.correctOptionId}
                </span>
              </p>
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
                Save Question
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      {filtered.length === 0 ? (
        <div className="bg-[#130020] border border-purple-900/40 rounded-xl p-12 flex flex-col items-center justify-center text-center">
          <HelpCircle size={32} className="text-purple-700 mb-3" />
          <p className="text-purple-300 font-medium">No questions yet</p>
          <p className="text-purple-500 text-sm mt-1">
            Add your first trivia question for this game.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((q, idx) => (
            <div
              key={q.id}
              className="bg-[#130020] border border-purple-900/40 rounded-xl overflow-hidden"
            >
              <div className="px-4 sm:px-5 py-4 flex items-start gap-3 sm:gap-4">
                <span className="w-7 h-7 rounded-full bg-fuchsia-600/20 border border-fuchsia-600/30 flex items-center justify-center text-fuchsia-400 text-xs font-bold flex-shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <p className="text-white font-medium text-sm leading-relaxed">
                      {q.question}
                    </p>
                  </div>
                  {q.difficulty && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border font-semibold uppercase tracking-wider ${difficultyBadge[q.difficulty as Difficulty]}`}
                    >
                      {q.difficulty}
                    </span>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                    {q.options.map((opt) => (
                      <div
                        key={opt.id}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs min-w-0 ${
                          opt.id === q.correctOptionId
                            ? "bg-fuchsia-600/15 border-fuchsia-600/30 text-fuchsia-300"
                            : "bg-purple-900/20 border-purple-900/30 text-purple-300"
                        }`}
                      >
                        {opt.id === q.correctOptionId ? (
                          <CheckCircle2
                            size={12}
                            className="text-fuchsia-400 flex-shrink-0"
                          />
                        ) : (
                          <Circle
                            size={12}
                            className="text-purple-600 flex-shrink-0"
                          />
                        )}
                        <span className="font-semibold uppercase mr-0.5 flex-shrink-0">
                          {opt.id}.
                        </span>
                        <span className="truncate">{opt.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => deleteQuestion(q.id)}
                  className="p-1.5 rounded-md hover:bg-red-900/20 text-purple-500 hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TriviaManager;
