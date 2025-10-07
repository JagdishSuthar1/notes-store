'use server'

import { getServerSession } from "next-auth";
import prisma from "./prisma";



export async function deleteNote(noteId: string) {
  const session = await getServerSession();
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) throw new Error("User not found");

  const note = await prisma.note.findUnique({ where: { id: noteId } });
  if (!note || note.userId !== user.id) throw new Error("Unauthorized");

  return prisma.note.delete({ where: { id: noteId } });
}