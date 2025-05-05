import { defineConfig } from 'drizzle-kit';

if (!process.env.DATABASE_URL) {
    throw new Error("😖 Database url is not set in .env");
}
export default defineConfig({
    out: './drizzle',
    schema: './src/db/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
    migrations: {
        table: "__drizzle_migration",
        schema: "public"
    },
    verbose: true,
    strict: true,
});
