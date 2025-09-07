import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { Dumbbell, Calendar, Target, Check, Star } from 'lucide-react';
import { getLevelColor } from '../utils/interventionUtils';

export function WorkoutPlansMainPage() {
  const { workoutPlans, activateWorkoutPlan, navigateTo } = useAppStore();
  const activePlan = workoutPlans.find(plan => plan.isActive);

  return (
    <div className="min-h-screen pt-16 px-4 pb-8 persian-text" dir="rtl">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div 
          className="py-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mx-auto mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-medium text-gray-900 mb-2">
            برنامه‌های ورزشی
          </h1>
          <p className="text-sm text-gray-600">
            تمرینات قدرتی، کاردیو و انعطاف‌پذیری
          </p>
        </motion.div>

        {/* Active Plan */}
        {activePlan && <ActiveWorkoutPlan plan={activePlan} navigateTo={navigateTo} />}

        {/* Available Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="font-medium text-gray-900 mb-4">برنامه‌های موجود</h3>
          
          <div className="space-y-4">
            {workoutPlans.map((plan, index) => (
              <WorkoutPlanCard 
                key={plan.id}
                plan={plan}
                index={index}
                activateWorkoutPlan={activateWorkoutPlan}
                navigateTo={navigateTo}
              />
            ))}
          </div>
        </motion.div>

        {/* Info Card */}
        <motion.div
          className="mt-8 bg-gradient-to-br from-brand-warm/5 to-brand-warm/10 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h4 className="font-medium text-gray-900 text-sm mb-2">💪 نکته مهم</h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            برنامه‌های ورزشی بر اساس سطح آمادگی و اهداف شما طراحی شده‌اند. با مربی مشورت کنید.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

// Active Plan Component
function ActiveWorkoutPlan({ plan, navigateTo }: any) {
  return (
    <motion.div
      className="mb-6 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-3xl p-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="flex items-center space-x-2 space-x-reverse mb-3">
        <Check className="w-5 h-5 text-blue-600" />
        <span className="text-sm text-blue-700 font-medium">برنامه فعال</span>
      </div>
      
      <h3 className="text-lg font-medium text-gray-900 mb-2">{plan.name}</h3>
      <p className="text-sm text-gray-700 mb-4">{plan.description}</p>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <Calendar className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <div className="text-sm font-medium text-gray-900">{plan.duration}</div>
          <div className="text-xs text-gray-600">مدت</div>
        </div>
        <div className="text-center">
          <Target className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <div className="text-sm font-medium text-gray-900">{plan.frequency}</div>
          <div className="text-xs text-gray-600">تناوب</div>
        </div>
        <div className="text-center">
          <Dumbbell className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <div className="text-sm font-medium text-gray-900">{plan.level}</div>
          <div className="text-xs text-gray-600">سطح</div>
        </div>
      </div>
      
      <button
        onClick={() => navigateTo(`workout-plan-${plan.id}`)}
        className="w-full bg-blue-600 text-white py-3 rounded-2xl font-medium hover:bg-blue-700 transition-colors"
      >
        مشاهده جزئیات برنامه
      </button>
    </motion.div>
  );
}

// Plan Card Component  
function WorkoutPlanCard({ plan, index, activateWorkoutPlan, navigateTo }: any) {
  const getTypeColor = (type: string) => {
    const colors = {
      'قدرتی': 'text-red-600 bg-red-50 border-red-200',
      'قلبی‌عروقی': 'text-blue-600 bg-blue-50 border-blue-200',
      'انعطاف‌پذیری': 'text-green-600 bg-green-50 border-green-200',
      'ترکیبی': 'text-purple-600 bg-purple-50 border-purple-200',
      'یوگا': 'text-orange-600 bg-orange-50 border-orange-200'
    };
    return colors[type as keyof typeof colors] || 'text-gray-600 bg-gray-50 border-gray-200';
  };

  return (
    <motion.div
      className={`border rounded-3xl p-5 transition-all ${
        plan.isActive
          ? 'border-blue-300 bg-blue-50/50 opacity-60'
          : 'border-gray-200 bg-white hover:shadow-sm cursor-pointer'
      }`}
      onClick={() => !plan.isActive && navigateTo(`workout-plan-${plan.id}`)}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      whileTap={!plan.isActive ? { scale: 0.98 } : {}}
    >
      <div className="flex items-start justify-between mb-3">
        {plan.isActive ? (
          <div className="flex items-center space-x-1 space-x-reverse">
            <Check className="w-4 h-4 text-blue-600" />
            <span className="text-xs text-blue-600 font-medium">فعال</span>
          </div>
        ) : (
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(plan.type)}`}>
            {plan.type}
          </span>
        )}
        
        <div className="text-right flex-1 mr-3">
          <h4 className="font-medium text-gray-900 text-sm mb-1">{plan.name}</h4>
          <p className="text-xs text-gray-600 leading-relaxed">{plan.description}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-3 space-x-reverse">
          <span>{plan.duration}</span>
          <span className={`px-1 py-0.5 rounded text-xs ${getLevelColor(plan.level)}`}>
            {plan.level}
          </span>
        </div>
        
        <div className="flex items-center space-x-1 space-x-reverse">
          <Star className="w-3 h-3 text-brand-warm" />
          <span>{plan.benefits.length} مزیت</span>
        </div>
      </div>
      
      {!plan.isActive && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              activateWorkoutPlan(plan.id);
            }}
            className="w-full bg-brand-warm text-white py-2 rounded-xl text-sm font-medium hover:bg-brand-warm-dark transition-colors"
          >
            فعال‌سازی این برنامه
          </button>
        </div>
      )}
    </motion.div>
  );
}