"use client";

import { BarChart3 } from "lucide-react";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";

export default function ReportsPage() {
  return (
    <ModulePlaceholder 
      title="Financial Insights" 
      description="Get deep insights into your spending habits with advanced reports and analytics."
      icon={BarChart3}
    />
  );
}
