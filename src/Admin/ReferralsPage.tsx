import { useState } from "react";
import { GitBranch, Search, Settings, Save, Copy, Check } from "lucide-react";

interface ReferralUser {
  id: number;
  name: string;
  code: string;
  referred: number;
  earnings: number;
  status: "active" | "inactive";
}

const mockReferrals: ReferralUser[] = [
  { id: 1, name: "ShadowBlade99", code: "SHADOW99", referred: 18, earnings: 18000, status: "active" },
  { id: 2, name: "NeonHunter", code: "NEONH", referred: 12, earnings: 12000, status: "active" },
  { id: 3, name: "CryptoGhost", code: "CRYPTO1", referred: 9, earnings: 9000, status: "active" },
  { id: 4, name: "VoidWalker", code: "VOIDWLK", referred: 7, earnings: 7000, status: "inactive" },
  { id: 5, name: "PixelRaider", code: "PIXEL22", referred: 5, earnings: 5000, status: "active" },
  { id: 6, name: "IronFang", code: "IRONFG", referred: 4, earnings: 4000, status: "active" },
  { id: 7, name: "StarDrifter", code: "STRDFT", referred: 3, earnings: 3000, status: "active" },
  { id: 8, name: "ChaosKnight", code: "CHAOSK", referred: 2, earnings: 2000, status: "inactive" },
];

const PAGE_SIZE = 6;

const ReferralsPage = () => {
  const [search, setSearch] = useState("");
  const [rewardAmount, setRewardAmount] = useState("1000");
  const [editingReward, setEditingReward] = useState(false);
  const [savedReward, setSavedReward] = useState("1000");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const filtered = mockReferrals.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.code.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSaveReward = () => {
    setSavedReward(rewardAmount);
    setEditingReward(false);
  };

  const totalReferrals = mockReferrals.reduce((a, r) => a + r.referred, 0);
  const totalEarnings = mockReferrals.reduce((a, r) => a + r.earnings, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-bold">Referrals</h1>
        <p className="text-purple-400 text-sm mt-1">Track user referrals and manage reward amounts.</p>
      </div>

      {/* Summary + Reward Config */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#130020] border border-purple-900/40 rounded-xl p-5">
          <p className="text-purple-400 text-xs uppercase tracking-wider mb-1">Total Referred Users</p>
          <p className="text-white text-2xl font-bold">{totalReferrals}</p>
        </div>
        <div className="bg-[#130020] border border-purple-900/40 rounded-xl p-5">
          <p className="text-purple-400 text-xs uppercase tracking-wider mb-1">Total Rewards Paid</p>
          <p className="text-white text-2xl font-bold">₦{totalEarnings.toLocaleString()}</p>
        </div>

        {/* Reward Config Card */}
        <div className="bg-[#130020] border border-fuchsia-600/20 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-purple-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Settings size={12} />
              Reward Per Referral
            </p>
            {!editingReward && (
              <button
                onClick={() => setEditingReward(true)}
                className="text-fuchsia-400 text-xs hover:underline"
              >
                Edit
              </button>
            )}
          </div>
          {editingReward ? (
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center bg-[#0d0015] border border-fuchsia-500/40 rounded-lg overflow-hidden">
                <span className="text-purple-400 text-sm px-3 border-r border-purple-900/40">₦</span>
                <input
                  type="number"
                  value={rewardAmount}
                  onChange={(e) => setRewardAmount(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-2 text-white text-sm focus:outline-none"
                />
              </div>
              <button
                onClick={handleSaveReward}
                className="p-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-lg transition-colors"
              >
                <Save size={15} />
              </button>
            </div>
          ) : (
            <p className="text-white text-2xl font-bold">₦{parseInt(savedReward).toLocaleString()}</p>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
        <input
          type="text"
          placeholder="Search by name or code..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full bg-[#130020] border border-purple-900/40 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-purple-600 focus:outline-none focus:border-fuchsia-500/50 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-[#130020] border border-purple-900/40 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-900/40">
                {["User", "Referral Code", "Referred", "Earnings", "Status"].map((h) => (
                  <th key={h} className="text-left text-purple-400 text-xs uppercase tracking-wider font-medium px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20">
              {paginated.map((r) => (
                <tr key={r.id} className="hover:bg-purple-900/10 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {r.name[0]}
                      </div>
                      <span className="text-white font-medium">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <code className="bg-purple-900/30 border border-purple-800/30 text-fuchsia-300 text-xs px-2 py-1 rounded-md font-mono">
                        {r.code}
                      </code>
                      <button
                        onClick={() => handleCopy(r.code)}
                        className="p-1 text-purple-500 hover:text-fuchsia-400 transition-colors"
                        title="Copy code"
                      >
                        {copiedCode === r.code ? <Check size={13} className="text-green-400" /> : <Copy size={13} />}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 text-white font-medium">
                      <GitBranch size={14} className="text-purple-400" />
                      {r.referred}
                    </div>
                  </td>
                  <td className="px-5 py-3 text-fuchsia-400 font-semibold">₦{r.earnings.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border capitalize ${
                      r.status === "active"
                        ? "bg-green-500/15 text-green-400 border-green-500/20"
                        : "bg-yellow-500/15 text-yellow-400 border-yellow-500/20"
                    }`}>
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-purple-900/40">
          <p className="text-purple-400 text-xs">
            {filtered.length} referral users
          </p>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-7 h-7 rounded-md text-xs font-medium border transition-all ${
                  page === p
                    ? "bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-600/30"
                    : "text-purple-400 border-purple-900/40 hover:border-purple-600/40"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralsPage;