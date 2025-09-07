import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { Utensils, Clock, Zap, Check, Star } from 'lucide-react';

export function DietPlansMainPage() {
  const { dietPlans, activateDietPlan, navigateTo } = useAppStore();

  const getPlanTypeColor = (type: string) => {
    switch (type) {
      case 'کاهش وزن': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'افزایش وزن': return 'text-green-600 bg-green-50 border-green-200';
      case 'مدیترانه‌ای': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'کتوژنیک': return 'text-purple-600 bg-purple-50 border-purple-200';
      case 'ورزشکاران': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const activePlan = dietPlans.find(plan => plan.isActive);

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
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mx-auto mb-4">
            <Utensils className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-xl font-medium text-gray-900 mb-2">
            برنامه‌های غذایی
          </h1>
          <p className="text-sm text-gray-600">
            رژیم‌های تخصصی و برنامه‌های تغذیه
          </p>
        </motion.div>

        {/* Active Plan Card */}
        {activePlan && (
          <motion.div
            className="mb-6 bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-3xl p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center space-x-2 space-x-reverse mb-3">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700 font-medium">برنامه فعال</span>
            </div>
            
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activePlan.name}
            </h3>
            
            <p className="text-sm text-gray-700 mb-4">
              {activePlan.description}
            </p>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <Clock className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-gray-900">{activePlan.duration}</div>
                <div className="text-xs text-gray-600">مدت زمان</div>
              </div>
              <div className="text-center">
                <Zap className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-gray-900 persian-nums">{activePlan.macros.calories}</div>
                <div className="text-xs text-gray-600">کالری</div>
              </div>
              <div className="text-center">
                <Utensils className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <div className="text-sm font-medium text-gray-900">{activePlan.type}</div>
                <div className="text-xs text-gray-600">نوع</div>
              </div>
            </div>
            
            <button
              onClick={() => navigateTo(`diet-plan-${activePlan.id}`)}
              className="w-full bg-green-600 text-white py-3 rounded-2xl font-medium hover:bg-green-700 transition-colors"
            >
              مشاهده جزئیات برنامه
            </button>
          </motion.div>
        )}

        {/* Available Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="font-medium text-gray-900 mb-4">
            برنامه‌های موجود
          </h3>
          
          <div className="space-y-4">
            {dietPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`border rounded-3xl p-5 transition-all ${
                  plan.isActive
                    ? 'border-green-300 bg-green-50/50 opacity-60'
                    : 'border-gray-200 bg-white hover:shadow-sm cursor-pointer'
                }`}
                onClick={() => !plan.isActive && navigateTo(`diet-plan-${plan.id}`)}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                whileTap={!plan.isActive ? { scale: 0.98 } : {}}
              >
                <div className="flex items-start justify-between mb-3">
                  {plan.isActive ? (
                    <div className="flex items-center space-x-1 space-x-reverse">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-green-600 font-medium">فعال</span>
                    </div>
                  ) : (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPlanTypeColor(plan.type)}`}>
                      {plan.type}
                    </span>
                  )}
                  
                  <div className="text-right flex-1 mr-3">
                    <h4 className="font-medium text-gray-900 text-sm mb-1">
                      {plan.name}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {plan.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <span>{plan.duration}</span>
                    <span className="persian-nums">{plan.macros.calories} کالری</span>
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
                        activateDietPlan(plan.id);
                      }}
                      className="w-full bg-brand-warm text-white py-2 rounded-xl text-sm font-medium hover:bg-brand-warm-dark transition-colors"
                    >
                      فعال‌سازی این برنامه
                    </button>
                  </div>
                )}
              </motion.div>
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
          <h4 className="font-medium text-gray-900 text-sm mb-2">
            💡 نکته مهم
          </h4>
          <p className="text-xs text-gray-700 leading-relaxed">
            برنامه‌های غذایی بر اساس اهداف شخصی شما طراحی شده‌اند. هر زمان که خواستید می‌توانید برنامه خود را تغییر دهید.
          </p>
        </motion.div>
      </div>
    </div>
  );
}