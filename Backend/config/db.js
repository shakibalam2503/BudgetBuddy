const mysql = require('mysql2/promise');

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

// Seed utility to populate dashboard immediately for new users
const seedUserData = async (pool, userId) => {
    const daysAgo = (days) => {
        const d = new Date();
        d.setDate(d.getDate() - days);
        return d.toISOString().split('T')[0];
    };

    try {
        // Insert default budgets
        await pool.query(
            'INSERT INTO budgets (user_id, category, amount_limit) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?), (?, ?, ?)',
            [
                userId, 'Food', 3000.00,
                userId, 'Transport', 1000.00,
                userId, 'Study', 500.00,
                userId, 'Entertainment', 500.00
            ]
        );

        // Insert default incomes
        await pool.query(
            'INSERT INTO incomes (user_id, source, category, amount, date) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?), (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)',
            [
                userId, 'University Library', 'Part-Time', 420.00, daysAgo(2),
                userId, 'Merit Scholarship', 'Education', 2500.00, daysAgo(4),
                userId, 'UI Design Gig', 'Freelance', 500.00, daysAgo(9),
                userId, 'Monthly Allowance', 'Support', 200.00, daysAgo(15)
            ]
        );

        // Insert default expenses
        await pool.query(
            'INSERT INTO expenses (user_id, category, amount, date, description) VALUES (?, ?, ?, ?, ?), (?, ?, ?, ?, ?), (?, ?, ?, ?, ?), (?, ?, ?, ?, ?), (?, ?, ?, ?, ?)',
            [
                userId, 'Food', 12.45, daysAgo(1), 'Starbucks Reserve',
                userId, 'Study', 184.00, daysAgo(2), 'University Bookstore - Math 101',
                userId, 'Housing', 850.00, daysAgo(4), 'Monthly Rent - Campus Heights',
                userId, 'Transport', 45.00, daysAgo(6), 'Monthly Bus Pass',
                userId, 'Entertainment', 14.99, daysAgo(9), 'Entertainment Subscription'
            ]
        );

        // Insert default goals
        await pool.query(
            'INSERT INTO goals (user_id, name, target_amount, current_amount, target_date, notes) VALUES (?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?)',
            [
                userId, 'Buy Laptop', 1500.00, 700.00, daysAgo(-60), 'New MacBook Pro M3',
                userId, 'Summer Trip', 5000.00, 1000.00, daysAgo(-180), 'Japan Exploration 2024'
            ]
        );
        console.log(`Seeded default data for user ID ${userId}`);
    } catch (err) {
        console.error("Error seeding default data for user", err);
    }
};

// Initialize Database Tables
const setupDatabase = async () => {
    try {
        const pool = await initDb();
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS incomes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                source VARCHAR(255) NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS expenses (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                category VARCHAR(255) NOT NULL,
                amount DECIMAL(10, 2) NOT NULL,
                date DATE NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS budgets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                category VARCHAR(255) NOT NULL,
                amount_limit DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS goals (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                name VARCHAR(255) NOT NULL,
                target_amount DECIMAL(10, 2) NOT NULL,
                current_amount DECIMAL(10, 2) DEFAULT 0,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS password_resets (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                code VARCHAR(6) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Alter tables if columns are missing
        const alterTableSafely = async (table, query) => {
            try {
                await pool.query(query);
            } catch (err) {
                // Column might already exist, ignore error
            }
        };
        
        await alterTableSafely('users', 'ALTER TABLE users ADD COLUMN phone VARCHAR(50) NULL');
        await alterTableSafely('incomes', 'ALTER TABLE incomes ADD COLUMN category VARCHAR(255) NULL');
        await alterTableSafely('expenses', 'ALTER TABLE expenses ADD COLUMN description VARCHAR(255) NULL');
        await alterTableSafely('expenses', 'ALTER TABLE expenses MODIFY COLUMN description VARCHAR(255) NULL');
        await alterTableSafely('expenses', 'ALTER TABLE expenses ADD COLUMN receipt_url VARCHAR(255) NULL');
        await alterTableSafely('goals', 'ALTER TABLE goals ADD COLUMN target_date DATE NULL');
        await alterTableSafely('goals', 'ALTER TABLE goals ADD COLUMN notes TEXT NULL');

        console.log("Database tables initialized and verified");
    } catch (err) {
        console.error("Database initialization failed", err);
    }
};

module.exports = {
    initDb,
    seedUserData,
    setupDatabase
};
