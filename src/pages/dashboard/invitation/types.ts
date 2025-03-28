
export interface RebateRecord {
  id: string;
  invitee: string;
  type: string;
  amount: number;
  rebate: number;
  datetime: string;
  status?: "active" | "pending";  // Added status property
  rebateAmount?: number;          // Added rebateAmount property
  totalTransaction?: number;      // Added totalTransaction property
  date?: string;                  // Added date property (might be derived from datetime)
}
