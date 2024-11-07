import connect from "@/lib/db";
import User from "@/lib/modal/userSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const tgId = req.nextUrl.pathname.split("/").pop();
    await connect();

    // Check if appDataId is provided in the route
    if (tgId) {
      const tgIdUser = await User.findById({ tg_id: tgId });
      if (!tgId) {
        return new NextResponse("User Tg Id not found", { status: 404 });
      }
      return new NextResponse(JSON.stringify(tgIdUser), { status: 200 });
    } else {
      return new NextResponse("User Tg Id is required", { status: 400 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse("Error fetching User: " + error.message, {
      status: 500,
    });
  }
}
