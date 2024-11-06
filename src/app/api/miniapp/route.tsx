/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import MiniApp from "@/lib/modal/miniAppSchema";
import { NextResponse } from "next/server";

// Get all mini apps based on userId
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    await connect();
    const miniApps = await MiniApp.find({ userId });

    return new NextResponse(JSON.stringify(miniApps), { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error fetching Mini Apps: " + error.message, {
      status: 500,
    });
  }
};

// Create a new mini app
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newMiniApp = new MiniApp(body);
    await newMiniApp.save();

    return new NextResponse(
      JSON.stringify({
        message: "Your App is Created",
        MiniApp: newMiniApp,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating Mini App: " + error.message, {
      status: 500,
    });
  }
};

// Update a mini app
export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const updatedMiniApp = await MiniApp.findOneAndUpdate(
      { _id: body._id },
      body,
      { new: true }
    );
    return new NextResponse(
      JSON.stringify({
        message: "Your Mini App data is updated",
        MiniApp: updatedMiniApp,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse(
      "Error in updating Mini App data: " + error.message,
      {
        status: 500,
      }
    );
  }
};

// Delete a mini app
export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const miniAppId = searchParams.get("miniAppId");

    if (!miniAppId) {
      return new NextResponse("Mini App ID is required", { status: 400 });
    }

    await connect();
    const deletedMiniApp = await MiniApp.findByIdAndDelete(miniAppId);

    if (!deletedMiniApp) {
      return new NextResponse("Mini App not found", { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({
        message: "Mini App data is deleted",
        MiniApp: deletedMiniApp,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting Mini App: " + error.message, {
      status: 500,
    });
  }
};
