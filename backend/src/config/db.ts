import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is required in .env");
}

const prismaClient = new PrismaClient({
    datasources: {
        db: {
            url: connectionString
        }
    }
});

export default prismaClient;