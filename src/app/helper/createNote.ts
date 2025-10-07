'use server'
import { getServerSession } from "next-auth";
import prisma from "./prisma";

export async function createNote(title: string, content: string) {
  const session = await getServerSession();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("User not found");

  return prisma.note.create({
    data: { title, content, userId: user.id },
  });
}