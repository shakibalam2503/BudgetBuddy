import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Budget = () => {
    const navigate = useNavigate();
    const [budgets, setBudgets] = useState([]);
    const [categorySpends, setCategorySpends] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
    const [weekFilter, setWeekFilter] = useState('both'); // 'current', 'previous', or 'both'
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState({ name: 'Alex' });
    const [generatingReport, setGeneratingReport] = useState(false);
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error(e);
            }
        }

        const fetchBudgetData = async () => {
            try {
                const [budgetRes, dashboardRes, expensesRes] = await Promise.all([
                    api.get('/api/budget'),
                    api.get('/api/dashboard'),
                    api.get('/api/expenses')
                ]);
                setBudgets(budgetRes.data);
                setCategorySpends(dashboardRes.data.categorySpends);
                setExpenses(expensesRes.data);
                setGoals(dashboardRes.data.goals || []);
            } catch (err) {
                console.error("Error fetching budgets data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBudgetData();
    }, []);

    // Computations
    const totalMonthlyBudget = budgets.reduce((acc, b) => acc + parseFloat(b.amount_limit), 0);
    const totalSpent = categorySpends.reduce((acc, c) => acc + c.amount, 0);
    const spentPercentage = totalMonthlyBudget > 0 ? Math.round((totalSpent / totalMonthlyBudget) * 100) : 0;

    const getCategoryDetails = (cat) => {
        const details = {
            Food: { icon: 'restaurant', color: '#FDE8E8', textColor: '#EF4444', barColor: 'bg-[#EF4444]', desc: 'Grocery & Dining' },
            Transport: { icon: 'directions_bus', color: '#E0E7FF', textColor: '#3B82F6', barColor: 'bg-[#3B82F6]', desc: 'Commute & Travel' },
            Study: { icon: 'menu_book', color: '#FEF3C7', textColor: '#F59E0B', barColor: 'bg-[#F59E0B]', desc: 'Books & Course Material' },
            Entertainment: { icon: 'sports_esports', color: '#D1FAE5', textColor: '#10B981', barColor: 'bg-[#10B981]', desc: 'Events & Hobbies' },
            Housing: { icon: 'home', color: '#F3F4F6', textColor: '#6B7280', barColor: 'bg-[#6B7280]', desc: 'Rent & Living Expenses' },
            Health: { icon: 'ecg_heart', color: '#FCE7F3', textColor: '#EC4899', barColor: 'bg-[#EC4899]', desc: 'Medical & Wellness' }
        };
        return details[cat] || { icon: 'receipt_long', color: '#F5F3FF', textColor: '#8B5CF6', barColor: 'bg-[#8B5CF6]', desc: 'Lifestyle Spending' };
    };

    // Timezone-safe local date parser
    const parseLocalDate = (dateStr) => {
        if (!dateStr) return new Date();
        const cleanDateStr = dateStr.split('T')[0];
        const [year, month, day] = cleanDateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const getPrevMonthSpent = () => {
        const today = new Date();
        const currentMonthNum = today.getMonth();
        const currentYear = today.getFullYear();
        
        let prevMonthNum = currentMonthNum - 1;
        let prevMonthYear = currentYear;
        if (prevMonthNum === -1) {
            prevMonthNum = 11;
            prevMonthYear = currentYear - 1;
        }
        
        return expenses
            .filter(exp => {
                const expDate = parseLocalDate(exp.date);
                return expDate.getMonth() === prevMonthNum && expDate.getFullYear() === prevMonthYear;
            })
            .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
    };

    const prevMonthSpent = getPrevMonthSpent();
    const isHigherSpending = totalSpent > prevMonthSpent;
    const spendingDifference = Math.abs(totalSpent - prevMonthSpent);

    // Calculate current and previous week daily expenses
    const getCurrentAndPrevWeekSpends = () => {
        const currentWeekDaily = [0, 0, 0, 0, 0, 0, 0];
        const prevWeekDaily = [0, 0, 0, 0, 0, 0, 0];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dayOfWeek = today.getDay();
        const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        const currentWeekStart = new Date(today);
        currentWeekStart.setDate(today.getDate() - daysToMonday);
        currentWeekStart.setHours(0, 0, 0, 0);

        const prevWeekStart = new Date(currentWeekStart);
        prevWeekStart.setDate(currentWeekStart.getDate() - 7);

        expenses.forEach(exp => {
            const expDate = parseLocalDate(exp.date);
            const time = expDate.getTime();

            if (time >= currentWeekStart.getTime() && time < currentWeekStart.getTime() + 7 * 86400000) {
                let dayIndex = expDate.getDay() - 1;
                if (dayIndex === -1) dayIndex = 6;
                currentWeekDaily[dayIndex] += parseFloat(exp.amount);
            } else if (time >= prevWeekStart.getTime() && time < currentWeekStart.getTime()) {
                let dayIndex = expDate.getDay() - 1;
                if (dayIndex === -1) dayIndex = 6;
                prevWeekDaily[dayIndex] += parseFloat(exp.amount);
            }
        });

        return { currentWeekDaily, prevWeekDaily };
    };

    const { currentWeekDaily, prevWeekDaily } = getCurrentAndPrevWeekSpends();

    // Scale Y coords for line graph
    const maxSpent = Math.max(...currentWeekDaily, ...prevWeekDaily, 100);
    const getSvgY = (val) => 180 - (val / maxSpent) * 140;

    const xCoords = [0, 133.3, 266.7, 400, 533.3, 666.7, 800];
    const currentWeekPoints = currentWeekDaily.map((val, idx) => ({ x: xCoords[idx], y: getSvgY(val) }));
    const prevWeekPoints = prevWeekDaily.map((val, idx) => ({ x: xCoords[idx], y: getSvgY(val) }));

    const currentLinePath = currentWeekPoints.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`).join(' ');
    const currentFillPath = `M 0,200 ${currentWeekPoints.map(pt => `L ${pt.x},${pt.y}`).join(' ')} L 800,200 Z`;
    const prevLinePath = prevWeekPoints.map((pt, idx) => `${idx === 0 ? 'M' : 'L'} ${pt.x},${pt.y}`).join(' ');

    // Donut/Pie Chart calculation for actual category spends
    const circumference = 251.327;
    let cumulativePercent = 0;
    const donutCircles = categorySpends
        .map(item => {
            const percent = totalSpent > 0 ? Math.round((item.amount / totalSpent) * 100) : 0;
            return { ...item, percent };
        })
        .sort((a, b) => b.amount - a.amount)
        .map(item => {
            const dashArrayVal = (item.percent / 100) * circumference;
            const dashArray = `${dashArrayVal.toFixed(1)} ${(circumference - dashArrayVal).toFixed(1)}`;
            const dashOffsetVal = -(cumulativePercent / 100) * circumference;
            const dashOffset = dashOffsetVal.toFixed(1);

            cumulativePercent += item.percent;

            const details = getCategoryDetails(item.category);

            return {
                ...item,
                dashArray,
                dashOffset,
                stroke: details.textColor || '#94A3B8',
                bgClass: details.barColor || 'bg-primary'
            };
        });

    const handleDownloadMonthlyReport = async () => {
        setGeneratingReport(true);
        try {
            const incomeRes = await api.get('/api/income');
            const incomes = incomeRes.data;

            const today = new Date();
            const currentMonthNum = today.getMonth();
            const currentYear = today.getFullYear();
            const monthName = today.toLocaleString('en-US', { month: 'long' });
            const reportDate = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

            const currentMonthIncomes = incomes.filter(inc => {
                const d = parseLocalDate(inc.date);
                return d.getMonth() === currentMonthNum && d.getFullYear() === currentYear;
            });
            const currentMonthExpenses = expenses.filter(exp => {
                const d = parseLocalDate(exp.date);
                return d.getMonth() === currentMonthNum && d.getFullYear() === currentYear;
            });

            const totalIncome = currentMonthIncomes.reduce((sum, i) => sum + parseFloat(i.amount), 0);
            const totalExpense = currentMonthExpenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
            const totalBudgetLimit = budgets.reduce((acc, b) => acc + parseFloat(b.amount_limit), 0);
            const netSavings = totalIncome - totalExpense;
            const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

            const incomeCategoryTotals = {};
            currentMonthIncomes.forEach(i => {
                const cat = i.category || 'Other';
                incomeCategoryTotals[cat] = (incomeCategoryTotals[cat] || 0) + parseFloat(i.amount);
            });

            const incomeRowsHtml = Object.entries(incomeCategoryTotals).map(([cat, amt]) => {
                const share = totalIncome > 0 ? Math.round((amt / totalIncome) * 100) : 0;
                return `
                    <tr style="border-bottom: 1px solid #f1f5f9; color: #475569;">
                        <td style="padding: 10px 5px; font-weight: 600;">${cat}</td>
                        <td style="padding: 10px 5px; text-align: right;">৳${amt.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td style="padding: 10px 5px; text-align: right;">${share}%</td>
                    </tr>
                `;
            }).join('');

            const allCategories = Array.from(new Set([
                ...budgets.map(b => b.category),
                ...categorySpends.map(c => c.category)
            ])).filter(cat => {
                const budgetObj = budgets.find(b => b.category === cat);
                const limit = budgetObj ? parseFloat(budgetObj.amount_limit) : 0;
                const spent = categorySpends.find(c => c.category === cat)?.amount || 0;
                return limit > 0 || spent > 0;
            });

            const budgetVsSpendRowsHtml = allCategories.map(cat => {
                const budgetObj = budgets.find(b => b.category === cat);
                const limit = budgetObj ? parseFloat(budgetObj.amount_limit) : 0;
                const spent = categorySpends.find(c => c.category === cat)?.amount || 0;
                const utilization = limit > 0 ? Math.round((spent / limit) * 100) : spent > 0 ? 100 : 0;
                const isOver = spent > limit;
                
                return `
                    <tr style="border-bottom: 1px solid #f1f5f9; color: #475569;">
                        <td style="padding: 10px 5px; font-weight: 600;">${cat}</td>
                        <td style="padding: 10px 5px; text-align: right;">৳${limit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td style="padding: 10px 5px; text-align: right;">৳${spent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                        <td style="padding: 10px 5px; text-align: right;">${limit > 0 ? `${utilization}%` : 'N/A'}</td>
                        <td style="padding: 10px 5px; text-align: right; color: ${isOver ? '#e11d48' : '#16a34a'}; font-weight: 700;">
                            ${limit === 0 ? 'UNBUDGETED' : isOver ? 'OVER LIMIT' : 'ON TRACK'}
                        </td>
                    </tr>
                `;
            }).join('');

            let highestExpenseCategory = 'None';
            let highestExpenseAmount = 0;
            const expenseCategoryTotals = {};
            currentMonthExpenses.forEach(e => {
                const cat = e.category || 'Other';
                expenseCategoryTotals[cat] = (expenseCategoryTotals[cat] || 0) + parseFloat(e.amount);
            });

            Object.entries(expenseCategoryTotals).forEach(([cat, amt]) => {
                if (amt > highestExpenseAmount) {
                    highestExpenseAmount = amt;
                    highestExpenseCategory = cat;
                }
            });

            let budgetStatus = "Under Budget";
            if (totalExpense > totalBudgetLimit) {
                budgetStatus = "Over Budget";
            } else if (totalExpense > totalBudgetLimit * 0.9) {
                budgetStatus = "Near Budget Limit";
            }

            let summaryText = '';
            if (totalExpense === 0) {
                summaryText = "No expenses recorded for this month. Excellent saving posture.";
            } else {
                summaryText = `During this month, your primary financial driver was ${highestExpenseCategory} which accounted for ৳${highestExpenseAmount.toLocaleString()} in spending. Overall, you are operating ${budgetStatus.toLowerCase()} relative to your allocated budget limits, maintaining a net savings of ৳${netSavings.toLocaleString()} (a savings rate of ${savingsRate}%).`;
            }

            const reportDiv = document.createElement('div');
            reportDiv.style.position = 'absolute';
            reportDiv.style.left = '-9999px';
            reportDiv.style.top = '-9999px';
            reportDiv.style.width = '800px';
            reportDiv.style.padding = '40px';
            reportDiv.style.fontFamily = "'Inter', 'Outfit', sans-serif";
            reportDiv.style.color = '#1e293b';
            reportDiv.style.background = '#ffffff';
            reportDiv.style.lineHeight = '1.5';

            reportDiv.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0050d4; padding-bottom: 20px; margin-bottom: 30px;">
                    <div>
                        <h1 style="margin: 0; color: #0050d4; font-size: 28px; font-weight: 800; tracking-tight: -0.05em;">BudgetBuddy</h1>
                        <p style="margin: 5px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #64748B; font-weight: 700;">Official Ledger Statement</p>
                    </div>
                    <div style="text-align: right;">
                        <h2 style="margin: 0; font-size: 18px; font-weight: 700; color: #1e293b;">MONTHLY FINANCIAL REPORT</h2>
                        <p style="margin: 5px 0 0 0; font-size: 12px; color: #64748B; font-weight: 600;">Statement Period: ${monthName} ${currentYear}</p>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; background: #f8fafc; padding: 20px; border-radius: 12px; margin-bottom: 35px; border: 1px solid #f1f5f9;">
                    <div>
                        <span style="font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Statement For:</span>
                        <p style="margin: 3px 0 0 0; font-size: 14px; font-weight: 700; color: #1e293b;">${user.name}</p>
                        <p style="margin: 2px 0 0 0; font-size: 11px; color: #64748B;">Academic Atelier Member</p>
                    </div>
                    <div style="text-align: right;">
                        <span style="font-size: 10px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Report Date:</span>
                        <p style="margin: 3px 0 0 0; font-size: 14px; font-weight: 700; color: #1e293b;">${reportDate}</p>
                        <p style="margin: 2px 0 0 0; font-size: 11px; color: #64748B;">Ledger ID: BB-COMP-${currentYear}-${currentMonthNum + 1}</p>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px;">
                    <div style="background: #ebf5ff; padding: 20px; border-radius: 16px; border: 1px solid #cce3ff; text-align: center;">
                        <span style="font-size: 10px; font-weight: 700; color: #0050d4; text-transform: uppercase; letter-spacing: 0.05em;">Total Month Income</span>
                        <h3 style="margin: 10px 0 0 0; font-size: 20px; font-weight: 800; color: #0050d4;">৳${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                    </div>
                    <div style="background: #fdf2f2; padding: 20px; border-radius: 16px; border: 1px solid #fde2e2; text-align: center;">
                        <span style="font-size: 10px; font-weight: 700; color: #de2424; text-transform: uppercase; letter-spacing: 0.05em;">Total Month Spent</span>
                        <h3 style="margin: 10px 0 0 0; font-size: 20px; font-weight: 800; color: #de2424;">৳${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                    </div>
                    <div style="background: ${netSavings >= 0 ? '#f0fdf4' : '#fff1f2'}; padding: 20px; border-radius: 16px; border: 1px solid ${netSavings >= 0 ? '#dcfce7' : '#ffe4e6'}; text-align: center;">
                        <span style="font-size: 10px; font-weight: 700; color: ${netSavings >= 0 ? '#16a34a' : '#e11d48'}; text-transform: uppercase; letter-spacing: 0.05em;">Net Surplus / Deficit</span>
                        <h3 style="margin: 10px 0 0 0; font-size: 20px; font-weight: 800; color: ${netSavings >= 0 ? '#16a34a' : '#e11d48'};">৳${netSavings.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                    </div>
                </div>

                <div style="margin-bottom: 35px;">
                    <h3 style="font-size: 14px; font-weight: 800; color: #1e293b; border-left: 4px solid #0050d4; padding-left: 10px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.03em;">1. Income Details & Sectors</h3>
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 12px;">
                        <thead>
                            <tr style="border-bottom: 1.5px solid #cbd5e1; color: #64748b; font-weight: 700;">
                                <th style="padding: 10px 5px;">INCOME CATEGORY / SECTOR</th>
                                <th style="padding: 10px 5px; text-align: right;">AMOUNT EARNED</th>
                                <th style="padding: 10px 5px; text-align: right;">% SHARE</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${incomeRowsHtml || '<tr><td colspan="3" style="padding: 10px 5px; text-align: center; color: #64748b;">No income logged for this period.</td></tr>'}
                            <tr style="border-top: 1.5px solid #cbd5e1; font-weight: 700; color: #1e293b;">
                                <td style="padding: 12px 5px;">Total Monthly Earnings</td>
                                <td style="padding: 12px 5px; text-align: right;">৳${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                                <td style="padding: 12px 5px; text-align: right;">100%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style="margin-bottom: 35px;">
                    <h3 style="font-size: 14px; font-weight: 800; color: #1e293b; border-left: 4px solid #0050d4; padding-left: 10px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.03em;">2. Budget Allocation vs Spending</h3>
                    <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 12px;">
                        <thead>
                            <tr style="border-bottom: 1.5px solid #cbd5e1; color: #64748b; font-weight: 700;">
                                <th style="padding: 10px 5px;">BUDGET CATEGORY</th>
                                <th style="padding: 10px 5px; text-align: right;">ALLOCATED LIMIT</th>
                                <th style="padding: 10px 5px; text-align: right;">ACTUAL SPENT</th>
                                <th style="padding: 10px 5px; text-align: right;">UTILIZATION RATE</th>
                                <th style="padding: 10px 5px; text-align: right;">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${budgetVsSpendRowsHtml || '<tr><td colspan="5" style="padding: 10px 5px; text-align: center; color: #64748b;">No category allocations configured.</td></tr>'}
                            <tr style="border-top: 1.5px solid #cbd5e1; font-weight: 700; color: #1e293b;">
                                <td style="padding: 12px 5px;">Combined Totals</td>
                                <td style="padding: 12px 5px; text-align: right;">৳${totalBudgetLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                                <td style="padding: 12px 5px; text-align: right;">৳${totalExpense.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                                <td style="padding: 12px 5px; text-align: right;">${totalBudgetLimit > 0 ? Math.round((totalExpense / totalBudgetLimit) * 100) : 0}%</td>
                                <td style="padding: 12px 5px; text-align: right; color: ${totalExpense > totalBudgetLimit ? '#e11d48' : '#16a34a'};">
                                    ${totalExpense > totalBudgetLimit ? 'EXCEEDED' : 'ON TRACK'}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style="margin-bottom: 40px; background: #f8fafc; padding: 25px; border-radius: 16px; border: 1px solid #e2e8f0;">
                    <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #1e293b; text-transform: uppercase; letter-spacing: 0.02em;">3. Spending Habits & Drivers Analysis</h4>
                    <p style="margin: 0; font-size: 11.5px; color: #475569; line-height: 1.6; font-weight: 500;">
                        ${summaryText}
                    </p>
                </div>

                <div style="display: flex; justify-content: space-between; align-items: flex-end; border-top: 1px solid #e2e8f0; padding-top: 25px; font-size: 10px; color: #94a3b8; font-weight: 600;">
                    <div>
                        <p style="margin: 0; text-transform: uppercase; letter-spacing: 0.05em;">BudgetBuddy Automated Ledger Service</p>
                        <p style="margin: 3px 0 0 0;">Cryptographic Verification Token: BB-SEC-${Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                    </div>
                    <div style="text-align: right;">
                        <p style="margin: 0; font-style: italic;">Verified and Audited Statement</p>
                        <p style="margin: 3px 0 0 0; color: #64748b; font-weight: 700;">Page 1 of 1</p>
                    </div>
                </div>
            `;

            document.body.appendChild(reportDiv);

            const canvas = await html2canvas(reportDiv, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            const marginX = 10;
            const marginY = 15;

            pdf.addImage(imgData, 'PNG', marginX, marginY, imgWidth, imgHeight);
            
            pdf.save(`budgetbuddy_financial_statement_${monthName.toLowerCase()}_${currentYear}.pdf`);
            
            document.body.removeChild(reportDiv);
        } catch (err) {
            console.error("Failed to generate monthly report:", err);
            alert("Failed to generate monthly financial statement.");
        } finally {
            setGeneratingReport(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="relative font-body">
            {/* Header Section */}
            <header className="flex justify-between items-end mb-10 pl-1">
                <div>
                    <h2 className="font-headline text-[32px] font-extrabold tracking-tight text-on-surface">Budgets</h2>
                    <p className="text-on-surface-variant font-medium mt-1">Manage your academic and lifestyle spending.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden outline outline-2 outline-[#CBD5E1] cursor-pointer">
                        <img alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0yqd9B3StoTF9KvVphgp4kiPbEQ8eqp3cGhLZMJe6SUKzYKGOrjLTHNelNABabZhUbfBiLA8lOovPXkXqMRKI6phWHN0ejH19PXuoNFzxhAr71MZpwh74FUOxx-BQrYyNcIDAyYz4XD3kFWb6b6QeI2vraV4MuoY91CI9lWIncoPYxNI5BeDJAqPQ26WWpBr0O1Q5ampsHBvKcH6hoCJJ2g-VgjF_fMH7RHRwnBB8KbbvhVvvDrLaDRjYNl73NzATX6rJUpwYuofE" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </header>

            {/* Total Budget Hero Card */}
            <div className="bg-[#0D47A1] rounded-[24px] p-10 flex text-white relative shadow-2xl justify-between items-center mb-10 w-full overflow-hidden">
                <div className="relative z-10 flex-1">
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-white/80">Total Monthly Budget</p>
                    <h3 className="font-headline text-[64px] font-extrabold leading-none mb-10 text-white">৳{totalMonthlyBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                    
                    <div className="flex justify-between text-sm font-bold w-full max-w-lg mb-2">
                        <span className="text-white/90">Spent: ৳{totalSpent.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        <span>{spentPercentage}%</span>
                    </div>
                    <div className="w-full max-w-lg bg-[#003180] h-3 rounded-full overflow-hidden">
                        <div className="h-full bg-[#69F6B8] rounded-full" style={{width: `${Math.min(spentPercentage, 100)}%`}}></div>
                    </div>
                </div>
                <div className="relative z-10 flex flex-col gap-4">
                    <button 
                        onClick={() => navigate('/dashboard/budget/add')}
                        className="bg-white text-[#0D47A1] px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.03] transition-transform"
                    >
                        <span className="material-symbols-outlined text-[18px]">edit_square</span> Set Budget
                    </button>
                    <button 
                        onClick={handleDownloadMonthlyReport}
                        disabled={generatingReport}
                        className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-2"
                    >
                        {generatingReport ? (
                            <>
                                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                Generating...
                            </>
                        ) : (
                            "Monthly Report"
                        )}
                    </button>
                </div>
            </div>

            {/* Category Breakdown Header */}
            <div className="flex justify-between items-center mb-6 pl-1 pr-1">
                <h3 className="font-headline text-[22px] font-bold text-[#1E293B]">Category Breakdown</h3>
                <div className="flex items-center gap-6">
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors border-none bg-transparent ${viewMode === 'grid' ? 'bg-[#EBF0FF] text-[#0050D4]' : 'text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#475569]'}`}
                            title="Grid View"
                        >
                            <span className="material-symbols-outlined text-[20px]">grid_view</span>
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors border-none bg-transparent ${viewMode === 'list' ? 'bg-[#EBF0FF] text-[#0050D4]' : 'text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#475569]'}`}
                            title="List View"
                        >
                            <span className="material-symbols-outlined text-[20px]">list</span>
                        </button>
                    </div>
                    <button 
                        onClick={() => navigate('/dashboard/budget/add')}
                        className="bg-[#0050D4] hover:bg-[#0042AF] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-[0_8px_16px_rgba(0,80,212,0.2)] hover:shadow-[0_12px_20px_rgba(0,80,212,0.3)] transition-all flex items-center gap-1.5 focus:scale-95"
                    >
                        <span className="material-symbols-outlined text-[18px]">add</span> Add Category
                    </button>
                </div>
            </div>

            {/* Category Cards Layout */}
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10" : "flex flex-col gap-4 mb-10"}>
                {budgets.length === 0 ? (
                    <div className="col-span-4 bg-[#F8FAFC] p-8 rounded-2xl text-center border text-on-surface-variant font-semibold w-full">
                        No budget categories created. Click 'Add Category' to allocate funds.
                    </div>
                ) : (
                    budgets.map((b) => {
                        const spent = categorySpends.find(c => c.category === b.category)?.amount || 0;
                        const limit = parseFloat(b.amount_limit);
                        const percent = limit > 0 ? Math.round((spent / limit) * 100) : 0;
                        const exceeded = spent > limit;
                        const critical = !exceeded && percent >= 90;
                        
                        let badgeText = 'On Track';
                        let badgeBg = 'bg-[#A7F3D0] text-[#065F46]';
                        let spentColor = 'text-[#1E293B]';
                        let barColor = getCategoryDetails(b.category).barColor;

                        if (exceeded) {
                            badgeText = 'Exceeded';
                            badgeBg = 'bg-[#FCA5A5] text-[#7F1D1D]';
                            spentColor = 'text-[#E02424]';
                            barColor = 'bg-[#E02424]';
                        } else if (critical) {
                            badgeText = 'Critical';
                            badgeBg = 'bg-[#FDE047] text-[#854D0E]';
                            spentColor = 'text-[#D97706]';
                            barColor = 'bg-[#F59E0B]';
                        }

                        const details = getCategoryDetails(b.category);

                        if (viewMode === 'list') {
                            return (
                                <div key={b.id} className="bg-[#F8FAFC] rounded-[16px] p-5 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-sm transition-all duration-300 border border-slate-100 dark:border-slate-800">
                                    {/* Left: Icon & Title */}
                                    <div className="flex items-center gap-4 min-w-[200px]">
                                        <div className="w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0" style={{ backgroundColor: details.color, color: details.textColor }}>
                                            <span className="material-symbols-outlined text-[20px]">{details.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-headline font-bold text-base text-[#1E293B] mb-0.5">{b.category}</h4>
                                            <p className="text-[10px] text-[#64748B] font-medium leading-none">{details.desc}</p>
                                        </div>
                                    </div>

                                    {/* Center: Progress Bar */}
                                    <div className="flex-1 max-w-md space-y-2">
                                        <div className="flex justify-between items-center text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                            <span>Spent: {percent}%</span>
                                            {exceeded ? (
                                                <span className="text-[#E02424] flex items-center gap-1"><span className="material-symbols-outlined text-[10px] font-bold">warning</span>৳{(spent - limit).toFixed(2)} over limit</span>
                                            ) : (
                                                <span className="text-[#475569] flex items-center gap-1"><span className="material-symbols-outlined text-[10px] font-bold">check_circle</span>৳{(limit - spent).toFixed(2)} remaining</span>
                                            )}
                                        </div>
                                        <div className="w-full bg-[#E2E8F0] h-[6px] rounded-full overflow-hidden">
                                            <div className={`h-full ${barColor} rounded-full`} style={{width: `${Math.min(percent, 100)}%`}}></div>
                                        </div>
                                    </div>

                                    {/* Right: Amounts & Status Badge */}
                                    <div className="flex items-center gap-6 shrink-0 justify-between md:justify-end">
                                        <div className="text-right">
                                            <p className={`text-base font-bold ${spentColor}`}>৳{spent.toLocaleString()}</p>
                                            <p className="text-[10px] text-[#64748B] font-medium">limit: ৳{limit.toLocaleString()}</p>
                                        </div>
                                        <div className={`${badgeBg} text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest leading-relaxed text-center min-w-[80px]`}>
                                            {badgeText}
                                        </div>
                                    </div>
                                </div>
                            );
                        }

                        // Grid View (default)
                        return (
                            <div key={b.id} className="bg-[#F8FAFC] rounded-[20px] p-6 relative hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-10 h-10 rounded-[12px] flex items-center justify-center" style={{ backgroundColor: details.color, color: details.textColor }}>
                                        <span className="material-symbols-outlined text-[20px]">{details.icon}</span>
                                    </div>
                                    <div className={`${badgeBg} text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest leading-relaxed`}>
                                        {badgeText}
                                    </div>
                                </div>
                                <h4 className="font-headline font-bold text-[17px] text-[#1E293B] mb-1">{b.category}</h4>
                                <p className="text-[11px] text-[#64748B] font-medium leading-tight h-8">{details.desc}</p>
                                
                                <div className="flex justify-between items-end mt-6 mb-2.5">
                                    <span className={`text-[20px] font-bold ${spentColor}`}>৳{spent.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                                    <span className="text-[11px] text-[#64748B] font-semibold">of ৳{limit.toLocaleString('en-US', { minimumFractionDigits: 0 })}</span>
                                </div>
                                <div className="w-full bg-[#E2E8F0] h-[7px] rounded-full overflow-hidden mb-3">
                                    <div className={`h-full ${barColor} rounded-full`} style={{width: `${Math.min(percent, 100)}%`}}></div>
                                </div>
                                
                                {exceeded ? (
                                    <p className="text-[11px] text-[#E02424] font-bold flex items-center gap-1.5 align-middle">
                                        <span className="material-symbols-outlined text-[12px] font-bold mb-[1px]">warning</span>
                                        ৳{(spent - limit).toFixed(2)} over limit
                                    </p>
                                ) : (
                                    <p className="text-[11px] text-[#475569] font-medium flex items-center gap-1.5 align-middle">
                                        <span className="material-symbols-outlined text-[12px] font-bold mb-[1px]">check_circle</span>
                                        ৳{(limit - spent).toFixed(2)} remaining
                                    </p>
                                )}
                            </div>
                        );
                    })
                )}
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10">
                {/* Graph Area */}
                <div className="md:col-span-8 bg-[#F8FAFC] rounded-[24px] p-8 pt-10 relative">
                    <div className="flex justify-between items-center mb-10 flex-wrap gap-4">
                        <h4 className="font-headline text-[18px] font-bold text-[#1E293B]">Weekly Spending Trend</h4>
                        <div className="flex bg-[#F1F5F9] rounded-lg p-1 text-[11px] font-bold text-[#64748B] border border-slate-100">
                            <button 
                                onClick={() => setWeekFilter('current')} 
                                className={`px-4 py-1.5 rounded-md transition-all border-none cursor-pointer ${weekFilter === 'current' ? 'bg-[#0050D4] text-white shadow-sm' : 'bg-transparent text-[#64748B] hover:text-[#1E293B]'}`}
                            >
                                Current Week
                            </button>
                            <button 
                                onClick={() => setWeekFilter('previous')} 
                                className={`px-4 py-1.5 rounded-md transition-all border-none cursor-pointer ${weekFilter === 'previous' ? 'bg-[#0050D4] text-white shadow-sm' : 'bg-transparent text-[#64748B] hover:text-[#1E293B]'}`}
                            >
                                Previous Week
                            </button>
                            <button 
                                onClick={() => setWeekFilter('both')} 
                                className={`px-4 py-1.5 rounded-md transition-all border-none cursor-pointer ${weekFilter === 'both' ? 'bg-[#0050D4] text-white shadow-sm' : 'bg-transparent text-[#64748B] hover:text-[#1E293B]'}`}
                            >
                                Compare Both
                            </button>
                        </div>
                    </div>
                    {/* Dynamic Line Chart */}
                    <div className="w-full h-56 relative border-b border-[#E2E8F0] flex items-end">
                        <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                            {/* Fill Area for Current Week */}
                            {(weekFilter === 'current' || weekFilter === 'both') && currentWeekDaily.some(v => v > 0) && (
                                <path d={currentFillPath} fill="url(#blue-grad)" opacity="1" />
                            )}
                            
                            {/* Current Week Line */}
                            {(weekFilter === 'current' || weekFilter === 'both') && (
                                <path d={currentLinePath} fill="none" stroke="#0050D4" strokeWidth="4" />
                            )}
                            
                            {/* Previous Week Line */}
                            {(weekFilter === 'previous' || weekFilter === 'both') && (
                                <path d={prevLinePath} fill="none" stroke="#A7AAD7" strokeWidth="3" strokeDasharray="6 6" />
                            )}
                            
                            {/* Dynamic Data Nodes - Current Week */}
                            {(weekFilter === 'current' || weekFilter === 'both') && currentWeekPoints.map((pt, idx) => (
                                <circle 
                                    key={`curr-${idx}`} 
                                    cx={pt.x} 
                                    cy={pt.y} 
                                    r="4.5" 
                                    fill="white" 
                                    stroke="#0050D4" 
                                    strokeWidth="3" 
                                    className="cursor-pointer transition-all duration-200 hover:scale-[1.5]"
                                    title={`Current Week - Day ${idx + 1}: ৳${currentWeekDaily[idx]}`}
                                />
                            ))}

                            {/* Dynamic Data Nodes - Previous Week */}
                            {(weekFilter === 'previous' || weekFilter === 'both') && prevWeekPoints.map((pt, idx) => (
                                <circle 
                                    key={`prev-${idx}`} 
                                    cx={pt.x} 
                                    cy={pt.y} 
                                    r="4" 
                                    fill="white" 
                                    stroke="#A7AAD7" 
                                    strokeWidth="2.5" 
                                    className="cursor-pointer transition-all duration-200 hover:scale-[1.5]"
                                    title={`Previous Week - Day ${idx + 1}: ৳${prevWeekDaily[idx]}`}
                                />
                            ))}
                        </svg>
                        <defs>
                            <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </div>
                    {/* X-Axis labels */}
                    <div className="flex justify-between mt-5 px-1">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Mon</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest pl-[10%]">Tue</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Wed</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest pr-[8%]">Thu</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Fri</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest pr-[3%]">Sat</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Sun</span>
                    </div>
                </div>
                
                {/* Right Side: Category Spending Pie Chart & Insights */}
                <div className="md:col-span-4 bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#F1F5F9] flex flex-col justify-between min-h-[380px]">
                    <div>
                        <h4 className="font-headline text-[18px] font-bold text-[#1E293B] mb-6">Category Spending</h4>
                        
                        {/* Donut Chart */}
                        <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Base Gray circle */}
                                <circle cx="50" cy="50" r="40" className="text-[#E2E8F0]" strokeWidth="10" fill="none" stroke="currentColor"/>
                                {/* Segment circles */}
                                {donutCircles.length === 0 ? (
                                    <circle cx="50" cy="50" r="40" className="text-[#94A3B8]" strokeWidth="10" fill="none" stroke="currentColor"/>
                                ) : (
                                    donutCircles.map((circle, idx) => (
                                        <circle 
                                            key={idx}
                                            cx="50" 
                                            cy="50" 
                                            r="40" 
                                            stroke={circle.stroke} 
                                            strokeWidth="10" 
                                            fill="none" 
                                            strokeDasharray={circle.dashArray} 
                                            strokeDashoffset={circle.dashOffset}
                                            className="transition-all duration-500"
                                        />
                                    ))
                                )}
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="font-headline text-[18px] font-extrabold text-[#1E293B] leading-none mb-1">
                                    ৳{totalSpent.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </span>
                                <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-[0.1em]">Spent</span>
                            </div>
                        </div>

                        {/* Category List */}
                        <div className="space-y-2 mb-6 max-h-[140px] overflow-y-auto pr-1">
                            {donutCircles.length === 0 ? (
                                <p className="text-xs text-[#64748B] text-center">No categories recorded</p>
                            ) : (
                                donutCircles.slice(0, 4).map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-center text-[12px] font-bold">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.stroke }}></span>
                                            <span className="text-[#475569] truncate max-w-[120px]">{item.category}</span>
                                        </div>
                                        <span className="text-[#1E293B]">{item.percent}%</span>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        <hr className="border-[#F1F5F9] my-4" />
                    </div>
                    
                    <div>
                        <h5 className="font-headline text-[14px] font-bold text-[#1E293B] mb-4">Smart Insights</h5>
                        <div className="space-y-4">
                            {isHigherSpending && prevMonthSpent > 0 ? (
                                <div className="bg-[#FFF1F2] rounded-r-[16px] rounded-l-sm border-l-[4px] border-[#E11D48] p-4 shadow-[0_2px_10px_rgba(225,29,72,0.05)]">
                                    <div className="flex gap-3">
                                        <span className="material-symbols-outlined text-[#E11D48] text-[18px] mt-0.5">trending_up</span>
                                        <div>
                                            <h6 className="font-bold text-[#111827] text-[12px] mb-1">Spending Alert</h6>
                                            <p className="text-[10.5px] text-[#4B5563] leading-relaxed font-medium">
                                                Your spending this month (৳{totalSpent.toLocaleString()}) is higher than last month (৳{prevMonthSpent.toLocaleString()}) by ৳{spendingDifference.toLocaleString()}. Keep it in check!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#F0FDF4] rounded-r-[16px] rounded-l-sm border-l-[4px] border-[#16A34A] p-4 shadow-[0_2px_10px_rgba(22,163,74,0.05)]">
                                    <div className="flex gap-3">
                                        <span className="material-symbols-outlined text-[#16A34A] text-[18px] mt-0.5">trending_down</span>
                                        <div>
                                            <h6 className="font-bold text-[#111827] text-[12px] mb-1">Spending on Track</h6>
                                            <p className="text-[10.5px] text-[#4B5563] leading-relaxed font-medium">
                                                {prevMonthSpent > 0 ? (
                                                    `Your spending this month (৳${totalSpent.toLocaleString()}) is lower than or equal to last month (৳${prevMonthSpent.toLocaleString()}). Great job!`
                                                ) : (
                                                    `Your spending this month is ৳${totalSpent.toLocaleString()}. Keep tracking to see future comparisons.`
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                            
                            {goals.length > 0 ? (
                                <div className="bg-[#F0FDF4] rounded-r-[16px] rounded-l-sm border-l-[4px] border-[#16A34A] p-4 shadow-[0_2px_10px_rgba(22,163,74,0.05)]">
                                    <div className="flex gap-3">
                                        <span className="material-symbols-outlined text-[#16A34A] text-[18px] mt-0.5">savings</span>
                                        <div>
                                            <h6 className="font-bold text-[#111827] text-[12px] mb-1">Saving Goal: {goals[0].name}</h6>
                                            <p className="text-[10.5px] text-[#4B5563] leading-relaxed font-medium">
                                                Saved ৳{parseFloat(goals[0].current_amount).toLocaleString()} of ৳{parseFloat(goals[0].target_amount).toLocaleString()} ({Math.min(100, Math.round((parseFloat(goals[0].current_amount) / parseFloat(goals[0].target_amount)) * 100))}% completed).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#EFF6FF] rounded-r-[16px] rounded-l-sm border-l-[4px] border-[#3B82F6] p-4 shadow-[0_2px_10px_rgba(59,130,246,0.05)]">
                                    <div className="flex gap-3">
                                        <span className="material-symbols-outlined text-[#3B82F6] text-[18px] mt-0.5">info</span>
                                        <div>
                                            <h6 className="font-bold text-[#111827] text-[12px] mb-1">Savings Target</h6>
                                            <p className="text-[10.5px] text-[#4B5563] leading-relaxed font-medium">No active saving goals configured. Set one up to start tracking your targets!</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Budget;
