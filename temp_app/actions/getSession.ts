import { getServerSession } from "next-auth";
import { authOptions } from "@/temp_app/api/auth/[...nextauth]/route";

export default async function getSession() {
  return getServerSession(authOptions);
}
