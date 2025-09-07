import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  value: string | number;
  label: string;
  delay?: number;
  className?: string;
}

export function StatsCard({ icon: Icon, value, label, delay = 0, className = '' }: StatsCardProps) {
  return (
    <motion.div
      className={`bg-white border border-gray-100 rounded-2xl p-4 text-center ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <Icon className="w-5 h-5 text-brand-warm mx-auto mb-1" />
      <div className="text-sm font-medium text-gray-900 persian-nums">{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </motion.div>
  );
}