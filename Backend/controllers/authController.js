const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { initDb } = require('../config/db');
const { JWT_SECRET } = require('../config/constants');

exports.signup = async (req, res) => {
    const { name, email, phone, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Please enter all required fields' });
    }

    try {
        const pool = await initDb();
        const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
            'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
            [name, email, phone || null, hashedPassword]
        );

        const userId = result.insertId;

        const token = jwt.sign({ userId, email }, JWT_SECRET);
        res.status(201).json({
            token,
            user: { id: userId, name, email, phone }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during signup' });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter email and password' });
    }

    try {
        const pool = await initDb();
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET);
        res.json({
            token,
            user: { id: user.id, name: user.name, email: user.email, phone: user.phone }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during signin' });
    }
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ error: 'Please enter your email address' });
    }

    try {
        const pool = await initDb();
        
        // Check if user exists
        const [users] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ error: 'No account found with this email address' });
        }

        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Clear older resets and insert new code
        await pool.query('DELETE FROM password_resets WHERE email = ?', [email]);
        await pool.query(
            'INSERT INTO password_resets (email, code, expires_at) VALUES (?, ?, ?)',
            [email, code, expiresAt]
        );

        // Log code directly to backend console for developer/local testing
        console.log(`\n========================================`);
        console.log(`[PASSWORD RESET] Email: ${email}`);
        console.log(`[PASSWORD RESET] Code:  ${code}`);
        console.log(`[PASSWORD RESET] Valid until: ${expiresAt.toLocaleString()}`);
        console.log(`========================================\n`);

        res.json({ message: 'Verification code sent to your email.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during password reset request' });
    }
};

exports.resetPassword = async (req, res) => {
    const { email, code, newPassword } = req.body;
    if (!email || !code || !newPassword) {
        return res.status(400).json({ error: 'Please fill in all fields (email, code, and new password)' });
    }

    try {
        const pool = await initDb();

        // Verify code and expiration
        const [resets] = await pool.query(
            'SELECT * FROM password_resets WHERE email = ? AND code = ? AND expires_at > NOW()',
            [email, code]
        );

        if (resets.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired verification code' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, email]);

        // Clean up resets
        await pool.query('DELETE FROM password_resets WHERE email = ?', [email]);

        res.json({ message: 'Password reset successfully. You can now sign in.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during password reset execution' });
    }
};
