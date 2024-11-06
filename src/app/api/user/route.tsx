/* eslint-disable @typescript-eslint/no-explicit-any */
import connect from "@/lib/db";
import User from "@/lib/modal/userSchema";
import { NextResponse } from "next/server";

// export const GET = async () => {
//   try {
//     await connect();
//     const user = await User.find();
//     return new NextResponse(JSON.stringify(user), { status: 200 });
//   } catch (error: any) {
//     return new NextResponse(
//       "Error in fetching User's" + error.message,
//       { status: 500 }
//     );
//   }
// };

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const newUser = new User(body);
    await newUser.save();

    return new NextResponse(
      JSON.stringify({
        message: "New User is added",
        User: newUser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in creating User" + error.message, {
      status: 500,
    });
  }
};

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    await connect();
    const updatedUser = await User.findOneAndUpdate({ _id: body._id }, body, {
      new: true,
    });
    return new NextResponse(
      JSON.stringify({
        message: "User data is updated",
        User: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in updating User data" + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const UserId = searchParams.get("UserId");

    if (!UserId) {
      return new NextResponse(
        JSON.stringify({
          message: "User not found",
        }),
        { status: 400 }
      );
    }

    await connect();

    const deletedUser = await User.findByIdAndDelete({ _id: UserId });

    if (!deletedUser) {
      return new NextResponse(
        JSON.stringify({
          message: "User data is not found in database",
        }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "User data is deleted",
        User: deletedUser,
      }),
      { status: 200 }
    );
  } catch (error: any) {
    return new NextResponse("Error in deleting User" + error.message, {
      status: 500,
    });
  }
};
