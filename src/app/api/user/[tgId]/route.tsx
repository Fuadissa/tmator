import connect from "@/lib/db";
import User from "@/lib/modal/userSchema";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: { tgId: string } }
) {
  const { tgId } = context.params;

  try {
    await connect();

    const tgIdUser = await User.findById({ tg_id: tgId });

    if (!tgIdUser) {
      return new NextResponse("User Tg Id not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(tgIdUser), { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse("Error fetching User: " + error.message, {
      status: 500,
    });
  }
}
