import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowRight, Target, Activity } from 'lucide-react';

interface InterventionReasonDetailPageProps {
  interventionId: string;
}

export function InterventionReasonDetailPage({ interventionId }: InterventionReasonDetailPageProps) {
  const { interventions, biomarkers, longevitySystems, navigateTo } = useAppStore();
  
  const intervention = interventions.find(i => i.id === interventionId);
  
  if (!intervention) {
    return <div>Intervention not found</div>;
  }
  
  const relatedBiomarkers = biomarkers.filter(b => 
    intervention.relatedBiomarkers.includes(b.id)
  );
  
  const relatedSystems = longevitySystems.filter(s => 
    intervention.relatedSystems.includes(s.id)
  );
  
  return (
    <div className="min-h-screen pt-16 px-4 pb-8">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div 
          className="py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-full bg-purple/10 flex items-center justify-center mx-auto mb-3">
              <Target className="w-6 h-6 text-purple" />
            </div>
            <h1 className="text-xl font-medium text-gray-900 mb-2">
              Why This Action?
            </h1>
            <p className="text-gray-600 text-sm">
              {intervention.category}
            </p>
          </div>
        </motion.div>
        
        {/* Intervention Title */}
        <motion.div 
          className="bg-white border border-gray-100 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="font-medium text-gray-900 mb-3">{intervention.title}</h2>
          <p className="text-gray-700 leading-relaxed">
            {intervention.reason}
          </p>
        </motion.div>
        
        {/* Related Biomarkers */}
        {relatedBiomarkers.length > 0 && (
          <motion.div 
            className="bg-white border border-gray-100 rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h2 className="font-medium text-gray-900 mb-4">Triggering Biomarkers</h2>
            <div className="space-y-3">
              {relatedBiomarkers.map((biomarker, index) => (
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
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Related Systems */}
        {relatedSystems.length > 0 && (
          <motion.div 
            className="bg-white border border-gray-100 rounded-2xl p-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            <div className="flex items-center mb-4">
              <Activity className="w-5 h-5 text-purple mr-2" />
              <h2 className="font-medium text-gray-900">Affected Systems</h2>
            </div>
            
            <div className="space-y-3">
              {relatedSystems.map((system, index) => (
                <motion.div
                  key={system.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-purple/5 transition-colors"
                  onClick={() => navigateTo(`longevity-system-${system.id}`)}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div>
                    <div className="font-medium text-gray-900 text-sm">{system.name}</div>
                    <div className="text-xs text-gray-600">{system.level}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
        
        {/* Scientific Rationale */}
        <motion.div 
          className="bg-purple/5 border border-purple/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <h2 className="font-medium text-gray-900 mb-3">Scientific Rationale</h2>
          <p className="text-gray-700 leading-relaxed text-sm">
            This intervention is recommended based on your current biomarker levels and their relationship to longevity outcomes. Regular monitoring and adherence to this action can help optimize your health span and biological age.
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
            Back to All Actions
          </button>
        </motion.div>
      </div>
    </div>
  );
}