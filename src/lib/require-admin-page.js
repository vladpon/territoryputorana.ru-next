import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdminPage() {
  const session = await auth();

  if (!session || session.user?.role !== "admin") {
    redirect("/");
  }

  return session;
}