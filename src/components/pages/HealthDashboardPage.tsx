import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { CircularScore } from '../CircularScore';
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  Award, 
  Flame, 
  Lightbulb,
  ChevronLeft,
  Activity,
  Heart,
  Pill,
  ClipboardList,
  Utensils,
  Dumbbell
} from 'lucide-react';

export function HealthDashboardPage() {
  const { 
    overallHealthScore,
    lifestyleScore, 
    longevityScore, 
    userStats, 
    achievements,
    navigateTo,
    getTodayTip,
    lifestyleCategories,
    longevitySystems,
    interventions
  } = useAppStore();
  
  const todayTip = getTodayTip();
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const selectedInterventions = interventions.filter(i => i.userSelected);
  
  // Quick access sections
  const quickAccessItems = [
    { 
      id: 'lifestyle', 
      title: 'سبک زندگی', 
      score: lifestyleScore, 
      icon: Activity, 
      color: 'bg-blue-50 border-blue-200 text-blue-700',
      route: 'lifestyle-hero'
    },
    { 
      id: 'longevity', 
      title: 'امتیاز لانجویتی', 
      score: longevityScore, 
      icon: Heart, 
      color: 'bg-red-50 border-red-200 text-red-700',
      route: 'longevity-hero'
    },
    { 
      id: 'biomarkers', 
      title: 'بیو مارکر ها', 
      score: 75, 
      icon: Pill, 
      color: 'bg-green-50 border-green-200 text-green-700',
      route: 'biomarkers-hero'
    },
    { 
      id: 'interventions', 
      title: 'اقدام‌ها', 
      score: userStats.activeInterventions, 
      icon: ClipboardList, 
      color: 'bg-purple-50 border-purple-200 text-purple-700',
      route: 'interventions-main',
      isCount: true
    }
  ];

  const quickActions = [
    { 
      title: 'برنامه‌های غذایی', 
      icon: Utensils, 
      color: 'bg-orange-50 text-orange-600',
      route: 'diet-plans-main'
    },
    { 
      title: 'برنامه‌های ورزشی', 
      icon: Dumbbell, 
      color: 'bg-blue-50 text-blue-600',
      route: 'workout-plans-main'
    }
  ];

  const getScoreStatus = (score: number) => {
    if (score >= 85) return { label: 'عالی', color: 'text-success' };
    if (score >= 75) return { label: 'خوب', color: 'text-brand-warm' };
    if (score >= 65) return { label: 'متوسط', color: 'text-warning' };
    return { label: 'نیازمند بهبود', color: 'text-danger' };
  };

  const overallStatus = getScoreStatus(overallHealthScore);

  return (
    <div className="min-h-screen pt-16 lg:pt-6 lg:pr-64 px-4 pb-20 lg:pb-8 persian-text" dir="rtl">
      <div className="max-w-2xl mx-auto lg:max-w-4xl">
        {/* Header */}
        <motion.div 
          className="py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-medium text-gray-900 mb-2">
            داشبورد سلامتی شما
          </h1>
          <p className="text-gray-600">
            نمای کلی وضعیت سلامت و پیشرفت شما
          </p>
        </motion.div>

        {/* Overall Health Score */}
        <motion.div
          className="mb-8 bg-gradient-to-br from-brand-warm/5 to-brand-warm/10 rounded-3xl p-6"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-right">
              <h2 className="text-lg font-medium text-gray-900">امتیاز کلی سلامت</h2>
              <p className="text-sm text-gray-600">بر اساس تمام شاخص‌های سلامتی</p>
            </div>
            <div className="flex items-center space-x-2 space-x-reverse">
              <CircularScore score={overallHealthScore} size="lg" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className={`text-sm font-medium ${overallStatus.color}`}>
              {overallStatus.label}
            </div>
            <div className="flex items-center space-x-1 space-x-reverse text-success text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+۳ امتیاز این هفته</span>
            </div>
          </div>
        </motion.div>

        {/* Daily Tip */}
        {todayTip && (
          <motion.div
            className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1 text-right">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                    {todayTip.category}
                  </span>
                  <h3 className="font-medium text-gray-900">
                    {todayTip.icon} {todayTip.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  {todayTip.description}
                </p>
                {todayTip.actionable && (
                  <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition-colors">
                    {todayTip.actionable}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Access Grid */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="font-medium text-gray-900 mb-4">دسترسی سریع</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickAccessItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  onClick={() => navigateTo(item.route)}
                  className={`${item.color} border rounded-2xl p-4 text-center hover:shadow-sm transition-all`}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2" />
                  <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                  <div className="text-lg font-medium persian-nums">
                    {item.isCount ? item.score : item.score}
                    {!item.isCount && <span className="text-sm opacity-70"> امتیاز</span>}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Stats & Streaks */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Active Streaks */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center space-x-2 space-x-reverse mb-3">
              <Flame className="w-5 h-5 text-orange-500" />
              <h4 className="font-medium text-gray-900">استریک‌های فعال</h4>
            </div>
            <div className="text-2xl font-medium text-orange-500 persian-nums mb-1">
              {userStats.currentStreaks}
            </div>
            <p className="text-xs text-gray-600">اقدام در حال انجام</p>
          </div>

          {/* Monthly Goals */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center space-x-2 space-x-reverse mb-3">
              <Target className="w-5 h-5 text-brand-warm" />
              <h4 className="font-medium text-gray-900">اهداف ماهانه</h4>
            </div>
            <div className="text-2xl font-medium text-brand-warm persian-nums mb-1">
              {userStats.monthlyGoals}
            </div>
            <p className="text-xs text-gray-600">هدف تکمیل شده</p>
          </div>

          {/* Achievements */}
          <div className="bg-white border border-gray-100 rounded-2xl p-4">
            <div className="flex items-center space-x-2 space-x-reverse mb-3">
              <Award className="w-5 h-5 text-yellow-500" />
              <h4 className="font-medium text-gray-900">دستاوردها</h4>
            </div>
            <div className="text-2xl font-medium text-yellow-500 persian-nums mb-1">
              {unlockedAchievements.length}
            </div>
            <p className="text-xs text-gray-600">از {achievements.length} دستاورد</p>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={() => navigateTo('interventions-main')}
              className="text-brand-warm text-sm hover:text-brand-warm-dark flex items-center space-x-1 space-x-reverse"
            >
              <ChevronLeft className="w-4 h-4 rtl-flip" />
              <span>مشاهده همه</span>
            </button>
            <h3 className="font-medium text-gray-900">اقدام‌های اخیر</h3>
          </div>
          
          {selectedInterventions.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <Target className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600 text-sm mb-3">
                هنوز هیچ اقدامی شروع نکرده‌اید
              </p>
              <button
                onClick={() => navigateTo('interventions-main')}
                className="bg-brand-warm text-white px-4 py-2 rounded-full text-sm"
              >
                شروع کنید
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {selectedInterventions.slice(0, 3).map((intervention) => (
                <motion.div
                  key={intervention.id}
                  className="bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-sm transition-all"
                  onClick={() => navigateTo(`intervention-detail-${intervention.id}`)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 space-x-reverse">
                      {intervention.currentStreak !== undefined && (
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Flame className="w-3 h-3 text-orange-500" />
                          <span className="text-xs text-gray-600 persian-nums">
                            {intervention.currentStreak}
                          </span>
                        </div>
                      )}
                      <span className="text-xs text-gray-500">{intervention.category}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 text-sm text-right">
                      {intervention.title}
                    </h4>
                  </div>
                  
                  {intervention.currentStreak !== undefined && (
                    <div className="mt-2">
                      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-warm rounded-full transition-all duration-500"
                          style={{ 
                            width: `${Math.min((intervention.completedDays || 0) / (intervention.totalDays || 30) * 100, 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h3 className="font-medium text-gray-900 mb-4">عملیات سریع</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.title}
                  onClick={() => navigateTo(action.route)}
                  className={`${action.color} border rounded-2xl p-4 text-right hover:shadow-sm transition-all`}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <div className="flex items-center justify-between">
                    <ChevronLeft className="w-5 h-5 rtl-flip opacity-50" />
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{action.title}</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}