
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "node:fs";

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 4000),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        ca: fs.readFileSync(new URL("../ca.pem", import.meta.url))
    },
    waitForConnections: true,
    connectionLimit: 10
});

export default pool;
