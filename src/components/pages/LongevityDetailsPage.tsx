import { motion } from 'motion/react';
import { useAppStore } from '../../store/useAppStore';
import { CircularScore } from '../CircularScore';
import { useState } from 'react';

export function LongevityDetailsPage() {
  const { longevityScore, longevitySystems, navigateTo } = useAppStore();
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);
  
  const handleSystemClick = (systemId: string) => {
    navigateTo(`longevity-system-${systemId}`);
  };

  const getSystemColor = (level: string) => {
    switch (level) {
      case 'بهینه': return '#16a34a';
      case 'خوب': return '#a59d83';
      case 'نیازمند توجه': return '#d97706';
      case 'ضعیف': return '#dc2626';
      default: return '#6b7280';
    }
  };

  return (
    <div className="min-h-screen pt-16 px-4 pb-8 persian-text" dir="rtl">
      <div className="max-w-sm mx-auto">
        {/* Header with overall score */}
        <motion.div 
          className="py-6 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-xl font-medium text-gray-900 mb-4">
            جزئیات امتیاز لانجویتی
          </h1>
          <CircularScore 
            score={longevityScore}
            size="md"
            showLabel={true}
            delay={200}
          />
          <div className="mt-2 text-sm text-gray-600">
            امتیاز کلی: <span className="persian-nums font-medium">{longevityScore}</span>
          </div>
        </motion.div>

        {/* Interactive Human Body */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="bg-gradient-to-b from-gray-50 to-white rounded-3xl p-6">
            <h3 className="text-center font-medium text-gray-900 mb-4">
              نقشه سلامت بدن
            </h3>
            
            {/* SVG Human Body */}
            <div className="relative mx-auto w-64 h-80">
              <svg 
                viewBox="0 0 200 320" 
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Body outline */}
                <path
                  d="M100 20 
                     C85 20, 70 30, 70 50
                     L65 80
                     C60 85, 55 90, 55 100
                     L50 140
                     C48 160, 50 180, 55 200
                     L60 240
                     C58 250, 60 260, 65 270
                     L70 300
                     L75 320
                     L125 320
                     L130 300
                     L135 270
                     C140 260, 142 250, 140 240
                     L145 200
                     C150 180, 152 160, 150 140
                     L145 100
                     C145 90, 140 85, 135 80
                     L130 50
                     C130 30, 115 20, 100 20 Z"
                  fill="#f8fafc"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                
                {/* Head */}
                <circle 
                  cx="100" 
                  cy="35" 
                  r="15" 
                  fill="#f1f5f9"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                />
                
                {/* System areas */}
                {longevitySystems.map((system) => (
                  <g key={system.id}>
                    {/* Clickable area for each system */}
                    {system.bodyPart === 'head' && (
                      <circle
                        cx={system.position.x * 2}
                        cy={system.position.y * 3.2}
                        r="18"
                        fill={getSystemColor(system.level)}
                        fillOpacity="0.6"
                        stroke={getSystemColor(system.level)}
                        strokeWidth="2"
                        className="cursor-pointer hover:fill-opacity-80 transition-all"
                        onClick={() => handleSystemClick(system.id)}
                        onMouseEnter={() => setSelectedSystem(system.id)}
                        onMouseLeave={() => setSelectedSystem(null)}
                      />
                    )}
                    
                    {system.bodyPart === 'chest' && (
                      <ellipse
                        cx={system.position.x * 2}
                        cy={system.position.y * 3.2}
                        rx="20"
                        ry="15"
                        fill={getSystemColor(system.level)}
                        fillOpacity="0.6"
                        stroke={getSystemColor(system.level)}
                        strokeWidth="2"
                        className="cursor-pointer hover:fill-opacity-80 transition-all"
                        onClick={() => handleSystemClick(system.id)}
                        onMouseEnter={() => setSelectedSystem(system.id)}
                        onMouseLeave={() => setSelectedSystem(null)}
                      />
                    )}
                    
                    {system.bodyPart === 'abdomen' && (
                      <rect
                        x={system.position.x * 2 - 12}
                        y={system.position.y * 3.2 - 10}
                        width="24"
                        height="20"
                        rx="12"
                        fill={getSystemColor(system.level)}
                        fillOpacity="0.6"
                        stroke={getSystemColor(system.level)}
                        strokeWidth="2"
                        className="cursor-pointer hover:fill-opacity-80 transition-all"
                        onClick={() => handleSystemClick(system.id)}
                        onMouseEnter={() => setSelectedSystem(system.id)}
                        onMouseLeave={() => setSelectedSystem(null)}
                      />
                    )}
                  </g>
                ))}
                
                {/* System labels */}
                {longevitySystems.map((system) => (
                  <text
                    key={`label-${system.id}`}
                    x={system.position.x * 2}
                    y={system.position.y * 3.2 + 35}
                    textAnchor="middle"
                    className="text-xs fill-gray-600 font-medium"
                    style={{ fontSize: '8px' }}
                  >
                    {system.name}
                  </text>
                ))}
              </svg>
              
              {/* Selected System Popup */}
              {selectedSystem && (
                <motion.div
                  className="absolute top-0 left-0 bg-white shadow-lg rounded-lg p-3 z-10 border"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    left: '50%',
                    transform: 'translateX(-50%)',
                    top: '10px'
                  }}
                >
                  {(() => {
                    const system = longevitySystems.find(s => s.id === selectedSystem);
                    return system ? (
                      <div className="text-center">
                        <h4 className="font-medium text-gray-900 text-sm">{system.name}</h4>
                        <div className="text-xs text-gray-600 mt-1">
                          امتیاز: <span className="persian-nums font-medium">{system.score}</span>
                        </div>
                        <div className={`text-xs mt-1 font-medium ${
                          system.level === 'بهینه' ? 'text-success' :
                          system.level === 'خوب' ? 'text-brand-warm' :
                          system.level === 'نیازمند توجه' ? 'text-warning' : 'text-danger'
                        }`}>
                          {system.level}
                        </div>
                      </div>
                    ) : null;
                  })()}
                </motion.div>
              )}
            </div>
            
            <p className="text-center text-xs text-gray-500 mt-4">
              روی هر قسمت کلیک کنید تا جزئیات مشاهده کنید
            </p>
          </div>
        </motion.div>

        {/* Systems List */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-medium text-gray-900 mb-4">
            وضعیت سیستم‌های بدن
          </h3>
          
          {longevitySystems.map((system, index) => (
            <motion.div
              key={system.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-sm transition-all"
              onClick={() => handleSystemClick(system.id)}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <div className="flex items-center justify-between">
                {/* Score Circle */}
                <div className="flex items-center space-x-3 space-x-reverse">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center relative">
                    <div 
                      className="absolute inset-0 rounded-full" 
                      style={{ 
                        background: `conic-gradient(${getSystemColor(system.level)} ${system.score * 3.6}deg, #f3f4f6 0deg)` 
                      }}
                    />
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center relative z-10">
                      <span className="text-xs font-medium text-gray-900 persian-nums">
                        {system.score}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <h3 className="font-medium text-gray-900 text-sm">{system.name}</h3>
                    <div className={`text-xs font-medium mt-1 ${
                      system.level === 'بهینه' ? 'text-success' :
                      system.level === 'خوب' ? 'text-brand-warm' :
                      system.level === 'نیازمند توجه' ? 'text-warning' : 'text-danger'
                    }`}>
                      {system.level}
                    </div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-20">
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: getSystemColor(system.level) }}
                      initial={{ width: 0 }}
                      animate={{ width: `${system.score}%` }}
                      transition={{ duration: 1, delay: 0.2 * index, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-gray-600 mt-3 leading-relaxed">
                {system.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Legend */}
        <motion.div 
          className="mt-8 bg-gray-50 rounded-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h4 className="font-medium text-gray-900 text-sm mb-3">راهنمای رنگ‌ها</h4>
          <div className="grid grid-cols-2 gap-3">
            {[
              { level: 'بهینه', color: '#16a34a' },
              { level: 'خوب', color: '#a59d83' },
              { level: 'نیازمند توجه', color: '#d97706' },
              { level: 'ضعیف', color: '#dc2626' }
            ].map((item) => (
              <div key={item.level} className="flex items-center space-x-2 space-x-reverse">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-gray-700">{item.level}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}