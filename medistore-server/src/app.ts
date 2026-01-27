import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import config from "./config";
import corsOptions from "./config/cors";
import { auth } from "./lib/auth";

const app = express();

app.all(`${config.better_auth_path}/*splat`, toNodeHandler(auth));

app.use(cors(corsOptions));

app.get("/", (_, res) => {
  res.send(`Welcome to the ${config.site_name}`);
});

// seed admin into db
// await createAdmin();

export default app;
