import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { 
  CheckCircle, 
  Calendar, 
  Flame, 
  Target, 
  TrendingUp, 
  Clock,
  Star,
  RotateCcw,
  X,
  Award
} from 'lucide-react';
import { useState } from 'react';

interface InterventionDetailPageProps {
  interventionId: string;
}

export function InterventionDetailPage({ interventionId }: InterventionDetailPageProps) {
  const { 
    interventions, 
    markInterventionComplete, 
    updateInterventionStatus,
    unselectIntervention 
  } = useAppStore();
  
  const intervention = interventions.find(i => i.id === interventionId);
  const [showConfetti, setShowConfetti] = useState(false);

  if (!intervention) {
    return (
      <div className="min-h-screen pt-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">مداخله یافت نشد</p>
        </div>
      </div>
    );
  }

  const handleMarkComplete = () => {
    markInterventionComplete(intervention.id);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleRemove = () => {
    unselectIntervention(intervention.id);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'آسان': return 'text-success bg-success/10';
      case 'متوسط': return 'text-warning bg-warning/10';
      case 'دشوار': return 'text-danger bg-danger/10';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const progressPercentage = intervention.totalDays ? 
    Math.round((intervention.completedDays || 0) / intervention.totalDays * 100) : 0;

  return (
    <div className="min-h-screen pt-16 px-4 pb-8 persian-text" dir="rtl">
      <div className="max-w-sm mx-auto">
        {/* Confetti Effect */}
        {showConfetti && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-brand-warm rounded-full"
                initial={{ 
                  x: window.innerWidth / 2, 
                  y: window.innerHeight / 2,
                  scale: 0 
                }}
                animate={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 1
                }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        )}

        {/* Header */}
        <motion.div 
          className="py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleRemove}
              className="p-2 text-gray-400 hover:text-danger transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center flex-1">
              <span className="text-xs text-gray-500">{intervention.category}</span>
              <h1 className="text-lg font-medium text-gray-900">
                {intervention.title}
              </h1>
            </div>
            <div className="w-8" />
          </div>

          {/* Status and Difficulty */}
          <div className="flex items-center justify-center space-x-3 space-x-reverse">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(intervention.difficulty)}`}>
              {intervention.difficulty}
            </span>
            <span className="text-xs text-gray-500">
              {intervention.duration}
            </span>
          </div>
        </motion.div>

        {/* Progress Section */}
        {intervention.userSelected && (
          <motion.div
            className="bg-gradient-to-br from-brand-warm/5 to-brand-warm/10 rounded-2xl p-4 mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Flame className="w-4 h-4 text-orange-500" />
                </div>
                <div className="text-lg font-medium text-gray-900 persian-nums">
                  {intervention.currentStreak || 0}
                </div>
                <div className="text-xs text-gray-600">استریک فعلی</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <Award className="w-4 h-4 text-brand-warm" />
                </div>
                <div className="text-lg font-medium text-gray-900 persian-nums">
                  {intervention.longestStreak || 0}
                </div>
                <div className="text-xs text-gray-600">بهترین استریک</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-1">
                  <CheckCircle className="w-4 h-4 text-success" />
                </div>
                <div className="text-lg font-medium text-gray-900 persian-nums">
                  {intervention.completedDays || 0}
                </div>
                <div className="text-xs text-gray-600">روز تکمیل</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>پیشرفت</span>
                <span className="persian-nums">{progressPercentage}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-warm rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Mark Complete Button */}
            <button
              onClick={handleMarkComplete}
              className="w-full bg-brand-warm text-white py-3 rounded-2xl font-medium hover:bg-brand-warm-dark transition-colors flex items-center justify-center space-x-2 space-x-reverse"
            >
              <CheckCircle className="w-5 h-5" />
              <span>تکمیل امروز</span>
            </button>
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          className="bg-white border border-gray-100 rounded-2xl p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="font-medium text-gray-900 mb-2">توضیحات</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {intervention.description}
          </p>
          <div className="mt-3 pt-3 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-900 mb-1">دلیل</h4>
            <p className="text-sm text-gray-600">
              {intervention.reason}
            </p>
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          className="bg-white border border-gray-100 rounded-2xl p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="font-medium text-gray-900 mb-3">مزایا</h3>
          <div className="grid grid-cols-2 gap-2">
            {intervention.benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-success/5 border border-success/10 rounded-lg p-2 text-center"
              >
                <span className="text-xs text-success font-medium">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="bg-white border border-gray-100 rounded-2xl p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="font-medium text-gray-900 mb-3">راهنمای اجرا</h3>
          <div className="space-y-2">
            {intervention.instructions.map((instruction, index) => (
              <div key={index} className="flex items-start space-x-2 space-x-reverse">
                <div className="w-5 h-5 rounded-full bg-brand-warm/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs text-brand-warm font-medium persian-nums">
                    {index + 1}
                  </span>
                </div>
                <span className="text-sm text-gray-700 leading-relaxed">
                  {instruction}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tips */}
        <motion.div
          className="bg-white border border-gray-100 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="font-medium text-gray-900 mb-3">نکات مفید</h3>
          <div className="space-y-2">
            {intervention.tips.map((tip, index) => (
              <div key={index} className="flex items-start space-x-2 space-x-reverse">
                <Star className="w-4 h-4 text-brand-warm flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700 leading-relaxed">
                  {tip}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}