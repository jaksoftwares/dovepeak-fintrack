import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  // user_cash_flow is a Postgres VIEW generated in the migrations.
  // It handles all aggregations (income, expense, net_balance by month)
  const { data, error } = await supabase
    .from("user_cash_flow")
    .select("*")
    .eq("user_id", user.id)
    .order("month", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
