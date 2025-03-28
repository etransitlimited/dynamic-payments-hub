
export interface RebateRecord {
  id: string;
  invitee: string;
  rebate: string;
  amount: string;
  datetime: string;
  status: "active" | "pending";
}
