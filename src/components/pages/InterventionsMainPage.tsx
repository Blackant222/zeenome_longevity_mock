import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { Plus, Target, Award, Flame } from 'lucide-react';
import { useState } from 'react';
import { getStatusIcon, getStatusColor, getDifficultyColor } from '../utils/interventionUtils';

export function InterventionsMainPage() {
  const { 
    interventions, 
    userStats, 
    achievements, 
    navigateTo 
  } = useAppStore();
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'browse'>('dashboard');
  const selectedInterventions = interventions.filter(i => i.userSelected);
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  
  return (
    <div className="min-h-screen pt-16 px-4 pb-8 persian-text" dir="rtl">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div 
          className="py-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-medium text-gray-900 text-center mb-6">
            اقدام‌های بهینه‌سازی
          </h1>
          
          {/* Tab Navigation */}
          <div className="flex bg-gray-100 rounded-2xl p-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex-1 flex items-center justify-center space-x-1 space-x-reverse py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-white text-brand-warm shadow-sm'
                  : 'text-gray-600 hover:text-brand-warm'
              }`}
            >
              <Target className="w-4 h-4" />
              <span>داشبورد</span>
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`flex-1 flex items-center justify-center space-x-1 space-x-reverse py-2 px-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'browse'
                  ? 'bg-white text-brand-warm shadow-sm'
                  : 'text-gray-600 hover:text-brand-warm'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>مرور</span>
            </button>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'dashboard' && (
            <DashboardTab 
              userStats={userStats}
              unlockedAchievements={unlockedAchievements}
              selectedInterventions={selectedInterventions}
              setActiveTab={setActiveTab}
              navigateTo={navigateTo}
            />
          )}
          {activeTab === 'browse' && <InterventionBrowser />}
        </motion.div>

        {/* Quick Links to Diet and Workout Plans */}
        <motion.div 
          className="mt-8 space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="font-medium text-gray-900 mb-3">برنامه‌های تخصصی</h3>
          
          <button
            onClick={() => navigateTo('diet-plans-main')}
            className="w-full bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl p-4 text-right hover:from-green-100 hover:to-green-200 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-green-600">🍽️</div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">برنامه‌های غذایی</h4>
                <p className="text-xs text-gray-600">رژیم‌های تخصصی و برنامه تغذیه</p>
              </div>
            </div>
          </button>
          
          <button
            onClick={() => navigateTo('workout-plans-main')}
            className="w-full bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4 text-right hover:from-blue-100 hover:to-blue-200 transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="text-blue-600">💪</div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">برنامه‌های ورزشی</h4>
                <p className="text-xs text-gray-600">تمرینات قدرتی، کاردیو و انعطاف‌پذیری</p>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab({ userStats, unlockedAchievements, selectedInterventions, setActiveTab, navigateTo }: any) {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
          <div className="text-2xl font-medium text-brand-warm persian-nums mb-1">
            {userStats.activeInterventions}
          </div>
          <div className="text-xs text-gray-600">فعال</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
          <div className="text-2xl font-medium text-success persian-nums mb-1">
            {userStats.longestStreak}
          </div>
          <div className="text-xs text-gray-600">بیشترین استریک</div>
        </div>
      </div>

      {/* Achievements */}
      {unlockedAchievements.length > 0 && (
        <div className="bg-gradient-to-br from-brand-warm/5 to-brand-warm/10 rounded-2xl p-4">
          <div className="flex items-center space-x-2 space-x-reverse mb-3">
            <Award className="w-5 h-5 text-brand-warm" />
            <h3 className="font-medium text-gray-900">دستاوردهای اخیر</h3>
          </div>
          <div className="space-y-2">
            {unlockedAchievements.slice(0, 2).map((achievement) => (
              <div key={achievement.id} className="flex items-center space-x-2 space-x-reverse">
                <Award className="w-4 h-4 text-brand-warm" />
                <span className="text-sm text-gray-700">{achievement.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Interventions */}
      <ActiveInterventions 
        selectedInterventions={selectedInterventions}
        setActiveTab={setActiveTab}
        navigateTo={navigateTo}
      />
    </div>
  );
}

// Active Interventions Component
function ActiveInterventions({ selectedInterventions, setActiveTab, navigateTo }: any) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900">اقدام‌های فعال</h3>
        <button
          onClick={() => setActiveTab('browse')}
          className="text-brand-warm text-sm hover:text-brand-warm-dark"
        >
          افزودن جدید
        </button>
      </div>
      
      {selectedInterventions.length === 0 ? (
        <div className="bg-gray-50 rounded-2xl p-6 text-center">
          <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-600 text-sm mb-3">
            هنوز هیچ اقدامی انتخاب نکرده‌اید
          </p>
          <button
            onClick={() => setActiveTab('browse')}
            className="bg-brand-warm text-white px-4 py-2 rounded-full text-sm"
          >
            شروع کنید
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {selectedInterventions.map((intervention: any) => {
            const StatusIcon = getStatusIcon(intervention.status);
            const statusColor = getStatusColor(intervention.status);
            
            return (
              <motion.div
                key={intervention.id}
                className="bg-white border border-gray-100 rounded-2xl p-4"
                whileTap={{ scale: 0.98 }}
                onClick={() => navigateTo(`intervention-detail-${intervention.id}`)}
              >
                <div className="flex items-start space-x-3 space-x-reverse">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {intervention.status}
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm text-right">
                        {intervention.title}
                      </h3>
                    </div>
                    
                    {intervention.currentStreak !== undefined && (
                      <div className="flex items-center space-x-4 space-x-reverse mt-2">
                        <div className="flex items-center space-x-1 space-x-reverse">
                          <Flame className="w-3 h-3 text-orange-500" />
                          <span className="text-xs text-gray-600 persian-nums">
                            {intervention.currentStreak} روز
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 persian-nums">
                          {intervention.completedDays}/{intervention.totalDays || 30}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// Intervention Browser Component
function InterventionBrowser() {
  const { interventions, selectIntervention } = useAppStore();
  const [selectedCategory, setSelectedCategory] = useState('همه');
  
  const categories = ['همه', ...Array.from(new Set(interventions.map(i => i.category)))];
  const availableInterventions = interventions.filter(i => !i.userSelected);
  
  const filteredInterventions = selectedCategory === 'همه' 
    ? availableInterventions 
    : availableInterventions.filter(i => i.category === selectedCategory);

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex space-x-2 space-x-reverse overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category
                ? 'bg-brand-warm text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-brand-warm/10 hover:text-brand-warm'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Interventions Grid */}
      <div className="space-y-3">
        {filteredInterventions.map((intervention, index) => (
          <motion.div
            key={intervention.id}
            className="bg-white border border-gray-100 rounded-2xl p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
          >
            <div className="flex items-start justify-between mb-3">
              <button
                onClick={() => selectIntervention(intervention.id)}
                className="bg-brand-warm text-white px-3 py-1 rounded-full text-xs hover:bg-brand-warm-dark transition-colors"
              >
                انتخاب
              </button>
              <div className="text-right flex-1 mr-3">
                <h3 className="font-medium text-gray-900 text-sm mb-1">
                  {intervention.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {intervention.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 space-x-reverse">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(intervention.difficulty)}`}>
                  {intervention.difficulty}
                </span>
                <span className="text-xs text-gray-500">
                  {intervention.duration}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {intervention.category}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-1">
              {intervention.benefits.slice(0, 3).map((benefit, i) => (
                <span key={i} className="bg-gray-50 text-gray-600 px-2 py-1 rounded text-xs">
                  {benefit}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}