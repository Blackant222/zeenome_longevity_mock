import { HealthDashboardPage } from '../pages/HealthDashboardPage';
import { LifestyleHeroPage } from '../pages/LifestyleHeroPage';
import { LifestyleDetailsPage } from '../pages/LifestyleDetailsPage';
import { LifestyleCategoryDetailPage } from '../pages/LifestyleCategoryDetailPage';
import { LongevityHeroPage } from '../pages/LongevityHeroPage';
import { LongevityDetailsPage } from '../pages/LongevityDetailsPage';
import { LongevitySystemDetailPage } from '../pages/LongevitySystemDetailPage';
import { BiomarkersHeroPage } from '../pages/BiomarkersHeroPage';
import { BiomarkerDetailPage } from '../pages/BiomarkerDetailPage';
import { InterventionsMainPage } from '../pages/InterventionsMainPage';
import { InterventionReasonDetailPage } from '../pages/InterventionReasonDetailPage';
import { InterventionDetailPage } from '../pages/InterventionDetailPage';
import { DietPlansMainPage } from '../pages/DietPlansMainPage';
import { DietPlanDetailPage } from '../pages/DietPlanDetailPage';
import { WorkoutPlansMainPage } from '../pages/WorkoutPlansMainPage';
import { WorkoutPlanDetailPage } from '../pages/WorkoutPlanDetailPage';

export const renderPageByRoute = (currentPage: string) => {
  // Health Dashboard
  if (currentPage === 'health-dashboard') return <HealthDashboardPage />;
  
  // Lifestyle pages
  if (currentPage === 'lifestyle-hero') return <LifestyleHeroPage />;
  if (currentPage === 'lifestyle-details') return <LifestyleDetailsPage />;
  if (currentPage.startsWith('lifestyle-category-')) {
    const categoryId = currentPage.replace('lifestyle-category-', '');
    return <LifestyleCategoryDetailPage categoryId={categoryId} />;
  }
  
  // Longevity pages
  if (currentPage === 'longevity-hero') return <LongevityHeroPage />;
  if (currentPage === 'longevity-details') return <LongevityDetailsPage />;
  if (currentPage.startsWith('longevity-system-')) {
    const systemId = currentPage.replace('longevity-system-', '');
    return <LongevitySystemDetailPage systemId={systemId} />;
  }
  
  // Biomarkers pages
  if (currentPage === 'biomarkers-hero') return <BiomarkersHeroPage />;
  if (currentPage.startsWith('biomarker-')) {
    const biomarkerId = currentPage.replace('biomarker-', '');
    return <BiomarkerDetailPage biomarkerId={biomarkerId} />;
  }
  
  // Interventions pages
  if (currentPage === 'interventions-main') return <InterventionsMainPage />;
  if (currentPage.startsWith('intervention-detail-')) {
    const interventionId = currentPage.replace('intervention-detail-', '');
    return <InterventionDetailPage interventionId={interventionId} />;
  }
  if (currentPage.startsWith('intervention-reason-')) {
    const interventionId = currentPage.replace('intervention-reason-', '');
    return <InterventionReasonDetailPage interventionId={interventionId} />;
  }
  
  // Diet Plans pages
  if (currentPage === 'diet-plans-main') return <DietPlansMainPage />;
  if (currentPage.startsWith('diet-plan-')) {
    const planId = currentPage.replace('diet-plan-', '');
    return <DietPlanDetailPage planId={planId} />;
  }
  
  // Workout Plans pages
  if (currentPage === 'workout-plans-main') return <WorkoutPlansMainPage />;
  if (currentPage.startsWith('workout-plan-')) {
    const planId = currentPage.replace('workout-plan-', '');
    return <WorkoutPlanDetailPage planId={planId} />;
  }
  
  // Default to health dashboard
  return <HealthDashboardPage />;
};

export const getSlideDirection = (currentPage: string) => {
  // For RTL, reverse the slide directions
  if (currentPage.includes('-detail') || currentPage.includes('-reason-') || 
      (currentPage.includes('-main') && currentPage !== 'health-dashboard')) {
    return { x: '-100%' }; // Detail pages slide in from left (reversed for RTL)
  }
  return { x: 0 }; // Main pages no slide
};

export const getExitDirection = (currentPage: string) => {
  return currentPage.includes('-detail') || currentPage.includes('-reason-') || 
         (currentPage.includes('-main') && currentPage !== 'health-dashboard') ? '-100%' : '100%';
};