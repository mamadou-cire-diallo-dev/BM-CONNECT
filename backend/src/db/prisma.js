import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.ts"; 

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL manquante dans .env");
}

const adapter = new PrismaPg({ connectionString });

// Singleton (évite multiples connexions en dev avec nodemon)
export const prisma = globalThis.__prisma ?? new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalThis.__prisma = prisma;
