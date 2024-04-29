import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInput, updateBlogInput } from "@alleharshi/common-medium";

type Bindings = {
  DATABASE_URL: string;
  SECRET_KEY: string;
};

type Variables = {
  userId: string;
};

const blogRouter = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();

blogRouter.use("/*", async (c, next) => {
  const secret = c.env.SECRET_KEY;
  const token = c.req.header("Authorization");
  try {
    if (token) {
      const decoded = await verify(token, secret);
      if (decoded.id) {
        c.set("userId", decoded.id);
        await next();
      } else {
        c.status(403);
        return c.text("Invalid token");
      }
    } else {
      c.status(403);
      return c.json({ error: "No token found" });
    }
  } catch (e) {
    c.status(403);
    return c.json({ error: "User Not logged in" });
  }
});

blogRouter.get("/", async () => {});

blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");
  const { success } = createBlogInput.safeParse(body);

  if (!success) {
    return c.json({ error: "Input not properly provided" });
  }
  try {
    const blog = await prisma.blog.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });
    return c.json({ id: blog.id });
  } catch (e) {
    c.status(403);
    return c.json({ error: e });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const userId = c.get("userId");
  const { success } = updateBlogInput.safeParse(body);

  if (!success) {
    return c.json({ error: "Input not properly provided" });
  }
  try {
    const updatedPost = await prisma.blog.update({
      where: {
        id: body.id,
        // authorId: userId,
      },
      data: {
        title: body.title,
        content: body.content,
      },
    });
    c.status(200);
    return c.json({ success: "Updated the post", post: updatedPost });
  } catch (e) {
    c.status(403);
    return c.json({ error: e, myguessoferror: "id not correct" });
  }
});

//Todo: Add pagination to the bulk
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  const blogs = await prisma.blog.findMany({
    select: {
      content: true,
      title: true,
      id: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ blogs });
});
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id,
      },
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json({ blog });
  } catch (e) {
    c.status(403);
    return c.json({ error: e });
  }
});

export { blogRouter };
