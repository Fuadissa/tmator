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
    const { tgId, ...userData } = await request.json();

    // Connect to the database
    await connect();

    // Check if a user with the provided tgId exists
    const existingUser = await User.findOne({ tg_id: tgId });

    if (existingUser) {
      // If user exists, return the user data
      return new NextResponse(
        JSON.stringify({
          message: "User already exists",
          user: existingUser,
        }),
        { status: 200 }
      );
    } else {
      // If user does not exist, create a new user
      const newUser = new User({ tg_id: tgId, ...userData });
      await newUser.save();

      return new NextResponse(
        JSON.stringify({
          message: "New User is added",
          user: newUser,
        }),
        { status: 201 }
      );
    }
  } catch (error: any) {
    return new NextResponse("Error in processing request: " + error.message, {
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
