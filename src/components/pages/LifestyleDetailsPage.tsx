import { motion } from 'motion/react';
import { CircularScore } from '../CircularScore';
import { useAppStore } from '../../store/useAppStore';
import { 
  Moon, Apple, Activity, Heart, Brain, Users, FileText,
  ChevronLeft
} from 'lucide-react';

const iconMap = {
  Moon, Apple, Activity, Heart, Brain, Users, FileText
};

export function LifestyleDetailsPage() {
  const { lifestyleScore, lifestyleCategories, navigateTo } = useAppStore();
  
  const getIcon = (iconName: string) => {
    return iconMap[iconName as keyof typeof iconMap] || Activity;
  };
  
  return (
    <div className="min-h-screen pt-16 px-4 pb-8 persian-text" dir="rtl">
      <div className="max-w-sm mx-auto">
        {/* Header with score recap */}
        <motion.div 
          className="py-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-medium text-gray-900 mb-4">
            جزئیات سبک زندگی
          </h1>
          <CircularScore 
            score={lifestyleScore}
            size="md"
            showLabel={false}
            delay={200}
          />
        </motion.div>
        
        {/* Category Cards */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {lifestyleCategories.map((category, index) => {
            const Icon = getIcon(category.icon);
            
            return (
              <motion.div
                key={category.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => navigateTo(`lifestyle-category-${category.id}`)}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <ChevronLeft className="w-4 h-4 text-gray-400" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900 persian-nums text-sm">{category.score}</div>
                      <div className="text-xs text-gray-500">امتیاز</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 space-x-reverse flex-1">
                    <div className="text-right flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{category.name}</h3>
                      <p className="text-xs text-gray-600">{category.summary}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-brand-warm/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-brand-warm" />
                    </div>
                  </div>
                </div>
                
                {/* Score bar */}
                <div className="mt-3">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-brand-warm rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${category.score}%` }}
                      transition={{ duration: 1, delay: 0.2 * index, ease: "easeOut" }}
                      style={{ marginRight: 'auto' }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-xs text-gray-600">
            روی هر دسته‌بندی کلیک کنید تا بینش‌ها و پیشنهادات تفصیلی مشاهده کنید
          </p>
        </motion.div>
      </div>
    </div>
  );
}