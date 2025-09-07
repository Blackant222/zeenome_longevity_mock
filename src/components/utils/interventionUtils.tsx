import { Clock, Play, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const getStatusIcon = (status: string) => {
  switch (status) {
    case 'در دسترس': return Clock;
    case 'انتخاب شده': return Play;
    case 'در حال انجام': return Play;
    case 'انجام شده': return CheckCircle;
    case 'عقب‌مانده': return XCircle;
    default: return AlertCircle;
  }
};

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'در دسترس': return 'bg-gray-100 text-gray-700';
    case 'انتخاب شده': return 'bg-blue-100 text-blue-700';
    case 'در حال انجام': return 'bg-green-100 text-green-700';
    case 'انجام شده': return 'bg-success/10 text-success';
    case 'عقب‌مانده': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'آسان': return 'bg-green-100 text-green-700';
    case 'متوسط': return 'bg-yellow-100 text-yellow-700';
    case 'دشوار': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const getLevelColor = (level: string) => {
  switch (level) {
    case 'مبتدی': return 'bg-green-100 text-green-700';
    case 'متوسط': return 'bg-yellow-100 text-yellow-700';
    case 'پیشرفته': return 'bg-red-100 text-red-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

export const getCategoryColor = (category: string) => {
  switch (category) {
    case 'تغذیه': return 'bg-green-100 text-green-700';
    case 'ورزش': return 'bg-blue-100 text-blue-700';
    case 'خواب': return 'bg-purple-100 text-purple-700';
    case 'سلامت روان': return 'bg-pink-100 text-pink-700';
    case 'مکمل‌سازی': return 'bg-orange-100 text-orange-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};