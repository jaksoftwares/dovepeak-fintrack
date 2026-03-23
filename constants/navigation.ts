import { 
  BarChart3, 
  CreditCard, 
  History, 
  LayoutDashboard, 
  PiggyBank, 
  Receipt, 
  Settings, 
  TrendingDown, 
  TrendingUp, 
  Users 
} from "lucide-react";

export const DASHBOARD_NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Income", icon: TrendingUp, href: "/dashboard/income" },
  { label: "Expenses", icon: TrendingDown, href: "/dashboard/expenses" },
  { label: "Transactions", icon: History, href: "/dashboard/transactions" },
  { label: "Budgets", icon: Receipt, href: "/dashboard/budgets" },
  { label: "Goals", icon: PiggyBank, href: "/dashboard/goals" },
  { label: "Debts", icon: CreditCard, href: "/dashboard/debts" },
  { label: "Reports", icon: BarChart3, href: "/dashboard/reports" },
];

export const SYSTEM_NAV_ITEMS = [
  { label: "Settings", icon: Settings, href: "/settings" },
];
