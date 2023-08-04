import pg from 'pg';
const { Client } = pg;

const config = {
    host: '127.0.0.1',
    port: 5432,
    database: 'studentdb',
    user: '',
    password: ''
}

const client = new Client(config)
await client.connect();

const res = await client.query('SELECT * FROM student');
console.log(res.rows[0]);
await client.end();