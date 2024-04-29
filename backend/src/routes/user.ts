import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signUpInput, signInInput } from "@alleharshi/common-medium";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET_KEY: string;
  };
}>();

userRouter.get("/", (c) => {
  return c.text("Hello User!");
});

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signUpInput.safeParse(body);

  if (!success) {
    return c.json({ error: "Input not properly provided" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const secret = c.env.SECRET_KEY;
    const token = await sign({ id: user.id }, secret);

    return c.json({
      token,
    });
  } catch (e) {
    return c.status(403);
  }
});
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  });

  const body = await c.req.json();
  const { success } = signInInput.safeParse(body);

  if (!success) {
    return c.json({ error: "Input not properly provided" });
  }
  const user = await prisma.user.findUnique({ where: { email: body.email } });

  if (!user) {
    c.status(403);
    return c.json({ error: "Invalid credentials" });
  }

  if (user.password != body.password) {
    c.status(403);
    return c.json({ error: "Invalid credentials" });
  }

  const secret = c.env.SECRET_KEY;
  const token = await sign({ id: user.id }, secret);

  return c.json({
    token,
  });
});

export { userRouter };
