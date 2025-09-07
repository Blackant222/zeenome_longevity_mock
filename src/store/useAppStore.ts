import { create } from 'zustand';

export interface LifestyleCategory {
  id: string;
  name: string;
  icon: string;
  score: number;
  summary: string;
  description: string;
  interventions: string[];
  whyItMatters: string;
}

export interface LongevitySystem {
  id: string;
  name: string;
  icon: string;
  level: 'بهینه' | 'خوب' | 'نیازمند توجه' | 'ضعیف';
  score: number;
  description: string;
  biomarkers: string[];
  aiInsight: string;
  persianScience: string;
  bodyPart: 'head' | 'chest' | 'abdomen' | 'arms' | 'legs' | 'spine';
  position: { x: number; y: number };
}

export interface Biomarker {
  id: string;
  name: string;
  value: number;
  unit: string;
  minRange: number;
  maxRange: number;
  optimalMin: number;
  optimalMax: number;
  trend: number[];
  definition: string;
  interpretation: string;
  relatedSystems: string[];
}

export interface Intervention {
  id: string;
  category: string;
  title: string;
  description: string;
  reason: string;
  difficulty: 'آسان' | 'متوسط' | 'دشوار';
  duration: string;
  frequency: string;
  benefits: string[];
  instructions: string[];
  tips: string[];
  status: 'در دسترس' | 'انتخاب شده' | 'در حال انجام' | 'انجام شده' | 'عقب‌مانده';
  relatedBiomarkers: string[];
  relatedSystems: string[];
  userSelected?: boolean;
  startDate?: string;
  currentStreak?: number;
  longestStreak?: number;
  completedDays?: number;
  totalDays?: number;
}

export interface DietPlan {
  id: string;
  name: string;
  description: string;
  type: 'کاهش وزن' | 'افزایش وزن' | 'نگهداری' | 'ورزشکاران' | 'مدیترانه‌ای' | 'کتوژنیک';
  duration: string;
  meals: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    snacks: string[];
  };
  macros: {
    protein: number;
    carbs: number;
    fat: number;
    calories: number;
  };
  benefits: string[];
  restrictions: string[];
  isActive?: boolean;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description: string;
  type: 'قدرتی' | 'قلبی‌عروقی' | 'انعطاف‌پذیری' | 'ترکیبی' | 'یوگا' | 'پیلاتس';
  level: 'مبتدی' | 'متوسط' | 'پیشرفته';
  duration: string;
  frequency: string;
  exercises: {
    day: string;
    exercises: {
      name: string;
      sets?: number;
      reps?: string;
      duration?: string;
      rest?: string;
    }[];
  }[];
  equipment: string[];
  benefits: string[];
  isActive?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'streak' | 'completion' | 'consistency' | 'variety';
  requirement: number;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface DailyTip {
  id: string;
  date: string;
  title: string;
  description: string;
  category: 'تغذیه' | 'ورزش' | 'خواب' | 'روحی' | 'عمومی';
  icon: string;
  actionable?: string;
}

export interface AppState {
  currentPage: string;
  pageHistory: string[];
  lifestyleScore: number;
  longevityScore: number;
  overallHealthScore: number;
  lifestyleCategories: LifestyleCategory[];
  longevitySystems: LongevitySystem[];
  biomarkers: Biomarker[];
  interventions: Intervention[];
  dietPlans: DietPlan[];
  workoutPlans: WorkoutPlan[];
  achievements: Achievement[];
  dailyTips: DailyTip[];
  userStats: {
    totalInterventions: number;
    activeInterventions: number;
    completedInterventions: number;
    currentStreaks: number;
    longestStreak: number;
    totalDaysActive: number;
    weeklyGoals: number;
    monthlyGoals: number;
  };
  navigateTo: (page: string) => void;
  goBack: () => void;
  selectIntervention: (id: string) => void;
  unselectIntervention: (id: string) => void;
  updateInterventionStatus: (id: string, status: Intervention['status']) => void;
  markInterventionComplete: (id: string) => void;
  activateDietPlan: (id: string) => void;
  activateWorkoutPlan: (id: string) => void;
  getTodayTip: () => DailyTip | null;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentPage: 'health-dashboard',
  pageHistory: [],
  lifestyleScore: 78,
  longevityScore: 82,
  overallHealthScore: 85,
  
  lifestyleCategories: [
    {
      id: 'sleep',
      name: 'خواب',
      icon: 'Moon',
      score: 85,
      summary: 'کیفیت و مدت زمان خواب عالی',
      description: 'الگوی خواب شما ۷ تا ۸ ساعت استراحت با کیفیت و کارایی خواب مناسب را نشان می‌دهد. برنامه منظم خواب از بهبود بهینه و عملکرد شناختی پشتیبانی می‌کند. برای حفظ فواید پایدار، بهداشت خواب و روال خواب خود را حفظ کنید.',
      interventions: ['بهداشت-خواب', 'زمان‌بندی-ملاتونین', 'مدیریت-نور-آبی'],
      whyItMatters: 'خواب با کیفیت برای طول عمر بنیادی است و بر همه چیز از عملکرد سیستم ایمنی تا ترمیم سلولی تأثیر می‌گذارد. در طول خواب عمیق، بدن زایدات متابولیک مغز را پاک کرده و خاطرات را تثبیت می‌کند.'
    },
    {
      id: 'diet',
      name: 'تغذیه',
      icon: 'Apple',
      score: 72,
      summary: 'پایه تغذیه‌ای خوب با فضای بهبود',
      description: 'الگوهای غذایی شما رویکردی متعادل با پروتئین کافی و چربی‌های سالم را نشان می‌دهد. با این حال، فرصتی برای افزایش غذاهای غنی از آنتی‌اکسیدان و کاهش مواد فرآوری‌شده وجود دارد. روی اضافه کردن سبزیجات رنگارنگ و منابع امگا-۳ تمرکز کنید.',
      interventions: ['رژیم-مدیترانه‌ای', 'روزه-متناوب', 'پروتکل-مکمل'],
      whyItMatters: 'تغذیه مستقیماً بر سلامت سلولی، سطح التهاب و عملکرد متابولیک تأثیر می‌گذارد. رژیم غذایی متمرکز بر طول عمر می‌تواند خطر بیماری را کاهش دهد و از سالمندی سالم پشتیبانی کند.'
    },
    {
      id: 'activity',
      name: 'فعالیت بدنی',
      icon: 'Activity',
      score: 68,
      summary: 'سطح فعالیت متوسط، نیاز به افزایش شدت',
      description: 'شما حرکت منظم در طول روز با ورزش ساختاریافته گاه‌به‌گاه حفظ می‌کنید. برای بهینه‌سازی مزایای طول عمر، اضافه کردن جلسات تناوب پرشدت و تمرینات قدرتی بیشتر به روال خود را در نظر بگیرید.',
      interventions: ['پروتکل-تمرین-شدید', 'تمرین-قدرت', 'پیاده‌روی-روزانه'],
      whyItMatters: 'فعالیت فیزیکی یکی از قدرتمندترین مداخلات برای طول عمر است که از سلامت قلبی‌عروقی، تراکم استخوان و عملکرد شناختی پشتیبانی کرده و التهاب را کاهش می‌دهد.'
    },
    {
      id: 'health-habits',
      name: 'عادات سلامتی',
      icon: 'Heart',
      score: 80,
      summary: 'شیوه‌های پیشگیری از سلامت قوی',
      description: 'شما به طور مداوم در رفتارهای ارتقادهنده سلامتی شامل معاینات منظم، غربالگری‌های پیشگیرانه و نظارت بر سلامت شرکت می‌کنید. رویکرد فعال شما نسبت به مدیریت سلامت برای رفاه طولانی‌مدت عالی است.',
      interventions: ['ردیابی-نشانگر-زیستی', 'مراقبت-پیشگیرانه', 'نظارت-سلامت'],
      whyItMatters: 'عادات سلامت پایدار امکان تشخیص زودهنگام و پیشگیری از بیماری‌های مرتبط با سن را فراهم کرده و بر طول عمر سلامت و زندگی تأثیر قابل توجهی دارد.'
    },
    {
      id: 'stress',
      name: 'مدیریت استرس',
      icon: 'Brain',
      score: 75,
      summary: 'استرس قابل مدیریت با راهکارهای مؤثر',
      description: 'سطح استرس شما در محدوده سالم با تکنیک‌های مدیریت مؤثر قرار دارد. به تمرین ذهن‌آگاهی و استراتژی‌های کاهش استرس ادامه دهید تا این تعادل را با تغییر نیازهای زندگی حفظ کنید.',
      interventions: ['تمرین-مدیتیشن', 'مدیریت-استرس', 'تمرینات-تنفس'],
      whyItMatters: 'استرس مزمن سالمندی را از طریق التهاب و آسیب سلولی تسریع می‌کند. مدیریت مؤثر استرس برای حفظ سلامت بهینه و طول عمر ضروری است.'
    },
    {
      id: 'social-health',
      name: 'سلامت اجتماعی',
      icon: 'Users',
      score: 82,
      summary: 'ارتباطات اجتماعی قوی و فعال',
      description: 'شما روابط معنادار و تعامل اجتماعی فعال حفظ می‌کنید. شبکه اجتماعی قوی شما حمایت عاطفی فراهم کرده و به طور قابل توجهی به رفاه کلی و چشم‌انداز طول عمر شما کمک می‌کند.',
      interventions: ['مشارکت-جامعه', 'روابط-سازی', 'فعالیت‌های-اجتماعی'],
      whyItMatters: 'ارتباطات اجتماعی به شدت با طول عمر مرتبط است، افراد منزوی خطر مرگ‌ومیر افزایش‌یافته نشان می‌دهند. روابط قوی بافر استرس و رفتارهای ارتقادهنده سلامت را فراهم می‌کند.'
    },
    {
      id: 'medical-history',
      name: 'سوابق پزشکی',
      icon: 'FileText',
      score: 88,
      summary: 'نگرانی‌های سلامتی حداقل، پایه عالی',
      description: 'سابقه پزشکی شما عوامل خطر حداقل و هیچ شرایط مزمن قابل توجهی را نشان می‌دهد. این پایه عالی برای سالمندی سالم فراهم می‌کند. اقدامات پیشگیرانه را برای حفظ این مزیت ادامه دهید.',
      interventions: ['غربالگری-پیشگیرانه', 'مشاوره-ژنتیک', 'ارزیابی-خطر'],
      whyItMatters: 'سابقه پزشکی پاک مزیت قابل توجهی برای طول عمر فراهم می‌کند، اما حفظ سلامت نیازمند مراقبت مداوم و مراقبت‌های پیشگیرانه با پیشروی سالمندی است.'
    }
  ],
  
  longevitySystems: [
    {
      id: 'liver',
      name: 'کبد',
      icon: 'Shield',
      level: 'بهینه',
      score: 92,
      description: 'نشانگرهای عملکرد کبد شما ظرفیت سم‌زدایی عالی و سلامت متابولیک را نشان می‌دهد.',
      biomarkers: ['alt', 'ast', 'bilirubin', 'albumin'],
      aiInsight: 'آنزیم‌های کبدی در محدوده بهینه قرار دارد که نشان‌دهنده مسیرهای سم‌زدایی سالم و استرس اکسیداتیو حداقل است.',
      persianScience: 'کبد بیش از ۵۰۰ عملکرد متابولیک را پردازش می‌کند و برای طول عمر حیاتی است. عملکرد بهینه کبد از سم‌زدایی و سلامت متابولیک پشتیبانی می‌کند.',
      bodyPart: 'abdomen',
      position: { x: 45, y: 55 }
    },
    {
      id: 'immune',
      name: 'سیستم ایمنی',
      icon: 'Shield',
      level: 'خوب',
      score: 78,
      description: 'نشانگرهای سیستم ایمنی عملکرد خوب با برخی نواحی برای بهبود را نشان می‌دهد.',
      biomarkers: ['wbc', 'lymphocytes', 'crp', 'esr'],
      aiInsight: 'تعداد گلبول‌های سفید خون سالم است، اما نشانگرهای التهابی فعال‌سازی خفیف ایمنی را نشان می‌دهد که می‌تواند از مداخلات هدفمند بهره‌مند شود.',
      persianScience: 'سالمندی سیستم ایمنی (ایمونوسنسانس) عامل کلیدی در طول عمر است. حفظ عملکرد بهینه ایمنی از بیماری‌های مرتبط با سن جلوگیری می‌کند.',
      bodyPart: 'chest',
      position: { x: 50, y: 40 }
    },
    {
      id: 'cardiovascular',
      name: 'قلبی‌عروقی',
      icon: 'Heart',
      level: 'خوب',
      score: 85,
      description: 'نشانگرهای قلبی‌عروقی سلامت خوب قلب با فضای بهینه‌سازی را نشان می‌دهد.',
      biomarkers: ['total-cholesterol', 'hdl', 'ldl', 'triglycerides', 'apoB'],
      aiInsight: 'پروفایل لیپید تعادل خوب را نشان می‌دهد، هرچند HDL می‌تواند برای حفاظت قلبی‌عروقی بهتر بیشتر بهینه شود.',
      persianScience: 'سلامت قلبی‌عروقی قوی‌ترین پیش‌بینی‌کننده طول عمر است. پروفایل‌های لیپید بهینه و التهاب کم از سالمندی سالم پشتیبانی می‌کند.',
      bodyPart: 'chest',
      position: { x: 52, y: 35 }
    },
    {
      id: 'micronutrients',
      name: 'ریزمغذی‌ها',
      icon: 'Pill',
      level: 'نیازمند توجه',
      score: 65,
      description: 'چندین ریزمغذی کلیدی زیر سطوح بهینه برای طول عمر قرار دارد.',
      biomarkers: ['vitamin-d', 'b12', 'folate', 'iron', 'magnesium'],
      aiInsight: 'سطوح ویتامین D و B12 نیازمند توجه است. این کمبودها می‌تواند بر انرژی، عملکرد ایمنی و سلامت شناختی تأثیر بگذارد.',
      persianScience: 'کمبود ریزمغذی‌ها فرآیندهای سالمندی را تسریع می‌کند. سطوح بهینه از عملکرد سلولی و مسیرهای طول عمر پشتیبانی می‌کند.',
      bodyPart: 'abdomen',
      position: { x: 50, y: 60 }
    },
    {
      id: 'kidney',
      name: 'کلیه',
      icon: 'Droplets',
      level: 'بهینه',
      score: 88,
      description: 'نشانگرهای عملکرد کلیه فیلتراسیون عالی و حذف زایدات را نشان می‌دهد.',
      biomarkers: ['creatinine', 'bun', 'egfr', 'cystatin-c'],
      aiInsight: 'نرخ فیلتراسیون گلومرولی برای سن شما عالی است که نشان‌دهنده عملکرد سالم کلیه و وضعیت آبرسانی خوب است.',
      persianScience: 'عملکرد کلیه طبیعتاً با سن کاهش می‌یابد. حفظ سلامت بهینه کلیه برای طول عمر و تعادل متابولیک حیاتی است.',
      bodyPart: 'abdomen',
      position: { x: 40, y: 50 }
    },
    {
      id: 'neurometabolic',
      name: 'عصبی‌متابولیک',
      icon: 'Brain',
      level: 'خوب',
      score: 80,
      description: 'نشانگرهای سلامت مغز و متابولیک عملکرد خوب با پتانسیل بهینه‌سازی را نشان می‌دهد.',
      biomarkers: ['glucose', 'hba1c', 'insulin', 'homocysteine'],
      aiInsight: 'متابولیسم گلوکز پایدار است، اما حساسیت انسولین می‌تواند از طریق مداخلات سبک زندگی بهبود یابد.',
      persianScience: 'سلامت عصبی‌متابولیک عملکرد مغز و سلامت متابولیک را ترکیب می‌کند. کنترل ضعیف گلوکز سالمندی مغز را تسریع می‌کند.',
      bodyPart: 'head',
      position: { x: 50, y: 15 }
    },
    {
      id: 'biological-aging',
      name: 'سالمندی بیولوژیک',
      icon: 'Clock',
      level: 'خوب',
      score: 75,
      description: 'نشانگرهای سن بیولوژیک شما نشان می‌دهد که نسبت به سن تقویمی به خوبی سالمند می‌شوید.',
      biomarkers: ['telomere-length', 'methylation-age', 'advanced-glycation'],
      aiInsight: 'نشانگرهای سن اپی‌ژنتیک نشان می‌دهد که شما تقریباً ۰.۸ سال برای هر سال تقویمی سالمند می‌شوید - نرخ خوب.',
      persianScience: 'نرخ سالمندی بیولوژیک به طور قابل توجهی بین افراد متفاوت است. سالمندی بیولوژیک آهسته‌تر با طول عمر سلامت و زندگی افزایش‌یافته مرتبط است.',
      bodyPart: 'head',
      position: { x: 50, y: 10 }
    },
    {
      id: 'inflammation',
      name: 'التهاب',
      icon: 'Flame',
      level: 'نیازمند توجه',
      score: 68,
      description: 'نشانگرهای التهابی افزایش خفیف را نشان می‌دهد که باید مورد توجه قرار گیرد.',
      biomarkers: ['crp', 'esr', 'il6', 'tnf-alpha'],
      aiInsight: 'پروتئین C-واکنشی به طور خفیف افزایش یافته که نشان‌دهنده التهاب مزمن درجه پایین است که می‌تواند از مداخلات ضدالتهابی بهره‌مند شود.',
      persianScience: 'التهاب مزمن درجه پایین (التهاب‌پیری) محرک کلیدی سالمندی است. کاهش التهاب برای طول عمر حیاتی است.',
      bodyPart: 'chest',
      position: { x: 50, y: 45 }
    },
    {
      id: 'metabolic',
      name: 'متابولیسم',
      icon: 'Zap',
      level: 'خوب',
      score: 82,
      description: 'نشانگرهای سلامت متابولیک تولید و استفاده انرژی خوب را نشان می‌دهد.',
      biomarkers: ['glucose', 'insulin', 'hba1c', 'lactate', 'uric-acid'],
      aiInsight: 'انعطاف‌پذیری متابولیک خوب به نظر می‌رسد با کنترل پایدار گلوکز، هرچند فضای بهبود در حساسیت انسولین وجود دارد.',
      persianScience: 'سلامت متابولیک برای طول عمر بنیادی است. سلامت متابولیک ضعیف سالمندی را تسریع کرده و خطر بیماری را افزایش می‌دهد.',
      bodyPart: 'abdomen',
      position: { x: 48, y: 65 }
    }
  ],
  
  biomarkers: [
    {
      id: 'alt',
      name: 'ALT (آلانین آمینوترانسفراز)',
      value: 18,
      unit: 'واحد/لیتر',
      minRange: 7,
      maxRange: 56,
      optimalMin: 10,
      optimalMax: 25,
      trend: [22, 20, 19, 18, 17, 18],
      definition: 'آنزیمی که عمدتاً در کبد یافت می‌شود و به شکستن پروتئین‌ها کمک می‌کند.',
      interpretation: 'سطوح ALT شما بهینه است که نشان‌دهنده عملکرد سالم کبد و آسیب حداقل سلول‌های کبدی است.',
      relatedSystems: ['liver']
    },
    {
      id: 'crp',
      name: 'پروتئین C-واکنشی',
      value: 2.1,
      unit: 'میلی‌گرم/لیتر',
      minRange: 0,
      maxRange: 3.0,
      optimalMin: 0,
      optimalMax: 1.0,
      trend: [2.8, 2.5, 2.3, 2.1, 2.2, 2.1],
      definition: 'پروتئینی که توسط کبد در پاسخ به التهاب در بدن تولید می‌شود.',
      interpretation: 'CRP شما به طور خفیف افزایش یافته که نشان‌دهنده التهاب درجه پایین است که باید از طریق مداخلات سبک زندگی مورد توجه قرار گیرد.',
      relatedSystems: ['immune', 'inflammation']
    },
    {
      id: 'hdl',
      name: 'کلسترول HDL',
      value: 58,
      unit: 'میلی‌گرم/دسی‌لیتر',
      minRange: 40,
      maxRange: 100,
      optimalMin: 60,
      optimalMax: 100,
      trend: [55, 56, 57, 58, 59, 58],
      definition: 'لیپوپروتئین با چگالی بالا، اغلب «کلسترول خوب» نامیده می‌شود.',
      interpretation: 'HDL شما نزدیک به بهینه است. افزایش به بالای ۶۰ میلی‌گرم/دسی‌لیتر برای حفاظت بهتر قلبی‌عروقی در نظر گیرید.',
      relatedSystems: ['cardiovascular']
    },
    {
      id: 'vitamin-d',
      name: 'ویتامین D',
      value: 28,
      unit: 'نانوگرم/میلی‌لیتر',
      minRange: 20,
      maxRange: 100,
      optimalMin: 50,
      optimalMax: 80,
      trend: [25, 26, 27, 28, 29, 28],
      definition: 'ویتامین محلول در چربی که برای سلامت استخوان، عملکرد ایمنی و سلامت سلولی حیاتی است.',
      interpretation: 'سطح ویتامین D شما کمبود دارد. مکمل‌سازی و افزایش قرارگیری در معرض آفتاب توصیه می‌شود.',
      relatedSystems: ['micronutrients', 'immune']
    }
  ],
  
  interventions: [
    // Nutrition - 15 interventions
    {
      id: 'mediterranean-diet',
      category: 'تغذیه',
      title: 'رژیم غذایی مدیترانه‌ای',
      description: 'یک الگوی غذایی غنی از روغن زیتون، آجیل، میوه‌ها، سبزیجات و ماهی',
      reason: 'کاهش التهاب و بهبود سلامت قلبی‌عروقی',
      difficulty: 'متوسط',
      duration: '۸ هفته',
      frequency: 'روزانه',
      benefits: ['کاهش التهاب', 'بهبود سلامت قلب', 'کنترل وزن', 'بهبود عملکرد مغز'],
      instructions: ['۳۰٪ کالری از روغن زیتون', 'حداقل ۵ وعده میوه و سبزیجات', '۲ وعده ماهی در هفته', 'محدود کردن گوشت قرمز'],
      tips: ['از روغن زیتون خالص استفاده کنید', 'آجیل‌ها را در وعده‌های میانی مصرف کنید', 'ماهی‌های چرب را ترجیح دهید'],
      status: 'در دسترس',
      relatedBiomarkers: ['crp', 'hdl'],
      relatedSystems: ['cardiovascular', 'inflammation']
    },
    {
      id: 'intermittent-fasting',
      category: 'تغذیه',
      title: 'روزه‌داری متناوب ۱۶:۸',
      description: 'محدود کردن پنجره خوردن به ۸ ساعت در روز',
      reason: 'بهبود حساسیت انسولین و خودبهسازی سلولی',
      difficulty: 'متوسط',
      duration: '۴ هفته',
      frequency: 'روزانه',
      benefits: ['بهبود متابولیسم', 'کاهش وزن', 'افزایش انرژی', 'بهبود تمرکز'],
      instructions: ['خوردن بین ساعت ۱۲ تا ۲۰', 'آب و چای بدون شکر مجاز', 'شروع تدریجی با ۱۲ ساعت'],
      tips: ['شب‌ها زود غذا بخورید', 'در روزهای اول انعطاف داشته باشید', 'آب کافی بنوشید'],
      status: 'در دسترس',
      relatedBiomarkers: ['glucose', 'insulin'],
      relatedSystems: ['metabolic']
    },
    {
      id: 'omega3-rich-foods',
      category: 'تغذیه',
      title: 'افزایش غذاهای غنی از امگا-۳',
      description: 'اضافه کردن منابع امگا-۳ به رژیم غذایی روزانه',
      reason: 'کاهش التهاب و بهبود عملکرد مغز',
      difficulty: 'آسان',
      duration: '۶ هفته',
      frequency: 'روزانه',
      benefits: ['کاهش التهاب', 'بهبود عملکرد مغز', 'سلامت قلب', 'بهبود خلق و خو'],
      instructions: ['۲ وعده ماهی چرب در هفته', 'یک مشت آجیل در روز', 'بذر کتان یا چیا در صبحانه'],
      tips: ['ماهی سالمون، ساردین و تن را امتحان کنید', 'آجیل گردو و بادام زمینی مفیدند', 'روغن کانولا استفاده کنید'],
      status: 'در حال انجام',
      relatedBiomarkers: ['crp'],
      relatedSystems: ['inflammation', 'neurometabolic']
    },
    {
      id: 'hydration-boost',
      category: 'تغذیه',
      title: 'افزایش مصرف آب',
      description: 'نوشیدن ۸-۱۰ لیوان آب در روز',
      reason: 'بهبود عملکرد کلیه و سم‌زدایی بدن',
      difficulty: 'آسان',
      duration: '۲ هفته',
      frequency: 'روزانه',
      benefits: ['بهبود عملکرد کلیه', 'پوست سالم‌تر', 'افزایش انرژی', 'بهبود هضم'],
      instructions: ['۲ لیوان آب با بیدار شدن', 'یک لیوان قبل از هر وعده', 'آب با طعم طبیعی مجاز'],
      tips: ['بطری آب همراه داشته باشید', 'یادآوری روی تلفن تنظیم کنید', 'آب میوه‌ای درست کنید'],
      status: 'در دسترس',
      relatedBiomarkers: ['creatinine'],
      relatedSystems: ['kidney']
    },

    // Exercise - 15 interventions
    {
      id: 'hiit-training',
      category: 'ورزش',
      title: 'تمرین تناوبی پرشدت (HIIT)',
      description: 'تمرینات کوتاه و پرشدت با استراحت‌های کوتاه',
      reason: 'بهبود تناسب قلبی‌عروقی و سوخت چربی',
      difficulty: 'دشوار',
      duration: '۶ هفته',
      frequency: '۳ بار در هفته',
      benefits: ['سوخت چربی سریع', 'بهبود قلب', 'صرفه‌جویی در زمان', 'افزایش متابولیسم'],
      instructions: ['گرم کردن ۵ دقیقه', '۲۰ ثانیه شدید + ۱۰ ثانیه استراحت', 'تکرار ۸ دور', 'سرد کردن ۵ دقیقه'],
      tips: ['با شدت کمتر شروع کنید', 'حرکات ساده انتخاب کنید', 'آب کافی بنوشید'],
      status: 'در دسترس',
      relatedBiomarkers: [],
      relatedSystems: ['cardiovascular', 'metabolic']
    },
    {
      id: 'daily-walking',
      category: 'ورزش',
      title: 'پیاده‌روی روزانه ۱۰ هزار قدم',
      description: 'رسیدن به ۱۰ هزار قدم در روز',
      reason: 'بهبود سلامت قلبی‌عروقی و کنترل وزن',
      difficulty: 'آسان',
      duration: '۴ هفته',
      frequency: 'روزانه',
      benefits: ['بهبود سلامت قلب', 'کنترل وزن', 'بهبود خلق و خو', 'افزایش انرژی'],
      instructions: ['شروع با ۵ هزار قدم', 'افزایش تدریجی', 'استفاده از شمارنده قدم', 'پیاده‌روی سریع'],
      tips: ['پله‌ها را به جای آسانسور استفاده کنید', 'قدم زدن در پارک', 'موسیقی گوش دهید'],
      status: 'انتخاب شده',
      currentStreak: 12,
      longestStreak: 15,
      completedDays: 25,
      totalDays: 28,
      relatedBiomarkers: [],
      relatedSystems: ['cardiovascular']
    },

    // Sleep - 10 interventions
    {
      id: 'sleep-hygiene',
      category: 'خواب',
      title: 'بهداشت خواب',
      description: 'ایجاد محیط و عادات مناسب برای خواب',
      reason: 'بهبود کیفیت و مدت خواب',
      difficulty: 'آسان',
      duration: '۴ هفته',
      frequency: 'شبانه',
      benefits: ['خواب عمیق‌تر', 'بیدار شدن راحت‌تر', 'افزایش انرژی', 'بهبود تمرکز'],
      instructions: ['اتاق تاریک و خنک', 'بدون صفحه نمایش ۱ ساعت قبل', 'زمان ثابت خواب', 'تخت راحت'],
      tips: ['ماسک چشم استفاده کنید', 'صدای طبیعت پخش کنید', 'کافئین بعد از ظهر نخورید'],
      status: 'انتخاب شده',
      currentStreak: 18,
      longestStreak: 20,
      completedDays: 35,
      totalDays: 28,
      relatedBiomarkers: [],
      relatedSystems: []
    },

    // Mental Health - 10 interventions
    {
      id: 'meditation-practice',
      category: 'سلامت روان',
      title: 'مدیتیشن روزانه',
      description: 'تمرین مدیتیشن ذهن‌آگاهی',
      reason: 'کاهش استرس و بهبود تمرکز',
      difficulty: 'متوسط',
      duration: '۶ هفته',
      frequency: 'روزانه',
      benefits: ['کاهش استرس', 'بهبود تمرکز', 'آرامش ذهن', 'خواب بهتر'],
      instructions: ['۱۰-۲۰ دقیقه روزانه', 'مکان آرام', 'تمرکز روی تنفس', 'راهنمای صوتی'],
      tips: ['با ۵ دقیقه شروع کنید', 'اپلیکیشن استفاده کنید', 'صبح‌ها انجام دهید'],
      status: 'انتخاب شده',
      currentStreak: 8,
      longestStreak: 12,
      completedDays: 18,
      totalDays: 42,
      relatedBiomarkers: [],
      relatedSystems: []
    },

    // Supplements - 10 interventions  
    {
      id: 'vitamin-d3',
      category: 'مکمل‌سازی',
      title: 'ویتامین D3 روزانه',
      description: 'مصرف ۴۰۰۰ واحد ویتامین D3 روزانه',
      reason: 'جبران کمبود ویتامین D برای سلامت استخوان و ایمنی',
      difficulty: 'آسان',
      duration: '۸ هفته',
      frequency: 'روزانه',
      benefits: ['تقویت سیستم ایمنی', 'سلامت استخوان', 'بهبود خلق و خو', 'جذب کلسیم'],
      instructions: ['۴۰۰۰ واحد روزانه', 'با غذای چرب', 'صبح‌ها مصرف', 'آزمایش خون ماهانه'],
      tips: ['با روغن ماهی بخورید', 'پیوسته مصرف کنید', 'سطح خون چک کنید'],
      status: 'عقب‌مانده',
      relatedBiomarkers: ['vitamin-d'],
      relatedSystems: ['micronutrients', 'immune']
    }
  ],

  dietPlans: [
    {
      id: 'mediterranean-plan',
      name: 'برنامه مدیترانه‌ای',
      description: 'رژیم غذایی غنی از روغن زیتون، میوه‌ها، سبزیجات و ماهی',
      type: 'مدیترانه‌ای',
      duration: '۸ هفته',
      meals: {
        breakfast: ['نان کامل با روغن زیتون و گوجه', 'ماست یونانی با آجیل', 'میوه فصل'],
        lunch: ['سالاد مدیترانه‌ای', 'ماهی کبابی با سبزیجات', 'نان سنگک'],
        dinner: ['خوراک حبوبات', 'سبزی پلو با ماهی', 'سالاد سبز'],
        snacks: ['آجیل ترکیبی', 'میوه‌های خشک', 'زیتون']
      },
      macros: {
        protein: 20,
        carbs: 45,
        fat: 35,
        calories: 2000
      },
      benefits: ['کاهش التهاب', 'سلامت قلب', 'کنترل وزن', 'عمر طولانی‌تر'],
      restrictions: ['محدودیت گوشت قرمز', 'کاهش شکر', 'غذاهای فرآوری شده'],
      isActive: true
    },
    {
      id: 'weight-loss-plan',
      name: 'برنامه کاهش وزن',
      description: 'رژیم متعادل برای کاهش وزن سالم',
      type: 'کاهش وزن',
      duration: '۱۲ هفته',
      meals: {
        breakfast: ['تخم‌مرغ با سبزیجات', 'جو دوسر با میوه', 'چای سبز'],
        lunch: ['سینه مرغ کبابی', 'برنج قهوه‌ای', 'سالاد رنگی'],
        dinner: ['ماهی آزاد', 'سبزیجات بخارپز', 'سوپ سبزیجات'],
        snacks: ['سیب با بادام', 'ماست کم‌چرب', 'خیار و هویج']
      },
      macros: {
        protein: 30,
        carbs: 35,
        fat: 35,
        calories: 1500
      },
      benefits: ['کاهش وزن سالم', 'حفظ عضله', 'انرژی پایدار', 'سیری طولانی'],
      restrictions: ['کاهش کالری', 'محدودیت شیرینی', 'کنترل پورشن']
    }
  ],

  workoutPlans: [
    {
      id: 'beginner-strength',
      name: 'قدرت مبتدی',
      description: 'برنامه تمرین قدرتی برای مبتدیان',
      type: 'قدرتی',
      level: 'مبتدی',
      duration: '۸ هفته',
      frequency: '۳ بار در هفته',
      exercises: [
        {
          day: 'روز ۱ - بالاتنه',
          exercises: [
            { name: 'شنا', sets: 3, reps: '8-12', rest: '60 ثانیه' },
            { name: 'پرس سینه', sets: 3, reps: '8-12', rest: '60 ثانیه' },
            { name: 'زیر بغل', sets: 3, reps: '8-12', rest: '60 ثانیه' },
            { name: 'جلو بازو', sets: 2, reps: '10-15', rest: '45 ثانیه' }
          ]
        },
        {
          day: 'روز ۲ - پایین‌تنه',
          exercises: [
            { name: 'اسکات', sets: 3, reps: '8-12', rest: '90 ثانیه' },
            { name: 'ددلیفت', sets: 3, reps: '5-8', rest: '90 ثانیه' },
            { name: 'لانج', sets: 3, reps: '10 هر پا', rest: '60 ثانیه' },
            { name: 'ساق پا', sets: 3, reps: '15-20', rest: '45 ثانیه' }
          ]
        }
      ],
      equipment: ['دمبل', 'هالتر', 'نیمکت'],
      benefits: ['افزایش قدرت', 'تقویت عضلات', 'بهبود متابولیسم', 'تراکم استخوان'],
      isActive: true
    },
    {
      id: 'cardio-hiit',
      name: 'کاردیو HIIT',
      description: 'تمرینات قلبی‌عروقی پرشدت',
      type: 'قلبی‌عروقی',
      level: 'متوسط',
      duration: '۶ هفته',
      frequency: '۴ بار در هفته',
      exercises: [
        {
          day: 'روز ۱ - HIIT کل بدن',
          exercises: [
            { name: 'جامپینگ جک', duration: '30 ثانیه', rest: '15 ثانیه' },
            { name: 'برپی', duration: '30 ثانیه', rest: '15 ثانیه' },
            { name: 'مانتین کلایمبر', duration: '30 ثانیه', rest: '15 ثانیه' },
            { name: 'اسکات جامپ', duration: '30 ثانیه', rest: '15 ثانیه' }
          ]
        }
      ],
      equipment: ['بدون تجهیزات'],
      benefits: ['سوخت چربی', 'بهبود تناسب', 'تقویت قلب', 'صرفه‌جویی زمان']
    }
  ],

  achievements: [
    {
      id: 'first-week',
      title: 'هفته اول',
      description: 'اولین هفته را تکمیل کردید',
      icon: 'Star',
      type: 'completion',
      requirement: 7,
      unlocked: true,
      unlockedDate: '2024-01-15'
    },
    {
      id: 'streak-master',
      title: 'استاد پیوستگی',
      description: '۳۰ روز پیاپی',
      icon: 'Fire',
      type: 'streak',
      requirement: 30,
      unlocked: false
    },
    {
      id: 'variety-lover',
      title: 'عاشق تنوع',
      description: '۱۰ مداخله مختلف را امتحان کردید',
      icon: 'Sparkles',
      type: 'variety',
      requirement: 10,
      unlocked: false
    },
    {
      id: 'consistency-king',
      title: 'پادشاه ثبات',
      description: '۹۰٪ روزها فعال بودید',
      icon: 'Crown',
      type: 'consistency',
      requirement: 90,
      unlocked: false
    }
  ],

  dailyTips: [
    {
      id: 'tip-1',
      date: '2024-01-20',
      title: 'آب کافی بنوشید',
      description: 'شروع روز با ۲ لیوان آب برای شروع بهتر متابولیسم',
      category: 'تغذیه',
      icon: '💧',
      actionable: 'الان یک لیوان آب بنوشید'
    },
    {
      id: 'tip-2',
      date: '2024-01-21',
      title: 'تنفس عمیق',
      description: 'برای کاهش استرس ۵ دقیقه تنفس عمیق انجام دهید',
      category: 'روحی',
      icon: '🧘‍♂️',
      actionable: 'الان ۱۰ نفس عمیق بکشید'
    },
    {
      id: 'tip-3',
      date: '2024-01-22',
      title: 'قدم زدن',
      description: 'حداقل ۱۰ دقیقه در هوای آزاد قدم بزنید',
      category: 'ورزش',
      icon: '🚶‍♂️',
      actionable: 'برای قدم زدن آماده شوید'
    },
    {
      id: 'tip-4',
      date: '2024-01-23',
      title: 'خواب منظم',
      description: 'امشب سعی کنید ساعت ۲۲ بخوابید',
      category: 'خواب',
      icon: '😴',
      actionable: 'آلارم خواب تنظیم کنید'
    },
    {
      id: 'tip-5',
      date: '2024-01-24',
      title: 'تغذیه رنگی',
      description: 'امروز حداقل ۳ رنگ مختلف میوه و سبزیجات بخورید',
      category: 'تغذیه',
      icon: '🌈',
      actionable: 'یک میوه رنگی انتخاب کنید'
    }
  ],

  userStats: {
    totalInterventions: 60,
    activeInterventions: 3,
    completedInterventions: 0,
    currentStreaks: 2,
    longestStreak: 20,
    totalDaysActive: 45,
    weeklyGoals: 5,
    monthlyGoals: 20
  },
  
  navigateTo: (page: string) => set((state) => ({
    pageHistory: [...state.pageHistory, state.currentPage],
    currentPage: page
  })),
  
  goBack: () => set((state) => {
    if (state.pageHistory.length > 0) {
      const previousPage = state.pageHistory[state.pageHistory.length - 1];
      const newHistory = state.pageHistory.slice(0, -1);
      return {
        currentPage: previousPage,
        pageHistory: newHistory
      };
    }
    return state;
  }),

  selectIntervention: (id: string) => set((state) => ({
    interventions: state.interventions.map(intervention =>
      intervention.id === id
        ? { 
            ...intervention, 
            status: 'انتخاب شده' as const,
            userSelected: true,
            startDate: new Date().toISOString(),
            currentStreak: 0,
            longestStreak: 0,
            completedDays: 0,
            totalDays: 0
          }
        : intervention
    ),
    userStats: {
      ...state.userStats,
      activeInterventions: state.userStats.activeInterventions + 1
    }
  })),

  unselectIntervention: (id: string) => set((state) => ({
    interventions: state.interventions.map(intervention =>
      intervention.id === id
        ? { 
            ...intervention, 
            status: 'در دسترس' as const,
            userSelected: false,
            startDate: undefined,
            currentStreak: undefined,
            longestStreak: undefined,
            completedDays: undefined,
            totalDays: undefined
          }
        : intervention
    ),
    userStats: {
      ...state.userStats,
      activeInterventions: Math.max(0, state.userStats.activeInterventions - 1)
    }
  })),

  updateInterventionStatus: (id: string, status: Intervention['status']) => set((state) => ({
    interventions: state.interventions.map(intervention =>
      intervention.id === id ? { ...intervention, status } : intervention
    )
  })),

  markInterventionComplete: (id: string) => set((state) => {
    const intervention = state.interventions.find(i => i.id === id);
    if (!intervention) return state;

    const updatedInterventions = state.interventions.map(intervention =>
      intervention.id === id
        ? {
            ...intervention,
            completedDays: (intervention.completedDays || 0) + 1,
            currentStreak: (intervention.currentStreak || 0) + 1,
            longestStreak: Math.max(
              intervention.longestStreak || 0,
              (intervention.currentStreak || 0) + 1
            ),
            totalDays: (intervention.totalDays || 0) + 1
          }
        : intervention
    );

    return {
      interventions: updatedInterventions,
      userStats: {
        ...state.userStats,
        totalDaysActive: state.userStats.totalDaysActive + 1
      }
    };
  }),

  activateDietPlan: (id: string) => set((state) => ({
    dietPlans: state.dietPlans.map(plan => ({
      ...plan,
      isActive: plan.id === id
    }))
  })),

  activateWorkoutPlan: (id: string) => set((state) => ({
    workoutPlans: state.workoutPlans.map(plan => ({
      ...plan,
      isActive: plan.id === id
    }))
  })),

  getTodayTip: () => {
    const state = get();
    const today = new Date().toISOString().split('T')[0];
    const todayTip = state.dailyTips.find(tip => tip.date === today);
    
    if (todayTip) return todayTip;
    
    // Fallback to a rotating tip based on day of year
    const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    const tipIndex = dayOfYear % state.dailyTips.length;
    return state.dailyTips[tipIndex];
  }
}));