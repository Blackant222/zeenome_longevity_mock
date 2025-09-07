import { motion } from 'motion/react';
import { CircularScore } from '../CircularScore';
import { useAppStore } from '../../store/useAppStore';
import { 
  Shield, Heart, Pill, Droplets, Brain, Clock, Flame, Zap,
  ArrowRight, Info, Microscope
} from 'lucide-react';

const iconMap = {
  Shield, Heart, Pill, Droplets, Brain, Clock, Flame, Zap
};

interface LongevitySystemDetailPageProps {
  systemId: string;
}

export function LongevitySystemDetailPage({ systemId }: LongevitySystemDetailPageProps) {
  const { longevitySystems, biomarkers, navigateTo } = useAppStore();
  
  const system = longevitySystems.find(s => s.id === systemId);
  
  if (!system) {
    return <div>System not found</div>;
  }
  
  const Icon = iconMap[system.icon as keyof typeof iconMap] || Shield;
  const systemBiomarkers = biomarkers.filter(b => 
    b.relatedSystems.includes(systemId)
  );
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Optimal': return 'text-success';
      case 'Good': return 'text-purple';
      case 'Needs Attention': return 'text-warning';
      case 'Poor': return 'text-danger';
      default: return 'text-gray-500';
    }
  };
  
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
            <div className="text-left">
              <h1 className="text-xl font-medium text-gray-900">
                {system.name}
              </h1>
              <span className={`text-sm font-medium ${getLevelColor(system.level)}`}>
                {system.level}
              </span>
            </div>
          </div>
          
          <CircularScore 
            score={system.score}
            size="lg"
            showLabel={false}
            delay={200}
          />
        </motion.div>
        
        {/* Description */}
        <motion.div 
          className="bg-white border border-gray-100 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="font-medium text-gray-900 mb-3">Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            {system.description}
          </p>
        </motion.div>
        
        {/* Biomarkers */}
        <motion.div 
          className="bg-white border border-gray-100 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <Microscope className="w-5 h-5 text-purple mr-2" />
            <h2 className="font-medium text-gray-900">Key Biomarkers</h2>
          </div>
          
          <div className="space-y-3">
            {systemBiomarkers.length > 0 ? systemBiomarkers.map((biomarker, index) => (
              <motion.div
                key={biomarker.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-purple/5 transition-colors"
                onClick={() => navigateTo(`biomarker-${biomarker.id}`)}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <div>
                  <div className="font-medium text-gray-900 text-sm">{biomarker.name}</div>
                  <div className="text-xs text-gray-600">{biomarker.value} {biomarker.unit}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
              </motion.div>
            )) : (
              <p className="text-sm text-gray-600">No biomarkers available for this system.</p>
            )}
          </div>
        </motion.div>
        
        {/* AI Insight */}
        <motion.div 
          className="bg-purple/5 border border-purple/20 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center mb-3">
            <Brain className="w-5 h-5 text-purple mr-2" />
            <h2 className="font-medium text-gray-900">AI Insight</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {system.aiInsight}
          </p>
        </motion.div>
        
        {/* Science Background */}
        <motion.div 
          className="bg-white border border-gray-100 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="flex items-center mb-3">
            <Info className="w-5 h-5 text-purple mr-2" />
            <h2 className="font-medium text-gray-900">Scientific Background</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm">
            {system.persianScience}
          </p>
        </motion.div>
        
        {/* Bottom CTA */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <button
            onClick={() => navigateTo('interventions-main')}
            className="bg-purple text-white px-6 py-3 rounded-full font-medium hover:bg-purple-dark transition-colors"
          >
            View Optimization Actions
          </button>
        </motion.div>
      </div>
    </div>
  );
}