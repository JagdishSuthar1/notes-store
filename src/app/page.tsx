"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getNotes } from "./helper/getAllNote";
import { createNote } from "./helper/createNote";
import { deleteNote } from "./helper/deleteNote";

export default function HomePage() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<any[]>([]);
  const [newNote, setNewNote] = useState("");

  const fetchNotes = async () => {
    if (!session?.user?.email) return;
    const result = await getNotes();
    setNotes(result);
  };

  const handleAdd = async () => {
    if (!newNote.trim()) return;
    await createNote(newNote, newNote);
    setNewNote("");
    fetchNotes();
  };

  const handleDelete = async (id: string) => {
    await deleteNote(id);
    fetchNotes();
  };

  useEffect(() => { fetchNotes(); }, [session]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Notes App</h1>
        {session ? (
          <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
        ) : (
          <Button onClick={() => signIn()}>Sign In</Button>
        )}
      </header>

      <section className="bg-gray-100 p-16 text-center">
        <h2 className="text-4xl font-bold mb-4">Welcome to Notes App</h2>
        <p className="text-gray-700 mb-6">Sign in and start creating your notes instantly!</p>
        {!session && <Button onClick={() => signIn()}>Sign In</Button>}
      </section>

      {session && (
        <section className="flex-1 p-8 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="flex gap-2 mb-6">
              <Input
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Write a new note"
              />
              <Button onClick={handleAdd}>Add</Button>
            </div>

            <div className="grid gap-4">
              {notes.length === 0 ? (
                <p className="text-gray-500 text-center">Notes Not Found</p>
              ) : (
                notes.map((note) => (
                  <Card key={note.id} className="shadow-md">
                    <CardContent className="flex justify-between items-center p-4">
                      <p>{note.content}</p>
                      <Button variant="destructive" onClick={() => handleDelete(note.id)}>
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-gray-200 p-6 text-center mt-auto">
        <p className="text-gray-700">&copy; {new Date().getFullYear()} Notes App</p>
      </footer>
    </div>
  );
}