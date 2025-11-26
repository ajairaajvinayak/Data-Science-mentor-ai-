export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export interface WeekPlan {
  week: number;
  theme: string;
  description: string;
  tasks: string[];
  project: string;
}

export interface Phase {
  id: number;
  title: string;
  duration: string;
  focus: string;
  incomeOpportunity: string;
  weeks: WeekPlan[];
}

export enum AppView {
  ROADMAP = 'ROADMAP',
  CHAT = 'CHAT',
  VOICE = 'VOICE',
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
