import connect from "@/lib/db";
import MiniApp from "@/lib/modal/miniAppSchema";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (typeof id !== "string") {
      return new NextResponse(
        JSON.stringify({ status: false, message: "Invalid domain ID format" }),
        { status: 400 }
      );
    }

    await connect();

    const checkAppDomain = await MiniApp.findOne({
      appDomain: id,
    });

    if (checkAppDomain?.appDomain === id?.toLowerCase()) {
      return new NextResponse(
        JSON.stringify({
          status: false,
          message: "Domain is not available",
        }),
        { status: 200 }
      );
    } else if (!checkAppDomain) {
      return new NextResponse(
        JSON.stringify({
          status: true,
          message: "Domain is available",
        }),
        { status: 200 }
      );
    } else {
      return new NextResponse(
        JSON.stringify({
          status: false,
          message: "Unexpected error",
        }),
        { status: 500 }
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Error in finding Domain: " + error.message, {
      status: 500,
    });
  }
};
