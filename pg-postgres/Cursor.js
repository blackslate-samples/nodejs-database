
import pg from 'pg';
import Cursor from 'pg-cursor'

const { Pool } = pg;

const config = {
    host: '127.0.0.1',
    port: 5432,
    database: 'studentdb',
    user: '',
    password: '',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
}

const pool = new Pool(config)

const client = await pool.connect()

const cursor = client.query(new Cursor('select * from student'))

const batchSize = 2;

let rows

do {
    rows = await cursor.read(batchSize);

    if (rows.length == 0) break;
    
    for (const student of rows) {

        console.log(`${student.id} -- ${student.name} -- ${student.email} -- ${student.city}`)

    }
}
while(rows && rows.length == batchSize);

client.release();
