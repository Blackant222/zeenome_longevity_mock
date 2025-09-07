import { Navigation } from './components/Navigation';
import { useAppStore } from './store/useAppStore';
import { motion, AnimatePresence } from 'motion/react';
import { renderPageByRoute, getSlideDirection, getExitDirection } from './components/utils/routeConfig';

export default function App() {
  const { currentPage } = useAppStore();
  
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <Navigation />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, ...getSlideDirection(currentPage) }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ 
            opacity: 0, 
            x: getExitDirection(currentPage)
          }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            opacity: { duration: 0.3 }
          }}
        >
          {renderPageByRoute(currentPage)}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}