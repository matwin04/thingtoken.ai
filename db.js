import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();
const connectionString = process.env.POSTGRES_URL;
const sql = postgres(connectionString);
async function setupDB() {
    console.log("Database Connected");
    console.log("Starting DB...");
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
        await sql`
            CREATE TABLE IF NOT EXISTS blogPosts (
                id SERIAL PRIMARY KEY,
                postTitle VARCHAR(50) UNIQUE NOT NULL,
                postSubtitle VARCHAR(50) UNIQUE NOT NULL,
                postText VARCHAR(150) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
        await sql`
            CREATE TABLE IF NOT EXISTS chat (
                id SERIAL PRIMARY KEY,
                chatContent VARCHAR(300) UNIQUE NOT NULL,
                from_user VARCHAR(100) UNIQUE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`;
    } catch (err) {
        console.error(err);
    }
}
export { sql, setupDB };
