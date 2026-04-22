import { useState } from "react";
import { Search, CheckCircle2, XCircle, Clock, CreditCard, Filter, ChevronLeft, ChevronRight } from "lucide-react";

interface Payment {
  id: number;
  user: string;
  amount: number;
  type: "Withdrawal" | "Reward" | "Referral Bonus";
  status: "pending" | "approved" | "rejected";
  date: string;
  method: string;
}

const mockPayments: Payment[] = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  user: ["ShadowBlade99", "NeonHunter", "CryptoGhost", "VoidWalker", "PixelRaider", "IronFang"][i % 6],
  amount: [5000, 2500, 10000, 1500, 7000, 3200][i % 6],
  type: (["Withdrawal", "Reward", "Referral Bonus"] as const)[i % 3],
  status: (["pending", "approved", "rejected", "approved", "pending"] as const)[i % 5],
  date: `Apr ${(i % 20) + 1}, 2025`,
  method: ["Bank Transfer", "Opay", "Palmpay", "GTB"][i % 4],
}));

const PAGE_SIZE = 8;

const statusConfig: Record<string, { label: string; classes: string; icon: React.ReactNode }> = {
  pending: {
    label: "Pending",
    classes: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    icon: <Clock size={12} />,
  },
  approved: {
    label: "Approved",
    classes: "bg-green-500/15 text-green-400 border-green-500/20",
    icon: <CheckCircle2 size={12} />,
  },
  rejected: {
    label: "Rejected",
    classes: "bg-red-500/15 text-red-400 border-red-500/20",
    icon: <XCircle size={12} />,
  },
};

const PaymentsPage = () => {
  const [payments, setPayments] = useState(mockPayments);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);

  const updateStatus = (id: number, status: "approved" | "rejected") => {
    setPayments((prev) => prev.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  const filtered = payments.filter((p) => {
    const matchSearch = p.user.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const pendingCount = payments.filter((p) => p.status === "pending").length;
  const totalApproved = payments.filter((p) => p.status === "approved").reduce((a, p) => a + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-bold">Payments</h1>
        <p className="text-purple-400 text-sm mt-1">Review and manage user payment requests.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#130020] border border-yellow-500/20 rounded-xl p-5">
          <p className="text-yellow-400/70 text-xs uppercase tracking-wider mb-1">Pending Review</p>
          <p className="text-white text-2xl font-bold">{pendingCount}</p>
        </div>
        <div className="bg-[#130020] border border-green-500/20 rounded-xl p-5">
          <p className="text-green-400/70 text-xs uppercase tracking-wider mb-1">Total Approved</p>
          <p className="text-white text-2xl font-bold">₦{totalApproved.toLocaleString()}</p>
        </div>
        <div className="bg-[#130020] border border-purple-900/40 rounded-xl p-5">
          <p className="text-purple-400 text-xs uppercase tracking-wider mb-1">Total Transactions</p>
          <p className="text-white text-2xl font-bold">{payments.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Search by user..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full bg-[#130020] border border-purple-900/40 rounded-lg pl-9 pr-4 py-2.5 text-white text-sm placeholder:text-purple-600 focus:outline-none focus:border-fuchsia-500/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={15} className="text-purple-400 flex-shrink-0" />
          {["all", "pending", "approved", "rejected"].map((s) => (
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
                {["User", "Amount", "Type", "Method", "Date", "Status", "Actions"].map((h) => (
                  <th key={h} className="text-left text-purple-400 text-xs uppercase tracking-wider font-medium px-5 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20">
              {paginated.map((p) => {
                const cfg = statusConfig[p.status];
                return (
                  <tr key={p.id} className="hover:bg-purple-900/10 transition-colors group">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {p.user[0]}
                        </div>
                        <span className="text-white font-medium whitespace-nowrap">{p.user}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-fuchsia-400 font-semibold whitespace-nowrap">
                      ₦{p.amount.toLocaleString()}
                    </td>
                    <td className="px-5 py-3 text-purple-300 whitespace-nowrap">{p.type}</td>
                    <td className="px-5 py-3 text-purple-300 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <CreditCard size={13} className="text-purple-500" />
                        {p.method}
                      </div>
                    </td>
                    <td className="px-5 py-3 text-purple-400 whitespace-nowrap">{p.date}</td>
                    <td className="px-5 py-3">
                      <span className={`flex items-center gap-1 w-fit text-xs px-2 py-0.5 rounded-full border ${cfg.classes}`}>
                        {cfg.icon}
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      {p.status === "pending" ? (
                        <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => updateStatus(p.id, "approved")}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-900/20 border border-green-900/30 text-green-400 hover:bg-green-900/40 text-xs font-medium transition-all"
                          >
                            <CheckCircle2 size={12} />
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(p.id, "rejected")}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-red-900/20 border border-red-900/30 text-red-400 hover:bg-red-900/40 text-xs font-medium transition-all"
                          >
                            <XCircle size={12} />
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-purple-600 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-purple-900/40">
          <p className="text-purple-400 text-xs">
            Showing {Math.min((page - 1) * PAGE_SIZE + 1, filtered.length)}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-md border border-purple-900/40 text-purple-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <span className="text-white text-xs font-medium px-1">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-md border border-purple-900/40 text-purple-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;