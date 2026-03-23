"use client";

import { CreditCard } from "lucide-react";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";

export default function DebtsPage() {
  return (
    <ModulePlaceholder 
      title="Debt & Loans" 
      description="Keep track of money borrowed and lent, and manage your repayment schedules."
      icon={CreditCard}
    />
  );
}
