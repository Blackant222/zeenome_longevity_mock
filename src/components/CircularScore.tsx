import { motion } from 'motion/react';

interface CircularScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  delay?: number;
  className?: string;
}

export function CircularScore({ 
  score = 0, 
  size = 'md', 
  showLabel = false, 
  delay = 0, 
  className = '' 
}: CircularScoreProps) {
  const sizes = {
    sm: { width: 40, height: 40, strokeWidth: 3, fontSize: 'text-xs' },
    md: { width: 60, height: 60, strokeWidth: 4, fontSize: 'text-sm' },
    lg: { width: 80, height: 80, strokeWidth: 5, fontSize: 'text-lg' }
  };
  
  // Ensure size is valid, fallback to 'md' if not
  const validSize = size && sizes[size] ? size : 'md';
  const { width, height, strokeWidth, fontSize } = sizes[validSize];
  
  // Ensure score is valid number between 0-100
  const validScore = Math.max(0, Math.min(100, Number(score) || 0));
  
  const radius = (width - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (validScore / 100) * circumference;
  
  const getScoreColor = (score: number) => {
    if (score >= 85) return '#16a34a'; // success
    if (score >= 75) return '#a59d83'; // brand-warm
    if (score >= 65) return '#d97706'; // warning
    return '#dc2626'; // danger
  };
  
  const color = getScoreColor(validScore);
  
  return (
    <div className={`relative ${className}`}>
      <svg width={width} height={height} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke="#f3f4f6"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <motion.circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ 
            duration: 1.5, 
            delay: delay / 1000, 
            ease: "easeOut" 
          }}
        />
      </svg>
      
      {/* Score text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span 
          className={`font-medium text-gray-900 persian-nums ${fontSize}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            delay: (delay + 500) / 1000 
          }}
        >
          {validScore}
        </motion.span>
      </div>
      
      {showLabel && (
        <motion.div
          className="text-center mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5, 
            delay: (delay + 800) / 1000 
          }}
        >
          <div className={`text-xs font-medium ${
            validScore >= 85 ? 'text-success' :
            validScore >= 75 ? 'text-brand-warm' :
            validScore >= 65 ? 'text-warning' : 'text-danger'
          }`}>
            {validScore >= 85 ? 'عالی' :
             validScore >= 75 ? 'خوب' :
             validScore >= 65 ? 'متوسط' : 'نیازمند بهبود'}
          </div>
        </motion.div>
      )}
    </div>
  );
}