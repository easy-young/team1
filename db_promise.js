require('dotenv').config();
const mysql = require('mysql2');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'jenny';
const password = process.env.DB_PASSWORD || 'dnwnrhk17';
const database = process.env.DB_DATABASE || 'practice1';

const config = {
    host,
    user,
    password,
    database
};

const pool = mysql.createPool(config);

const promisePool = pool.promise();

exports.pool = promisePool;