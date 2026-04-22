import { Users, Gamepad2, Activity, GitBranch, CreditCard, Trophy, UserCheck, AlertCircle } from "lucide-react";
import StatCard from "../components/StatCard";

const recentUsers = [
  { id: 1, name: "ShadowBlade99", email: "shadow@mail.com", joinedAt: "Apr 20, 2025", status: "active" },
  { id: 2, name: "NeonHunter", email: "neon@mail.com", joinedAt: "Apr 19, 2025", status: "active" },
  { id: 3, name: "CryptoGhost", email: "crypto@mail.com", joinedAt: "Apr 18, 2025", status: "inactive" },
  { id: 4, name: "VoidWalker", email: "void@mail.com", joinedAt: "Apr 17, 2025", status: "active" },
  { id: 5, name: "PixelRaider", email: "pixel@mail.com", joinedAt: "Apr 16, 2025", status: "banned" },
];

const recentPayments = [
  { id: 1, user: "ShadowBlade99", amount: "₦5,000", type: "Withdrawal", status: "pending" },
  { id: 2, user: "NeonHunter", amount: "₦2,500", type: "Reward", status: "approved" },
  { id: 3, user: "CryptoGhost", amount: "₦10,000", type: "Withdrawal", status: "rejected" },
  { id: 4, user: "VoidWalker", amount: "₦1,500", type: "Reward", status: "approved" },
];

const statusBadge = (status: string) => {
  const map: Record<string, string> = {
    active: "bg-green-500/15 text-green-400 border-green-500/20",
    inactive: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    banned: "bg-red-500/15 text-red-400 border-red-500/20",
    pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
    approved: "bg-green-500/15 text-green-400 border-green-500/20",
    rejected: "bg-red-500/15 text-red-400 border-red-500/20",
  };
  return map[status] ?? "bg-purple-500/15 text-purple-400 border-purple-500/20";
};

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-white text-2xl font-bold">Dashboard</h1>
        <p className="text-purple-400 text-sm mt-1">Welcome back, Admin. Here's what's happening on Nivra.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Total Users" value="4,821" icon={Users} trend={{ value: 12, label: "this week" }} accent="fuchsia" />
        <StatCard title="Active Now" value="318" icon={Activity} trend={{ value: 5, label: "vs yesterday" }} accent="cyan" />
        <StatCard title="Total Games" value="14" icon={Gamepad2} accent="purple" />
        <StatCard title="Referrals Paid" value="₦320,000" icon={GitBranch} trend={{ value: 8, label: "this month" }} accent="green" />
      </div>

      {/* Secondary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Pending Payments" value="23" icon={CreditCard} accent="fuchsia" />
        <StatCard title="Top Score" value="98,450 pts" icon={Trophy} accent="cyan" />
        <StatCard title="Verified Users" value="3,105" icon={UserCheck} accent="purple" />
      </div>

      {/* Alert Banner */}
      <div className="flex items-center gap-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3">
        <AlertCircle size={18} className="text-yellow-400 flex-shrink-0" />
        <p className="text-yellow-300 text-sm">
          <span className="font-semibold">23 payments</span> are awaiting your review and approval.
        </p>
      </div>

      {/* Bottom Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-[#130020] border border-purple-900/40 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-purple-900/40 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Recent Users</h2>
            <a href="/admin/users" className="text-fuchsia-400 text-xs hover:underline">View all</a>
          </div>
          <div className="divide-y divide-purple-900/30">
            {recentUsers.map((u) => (
              <div key={u.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-fuchsia-600 to-purple-800 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {u.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{u.name}</p>
                  <p className="text-purple-400 text-xs truncate">{u.email}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge(u.status)} capitalize`}>
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Payments */}
        <div className="bg-[#130020] border border-purple-900/40 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-purple-900/40 flex items-center justify-between">
            <h2 className="text-white font-semibold text-sm">Recent Payments</h2>
            <a href="/admin/payments" className="text-fuchsia-400 text-xs hover:underline">View all</a>
          </div>
          <div className="divide-y divide-purple-900/30">
            {recentPayments.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                <div className="w-8 h-8 rounded-full bg-purple-900/40 border border-purple-700/30 flex items-center justify-center flex-shrink-0">
                  <CreditCard size={14} className="text-purple-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{p.user}</p>
                  <p className="text-purple-400 text-xs">{p.type}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-white text-sm font-semibold">{p.amount}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${statusBadge(p.status)} capitalize`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;