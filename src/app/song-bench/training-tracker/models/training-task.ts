export type TrainingTaskStatus = 'Completed' | 'In Progress' | 'Pending' | 'Not Started';

export interface TrainingLink {
  text: string;
  url: string;
}

export interface TrainingTask {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: TrainingTaskStatus;
  progress: number;
  url: string;
  startedAt?: string;
  completedAt?: string;
  actualDuration?: number;
  description?: string;
  externalLinks?: TrainingLink[];
}
