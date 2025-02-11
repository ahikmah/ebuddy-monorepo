import dotenv from "dotenv";

dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  HOST: process.env.HOST ?? "localhost",
  PORT: process.env.PORT ?? "8081",
  CORS_ORIGIN: process.env.CORS_ORIGIN ?? "http://localhost:3000",
  COMMON_RATE_LIMIT_WINDOW_MS:
    Number(process.env.COMMON_RATE_LIMIT_WINDOW_MS) || 1000,
  COMMON_RATE_LIMIT_MAX_REQUESTS:
    Number(process.env.COMMON_RATE_LIMIT_MAX_REQUESTS) || 20,
  isProduction: process.env.NODE_ENV === "production",
  TYPE: process.env.TYPE || "",
  PROJECT_ID: process.env.PROJECT_ID || "",
  PRIVATE_KEY_ID: process.env.PRIVATE_KEY_ID || "",
  PRIVATE_KEY: process.env.PRIVATE_KEY || "",
  CLIENT_EMAIL: process.env.CLIENT_EMAIL || "",
  CLIENT_ID: process.env.CLIENT_ID || "",
  AUTH_URI: process.env.AUTH_URI || "",
  TOKEN_URI: process.env.TOKEN_URI || "",
  AUTH_PROVIDER_CERT_URL: process.env.AUTH_PROVIDER_CERT_URL || "",
  CLIENT_CERT_URL: process.env.CLIENT_CERT_URL || "",
  UNIVERSE_DOMAIN: process.env.UNIVERSE_DOMAIN || "",
};
