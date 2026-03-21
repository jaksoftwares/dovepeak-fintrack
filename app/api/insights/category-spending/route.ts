import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const month = searchParams.get("month"); // Format: YYYY-MM

  let query = supabase
    .from("transactions")
    .select("category_id, amount, categories(name, color)")
    .eq("user_id", user.id)
    .eq("type", "expense");

  // Optional monthly filter boundaries
  if (month) {
    const startOfMonth = new Date(month + "-01");
    // Get the last day of the month accurately
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0, 23, 59, 59);
    query = query
      .gte("transaction_date", startOfMonth.toISOString())
      .lte("transaction_date", endOfMonth.toISOString());
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Aggregate sums locally. This bypasses the need for complex postgres RPCs directly in route.
  const aggregates: Record<string, any> = {};
  
  data.forEach((txn: any) => {
    const catId = txn.category_id || "uncategorized";
    if (!aggregates[catId]) {
      aggregates[catId] = {
        category_id: catId,
        category_name: txn.categories?.name || "Uncategorized",
        color: txn.categories?.color || "#94a3b8",
        total_amount: 0
      };
    }
    aggregates[catId].total_amount += Number(txn.amount);
  });

  const sortedResults = Object.values(aggregates).sort((a: any, b: any) => b.total_amount - a.total_amount);

  return NextResponse.json(sortedResults);
}
