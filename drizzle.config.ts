import { defineConfig } from 'drizzle-kit';
import * as dotenv from "dotenv";

dotenv.config();

if (!process.env.DATABASE_URL) {
    throw new Error("😖 Database url is not set in .env");
}
export default defineConfig({
    out: './drizzle',
    schema: './lib/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    migrations: {
        table: "__drizzle_migrations",
        schema: "public"
    },
    verbose: true,
    strict: true,
});
