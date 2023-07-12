import prisma from "@/lib/prismadb";

const getConversationById = async (conversationId: string) => {
  try {
    return prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });
  } catch (error: any) {
    console.log(error, "SERVER_ERROR");
    return null;
  }
};

export default getConversationById;
