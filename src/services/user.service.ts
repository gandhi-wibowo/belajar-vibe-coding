import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const userService = {
  async registerUser(userData: any) {
    const { name, email, password } = userData;

    // Check if email already exists
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      throw new Error("Email sudah terdaftar");
    }

    // Hash password using Bun's built-in password hasher
    const hashedPassword = await Bun.password.hash(password);

    // Insert user
    await db.insert(users).values({
      name,
      email,
      password: hashedPassword,
    });

    return { message: "OK" };
  },
};
