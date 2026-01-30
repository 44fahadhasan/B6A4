import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import config from "./config";
import corsOptions from "./config/cors";
import { auth } from "./lib/auth";
import rootRouter from "./routes";

const app = express();

app.use(cors(corsOptions));

app.all(`${config.better_auth_path}/*splat`, toNodeHandler(auth));
// seed admin
// await createAdmin();

app.use(express.json());

app.get("/", (_, res) => {
  res.send(`Welcome to the ${config.site_name}`);
});
app.use("/api", rootRouter);

export default app;
