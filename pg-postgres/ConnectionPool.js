
import pg from 'pg';
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

async function getStudents() {

    const resultSet = await pool.query('SELECT * FROM student');

    console.log(`Total Rows: ${resultSet.rowCount}`);

    console.log(`ID --  Name --     Email --    City`)
    
    for (const student of resultSet.rows) {

        console.log(`${student.id} -- ${student.name} -- ${student.email} -- ${student.city}`)

    }

}

async function getStudentsInBatch() {

    const BATCH_LIMIT = 2;

    let start = 0;

    let rowCount = 0;
    
    do {

        const resultSet = await pool.query('SELECT * FROM student offset $1 limit $2', [start, BATCH_LIMIT]);

        rowCount = resultSet.rowCount;

        if (rowCount == 0) break;

        for (const student of resultSet.rows) {

            console.log(`${student.id} -- ${student.name} -- ${student.email} -- ${student.city}`)

        }

        start += BATCH_LIMIT;

    }while (rowCount == BATCH_LIMIT);

}

async function createStudent() {

    const studentParams = [
        ['Sammy',  'sammy@example.com',    'Chennai'],
        ['kishore','kishoreq@example.com', 'Bangalore'],
        ['Vikram', 'vikram@example.com',   'Pune']
    ]

    const SQL = `INSERT into student(name, email, city) VALUES($1, $2, $3)`

    for (const param of studentParams) {

        const result = await pool.query(SQL, param);

        console.log(`Total rows inserted : ${result.rowCount}`);

    }
   
}

async function transcation() {

    const client = await pool.connect()
 
    try {
        await client.query('BEGIN')
        const SQL = `INSERT into student(name, email, city) VALUES($1, $2, $3) RETURNING id`
        const res = await client.query(SQL, ['kapoor', 'kapoor@gmail.com', 'Delhi'])
        
        const studentScoreSql = 'INSERT INTO student_score(id, score) VALUES ($1, $2)'
        await client.query(studentScoreSql, [res.rows[0].id, 91])
        await client.query('COMMIT')
    } 
    catch (e) {
        await client.query('ROLLBACK')
        throw e
    } 
    finally {
        client.release()
    }
}



await createStudent();

await getStudents();

await getStudentsInBatch()


