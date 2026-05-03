const mysql = require('mysql2/promise');

// Note: Instead of returning a hardcoded pool, we export a function that initializes 
// everything so that if the db doesn't exist, it creates it first.
let pool;

const initDb = async () => {
    if (pool) return pool;

    // 1. Connect without database to create it
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: ''
    });

    await connection.query('CREATE DATABASE IF NOT EXISTS `budget_buddy`');
    await connection.end();

    // 2. Create pool connected to the database
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'budget_buddy',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    console.log("MySQL connection generated successfully.");
    return pool;
};

module.exports = { initDb };
