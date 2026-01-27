import express from "express";
import config from "./config";
import createAdmin from "./scripts/seed.admin";

const app = express();

app.get("/", (_, res) => {
  res.send(`Welcome to the ${config.site_name}`);
});

// seed admin into db
await createAdmin();

export default app;
