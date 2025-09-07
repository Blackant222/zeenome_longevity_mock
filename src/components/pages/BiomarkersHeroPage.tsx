import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { Search, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { useState } from 'react';

export function BiomarkersHeroPage() {
  const { biomarkers, navigateTo } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBiomarkers = biomarkers.filter(biomarker =>
    biomarker.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStatusColor = (value: number, optimalMin: number, optimalMax: number) => {
    if (value >= optimalMin && value <= optimalMax) return 'bg-success';
    if (value < optimalMin * 0.8 || value > optimalMax * 1.2) return 'bg-danger';
    return 'bg-warning';
  };
  
  const getTrendIcon = (trend: number[]) => {
    if (trend.length < 2) return Minus;
    const last = trend[trend.length - 1];
    const previous = trend[trend.length - 2];
    if (last > previous) return TrendingUp;
    if (last < previous) return TrendingDown;
    return Minus;
  };
  
  return (
    <div className="min-h-screen pt-16 px-4 pb-8 persian-text" dir="rtl">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div 
          className="py-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-medium text-gray-900 text-center mb-6">
            بیو مارکر های خونی
          </h1>
          
          {/* Search/Filter Bar */}
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="جستجوی بیو مارکر ها..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 pl-4 py-3 bg-gray-50 rounded-2xl border-none focus:outline-none focus:ring-2 focus:ring-brand-warm/20 text-right text-sm"
            />
          </div>
        </motion.div>
        
        {/* Biomarkers List */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {filteredBiomarkers.map((biomarker, index) => {
            const TrendIcon = getTrendIcon(biomarker.trend);
            const statusColor = getStatusColor(biomarker.value, biomarker.optimalMin, biomarker.optimalMax);
            
            return (
              <motion.div
                key={biomarker.id}
                className="bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-sm transition-shadow"
                onClick={() => navigateTo(`biomarker-${biomarker.id}`)}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className={`w-3 h-3 rounded-full ${statusColor}`} />
                    <TrendIcon className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1 text-right">
                    <h3 className="font-medium text-gray-900 text-sm">{biomarker.name}</h3>
                    <div className="flex items-center justify-end space-x-2 space-x-reverse mt-1">
                      <span className="text-xs text-gray-600">{biomarker.unit}</span>
                      <span className="text-base font-medium text-gray-900 persian-nums">
                        {biomarker.value}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Range Bar */}
                <div className="relative mb-3">
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    {/* Optimal range */}
                    <div 
                      className="absolute h-full bg-success/30 rounded-full"
                      style={{
                        right: `${(biomarker.optimalMin / biomarker.maxRange) * 100}%`,
                        width: `${((biomarker.optimalMax - biomarker.optimalMin) / biomarker.maxRange) * 100}%`
                      }}
                    />
                  </div>
                  
                  {/* Current value marker */}
                  <div 
                    className="absolute top-0 w-1 h-2 bg-gray-800 rounded-full transform -translate-x-1/2"
                    style={{
                      right: `${Math.min(Math.max((biomarker.value / biomarker.maxRange) * 100, 0), 100)}%`
                    }}
                  />
                </div>
                
                {/* Mini sparkline */}
                <div className="flex items-end space-x-1 space-x-reverse h-6">
                  {biomarker.trend.map((value, i) => (
                    <div
                      key={i}
                      className="bg-brand-warm/30 rounded-sm flex-1"
                      style={{
                        height: `${(value / Math.max(...biomarker.trend)) * 100}%`
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Bottom info */}
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <p className="text-xs text-gray-600">
            روی هر بیو مارکر کلیک کنید تا تجزیه و تحلیل و روندهای تفصیلی را ببینید
          </p>
        </motion.div>
      </div>
    </div>
  );
}