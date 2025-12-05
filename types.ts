export enum AppState {
  ATTRACT = 'ATTRACT',
  CAPTURE = 'CAPTURE',
  SELECT_DREAM = 'SELECT_DREAM',
  PROCESSING = 'PROCESSING',
  RESULT = 'RESULT',
  LEAD_GEN = 'LEAD_GEN'
}

export interface CareerOption {
  id: string;
  title: string;
  icon: string;
  description: string;
  prompt: string; // The instruction for the AI
  themeColor: string;
  subOptions?: CareerOption[];
}

export interface ProcessingState {
  step: number;
  message: string;
}