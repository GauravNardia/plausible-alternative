import  { config }  from "dotenv";
import { defineConfig } from "drizzle-kit";

config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.local",
})

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});