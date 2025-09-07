import { motion } from 'motion/react';
import { CircularScore } from '../CircularScore';
import { useAppStore } from '../../store/useAppStore';
import { 
  Moon, Apple, Activity, Heart, Brain, Users, FileText,
  ArrowRight, Info
} from 'lucide-react';

const iconMap = {
  Moon, Apple, Activity, Heart, Brain, Users, FileText
};

interface LifestyleCategoryDetailPageProps {
  categoryId: string;
}

export function LifestyleCategoryDetailPage({ categoryId }: LifestyleCategoryDetailPageProps) {
  const { lifestyleCategories, navigateTo } = useAppStore();
  
  const category = lifestyleCategories.find(c => c.id === categoryId);
  
  if (!category) {
    return <div>Category not found</div>;
  }
  
  const Icon = iconMap[category.icon as keyof typeof iconMap] || Activity;
  
  return (
    <div className="min-h-screen pt-16 px-4 pb-8">
      <div className="max-w-sm mx-auto">
        {/* Header with score */}
        <motion.div 
          className="py-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center mr-3">
              <Icon className="w-6 h-6 text-purple" />
            </div>
            <h1 className="text-xl font-medium text-gray-900">
              {category.name}
            </h1>
          </div>
          
          <CircularScore 
            score={category.score}
            size="lg"
            showLabel={false}
            delay={200}
          />
        </motion.div>
        
        {/* Summary */}
        <motion.div 
          className="bg-white border border-gray-100 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="font-medium text-gray-900 mb-3">Summary</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            {category.summary}
          </p>
          
          <div className="border-t border-gray-100 pt-4">
            <h3 className="font-medium text-gray-900 mb-2">Detailed Analysis</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {category.description}
            </p>
          </div>
        </motion.div>
        
        {/* Related Interventions */}
        <motion.div 
          className="bg-white border border-gray-100 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h2 className="font-medium text-gray-900 mb-4">Related Actions</h2>
          <div className="space-y-3">
            {category.interventions.slice(0, 3).map((intervention, index) => (
              <motion.div
                key={intervention}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-purple/5 transition-colors"
                onClick={() => navigateTo('interventions-main')}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <span className="text-sm text-gray-700 capitalize">
                  {intervention.replace('-', ' ')}
                </span>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Why It Matters */}
        <motion.div 
          className="bg-purple/5 border border-purple/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center mb-3">
            <Info className="w-5 h-5 text-purple mr-2" />
            <h2 className="font-medium text-gray-900">Why It Matters</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {category.whyItMatters}
          </p>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <button
            onClick={() => navigateTo('interventions-main')}
            className="bg-purple text-white px-6 py-3 rounded-full font-medium hover:bg-purple-dark transition-colors"
          >
            View Recommended Actions
          </button>
        </motion.div>
      </div>
    </div>
  );
}