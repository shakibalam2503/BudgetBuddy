const { initDb } = require('../config/db');

exports.getGoals = async (req, res) => {
    const userId = req.user.userId;
    try {
        const pool = await initDb();
        const [rows] = await pool.query('SELECT * FROM goals WHERE user_id = ?', [userId]);
        res.json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching goals' });
    }
};

exports.createGoal = async (req, res) => {
    const userId = req.user.userId;
    const { name, target_amount, target_date, notes } = req.body;
    if (!name || !target_amount) {
        return res.status(400).json({ error: 'Please enter goal name and target amount' });
    }

    try {
        const pool = await initDb();
        const [result] = await pool.query(
            'INSERT INTO goals (user_id, name, target_amount, current_amount, target_date, notes) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, name, target_amount, 0, target_date || null, notes || null]
        );
        res.status(201).json({ id: result.insertId, name, target_amount, current_amount: 0, target_date, notes });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error creating goal' });
    }
};

exports.addSavings = async (req, res) => {
    const userId = req.user.userId;
    const { id } = req.params;
    const { amount } = req.body;
    if (amount === undefined || amount <= 0) {
        return res.status(400).json({ error: 'Please enter a valid amount greater than 0' });
    }

    try {
        const pool = await initDb();
        const [result] = await pool.query(
            'UPDATE goals SET current_amount = current_amount + ? WHERE id = ? AND user_id = ?',
            [amount, id, userId]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Goal not found or unauthorized' });
        }
        res.json({ message: 'Savings deposit added successfully', amount });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error depositing savings' });
    }
};
