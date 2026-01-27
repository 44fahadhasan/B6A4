import { auth } from "../lib/auth";

export default async function createAdmin() {
  try {
    const result = await auth.api.createUser({
      body: {
        email: "44fahadhasan@gmail.com",
        password: "44fahadhasan@gmail.com",
        name: "Md. Fahadd Hasan",
        role: "admin",
      },
    });

    console.log({ result });
  } catch (error) {
    console.error({ error });
  }
}
