import React, { useState, useEffect } from 'react';
import api from '../api';

const Insights = () => {
    const [user, setUser] = useState({ name: 'Alex' });
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error(e);
            }
        }

        const fetchData = async () => {
            try {
                const [incRes, expRes] = await Promise.all([
                    api.get('/api/income'),
                    api.get('/api/expenses')
                ]);
                setIncomes(incRes.data);
                setExpenses(expRes.data);
            } catch (err) {
                console.error("Error fetching insights data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-[#5284FE] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Timezone-safe local date parser
    const parseLocalDate = (dateStr) => {
        if (!dateStr) return new Date();
        const cleanDateStr = dateStr.split('T')[0];
        const [year, month, day] = cleanDateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    // --- Calculations ---

    // 1. Core metrics
    const totalIncome = incomes.reduce((sum, i) => sum + parseFloat(i.amount), 0);
    const totalExpense = expenses.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const netSavings = totalIncome - totalExpense;
    const utilizedPercent = totalIncome > 0 ? Math.round((totalExpense / totalIncome) * 100) : 0;

    // 2. Highest Expenses (top 4)
    const highestExpenses = [...expenses]
        .sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))
        .slice(0, 4);

    const getExpenseIconInfo = (category = '') => {
        const cat = category.toLowerCase();
        if (cat.includes('study') || cat.includes('book') || cat.includes('education')) {
            return { icon: 'menu_book', bg: 'bg-[#EEF2FF]', color: 'text-[#5284FE]' };
        }
        if (cat.includes('food') || cat.includes('dining') || cat.includes('grocery')) {
            return { icon: 'shopping_basket', bg: 'bg-[#ECFDF5]', color: 'text-[#10B981]' };
        }
        if (cat.includes('entertainment') || cat.includes('movie') || cat.includes('subscription')) {
            return { icon: 'movie', bg: 'bg-[#F3E8FF]', color: 'text-[#9333EA]' };
        }
        if (cat.includes('transport') || cat.includes('ride') || cat.includes('travel')) {
            return { icon: 'directions_car', bg: 'bg-[#FEF2F2]', color: 'text-[#EF4444]' };
        }
        return { icon: 'payments', bg: 'bg-[#F1F5F9]', color: 'text-[#64748B]' };
    };

    // 3. Category Spends & Donut Chart
    const categoryTotals = {};
    expenses.forEach(e => {
        const cat = e.category || 'Other';
        categoryTotals[cat] = (categoryTotals[cat] || 0) + parseFloat(e.amount);
    });

    const categoryPercentList = Object.entries(categoryTotals).map(([category, amount]) => {
        const percent = totalExpense > 0 ? Math.round((amount / totalExpense) * 100) : 0;
        return { category, amount, percent };
    }).sort((a, b) => b.amount - a.amount);

    // Build circle SVG rendering data for Donut
    // Circumference = 2 * pi * r = 2 * 3.14159 * 40 = 251.327
    const circumference = 251.327;
    let cumulativePercent = 0;
    const donutCircles = categoryPercentList.map((item) => {
        const dashArrayVal = (item.percent / 100) * circumference;
        const dashArray = `${dashArrayVal.toFixed(1)} ${(circumference - dashArrayVal).toFixed(1)}`;
        const dashOffsetVal = -(cumulativePercent / 100) * circumference;
        const dashOffset = dashOffsetVal.toFixed(1);

        cumulativePercent += item.percent;

        const colors = {
            Food: { stroke: '#EF4444', bg: 'bg-[#EF4444]' },
            Transport: { stroke: '#3B82F6', bg: 'bg-[#3B82F6]' },
            Study: { stroke: '#F59E0B', bg: 'bg-[#F59E0B]' },
            Entertainment: { stroke: '#10B981', bg: 'bg-[#10B981]' },
            Housing: { stroke: '#6B7280', bg: 'bg-[#6B7280]' },
            Health: { stroke: '#EC4899', bg: 'bg-[#EC4899]' }
        };
        const config = colors[item.category] || { stroke: '#8B5CF6', bg: 'bg-[#8B5CF6]' };

        return {
            ...item,
            dashArray,
            dashOffset,
            stroke: config.stroke,
            bgClass: config.bg
        };
    });

    // 4. Expense Trends (Weekly spends in current month)
    const currentMonthNum = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const currentMonthExpenses = expenses.filter(e => {
        const d = parseLocalDate(e.date);
        return d.getMonth() === currentMonthNum && d.getFullYear() === currentYear;
    });

    let w1 = 0, w2 = 0, w3 = 0, w4 = 0;
    currentMonthExpenses.forEach(e => {
        const day = parseLocalDate(e.date).getDate();
        const amt = parseFloat(e.amount);
        if (day <= 7) w1 += amt;
        else if (day <= 14) w2 += amt;
        else if (day <= 21) w3 += amt;
        else w4 += amt;
    });

    const maxWeekly = Math.max(w1, w2, w3, w4, 100);
    const y1 = 180 - (w1 / maxWeekly) * 140;
    const y2 = 180 - (w2 / maxWeekly) * 140;
    const y3 = 180 - (w3 / maxWeekly) * 140;
    const y4 = 180 - (w4 / maxWeekly) * 140;

    // Cubic bezier path for weekly trends
    const pathD = `M 0,${y1} C 133,${y1} 133,${y2} 266,${y2} C 400,${y2} 400,${y3} 533,${y3} C 666,${y3} 666,${y4} 800,${y4}`;
    const fillD = `${pathD} L 800,200 L 0,200 Z`;

    // 5. Savings Growth (last 6 months)
    const getSavingsHistory = () => {
        const months = [];
        const now = new Date();
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const label = d.toLocaleString('en-US', { month: 'short' });
            const year = d.getFullYear();
            const monthNum = d.getMonth();
            months.push({ label, year, monthNum, income: 0, expense: 0 });
        }

        incomes.forEach(inc => {
            const date = parseLocalDate(inc.date);
            const y = date.getFullYear();
            const m = date.getMonth();
            const match = months.find(item => item.year === y && item.monthNum === m);
            if (match) match.income += parseFloat(inc.amount);
        });

        expenses.forEach(exp => {
            const date = parseLocalDate(exp.date);
            const y = date.getFullYear();
            const m = date.getMonth();
            const match = months.find(item => item.year === y && item.monthNum === m);
            if (match) match.expense += parseFloat(exp.amount);
        });

        return months.map(m => ({
            label: m.label,
            savings: Math.max(0, m.income - m.expense)
        }));
    };

    const savingsHistory = getSavingsHistory();
    const maxSavings = Math.max(...savingsHistory.map(s => s.savings), 100);
    const totalSavings6M = savingsHistory.reduce((sum, h) => sum + h.savings, 0);
    const yearlyAccumulationStr = totalSavings6M >= 1000 ? `৳${(totalSavings6M / 1000).toFixed(1)}k` : `৳${totalSavings6M.toLocaleString()}`;

    // Get current month name
    const currentMonthName = new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="relative font-body">
            {/* Header / Search Area */}
            <div className="flex justify-between items-center mb-10 pl-1">
                <div className="relative w-full max-w-md">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">search</span>
                    <input 
                        type="text" 
                        placeholder="Search analytics..." 
                        className="w-full bg-[#F1F5F9] text-[#1E293B] pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-[#5284FE] transition-shadow placeholder-[#94A3B8] font-medium"
                    />
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex gap-4 text-[#64748B]">
                        <button className="hover:text-[#1E293B] transition-colors"><span className="material-symbols-outlined text-[24px]">help</span></button>
                    </div>
                    <div className="h-8 w-px bg-[#E2E8F0]"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-[14px] font-bold text-[#1E293B]">{user.name}</div>
                            <div className="text-[11px] text-[#64748B] font-medium">Scholar Student</div>
                        </div>
                        <img alt="User" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0yqd9B3StoTF9KvVphgp4kiPbEQ8eqp3cGhLZMJe6SUKzYKGOrjLTHNelNABabZhUbfBiLA8lOovPXkXqMRKI6phWHN0ejH19PXuoNFzxhAr71MZpwh74FUOxx-BQrYyNcIDAyYz4XD3kFWb6b6QeI2vraV4MuoY91CI9lWIncoPYxNI5BeDJAqPQ26WWpBr0O1Q5ampsHBvKcH6hoCJJ2g-VgjF_fMH7RHRwnBB8KbbvhVvvDrLaDRjYNl73NzATX6rJUpwYuofE" className="w-11 h-11 rounded-full outline outline-2 outline-[#CBD5E1]" />
                    </div>
                </div>
            </div>

            {/* Page Title & Actions */}
            <div className="flex justify-between items-end mb-8 pl-1">
                <div>
                    <h2 className="font-headline text-[32px] font-extrabold text-[#1E293B] tracking-tight">Financial Insights</h2>
                    <p className="text-[#64748B] font-medium mt-1">Real-time performance of your academic budget</p>
                </div>
                <div className="flex gap-4">
                    <button className="px-6 py-2.5 rounded-full bg-[#69F6B8] text-[#006947] font-bold text-[13px] hover:bg-[#58E7AB] transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span> {currentMonthName}
                    </button>
                </div>
            </div>

            {/* Top 3 Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Total Revenue */}
                <div className="bg-[#0251CA] rounded-[24px] p-8 text-white relative overflow-hidden shadow-[0_12px_24px_rgba(2,81,202,0.25)]">
                    <div className="flex justify-between items-start mb-6">
                        <span className="uppercase text-[11px] font-bold tracking-[0.15em] text-white/80">Total Revenue</span>
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[18px]">payments</span>
                        </div>
                    </div>
                    <h3 className="font-headline text-[36px] font-extrabold leading-none mb-6 text-white">৳{totalIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    <div className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        <span className="text-[10px] font-bold tracking-wider">+12.5% GROWTH</span>
                    </div>
                    <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl"></div>
                </div>

                {/* Budget Allocation */}
                <div className="bg-[#6B23C8] rounded-[24px] p-8 text-white relative overflow-hidden shadow-[0_12px_24px_rgba(107,35,200,0.25)]">
                    <div className="flex justify-between items-start mb-6">
                        <span className="uppercase text-[11px] font-bold tracking-[0.15em] text-white/80">Budget Allocation</span>
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[18px]">pie_chart</span>
                        </div>
                    </div>
                    <h3 className="font-headline text-[36px] font-extrabold leading-none mb-6 text-white">৳{totalExpense.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    <div className="w-full bg-white/20 h-[6px] rounded-full overflow-hidden mb-2">
                        <div className="bg-white h-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ width: `${Math.min(utilizedPercent, 100)}%` }}></div>
                    </div>
                    <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest">{utilizedPercent}% OF TOTAL UTILIZED</span>
                </div>

                {/* Net Savings */}
                <div className="bg-[#035E37] rounded-[24px] p-8 text-white relative overflow-hidden shadow-[0_12px_24px_rgba(3,94,55,0.25)]">
                    <div className="flex justify-between items-start mb-6">
                        <span className="uppercase text-[11px] font-bold tracking-[0.15em] text-white/80">Net Savings</span>
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[18px]">savings</span>
                        </div>
                    </div>
                    <h3 className="font-headline text-[36px] font-extrabold leading-none mb-6 text-white">৳{netSavings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                    <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-[#69F6B8]"></div>
                        <span className="text-[10px] font-bold tracking-wider uppercase">{netSavings >= 0 ? 'On Track' : 'Deficit'}</span>
                    </div>
                </div>
            </div>

            {/* Middle Graphs Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                
                {/* Expense Trends */}
                <div className="lg:col-span-8 bg-[#F8FAFC] rounded-[24px] p-8 pb-6 border border-[#F1F5F9] flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <h4 className="font-headline text-[18px] font-bold text-[#1E293B]">Expense Trends</h4>
                            <p className="text-[13px] text-[#64748B] font-medium">Monitoring fluctuation in spending habits</p>
                        </div>
                        <div className="bg-[#F1F5F9] rounded-lg flex overflow-hidden p-1">
                            <button className="px-4 py-1.5 rounded-md bg-white text-[#5284FE] font-bold text-[11px] shadow-sm">Weekly</button>
                        </div>
                    </div>
                    
                    {/* SVG Line Graph */}
                    <div className="w-full relative h-[180px] flex items-end">
                        <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                            <path d={fillD} fill="url(#blue-grad-insights)" opacity="0.8" />
                            <path d={pathD} fill="none" stroke="#0050D4" strokeWidth="4" />
                            <circle cx="266" cy={y2} r="4" fill="white" stroke="#0050D4" strokeWidth="2" />
                            <circle cx="533" cy={y3} r="4" fill="white" stroke="#0050D4" strokeWidth="2" />
                        </svg>
                        <defs>
                            <linearGradient id="blue-grad-insights" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </div>
                    
                    <div className="flex justify-between w-full mt-4 px-2">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Week 1 (৳{w1.toFixed(0)})</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Week 2 (৳{w2.toFixed(0)})</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Week 3 (৳{w3.toFixed(0)})</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Week 4 (৳{w4.toFixed(0)})</span>
                    </div>
                </div>

                {/* Distribution Chart */}
                <div className="lg:col-span-4 bg-[#F8FAFC] rounded-[24px] p-8 border border-[#F1F5F9] flex flex-col items-center">
                    <div className="w-full mb-6">
                        <h4 className="font-headline text-[18px] font-bold text-[#1E293B]">Distribution</h4>
                        <p className="text-[13px] text-[#64748B] font-medium">Categorical breakdown</p>
                    </div>
                    
                    <div className="relative w-48 h-48 mb-6">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                            {/* Base Gray */}
                            <circle cx="50" cy="50" r="40" className="text-[#E2E8F0]" strokeWidth="12" fill="none" stroke="currentColor"/>
                            
                            {/* Dynamic segments */}
                            {donutCircles.length === 0 ? (
                                <circle cx="50" cy="50" r="40" className="text-[#94A3B8]" strokeWidth="12" fill="none" stroke="currentColor"/>
                            ) : (
                                donutCircles.map((circle, idx) => (
                                    <circle 
                                        key={idx}
                                        cx="50" 
                                        cy="50" 
                                        r="40" 
                                        stroke={circle.stroke} 
                                        strokeWidth="12" 
                                        fill="none" 
                                        strokeDasharray={circle.dashArray} 
                                        strokeDashoffset={circle.dashOffset}
                                        className="transition-all duration-500"
                                    />
                                ))
                            )}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-headline text-[24px] font-extrabold text-[#1E293B] leading-none mb-1">
                                ৳{totalExpense >= 1000 ? `${(totalExpense / 1000).toFixed(1)}k` : totalExpense.toFixed(0)}
                            </span>
                            <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-[0.1em]">Total Spent</span>
                        </div>
                    </div>

                    <div className="w-full space-y-3 px-2 max-h-[160px] overflow-y-auto">
                        {donutCircles.length === 0 ? (
                            <p className="text-xs text-[#64748B] text-center">No categories recorded</p>
                        ) : (
                            donutCircles.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-[12px] font-bold">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${item.bgClass}`}></div>
                                        <span className="text-[#475569]">{item.category === 'Study' ? 'Study Materials' : item.category === 'Food' ? 'Food & Dining' : item.category}</span>
                                    </div>
                                    <span className="text-[#1E293B]">{item.percent}%</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Highest Expenses */}
                <div className="lg:col-span-4 bg-[#F8FAFC] rounded-[24px] p-8 border border-[#F1F5F9]">
                    <div className="flex justify-between items-end mb-6">
                        <h4 className="font-headline text-[18px] font-bold text-[#1E293B]">Highest Expenses</h4>
                    </div>
                    
                    <div className="space-y-4">
                        {highestExpenses.length === 0 ? (
                            <p className="text-xs text-[#64748B] text-center py-6">No expenses found</p>
                        ) : (
                            highestExpenses.map((e) => {
                                const iconInfo = getExpenseIconInfo(e.category);
                                return (
                                    <div key={e.id} className="bg-white rounded-[16px] p-4 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                                        <div className={`w-10 h-10 rounded-xl ${iconInfo.bg} ${iconInfo.color} flex items-center justify-center`}>
                                            <span className="material-symbols-outlined text-[20px]">{iconInfo.icon}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h5 className="font-bold text-[#1E293B] text-[13px] truncate max-w-[120px]">{e.description || e.category}</h5>
                                            <p className="text-[11px] text-[#64748B]">{e.category}</p>
                                        </div>
                                        <div className="text-right font-headline font-bold text-[15px] text-[#1E293B]">৳{parseFloat(e.amount).toLocaleString()}</div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Savings Growth */}
                <div className="lg:col-span-8 bg-[#F8FAFC] rounded-[24px] p-8 pb-6 border border-[#F1F5F9] flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h4 className="font-headline text-[18px] font-bold text-[#1E293B]">Savings Growth</h4>
                            <p className="text-[13px] text-[#64748B] font-medium">Performance over last 6 months</p>
                        </div>
                        <div className="text-right">
                            <div className="font-headline text-[24px] font-extrabold text-[#035E37] leading-none mb-1">{yearlyAccumulationStr}</div>
                            <div className="text-[9px] font-bold tracking-[0.1em] text-[#64748B] uppercase">6M Accumulation</div>
                        </div>
                    </div>
                    
                    {/* SVG Bar Chart Overlay */}
                    <div className="w-full flex-1 flex items-end justify-between px-2 gap-4 pt-8 h-[120px]">
                        {savingsHistory.map((item, idx) => {
                            const percentHeight = maxSavings > 0 ? Math.round((item.savings / maxSavings) * 100) : 0;
                            const isCurrentMonth = idx === savingsHistory.length - 1;
                            const barBg = isCurrentMonth ? 'bg-[#0251CA]' : 'bg-[#E2E8F0]';
                            const shadowClass = isCurrentMonth ? 'shadow-[0_0_24px_rgba(2,81,202,0.4)]' : '';
                            const opacityClass = isCurrentMonth ? '' : 'opacity-70';
                            return (
                                <div 
                                    key={idx}
                                    title={`${item.label}: ৳${item.savings.toFixed(2)}`}
                                    className={`w-full ${barBg} ${shadowClass} ${opacityClass} rounded-t-xl transition-all duration-500`} 
                                    style={{ height: `${Math.max(percentHeight, 10)}%` }}
                                ></div>
                            );
                        })}
                    </div>
                    
                    <div className="flex justify-between w-full mt-4 px-2">
                        {savingsHistory.map((item, idx) => (
                            <span 
                                key={idx} 
                                className={`text-[10px] w-full text-center font-bold uppercase tracking-widest ${idx === savingsHistory.length - 1 ? 'text-[#0251CA]' : 'text-[#64748B]'}`}
                            >
                                {item.label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Links */}
            <div className="flex justify-end gap-6 mt-10 opacity-70">
                <a href="#" className="text-[10px] font-bold tracking-wider text-[#64748B] hover:text-[#1E293B]">System Status</a>
                <a href="#" className="text-[10px] font-bold tracking-wider text-[#64748B] hover:text-[#1E293B]">Privacy Policy</a>
                <a href="#" className="text-[10px] font-bold tracking-wider text-[#64748B] hover:text-[#1E293B]">Terms of Workspace</a>
            </div>

        </div>
    );
};

export default Insights;
