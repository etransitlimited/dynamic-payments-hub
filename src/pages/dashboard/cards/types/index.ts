
export interface Task {
  id: string;
  cardNumber: string;
  cardType: string;
  task: string;
  status: "completed" | "pending" | "failed";
  createdAt: string;
}
