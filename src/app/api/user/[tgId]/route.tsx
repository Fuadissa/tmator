import connect from "@/lib/db";
import User from "@/lib/modal/userSchema";
import { NextResponse } from "next/server";

export const GET = async (
  request: Request,
  { params }: { params: { tgId: string } }
) => {
  try {
    await connect();

    // Check if appDataId is provided in the route
    if (params.tgId) {
      const tgId = await User.findById({ tg_id: params.tgId });
      if (!tgId) {
        return new NextResponse("User Tg Id not found", { status: 404 });
      }
      return new NextResponse(JSON.stringify(tgId), { status: 200 });
    } else {
      return new NextResponse("User Tg Id is required", { status: 400 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse("Error fetching User: " + error.message, {
      status: 500,
    });
  }
};
