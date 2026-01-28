import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import config from "./config";
import corsOptions from "./config/cors";
import type { UserRole } from "./constants/roles";
import { auth } from "./lib/auth";

const app = express();

app.all(`${config.better_auth_path}/*splat`, toNodeHandler(auth));
// seed admin into db
// await createAdmin();

app.use(cors(corsOptions));

app.get("/", (_, res) => {
  res.send(`Welcome to the ${config.site_name}`);
});

app.get("/me", async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  const permissions = await auth.api.userHasPermission({
    body: {
      userId: session?.user.id,
      role: session?.user.role as UserRole,
      permission: {
        customer: ["view"],
      },
    },
  });

  console.log({ session });
  console.log({ permissions });

  return res.json({ session, permissions });
});

export default app;
