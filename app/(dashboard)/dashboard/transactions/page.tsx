"use client";

import { History } from "lucide-react";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";

export default function TransactionsPage() {
  return (
    <ModulePlaceholder 
      title="Transaction Log" 
      description="A centralized view of all your financial activities, searchable and filterable."
      icon={History}
    />
  );
}
