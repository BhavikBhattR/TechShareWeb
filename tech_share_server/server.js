import express from 'express';
import connection from './database/db.js';
import dotenv from 'dotenv'

dotenv.config();

const password = encodeURIComponent(process.env.MONGODB_PASS);

const app = express()

const PORT = 8000;

app.listen(PORT, async () => {
    console.log(`Server is running on PORT ${PORT}`);
    await connection(password)
})