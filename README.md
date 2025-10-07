# Notes App

This is a simple **Next.js + shadcn UI** application where users can sign in with Google and manage personal notes. The backend uses **Prisma** with **PostgreSQL**, and server actions handle CRUD operations for notes.

---

## Features

* **Google Single Sign-On** for authentication
* **Add, view, and delete notes**
* **Server actions** for secure backend operations
* **Responsive UI** built with shadcn components
* **PostgreSQL** database with Prisma ORM

---

## Tech Stack

* Next.js (App Router)
* React (Client Components)
* NextAuth.js (Google OAuth)
* Prisma ORM + PostgreSQL
* shadcn/ui + Tailwind CSS
* TypeScript

---

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/JagdishSuthar1/notes-store.git
cd notes-store
```

2. Install dependencies:

```bash
npm install
```

3. Setup `.env` file:

```env
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<random-secret>
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public"
```

4. Run Prisma migrations:

```bash
npx prisma generate
npx prisma migrate dev --name init
```

5. Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000` to access the app.

---

## Deployment

* Update the `.env` file with production credentials.
* Ensure PostgreSQL is accessible from your hosting provider.
* Use **Vercel** or any Next.js compatible hosting to deploy.
* Disable ESLint and TypeScript checks during build if needed:


## Usage

1. Click **Sign In with Google** on the homepage.
2. Add a new note using the input and **Add** button.
3. View your notes in the list below.
4. Delete a note using the **Delete** button.

---

