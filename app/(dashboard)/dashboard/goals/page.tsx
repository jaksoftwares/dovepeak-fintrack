"use client";

import { PiggyBank } from "lucide-react";
import ModulePlaceholder from "@/components/dashboard/ModulePlaceholder";

export default function GoalsPage() {
  return (
    <ModulePlaceholder 
      title="Financial Goals" 
      description="Save for what matters. Create targets for emergency funds, vacations, or major purchases."
      icon={PiggyBank}
    />
  );
}
