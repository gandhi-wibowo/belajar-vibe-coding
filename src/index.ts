import { Elysia } from "elysia";
import { db } from "./db";

const app = new Elysia()
  .decorate("db", db)
  .get("/", () => ({
    message: "Welcome to Elysia + Drizzle + MySQL!",
    status: "running"
  }))
  .get("/users", async ({ db }) => {
    // This is just a demonstration. 
    // In a real app, you'd handle potential connection errors or empty results.
    try {
      const allUsers = await db.query.users.findMany();
      return allUsers;
    } catch (e) {
      return { error: "Database connection failed. Please check your .env" };
    }
  })
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
