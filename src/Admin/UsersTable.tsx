import { useState } from "react";
import { Search, Ban, Trash2, Eye, UserCheck, ChevronLeft, ChevronRight, Filter } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  joinedAt: string;
  referrals: number;
  points: number;
  paymentStatus: string;
  status: "active" | "inactive" | "banned";
}

const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: ["ShadowBlade99", "NeonHunter", "CryptoGhost", "VoidWalker", "PixelRaider", "IronFang", "StarDrifter", "ChaosKnight", "GhostSniper", "LunarAce"][i % 10],
  email: `user${i + 1}@mail.com`,
  joinedAt: `Apr ${(i % 28) + 1}, 2025`,
  referrals: Math.floor(Math.random() * 20),
  points: Math.floor(Math.random() * 100000),
  paymentStatus: ["paid", "pending", "none"][i % 3],
  status: (["active", "active", "active", "inactive", "banned"] as const)[i % 5],
}));

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    active: "bg-green-500/15 text-green-400 border-green-500/20",
    inactive: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    banned: "bg-red-500/15 text-red-400 border-red-500/20",
    paid: "bg-green-500/15 text-green-400 border-green-500/20",
    pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    none: "bg-purple-500/15 text-purple-300 border-purple-500/20",
  };
  return map[status] ?? "bg-purple-500/15 text-purple-400 border-purple-500/20";
};

const PAGE_SIZE = 8;

const UsersTable = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = mockUsers.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || u.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-bold">Users</h1>
        <p className="text-purple-400 text-sm mt-1">Manage all registered users on the platform.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-[#130020] border border-purple-900/40 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-purple-600 focus:outline-none focus:border-fuchsia-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-purple-400 flex-shrink-0" />
          {["all", "active", "inactive", "banned"].map((s) => (
            <button
              key={s}
              onClick={() => { setFilterStatus(s); setPage(1); }}
              className={`px-3 py-2 rounded-lg text-xs font-medium border capitalize transition-all ${
                filterStatus === s
                  ? "bg-fuchsia-600/20 text-fuchsia-400 border-fuchsia-600/30"
                  : "bg-[#130020] text-purple-400 border-purple-900/40 hover:border-purple-600/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#130020] border border-purple-900/40 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-purple-900/40">
                {["User", "Email", "Joined", "Referrals", "Points", "Payment", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-purple-400 text-xs uppercase tracking-wider font-medium px-5 py-3 first:pl-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20">
              {paginated.map((u) => (
                <tr key={u.id} className="hover:bg-purple-900/10 transition-colors group">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                        {u.name[0]}
                      </div>
                      <span className="text-white font-medium whitespace-nowrap">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-purple-300">{u.email}</td>
                  <td className="px-5 py-3 text-purple-300 whitespace-nowrap">{u.joinedAt}</td>
                  <td className="px-5 py-3 text-white font-medium">{u.referrals}</td>
                  <td className="px-5 py-3 text-fuchsia-400 font-medium">{u.points.toLocaleString()}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge(u.paymentStatus)} capitalize`}>
                      {u.paymentStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge(u.status)} capitalize`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-md hover:bg-purple-900/40 text-purple-400 hover:text-white transition-colors" title="View">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-yellow-900/30 text-purple-400 hover:text-yellow-400 transition-colors" title="Suspend">
                        <Ban size={14} />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-green-900/30 text-purple-400 hover:text-green-400 transition-colors" title="Verify">
                        <UserCheck size={14} />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-red-900/30 text-purple-400 hover:text-red-400 transition-colors" title="Delete">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-purple-900/40">
          <p className="text-purple-400 text-xs">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} users
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-md border border-purple-900/40 text-purple-400 hover:text-white hover:border-purple-600/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-white text-xs font-medium px-1">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-md border border-purple-900/40 text-purple-400 hover:text-white hover:border-purple-600/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;