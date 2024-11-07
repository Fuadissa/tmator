import connect from "@/lib/db";
import MiniApp from "@/lib/modal/miniAppSchema";
import { NextResponse } from "next/server";

// Get a single mini app based on mini app _idexport const GET = async (
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const miniAppId = searchParams.get("miniAppId");
  try {
    await connect();

    // Check if appDataId is provided in the route
    if (miniAppId) {
      const miniApp = await MiniApp.findById(miniAppId);
      if (!miniApp) {
        return new NextResponse("Mini App not found", { status: 404 });
      }
      return new NextResponse(JSON.stringify(miniApp), { status: 200 });
    } else {
      return new NextResponse("Mini App ID is required", { status: 400 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return new NextResponse("Error fetching Mini App: " + error.message, {
      status: 500,
    });
  }
}
