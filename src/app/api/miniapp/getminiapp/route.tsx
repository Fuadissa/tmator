import connect from "@/lib/db";
import MiniApp from "@/lib/modal/miniAppSchema";
import { NextResponse } from "next/server";

// Get a single mini app based on mini app _idexport const GET = async (
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appDomain = searchParams.get("appDomain");
  try {
    await connect();

    // Check if appDataId is provided in the route
    if (appDomain) {
      const miniApp = await MiniApp.findOne({ appDomain: appDomain });
      if (!miniApp) {
        return new NextResponse("Mini App not found", { status: 404 });
      }
      return new NextResponse(
        JSON.stringify({ miniApp: miniApp, status: true }),
        { status: 200 }
      );
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
