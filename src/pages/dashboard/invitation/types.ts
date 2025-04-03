
export interface RebateRecord {
  id: string;
  invitee: string;
  type?: string;
  amount: number;
  rebate: number;
  datetime: string;
  date: string; // Add this property to fix the error
  status: "active" | "pending" | "failed" | "completed";
}
