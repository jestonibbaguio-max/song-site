export type TrainingTaskStatus = 'Completed' | 'In Progress' | 'Pending' | 'Not Started';

export interface TrainingTask {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  status: TrainingTaskStatus;
  progress: number;
  url: string;
}
