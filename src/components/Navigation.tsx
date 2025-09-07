import { motion } from 'motion/react';
import { ArrowRight, Home, Activity, Heart, Pill, ClipboardList, LayoutDashboard } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';

export function Navigation() {
  const { currentPage, pageHistory, navigateTo, goBack } = useAppStore();
  
  const showBackButton = pageHistory.length > 0;
  const isDetailPage = currentPage.includes('-detail') || currentPage.includes('-reason-');
  
  const mainPages = [
    { id: 'health-dashboard', icon: LayoutDashboard, label: 'داشبورد سلامتی' },
    { id: 'lifestyle-hero', icon: Activity, label: 'سبک زندگی' },
    { id: 'longevity-hero', icon: Heart, label: 'امتیاز لانجویتی' },
    { id: 'biomarkers-hero', icon: Pill, label: 'بیو مارکر های خونی' },
    { id: 'interventions-main', icon: ClipboardList, label: 'اقدام‌ها' }
  ];
  
  return (
    <>
      {/* Mobile Top Bar - only shows back button and page title when needed */}
      <motion.div 
        className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-brand-warm flex items-center justify-center">
                <span className="text-white font-medium text-sm">ژ</span>
              </div>
            </div>
            
            {/* Back button */}
            <div className="flex items-center space-x-3">
              {showBackButton ? (
                <button
                  onClick={goBack}
                  className="p-2 rounded-full hover:bg-gray-50 transition-colors"
                  aria-label="برگشت"
                >
                  <ArrowRight className="w-5 h-5 rtl-flip text-gray-600" />
                </button>
              ) : (
                <div className="w-8" />
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Desktop Right Sidebar */}
      <motion.div 
        className="hidden lg:flex fixed top-0 right-0 h-screen z-50 bg-white border-l border-gray-100 shadow-sm"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="w-64 p-6">
          {/* Logo */}
          <div className="flex items-center space-x-3 space-x-reverse mb-8">
            <div className="w-10 h-10 rounded-full bg-brand-warm flex items-center justify-center">
              <span className="text-white font-medium">ژ</span>
            </div>
            <div className="text-right">
              <h1 className="font-medium text-gray-900">زینوم لانجویتی</h1>
              <p className="text-xs text-gray-600">داشبورد سلامتی</p>
            </div>
          </div>
          
          {/* Navigation Links */}
          <nav className="space-y-2">
            {mainPages.map((page) => {
              const Icon = page.icon;
              const isActive = currentPage === page.id;
              
              return (
                <button
                  key={page.id}
                  onClick={() => navigateTo(page.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl text-right transition-all ${
                    isActive 
                      ? 'text-brand-warm bg-brand-warm/5 border border-brand-warm/20' 
                      : 'text-gray-600 hover:text-brand-warm hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium">{page.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Back Button for Detail Pages */}
          {showBackButton && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={goBack}
                className="w-full flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl text-gray-600 hover:text-brand-warm hover:bg-gray-50 transition-all"
              >
                <ArrowRight className="w-5 h-5 rtl-flip flex-shrink-0" />
                <span className="font-medium">برگشت</span>
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile Bottom Navigation */}
      <motion.div 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 shadow-lg"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="px-2 py-2">
          <div className="flex items-center justify-around">
            {mainPages.map((page) => {
              const Icon = page.icon;
              const isActive = currentPage === page.id;
              
              return (
                <button
                  key={page.id}
                  onClick={() => navigateTo(page.id)}
                  className={`flex flex-col items-center px-3 py-2 rounded-xl transition-all ${
                    isActive 
                      ? 'text-brand-warm bg-brand-warm/5' 
                      : 'text-gray-500 hover:text-brand-warm'
                  }`}
                >
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium leading-none">
                    {page.label.split(' ')[0]}
                  </span>
                  {isActive && (
                    <motion.div
                      className="absolute -top-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-brand-warm rounded-full"
                      layoutId="activeTab"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </>
  );
}