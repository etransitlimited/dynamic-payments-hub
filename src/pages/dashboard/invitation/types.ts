
export interface RebateRecord {
  id: string;
  invitee: string;
  type?: string;
  amount: number;
  rebate: number;
  datetime: string;
  status: "active" | "pending";
}
