/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import AppData from "@/lib/modal/appDataSchema";
import { NextResponse } from "next/server";

// Get all AppData entries based on userId
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const miniAppId = searchParams.get("appId");

    if (!miniAppId) {
      return new NextResponse("User ID is required", { status: 400 });
    }

    await connect();
    const appDataEntries = await AppData.find({ miniAppId: miniAppId });

    return new NextResponse(
      JSON.stringify({ appData: appDataEntries, status: true }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error fetching App Data: " + error.message, {
      status: 500,
    });
  }
};

// Create a new AppData entry
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newAppData = new AppData(body);
    await newAppData.save();

    return new NextResponse(
      JSON.stringify({
        message: "App Data entry created successfully",
        AppData: newAppData,
        status: true,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating App Data: " + error.message, {
      status: 500,
    });
  }
};

// Update an existing AppData entry
export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const updatedAppData = await AppData.findOneAndUpdate(
      { _id: body._id },
      body,
      { new: true }
    );
    return new NextResponse(
      JSON.stringify({
        message: "App Data entry updated successfully",
        AppData: updatedAppData,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating App Data: " + error.message, {
      status: 500,
    });
  }
};

// Delete an AppData entry
export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const appDataId = searchParams.get("appDataId");

    if (!appDataId) {
      return new NextResponse("App Data ID is required", { status: 400 });
    }

    await connect();
    const deletedAppData = await AppData.findByIdAndDelete(appDataId);

    if (!deletedAppData) {
      return new NextResponse("App Data not found", { status: 404 });
    }

    return new NextResponse(
      JSON.stringify({
        message: "App Data entry deleted successfully",
        AppData: deletedAppData,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting App Data: " + error.message, {
      status: 500,
    });
  }
};
