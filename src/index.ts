import { Elysia } from "elysia";
import { userRoutes } from "./routes/user.routes";

const app = new Elysia()
  .use(userRoutes)
  .get("/", () => ({
    message: "Welcome to Elysia + Drizzle + MySQL!",
    status: "running"
  }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
