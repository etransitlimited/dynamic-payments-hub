
// Type definitions for translation structure
declare namespace Translations {
  interface DashboardTranslations {
    title: string;
    welcomeMessage: string;
    subtitle: string;
    totalBalance: string;
    activeCards: string;
    merchantCount: string;
    invitedUsers: string;
    recentActivities: string;
    quickActions: string;
    search: string;
    searchResults: string;
    notifications: string;
    settings: string;
    profile: string;
    logout: string;
    activityList: string;
    viewAll: string;
    sidebar?: {
      wallet?: {
        title?: string;
        deposit?: string;
        depositRecords?: string;
        fundDetails?: string;
      };
      cards?: {
        title?: string;
        search?: string;
        activationTasks?: string;
        apply?: string;
      };
      merchant?: {
        title?: string;
        accountManagement?: string;
        accountInfo?: string;
        accountRoles?: string;
      };
      invitation?: {
        title?: string;
        list?: string;
        rebateList?: string;
      };
      quickAccess?: {
        dashboard?: string;
        analytics?: string;
        transactions?: string;
        notifications?: string;
        settings?: string;
      };
    };
    systemMetrics: {
      dailyActiveUsers: string;
      monthlyActiveUsers: string;
      totalTransactions: string;
      conversionRate: string;
    };
  }

  interface WalletTranslations {
    wallet: {
      deposit: Record<string, string>;
      transactions: Record<string, string>;
      depositRecords: Record<string, string>;
      fundDetails: Record<string, string>;
      walletManagement: string;
      walletDashboardDesc: string;
      quickActions: string;
      recentActivity: string;
      noRecentActivity: string;
      totalBalance: string;
      financialTracking: {
        title: string;
        calendar: string;
        calendarDesc: string;
        reports: string;
        reportsDesc: string;
        income: string;
        expense: string;
        upcomingPayments: string;
        viewCalendar: string;
        transactionSummary: string;
        viewDetailed: string;
        monthView: string;
        listView: string;
        monthlySchedule: string;
        upcomingEvents: string;
        eventDetails: string;
        noEvents: string;
        category: string;
        reportType: string;
        incomeExpense: string;
        categoryAnalysis: string;
        filters: string;
        incomeExpenseAnalysis: string;
        expenseCategoryAnalysis: string;
        totalIncome: string;
        totalExpenses: string;
        netBalance: string;
        savingsRate: string;
        charts: string;
        summary: string;
        reportSummary: string;
        overview: string;
        reportPeriod: string;
        recommendations: string;
        reduceExpenses: string;
        increaseSavings: string;
        trackExpenses: string;
        setGoals: string;
        print: string;
        downloadPDF: string;
        categories: Record<string, string>;
      };
      periods: Record<string, string>;
      days: Record<string, string>;
    };
  }

  interface TranslationObject {
    dashboard: DashboardTranslations;
    wallet: WalletTranslations;
    sidebar?: {
      wallet?: {
        title?: string;
        deposit?: string;
        depositRecords?: string;
        fundDetails?: string;
      };
      cards?: {
        title?: string;
        search?: string;
        activationTasks?: string;
        apply?: string;
      };
      merchant?: {
        title?: string;
        accountManagement?: string;
        accountInfo?: string;
        accountRoles?: string;
      };
      invitation?: {
        title?: string;
        list?: string;
        rebateList?: string;
      };
    };
    [key: string]: any;
  }
}
