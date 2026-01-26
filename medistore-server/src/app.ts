import express from "express";
import config from "./config";
import { prisma } from "./config/prisma";

const app = express();

app.get("/", (_, res) => {
  res.send(`Welcome to the ${config.site_name}`);
});

const createUser = async () => {
  const result = await prisma.user.create({
    data: {
      name: "Fahad Hasan",
      email: "fahadhasan@gmail.com",
    },
  });
  console.log({ result });
};

await createUser();

export default app;
