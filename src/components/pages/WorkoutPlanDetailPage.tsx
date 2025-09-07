import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { Dumbbell, Clock, Target, CheckCircle, Zap, Users } from 'lucide-react';

export function WorkoutPlanDetailPage({ planId }: { planId: string }) {
  const { workoutPlans, activateWorkoutPlan } = useAppStore();
  const plan = workoutPlans.find(p => p.id === planId);

  if (!plan) {
    return (
      <div className="min-h-screen pt-16 lg:pt-6 lg:pr-64 px-4 pb-20 lg:pb-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">برنامه ورزشی یافت نشد</p>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'مبتدی': return 'bg-green-100 text-green-700';
      case 'متوسط': return 'bg-yellow-100 text-yellow-700';
      case 'پیشرفته': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen pt-16 lg:pt-6 lg:pr-64 px-4 pb-20 lg:pb-8 persian-text" dir="rtl">
      <div className="max-w-sm mx-auto lg:max-w-2xl">
        <PlanHeader plan={plan} activateWorkoutPlan={activateWorkoutPlan} />
        <PlanStats plan={plan} getLevelColor={getLevelColor} />
        <WorkoutSchedule plan={plan} />
        <PlanBenefits benefits={plan.benefits} />
        <Equipment equipment={plan.equipment} />
      </div>
    </div>
  );
}

function PlanHeader({ plan, activateWorkoutPlan }: any) {
  return (
    <motion.div 
      className="py-6 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 rounded-full bg-brand-warm/10 flex items-center justify-center mx-auto mb-3">
        <Dumbbell className="w-8 h-8 text-brand-warm" />
      </div>
      <h1 className="text-xl font-medium text-gray-900 mb-2">{plan.name}</h1>
      <p className="text-sm text-gray-600">{plan.description}</p>
      
      {!plan.isActive && (
        <button
          onClick={() => activateWorkoutPlan(plan.id)}
          className="mt-4 bg-brand-warm text-white px-6 py-2 rounded-full hover:bg-brand-warm-dark transition-colors"
        >
          فعال‌سازی برنامه
        </button>
      )}
    </motion.div>
  );
}

function PlanStats({ plan, getLevelColor }: any) {
  return (
    <motion.div
      className="grid grid-cols-3 gap-3 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
        <Clock className="w-5 h-5 text-brand-warm mx-auto mb-1" />
        <div className="text-sm font-medium text-gray-900">{plan.duration}</div>
        <div className="text-xs text-gray-600">مدت زمان</div>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
        <Target className="w-5 h-5 text-brand-warm mx-auto mb-1" />
        <div className="text-sm font-medium text-gray-900">{plan.frequency}</div>
        <div className="text-xs text-gray-600">تناوب</div>
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl p-4 text-center">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(plan.level)}`}>
          {plan.level}
        </div>
        <div className="text-xs text-gray-600 mt-1">سطح</div>
      </div>
    </motion.div>
  );
}

function WorkoutSchedule({ plan }: any) {
  return (
    <motion.div
      className="space-y-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h3 className="font-medium text-gray-900">برنامه تمرین</h3>
      
      {plan.exercises.map((day: any, index: number) => (
        <div key={index} className="bg-white border border-gray-100 rounded-2xl p-4">
          <h4 className="font-medium text-gray-900 mb-3">{day.day}</h4>
          <div className="space-y-3">
            {day.exercises.map((exercise: any, exerciseIndex: number) => (
              <div key={exerciseIndex} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <CheckCircle className="w-4 h-4 text-brand-warm flex-shrink-0" />
                  <div className="text-sm">
                    {exercise.sets && (
                      <span className="text-gray-500 persian-nums">
                        {exercise.sets} ست × {exercise.reps}
                      </span>
                    )}
                    {exercise.duration && (
                      <span className="text-gray-500 persian-nums">
                        {exercise.duration}
                      </span>
                    )}
                    {exercise.rest && (
                      <span className="text-gray-400 text-xs mr-2">
                        استراحت: {exercise.rest}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-900 font-medium">{exercise.name}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function PlanBenefits({ benefits }: any) {
  return (
    <motion.div
      className="mb-6 bg-gradient-to-br from-success/5 to-success/10 rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h3 className="font-medium text-gray-900 mb-3">مزایای این برنامه</h3>
      <div className="grid grid-cols-2 gap-2">
        {benefits.map((benefit: string, index: number) => (
          <div key={index} className="bg-white border border-success/20 rounded-lg p-2 text-center">
            <span className="text-xs text-success font-medium">{benefit}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Equipment({ equipment }: any) {
  return (
    <motion.div
      className="bg-blue-50 border border-blue-200 rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <div className="flex items-center space-x-2 space-x-reverse mb-3">
        <Users className="w-5 h-5 text-blue-600" />
        <h3 className="font-medium text-gray-900">تجهیزات مورد نیاز</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {equipment.map((item: string, index: number) => (
          <div key={index} className="bg-white border border-blue-200 rounded-lg px-3 py-1">
            <span className="text-sm text-blue-700">{item}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}