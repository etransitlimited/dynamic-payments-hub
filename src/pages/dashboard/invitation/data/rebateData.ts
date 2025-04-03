// Implement data loading in chunks for better performance
import { RebateRecord } from "../types";

// Function to extract date from datetime string
const extractDate = (datetime: string): string => {
  return datetime.split(' ')[0]; // Split datetime and take the date part
};

// Initial batch of records for immediate display
export const rebateRecords: RebateRecord[] = [
  {
    id: "RB-8973-4610",
    invitee: "王五",
    type: "充值",
    amount: 1000,
    rebate: 50,
    datetime: "2023-11-25 14:32",
    date: extractDate("2023-11-25 14:32"), // Add extracted date
    status: "active"
  },
  {
    id: "RB-7645-2198",
    invitee: "赵六",
    type: "购卡",
    amount: 2500,
    rebate: 125,
    datetime: "2023-11-20 09:45",
    date: extractDate("2023-11-20 09:45"),
    status: "active"
  },
  {
    id: "RB-5321-9874",
    invitee: "张三",
    type: "交易",
    amount: 1800,
    rebate: 90,
    datetime: "2023-11-18 16:20",
    date: extractDate("2023-11-18 16:20"),
    status: "pending"
  },
  {
    id: "RB-4298-3710",
    invitee: "李四",
    type: "充值",
    amount: 3000,
    rebate: 150,
    datetime: "2023-11-15 11:22",
    date: extractDate("2023-11-15 11:22"),
    status: "active"
  },
  {
    id: "RB-3542-8901",
    invitee: "钱七",
    type: "购卡",
    amount: 5000,
    rebate: 250,
    datetime: "2023-11-10 08:15",
    date: extractDate("2023-11-10 08:15"),
    status: "pending"
  },
  {
    id: "RB-2189-7634",
    invitee: "孙八",
    type: "交易",
    amount: 1200,
    rebate: 60,
    datetime: "2023-11-05 15:40",
    date: extractDate("2023-11-05 15:40"),
    status: "active"
  },
  {
    id: "RB-1056-4329",
    invitee: "周九",
    type: "充值",
    amount: 2000,
    rebate: 100,
    datetime: "2023-11-01 10:30",
    date: extractDate("2023-11-01 10:30"),
    status: "pending"
  }
];

// Additional records that can be loaded on demand
export const getMoreRebateRecords = (): Promise<RebateRecord[]> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve([
        {
          id: "RB-0943-2109",
          invitee: "吴十",
          type: "购卡",
          amount: 3500,
          rebate: 175,
          datetime: "2023-10-28 13:45",
          date: extractDate("2023-10-28 13:45"),
          status: "active"
        },
        {
          id: "RB-0842-7631",
          invitee: "郑十一",
          type: "交易",
          amount: 1500,
          rebate: 75,
          datetime: "2023-10-25 09:12",
          date: extractDate("2023-10-25 09:12"),
          status: "active"
        },
        {
          id: "RB-0751-3928",
          invitee: "陈十二",
          type: "充值",
          amount: 2200,
          rebate: 110,
          datetime: "2023-10-20 16:38",
          date: extractDate("2023-10-20 16:38"),
          status: "pending"
        }
      ]);
    }, 300);
  });
};

// Function to get all records (can be used for search/filtering operations)
export const getAllRebateRecords = async (): Promise<RebateRecord[]> => {
  const additionalRecords = await getMoreRebateRecords();
  return [...rebateRecords, ...additionalRecords];
};

// Function to fetch records by page (simulating backend pagination)
export const getRebateRecordsByPage = (
  page: number, 
  pageSize: number, 
  query: string = ""
): Promise<{ records: RebateRecord[], total: number }> => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const allRecords = await getAllRebateRecords();
      
      // Filter records based on search query
      const filtered = query 
        ? allRecords.filter(record => 
            record.invitee.toLowerCase().includes(query.toLowerCase()) ||
            record.id.toLowerCase().includes(query.toLowerCase())
          )
        : allRecords;
      
      // Calculate pagination
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedRecords = filtered.slice(startIndex, endIndex);
      
      resolve({
        records: paginatedRecords,
        total: filtered.length
      });
    }, 150); // Reduced delay for better UX
  });
};
