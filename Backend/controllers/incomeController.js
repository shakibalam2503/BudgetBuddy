const { initDb } = require('../config/db');

exports.getIncomes = async (req, res) => {
    const userId = req.user.userId;
    try {
        const pool = await initDb();
        const [rows] = await pool.query(
            'SELECT * FROM incomes WHERE user_id = ? ORDER BY date DESC, id DESC',
            [userId]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching income' });
    }
};

exports.createIncome = async (req, res) => {
    const userId = req.user.userId;
    const { source, category, amount, date } = req.body;
    if (!source || !amount || !date) {
        return res.status(400).json({ error: 'Please enter source, amount, and date' });
    }

    try {
        const pool = await initDb();
        const [result] = await pool.query(
            'INSERT INTO incomes (user_id, source, category, amount, date) VALUES (?, ?, ?, ?, ?)',
            [userId, source, category || null, amount, date]
        );
        res.status(201).json({ id: result.insertId, source, category, amount, date });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error creating income' });
    }
};
