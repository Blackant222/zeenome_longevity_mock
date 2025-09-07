import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowRight, TrendingUp, Info, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface BiomarkerDetailPageProps {
  biomarkerId: string;
}

export function BiomarkerDetailPage({ biomarkerId }: BiomarkerDetailPageProps) {
  const { biomarkers, longevitySystems, navigateTo } = useAppStore();
  
  const biomarker = biomarkers.find(b => b.id === biomarkerId);
  
  if (!biomarker) {
    return <div>Biomarker not found</div>;
  }
  
  const relatedSystems = longevitySystems.filter(s => 
    biomarker.relatedSystems.includes(s.id)
  );
  
  const chartData = biomarker.trend.map((value, index) => ({
    month: index + 1,
    value: value
  }));
  
  const getStatusColor = (value: number, optimalMin: number, optimalMax: number) => {
    if (value >= optimalMin && value <= optimalMax) return 'text-success';
    if (value < optimalMin * 0.8 || value > optimalMax * 1.2) return 'text-danger';
    return 'text-warning';
  };
  
  const getStatusText = (value: number, optimalMin: number, optimalMax: number) => {
    if (value >= optimalMin && value <= optimalMax) return 'Optimal';
    if (value < optimalMin) return 'Below Optimal';
    if (value > optimalMax) return 'Above Optimal';
    return 'Needs Attention';
  };
  
  const statusColor = getStatusColor(biomarker.value, biomarker.optimalMin, biomarker.optimalMax);
  const statusText = getStatusText(biomarker.value, biomarker.optimalMin, biomarker.optimalMax);
  
  return (
    <div className="min-h-screen pt-16 px-4 pb-8">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div 
          className="py-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-medium text-gray-900 mb-2">
            {biomarker.name}
          </h1>
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-medium text-gray-900">
                {biomarker.value}
              </div>
              <div className="text-sm text-gray-600">{biomarker.unit}</div>
            </div>
            <div className={`text-sm font-medium ${statusColor}`}>
              {statusText}
            </div>
          </div>
        </motion.div>
        
        {/* Range Visualization */}
        <motion.div 
          className="bg-white border border-gray-100 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="font-medium text-gray-900 mb-4">Reference Range</h2>
          
          <div className="relative mb-4">
            <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
              {/* Optimal range */}
              <div 
                className="absolute h-full bg-success/30 rounded-full"
                style={{
                  left: `${(biomarker.optimalMin / biomarker.maxRange) * 100}%`,
                  width: `${((biomarker.optimalMax - biomarker.optimalMin) / biomarker.maxRange) * 100}%`
                }}
              />
            </div>
            
            {/* Current value marker */}
            <div 
              className="absolute top-0 w-2 h-4 bg-gray-800 rounded-full transform -translate-x-1/2"
              style={{
                left: `${Math.min(Math.max((biomarker.value / biomarker.maxRange) * 100, 0), 100)}%`
              }}
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-600">
            <span>{biomarker.minRange}</span>
            <span>Optimal: {biomarker.optimalMin}-{biomarker.optimalMax}</span>
            <span>{biomarker.maxRange}</span>
          </div>
        </motion.div>
        
        {/* Definition */}
        <motion.div 
          className="bg-white border border-gray-100 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="flex items-center mb-3">
            <Info className="w-5 h-5 text-purple mr-2" />
            <h2 className="font-medium text-gray-900">What is this?</h2>
          </div>
          <p className="text-gray-700 leading-relaxed text-sm mb-4">
            {biomarker.definition}
          </p>
          
          <div className="border-t border-gray-100 pt-4">
            <h3 className="font-medium text-gray-900 mb-2">Your Result</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              {biomarker.interpretation}
            </p>
          </div>
        </motion.div>
        
        {/* Trend Chart */}
        <motion.div 
          className="bg-white border border-gray-100 rounded-2xl p-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="w-5 h-5 text-purple mr-2" />
            <h2 className="font-medium text-gray-900">6-Month Trend</h2>
          </div>
          
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#9CA3AF' }}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 0, r: 4 }}
                  activeDot={{ r: 6, fill: '#8B5CF6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        {/* Related Systems */}
        {relatedSystems.length > 0 && (
          <motion.div 
            className="bg-white border border-gray-100 rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <div className="flex items-center mb-4">
              <Activity className="w-5 h-5 text-purple mr-2" />
              <h2 className="font-medium text-gray-900">Related Systems</h2>
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
      </div>
    </div>
  );
}