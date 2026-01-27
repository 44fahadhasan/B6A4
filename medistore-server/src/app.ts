import express from "express";
import config from "./config";

const app = express();

app.get("/", (_, res) => {
  res.send(`Welcome to the ${config.site_name}`);
});

export default app;
