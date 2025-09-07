import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { Utensils, Clock, Target, CheckCircle, Zap } from 'lucide-react';
import { MEAL_LABELS, MEAL_ICONS } from '../utils/planConstants';

export function DietPlanDetailPage({ planId }: { planId: string }) {
  const { dietPlans, activateDietPlan } = useAppStore();
  const plan = dietPlans.find(p => p.id === planId);

  if (!plan) {
    return (
      <div className="min-h-screen pt-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">برنامه غذایی یافت نشد</p>
        </div>
      </div>
    );
  }

  const macroData = [
    { label: 'پروتئین', value: plan.macros.protein, color: 'bg-blue-500' },
    { label: 'کربوهیدرات', value: plan.macros.carbs, color: 'bg-green-500' },
    { label: 'چربی', value: plan.macros.fat, color: 'bg-yellow-500' }
  ];

  return (
    <div className="min-h-screen pt-16 px-4 pb-8 persian-text" dir="rtl">
      <div className="max-w-sm mx-auto">
        <PlanHeader plan={plan} activateDietPlan={activateDietPlan} />
        <PlanStats plan={plan} />
        <MacrosBreakdown macroData={macroData} />
        <DailyMeals plan={plan} />
        <PlanBenefits benefits={plan.benefits} />
        {plan.restrictions.length > 0 && <PlanRestrictions restrictions={plan.restrictions} />}
      </div>
    </div>
  );
}

function PlanHeader({ plan, activateDietPlan }: any) {
  return (
    <motion.div 
      className="py-6 text-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-16 h-16 rounded-full bg-brand-warm/10 flex items-center justify-center mx-auto mb-3">
        <Utensils className="w-8 h-8 text-brand-warm" />
      </div>
      <h1 className="text-xl font-medium text-gray-900 mb-2">{plan.name}</h1>
      <p className="text-sm text-gray-600">{plan.description}</p>
      
      {!plan.isActive && (
        <button
          onClick={() => activateDietPlan(plan.id)}
          className="mt-4 bg-brand-warm text-white px-6 py-2 rounded-full hover:bg-brand-warm-dark transition-colors"
        >
          فعال‌سازی برنامه
        </button>
      )}
    </motion.div>
  );
}

function PlanStats({ plan }: any) {
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 mb-6"
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
        <Zap className="w-5 h-5 text-brand-warm mx-auto mb-1" />
        <div className="text-sm font-medium text-gray-900 persian-nums">{plan.macros.calories}</div>
        <div className="text-xs text-gray-600">کالری روزانه</div>
      </div>
    </motion.div>
  );
}

function MacrosBreakdown({ macroData }: any) {
  return (
    <motion.div
      className="bg-white border border-gray-100 rounded-2xl p-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="font-medium text-gray-900 mb-4">ترکیب ماکرونوترینت‌ها</h3>
      <div className="space-y-3">
        {macroData.map((macro: any) => (
          <div key={macro.label}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="persian-nums">{macro.value}%</span>
              <span className="text-gray-700">{macro.label}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className={`h-full ${macro.color} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${macro.value}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function DailyMeals({ plan }: any) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      {Object.entries(MEAL_LABELS).map(([key, label]) => (
        <div key={key} className="bg-white border border-gray-100 rounded-2xl p-4">
          <div className="flex items-center space-x-2 space-x-reverse mb-3">
            <span className="text-lg">{MEAL_ICONS[key as keyof typeof MEAL_ICONS]}</span>
            <h4 className="font-medium text-gray-900">{label}</h4>
          </div>
          <div className="space-y-2">
            {plan.meals[key].map((item: string, index: number) => (
              <div key={index} className="flex items-center space-x-2 space-x-reverse">
                <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                <span className="text-sm text-gray-700">{item}</span>
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
      className="mt-6 bg-gradient-to-br from-success/5 to-success/10 rounded-2xl p-4"
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

function PlanRestrictions({ restrictions }: any) {
  return (
    <motion.div
      className="mt-4 bg-yellow-50 border border-yellow-200 rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
    >
      <h3 className="font-medium text-gray-900 mb-3">نکات مهم</h3>
      <div className="space-y-2">
        {restrictions.map((restriction: string, index: number) => (
          <div key={index} className="flex items-start space-x-2 space-x-reverse">
            <Target className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-gray-700">{restriction}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}