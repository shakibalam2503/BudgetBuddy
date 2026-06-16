const { initDb } = require('../config/db');

exports.getExpenses = async (req, res) => {
    const userId = req.user.userId;
    try {
        const pool = await initDb();
        const [rows] = await pool.query(
            'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC, id DESC',
            [userId]
        );
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching expenses' });
    }
};

exports.createExpense = async (req, res) => {
    const userId = req.user.userId;
    const { category, amount, date, description, receipt_url } = req.body;
    if (!category || !amount || !date) {
        return res.status(400).json({ error: 'Please enter category, amount, and date' });
    }

    try {
        const pool = await initDb();
        const [result] = await pool.query(
            'INSERT INTO expenses (user_id, category, amount, date, description, receipt_url) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, category, amount, date, description || null, receipt_url || null]
        );
        res.status(201).json({ id: result.insertId, category, amount, date, description, receipt_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error creating expense' });
    }
};

exports.deleteExpense = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;

    try {
        const pool = await initDb();
        const [result] = await pool.query(
            'DELETE FROM expenses WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Expense not found or unauthorized' });
        }
        res.json({ message: 'Expense deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error deleting expense' });
    }
};
