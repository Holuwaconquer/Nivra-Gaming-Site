import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  accent?: "fuchsia" | "purple" | "cyan" | "green";
}

const accentMap = {
  fuchsia: {
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/20",
    icon: "text-fuchsia-400",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    icon: "text-purple-400",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    icon: "text-cyan-400",
  },
  green: {
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    icon: "text-green-400",
  },
};

const StatCard = ({ title, value, icon: Icon, trend, accent = "fuchsia" }: StatCardProps) => {
  const colors = accentMap[accent];
  const isPositive = trend ? trend.value >= 0 : true;

  return (
    <div
      className={`relative bg-[#130020] border ${colors.border} rounded-xl p-5 overflow-hidden`}
    >
      {/* Background glow */}
      <div className={`absolute top-0 right-0 w-24 h-24 ${colors.bg} rounded-full blur-2xl -translate-y-6 translate-x-6 pointer-events-none`} />

      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-purple-400 text-xs font-medium uppercase tracking-widest mb-2">{title}</p>
          <p className="text-white text-2xl font-bold">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${isPositive ? "text-green-400" : "text-red-400"}`}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              <span>{isPositive ? "+" : ""}{trend.value}% {trend.label}</span>
            </div>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center flex-shrink-0`}>
          <Icon size={18} className={colors.icon} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;