const { initDb } = require('../config/db');

exports.getDashboard = async (req, res) => {
    const userId = req.user.userId;
    try {
        const pool = await initDb();
        
        // 1. Total income
        const [incResult] = await pool.query('SELECT SUM(amount) as total FROM incomes WHERE user_id = ?', [userId]);
        const totalIncome = parseFloat(incResult[0].total) || 0;
        
        // 2. Total expense
        const [expResult] = await pool.query('SELECT SUM(amount) as total FROM expenses WHERE user_id = ?', [userId]);
        const totalExpense = parseFloat(expResult[0].total) || 0;
        
        // 3. Total Balance
        const totalBalance = totalIncome - totalExpense;
        
        // 4. Monthly allowance (incomes in current month)
        const currentMonthStart = new Date();
        currentMonthStart.setDate(1);
        currentMonthStart.setHours(0,0,0,0);
        const currentMonthStartStr = currentMonthStart.toISOString().split('T')[0];
        
        const [monthlyAllowanceResult] = await pool.query(
            'SELECT SUM(amount) as total FROM incomes WHERE user_id = ? AND date >= ?', 
            [userId, currentMonthStartStr]
        );
        const monthlyAllowance = parseFloat(monthlyAllowanceResult[0].total) || 0;
        
        // 5. Expenses YTD (current year)
        const currentYearStart = new Date();
        currentYearStart.setMonth(0);
        currentYearStart.setDate(1);
        currentYearStart.setHours(0,0,0,0);
        const currentYearStartStr = currentYearStart.toISOString().split('T')[0];
        
        const [expensesYTDResult] = await pool.query(
            'SELECT SUM(amount) as total FROM expenses WHERE user_id = ? AND date >= ?', 
            [userId, currentYearStartStr]
        );
        const expensesYTD = parseFloat(expensesYTDResult[0].total) || 0;

        // 6. Today's spending
        const todayStartStr = new Date().toISOString().split('T')[0];
        const [todaySpentResult] = await pool.query(
            'SELECT SUM(amount) as total FROM expenses WHERE user_id = ? AND date = ?',
            [userId, todayStartStr]
        );
        const todaySpending = parseFloat(todaySpentResult[0].total) || 0;

        // 7. Remaining budget
        // Sum of budget limits
        const [budgetLimitResult] = await pool.query('SELECT SUM(amount_limit) as total FROM budgets WHERE user_id = ?', [userId]);
        const totalBudgetLimit = parseFloat(budgetLimitResult[0].total) || 0;
        
        // Current month expenses
        const [monthlyExpenseResult] = await pool.query(
            'SELECT SUM(amount) as total FROM expenses WHERE user_id = ? AND date >= ?',
            [userId, currentMonthStartStr]
        );
        const monthlyExpense = parseFloat(monthlyExpenseResult[0].total) || 0;
        
        // Last month expenses
        const lastMonthStart = new Date(currentMonthStart);
        lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);
        const lastMonthStartStr = lastMonthStart.toISOString().split('T')[0];

        const [lastMonthExpenseResult] = await pool.query(
            'SELECT SUM(amount) as total FROM expenses WHERE user_id = ? AND date >= ? AND date < ?',
            [userId, lastMonthStartStr, currentMonthStartStr]
        );
        const lastMonthExpense = parseFloat(lastMonthExpenseResult[0].total) || 0;

        const remainingBudget = totalBudgetLimit - monthlyExpense;
        
        // 8. Active goals
        const [goalsResult] = await pool.query('SELECT * FROM goals WHERE user_id = ?', [userId]);
        
        // 9. Category spends in this month
        const [categorySpends] = await pool.query(
            'SELECT category, SUM(amount) as total FROM expenses WHERE user_id = ? AND date >= ? GROUP BY category',
            [userId, currentMonthStartStr]
        );

        res.json({
            totalBalance,
            monthlyAllowance,
            expensesYTD,
            remainingBudget,
            todaySpending,
            lastMonthExpense,
            goals: goalsResult,
            categorySpends: categorySpends.map(c => ({
                category: c.category,
                amount: parseFloat(c.total) || 0
            }))
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error fetching dashboard' });
    }
};
