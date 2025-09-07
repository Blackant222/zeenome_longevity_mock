import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { TrendingUp, Award } from 'lucide-react';

export function LongevityHeroPage() {
  const { longevityScore, navigateTo } = useAppStore();
  
  const handleHeroClick = () => {
    navigateTo('longevity-details');
  };
  
  const getScoreStatus = (score: number) => {
    if (score >= 85) return { label: 'عالی', color: 'text-success' };
    if (score >= 75) return { label: 'خوب', color: 'text-brand-warm' };
    if (score >= 65) return { label: 'متوسط', color: 'text-warning' };
    return { label: 'نیازمند بهبود', color: 'text-danger' };
  };
  
  const status = getScoreStatus(longevityScore);
  
  return (
    <div className="min-h-screen pt-16 px-4 persian-text" dir="rtl">
      <div className="max-w-sm mx-auto">
        {/* Hero Section - Tappable */}
        <motion.div 
          className="py-16 cursor-pointer"
          onClick={handleHeroClick}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-medium text-gray-900 mb-2">
              امتیاز لانجویتی
            </h1>
            <p className="text-gray-600 text-sm">
              ارزیابی وضعیت سلامت بیولوژیکی شما
            </p>
          </div>
          
          {/* Main Score Display */}
          <motion.div 
            className="relative mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Gradient background */}
            <div className="w-48 h-48 mx-auto rounded-full bg-gradient-to-br from-brand-warm/15 via-brand-warm/5 to-transparent p-8 flex items-center justify-center">
              <div className="text-center">
                <motion.div 
                  className="text-5xl font-medium text-gray-900 mb-2 persian-nums"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  {longevityScore}
                </motion.div>
                <motion.div 
                  className={`text-sm font-medium ${status.color}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  {status.label}
                </motion.div>
              </div>
            </div>
          </motion.div>
          
          {/* Status Insight */}
          <motion.div 
            className="text-center mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <p className="text-gray-700 leading-relaxed text-sm">
              بیو مارکر های زیستی شما پتانسیل طول عمر خوبی با چندین فرصت بهینه‌سازی نشان می‌دهد.
            </p>
          </motion.div>
          
          {/* Tap indicator */}
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
              برای بررسی سیستم‌های بدنتان کلیک کنید
            </div>
          </motion.div>
        </motion.div>
        
        {/* Quick Stats */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        >
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <TrendingUp className="w-5 h-5 text-success" />
              <div className="text-right flex-1">
                <p className="font-medium text-gray-900 text-sm">سیستم‌های بهینه</p>
                <p className="text-xs text-gray-600">۴ از ۹ سیستم در وضعیت بهینه</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Award className="w-5 h-5 text-brand-warm" />
              <div className="text-right flex-1">
                <p className="font-medium text-gray-900 text-sm">سن بیولوژیک</p>
                <p className="text-xs text-gray-600">۰.۸ برابر کندتر از سن تقویمی پیر می‌شوید</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}