import type { CorsOptions } from "cors";

export const allowedOrigins = [
  "http://localhost:3000",
  "https://b6a4-client.vercel.app",
];

export const allowedHeaders = [
  "Accept",
  "Accept-Language",
  "Content-Language",
  "Content-Type",
  "Authorization",
  "X-Requested-With",
  "Origin",
  "Referer",
  "User-Agent",
];

export const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS blocked: ${origin}`));
    }
  },
  allowedHeaders,
  credentials: true,
  methods: allowedMethods,
};

export default corsOptions;
