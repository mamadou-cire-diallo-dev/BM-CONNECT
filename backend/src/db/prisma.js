<<<<<<< HEAD
<<<<<<< HEAD
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client.js"; 
=======
=======
>>>>>>> 3dc11834e0a9eb3f942f8a2ecd2481d4e26b198e
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../generated/prisma/index.js'
import { softDeleteExtension } from './prisma.extensions.js'
<<<<<<< HEAD
>>>>>>> cire
=======
>>>>>>> 3dc11834e0a9eb3f942f8a2ecd2481d4e26b198e

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error('DATABASE_URL manquante dans .env')
}

const adapter = new PrismaPg({ connectionString })

// Singleton (évite multiples connexions en dev avec nodemon)

const basePrisma = new PrismaClient({ adapter })
export const prisma = basePrisma.$extends(softDeleteExtension)

// export const prisma = globalThis.__prisma ?? new PrismaClient({ adapter })
// if (process.env.NODE_ENV !== 'production') globalThis.__prisma = prisma
