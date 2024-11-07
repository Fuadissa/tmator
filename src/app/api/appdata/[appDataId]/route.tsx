/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import AppData from "@/lib/modal/appDataSchema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const appDataId = searchParams.get("appDataId");
  try {
    await connect();

    // Check if appDataId is provided in the route
    if (appDataId) {
      const appData = await AppData.findById(appDataId);
      if (!appData) {
        return new NextResponse("App Data not found", { status: 404 });
      }
      return new NextResponse(JSON.stringify(appData), { status: 200 });
    } else {
      return new NextResponse("App Data ID is required", { status: 400 });
    }
  } catch (error: any) {
    return new NextResponse("Error fetching App Data: " + error.message, {
      status: 500,
    });
  }
}
