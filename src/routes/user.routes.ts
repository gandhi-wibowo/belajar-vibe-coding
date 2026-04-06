import { Elysia, t } from "elysia";
import { userService } from "../services/user.service";

export const userRoutes = new Elysia({ prefix: "/api" })
  .post(
    "/users",
    async ({ body, set }) => {
      try {
        const result = await userService.registerUser(body);
        return result;
      } catch (error: any) {
        set.status = 400;
        return { message: error.message };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
    }
  );
