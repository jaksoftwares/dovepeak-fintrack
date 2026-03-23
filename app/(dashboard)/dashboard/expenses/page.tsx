"use client";

import { TrendingDown } from "lucide-react";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";

export default function ExpensesPage() {
  return (
    <ModulePlaceholder 
      title="Expense Tracking" 
      description="Record and categorize your daily expenses to stay on top of your spending."
      icon={TrendingDown}
    />
  );
}
