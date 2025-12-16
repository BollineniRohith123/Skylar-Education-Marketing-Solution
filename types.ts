export enum AppState {
  ATTRACT = 'ATTRACT',
  CAPTURE = 'CAPTURE',
  PHOTO_REVIEW = 'PHOTO_REVIEW',
  SELECT_CATEGORY = 'SELECT_CATEGORY', // New: Choose category (Careers, Heroes, etc.)
  SELECT_DREAM = 'SELECT_DREAM',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  LEAD_GEN = 'LEAD_GEN'
}

export type CategoryType =
  | 'careers'
  | 'fantasy'
  | 'dolls'
  | 'devotional'
  | 'games';

export interface CareerOption {
  id: string;
  title: string;
  icon: string;
  description: string;
  prompt: string;
  themeColor: string;
  subOptions?: CareerOption[];
}

export interface CategoryGroup {
  id: CategoryType;
  title: string;
  icon: string;
  emoji?: string;           // Character emoji for visual appeal
  characterPreview?: string; // Preview text showing sample characters
  description: string;
  themeColor: string;
  bgGradient: string;
  options: CareerOption[];
}

export interface ProcessingState {
  step: number;
  message: string;
}