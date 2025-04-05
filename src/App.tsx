import { Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import DashboardPage from "./pages/dashboard/DashboardPage";
import DashboardHome from "./pages/dashboard/DashboardHome";
import WalletDashboard from "./pages/dashboard/wallet/WalletDashboard";
import WalletDeposit from "./pages/dashboard/wallet/WalletDeposit";
import DepositRecords from "./pages/dashboard/wallet/DepositRecords";
import FundDetails from "./pages/dashboard/wallet/FundDetails";
import FinancialCalendarPage from "./pages/dashboard/wallet/FinancialCalendarPage";
import FinancialReportsPage from "./pages/dashboard/wallet/FinancialReportsPage";
import TransactionsPage from "./pages/dashboard/transactions/TransactionsPage";
import AnalyticsPage from "./pages/dashboard/analytics/AnalyticsPage";
import CardSearchPage from "./pages/dashboard/cards/CardSearchPage";
import InvitationList from "./pages/dashboard/invitation/InvitationList";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        
        <Route path="/dashboard" element={<DashboardPage />}>
          <Route index element={<DashboardHome />} />
          
          {/* Wallet routes */}
          <Route path="wallet" element={<WalletDashboard />} />
          <Route path="wallet/deposit" element={<WalletDeposit />} />
          <Route path="wallet/deposit-records" element={<DepositRecords />} />
          <Route path="wallet/fund-details" element={<FundDetails />} />
          <Route path="wallet/financial-calendar" element={<FinancialCalendarPage />} />
          <Route path="wallet/financial-reports" element={<FinancialReportsPage />} />
          
          {/* Card routes */}
          <Route path="cards" element={<CardSearchPage />} />
          
          {/* Transaction routes */}
          <Route path="transactions" element={<TransactionsPage />} />
          
          {/* Merchant routes */}
          <Route path="merchant" element={<DashboardHome />} />
          
          {/* Invitation and analytics routes */}
          <Route path="invitation" element={<InvitationList />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
