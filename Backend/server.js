const express = require('express');
const cors = require('cors');
const path = require('path');
const { setupDatabase } = require('./config/db');
const { PORT } = require('./config/constants');
const { uploadsDir } = require('./middleware/uploadMiddleware');

// Import routes
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const expenseRoutes = require('./routes/expense');
const incomeRoutes = require('./routes/income');
const budgetRoutes = require('./routes/budget');
const goalRoutes = require('./routes/goal');
const uploadRoutes = require('./routes/upload');

const app = express();

app.use(cors());
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(uploadsDir));

// Initialize Database Tables
setupDatabase();

// --- Mount Routes ---
app.get('/', (req, res) => {
    res.send('Budget Buddy API');
});

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/upload', uploadRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
