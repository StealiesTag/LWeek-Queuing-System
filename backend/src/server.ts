import express from 'express';
import cors from "cors";
import pool from './db.ts';
const app = express();
app.use(cors({ origin: "http://localhost:5173"}));
app.use(express.json());
console.log("Express server started");

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get("/api/queue", async (req, res) => {
    const result = await pool.query("SELECT * FROM queue_entries ORDER BY id");
    
    res.json(result.rows);
});

app.post("/api/queue", async (req, res) => {
    const { name, indiv, reservation } = req.body;
    console.log("Data received:", req.body);

    const result = await pool.query(
        "INSERT INTO queue_entries (name, reservation, indiv) VALUES ($1, $2, $3) RETURNING *",
        [name, reservation, indiv]
    );

    res.json(result.rows[0]);
});


app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

