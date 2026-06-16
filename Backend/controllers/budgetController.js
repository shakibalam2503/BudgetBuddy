const { initDb } = require('../config/db');

exports.getBudgets = async (req, res) => {
    const userId = req.user.userId;
    try {
        const pool = await initDb();
        const [rows] = await pool.query('SELECT * FROM budgets WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching budgets' });
    }
};

exports.saveBudget = async (req, res) => {
    const userId = req.user.userId;
    const { category, amount_limit } = req.body;
    if (!category || amount_limit === undefined) {
        return res.status(400).json({ error: 'Please enter category and amount limit' });
    }

    try {
        const pool = await initDb();
        const [existing] = await pool.query('SELECT id FROM budgets WHERE user_id = ? AND category = ?', [userId, category]);
        
        if (existing.length > 0) {
            await pool.query('UPDATE budgets SET amount_limit = ? WHERE user_id = ? AND category = ?', [amount_limit, userId, category]);
            res.json({ message: 'Budget updated successfully', category, amount_limit });
        } else {
            const [result] = await pool.query(
                'INSERT INTO budgets (user_id, category, amount_limit) VALUES (?, ?, ?)',
                [userId, category, amount_limit]
            );
            res.status(201).json({ id: result.insertId, category, amount_limit });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error saving budget' });
    }
};
