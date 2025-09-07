import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { TrendingUp, Award, User } from 'lucide-react';

export function LifestyleHeroPage() {
  const { lifestyleScore, navigateTo } = useAppStore();
  
  const handleHeroClick = () => {
    navigateTo('lifestyle-details');
  };
  
  const getScoreStatus = (score: number) => {
    if (score >= 85) return { label: 'عالی', color: 'text-success' };
    if (score >= 75) return { label: 'خوب', color: 'text-brand-warm' };
    if (score >= 65) return { label: 'متوسط', color: 'text-warning' };
    return { label: 'نیازمند بهبود', color: 'text-danger' };
  };
  
  const status = getScoreStatus(lifestyleScore);
  
  return (
    <div className="min-h-screen pt-16 lg:pt-6 lg:pr-64 px-4 pb-20 lg:pb-8 persian-text" dir="rtl">
      <div className="max-w-sm mx-auto lg:max-w-2xl">
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
              امتیاز سبک زندگی
            </h1>
            <p className="text-gray-600 text-sm">
              ارزیابی جامع عادات روزانه شما
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
                  {lifestyleScore}
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
              عادات روزانه شما پایه خوبی برای سلامت بلندمدت فراهم می‌کند. با چند بهبود ساده می‌توانید نتایج بهتری کسب کنید.
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
              برای بررسی جزئیات کلیک کنید
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
                <p className="font-medium text-gray-900 text-sm">بهبود این ماه</p>
                <p className="text-xs text-gray-600">+۵ امتیاز نسبت به ماه گذشته</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <Award className="w-5 h-5 text-brand-warm" />
              <div className="text-right flex-1">
                <p className="font-medium text-gray-900 text-sm">نقاط قوت</p>
                <p className="text-xs text-gray-600">خواب و مدیریت استرس عالی</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center space-x-3 space-x-reverse">
              <User className="w-5 h-5 text-warning" />
              <div className="text-right flex-1">
                <p className="font-medium text-gray-900 text-sm">فرصت بهبود</p>
                <p className="text-xs text-gray-600">فعالیت بدنی و تغذیه</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}