import { supabaseServer } from "@/lib/supabase/supabaseServer";

export async function GET() {
  const supabase = await supabaseServer();
  const { data: auth } = await supabase.auth.getUser();

  if (!auth?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("name, email, phone, country")
    .eq("id", auth.user.id)
    .single();

  if (error || !data) {
    return Response.json(
      {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
      },
      { status: 200 }
    );
  }

  // Split full name safely
  const [firstName, ...rest] = (data.name ?? "").trim().split(" ");
  const lastName = rest.join(" ");

  return Response.json({
    firstName: firstName ?? "",
    lastName: lastName ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    country: data.country ?? "",
  });
}



export async function POST(req: Request) {
  const supabase = await supabaseServer();
  const body = await req.json();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const fullName = `${body.firstName} ${body.lastName}`.trim();

  const { error } = await supabase
    .from("profiles")
    .update({
      name: fullName,
      email: body.email,
      phone: body.phone,
      country: body.country,
    })
    .eq("id", user.id);

  if (error) return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ success: true });
}
