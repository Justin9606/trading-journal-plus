import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  change: string;
  icon: LucideIcon;
  color: string;
  bgGlow: string;
}

export function StatCard({ label, value, change, icon: Icon, color, bgGlow }: StatCardProps) {
  return (
    <div className={`glass-effect rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${bgGlow} hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-400 text-sm">{label}</span>
        <Icon className={`h-5 w-5 ${color}`} />
      </div>
      <p className="text-2xl font-bold mb-1 text-white">{value}</p>
      <p className={change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
        {change}
      </p>
    </div>
  );
}