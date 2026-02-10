import esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/server.ts"],
  outfile: "dist/server.js",
  bundle: true,
  platform: "node",
  format: "esm",
  target: "es2023",
  sourcemap: true,

  external: [
    // Core CJS libs
    "express",
    "dotenv",
    "cors",

    // Auth
    "better-auth",

    // Database
    "pg",

    // Prisma
    "@prisma/client",
    ".prisma/client",

    // Node built-ins
    "fs",
    "path",
    "crypto",
    "stream",
    "http",
    "https",
    "events",
    "url",
    "zlib",
    "buffer",
    "util",
    "os",
    "net",
    "tls",
  ],
});

console.log("Build complete");
