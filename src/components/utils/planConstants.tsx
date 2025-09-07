// Diet Plan Types and Colors
export const DIET_PLAN_COLORS = {
  'کاهش وزن': 'text-blue-600 bg-blue-50 border-blue-200',
  'افزایش وزن': 'text-green-600 bg-green-50 border-green-200',
  'مدیترانه‌ای': 'text-orange-600 bg-orange-50 border-orange-200',
  'کتوژنیک': 'text-purple-600 bg-purple-50 border-purple-200',
  'ورزشکاران': 'text-red-600 bg-red-50 border-red-200',
  'نگهداری': 'text-gray-600 bg-gray-50 border-gray-200'
};

// Workout Plan Types and Colors
export const WORKOUT_PLAN_COLORS = {
  'قدرتی': 'text-red-600 bg-red-50 border-red-200',
  'قلبی‌عروقی': 'text-blue-600 bg-blue-50 border-blue-200',
  'انعطاف‌پذیری': 'text-green-600 bg-green-50 border-green-200',
  'ترکیبی': 'text-purple-600 bg-purple-50 border-purple-200',
  'یوگا': 'text-orange-600 bg-orange-50 border-orange-200',
  'پیلاتس': 'text-pink-600 bg-pink-50 border-pink-200'
};

// System Level Colors
export const SYSTEM_LEVEL_COLORS = {
  'بهینه': '#16a34a',
  'خوب': '#a59d83',
  'نیازمند توجه': '#d97706',
  'ضعیف': '#dc2626'
};

// Persian Meal Labels
export const MEAL_LABELS = {
  breakfast: 'صبحانه',
  lunch: 'ناهار',
  dinner: 'شام',
  snacks: 'تنقلات'
} as const;

// Persian Meal Icons
export const MEAL_ICONS = {
  breakfast: '🌅',
  lunch: '☀️',
  dinner: '🌙',
  snacks: '🍎'
} as const;

// Helper functions
export const getDietPlanColor = (type: string) => {
  return DIET_PLAN_COLORS[type as keyof typeof DIET_PLAN_COLORS] || DIET_PLAN_COLORS['نگهداری'];
};

export const getWorkoutPlanColor = (type: string) => {
  return WORKOUT_PLAN_COLORS[type as keyof typeof WORKOUT_PLAN_COLORS] || 'text-gray-600 bg-gray-50 border-gray-200';
};

export const getSystemLevelColor = (level: string) => {
  return SYSTEM_LEVEL_COLORS[level as keyof typeof SYSTEM_LEVEL_COLORS] || '#6b7280';
};