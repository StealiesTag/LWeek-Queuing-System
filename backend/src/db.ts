import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'queues',
    password: 'Totojeri17',
    port: 5432
});

export default pool;