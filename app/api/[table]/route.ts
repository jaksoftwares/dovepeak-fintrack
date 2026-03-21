import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Dynamic central handler routing via URL params.
// We strictly define allowed tables to prevent arbitrary DB injection attempts.
const ALLOWED_TABLES = [
  "transactions",
  "categories",
  "budgets",
  "goals",
  "debts",
  "notifications",
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: "Invalid resource boundary" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit")!) : 100;

  // Supabase RLS inherently limits the data returned to ONLY rows belonging to user.id!
  const query = supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ table: string }> }
) {
  const { table } = await params;

  if (!ALLOWED_TABLES.includes(table)) {
    return NextResponse.json({ error: "Invalid resource boundary" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    
    // Explicitly embed the user bound context into the payload to guarantee DB integrity mappings
    const payload = { ...body, user_id: user.id };

    const { data, error } = await supabase
      .from(table)
      .insert(payload)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
