"use client";

import { TrendingUp } from "lucide-react";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";

export default function IncomePage() {
  return (
    <ModulePlaceholder 
      title="Income Sources" 
      description="Manage and track your various income streams, from salaries to side projects."
      icon={TrendingUp}
    />
  );
}
