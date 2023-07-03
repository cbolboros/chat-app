import prisma from "@/lib/prismadb";
import getSession from "@/app/actions/getSession";

const getUsers = async () => {
  const session = await getSession();
  if (!session?.user?.email) {
    return [];
  }
  try {
    return await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        NOT: {
          email: session.user.email as string,
        },
      },
    });
  } catch (error) {
    return [];
  }
};

export default getUsers;
