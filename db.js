// const mysql = require('mysql')

// const db = mysql.createConnection({
//     host : "localhost",
//     user : 'ingoo3',
//     password : 'Ingoo0427$',
//     port : 3000,
//     database : 'TEAM'
// })

// db.connect((err)=>{

//     if (err) throw  err;
    
//     console.log('connected');
    
//     })

// module.exports = db
const mysql = require('mysql');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'ingoo3';
const password = process.env.DB_PASSWORD || 'Ingoo0427$';
const database = process.env.DB_DATABASE || 'TEAM';

const config = {
    host,
    user,
    password,
    database
};

const pool = mysql.createPool(config);
console.log(pool);
// pool.getConnection((err, conn)=>{
//     conn.query('SELECT * FROM user', (error, result)=>{
//         console.log(result);
//     });
// });

module.exports = pool