"use client";

import { Receipt } from "lucide-react";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";

export default function BudgetsPage() {
  return (
    <ModulePlaceholder 
      title="Budget Planner" 
      description="Set monthly or weekly limits for different categories and monitor your progress."
      icon={Receipt}
    />
  );
}
