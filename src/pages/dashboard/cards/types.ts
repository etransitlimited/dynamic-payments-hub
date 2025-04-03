
export interface Task {
  id: string;
  cardNumber: string;
  cardType: string;
  task: string;
  status: 'pending' | 'completed' | 'failed' | 'rejected';
  createdAt: string;
}
