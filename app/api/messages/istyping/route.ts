import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import { pusherServer } from "@/lib/pusher";
import getConversationById from "@/app/actions/getConversationById";

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    const { conversationId } = body;

    await pusherServer.trigger(conversationId, "user:typing", {
      currentUser,
      conversationId,
    });

    const conversation = await getConversationById(conversationId);
    const otherUser = conversation?.users.filter(
      (user) => user.email !== currentUser?.email,
    )[0];

    if (otherUser?.email) {
      await pusherServer.trigger(otherUser.email, "user:typing", {
        currentUser,
        conversationId,
      });
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log(error, "ERROR_MESSAGES");
    return new NextResponse("Error", { status: 500 });
  }
}
