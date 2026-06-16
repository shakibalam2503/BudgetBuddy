import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

const Dashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: 'Alex' });
    const [data, setData] = useState({
        totalBalance: 0,
        monthlyAllowance: 0,
        expensesYTD: 0,
        remainingBudget: 0,
        todaySpending: 0,
        lastMonthExpense: 0,
        goals: [],
        categorySpends: []
    });
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

        const fetchDashboard = async () => {
            try {
                const response = await api.get('/api/dashboard');
                setData(response.data);
            } catch (err) {
                console.error("Error fetching dashboard data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, []);

    const {
        totalBalance,
        monthlyAllowance,
        expensesYTD,
        remainingBudget,
        todaySpending,
        lastMonthExpense,
        goals,
        categorySpends
    } = data;

    // Derived values
    const monthlyExpense = categorySpends.reduce((acc, c) => acc + c.amount, 0);
    const isOutflowExceeded = lastMonthExpense > 0 && monthlyExpense > lastMonthExpense;
    const totalBudgetLimit = remainingBudget + monthlyExpense;
    const utilizedPercent = totalBudgetLimit > 0 ? Math.round((monthlyExpense / totalBudgetLimit) * 100) : 0;
    const strokeDashoffset = 502.65 - (502.65 * Math.min(utilizedPercent, 100)) / 100;

    const remainingBudgetPercent = totalBudgetLimit > 0 ? Math.round((remainingBudget / totalBudgetLimit) * 100) : 100;

    const totalGoalTarget = goals.reduce((acc, g) => acc + parseFloat(g.target_amount || 0), 0);
    const totalGoalCurrent = goals.reduce((acc, g) => acc + parseFloat(g.current_amount || 0), 0);
    const goalPercent = totalGoalTarget > 0 ? Math.round((totalGoalCurrent / totalGoalTarget) * 100) : 0;

    const primaryGoal = goals.length > 0 ? goals[0] : null;
    const primaryGoalPercent = primaryGoal ? Math.round((parseFloat(primaryGoal.current_amount || 0) / parseFloat(primaryGoal.target_amount || 1)) * 100) : 0;

    const getCategoryColor = (cat) => {
        const colors = {
            Food: 'bg-[#EF4444]',
            Transport: 'bg-[#3B82F6]',
            Study: 'bg-[#F59E0B]',
            Entertainment: 'bg-[#10B981]',
            Housing: 'bg-[#6B7280]',
            Health: 'bg-[#EC4899]'
        };
        return colors[cat] || 'bg-[#8B5CF6]';
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
            {/* Top Bar / Header Section */}
            <header className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Good Morning, {user.name}</h2>
                    <p className="text-on-surface-variant font-medium mt-1">Here is what's happening with your academic budget today.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container">
                        <img alt="Student Profile Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0yqd9B3StoTF9KvVphgp4kiPbEQ8eqp3cGhLZMJe6SUKzYKGOrjLTHNelNABabZhUbfBiLA8lOovPXkXqMRKI6phWHN0ejH19PXuoNFzxhAr71MZpwh74FUOxx-BQrYyNcIDAyYz4XD3kFWb6b6QeI2vraV4MuoY91CI9lWIncoPYxNI5BeDJAqPQ26WWpBr0O1Q5ampsHBvKcH6hoCJJ2g-VgjF_fMH7RHRwnBB8KbbvhVvvDrLaDRjYNl73NzATX6rJUpwYuofE"/>
                    </div>
                </div>
            </header>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-8">
                {/* Hero Balance Card (Asymmetric Elongated Format) */}
                <div className={`col-span-8 bg-gradient-to-br ${isOutflowExceeded ? 'from-error to-error-container shadow-error/20 text-white' : 'from-primary to-primary-container shadow-primary/20 text-on-primary'} rounded-xl p-8 flex flex-col justify-between min-h-[280px] relative overflow-hidden shadow-2xl`}>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-container/20 rounded-full -ml-20 -mb-20 blur-2xl"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Total Balance</p>
                            <h3 className="font-headline text-6xl font-extrabold mt-2 tracking-tighter text-white">৳{totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
                            {isOutflowExceeded && (
                                <p className="text-xs font-bold text-white mt-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg w-fit">
                                    <span>⚠️ Outflow exceeds last month</span>
                                </p>
                            )}
                        </div>
                        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-md">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/90">Academic Year 24/25</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex gap-12 mt-auto">
                        <div>
                            <p className="text-xs font-medium opacity-70 mb-1">Monthly Allowance</p>
                            <p className="text-2xl font-bold">৳{monthlyAllowance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium opacity-70 mb-1">Expenses YTD</p>
                            <p className="text-2xl font-bold">৳{expensesYTD.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div className="ml-auto">
                            <button 
                                onClick={() => navigate('/dashboard/income')}
                                className="bg-white text-primary px-6 py-3 rounded-md font-bold text-sm shadow-lg hover:scale-105 transition-transform"
                            >
                                Add Funds
                            </button>
                        </div>
                    </div>
                </div>

                {/* Remaining Budget Card */}
                <div className="col-span-4 bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(40,43,81,0.06)] flex flex-col items-center justify-center text-center">
                    <div className={`w-16 h-16 ${remainingBudget >= 0 ? 'bg-secondary-container/20 text-secondary' : 'bg-error-container/20 text-error'} rounded-full flex items-center justify-center mb-4`}>
                        <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>
                            {remainingBudget >= 0 ? 'check_circle' : 'warning'}
                        </span>
                    </div>
                    <p className="text-on-surface-variant font-medium text-sm">Remaining Budget</p>
                    <h4 className={`font-headline text-4xl font-bold ${remainingBudget >= 0 ? 'text-on-surface' : 'text-error'} my-2`}>
                        ৳{remainingBudget.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </h4>
                    <div className={`${remainingBudget >= 0 ? 'bg-secondary-container' : 'bg-error-container'} px-3 py-1 rounded-full inline-flex items-center gap-1`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${remainingBudget >= 0 ? 'bg-secondary' : 'bg-error'}`}></span>
                        <span className={`text-[10px] font-extrabold ${remainingBudget >= 0 ? 'text-on-secondary-container' : 'text-on-error-container'} uppercase tracking-tight`}>
                            {remainingBudget >= 0 ? 'On Track' : 'Over Limit'}
                        </span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-6 leading-relaxed">
                        {remainingBudget >= 0 ? (
                            <span>Keep up the great work! You are staying within your allocated category limits.</span>
                        ) : (
                            <span>You have spent <span className="text-error font-bold">৳{Math.abs(remainingBudget).toFixed(2)}</span> more than your target monthly budget.</span>
                        )}
                    </p>
                </div>

                {/* Spending Visualization (Progress Ring) */}
                <div className="col-span-5 bg-surface-container-low rounded-xl p-8">
                    <div className="flex justify-between items-start mb-8">
                        <h5 className="font-headline text-xl font-bold text-on-surface">Your Spend In This Month</h5>
                        <button onClick={() => navigate('/dashboard/budget')} className="text-primary font-bold text-xs">View Report</button>
                    </div>
                    <div className="flex items-center justify-center py-4">
                        <div className="relative flex items-center justify-center">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="14"></circle>
                                <circle 
                                    className="text-primary transition-all duration-300" 
                                    cx="96" 
                                    cy="96" 
                                    fill="transparent" 
                                    r="80" 
                                    stroke="currentColor" 
                                    strokeDasharray="502.65" 
                                    strokeDashoffset={strokeDashoffset} 
                                    strokeLinecap="round" 
                                    strokeWidth="14"
                                ></circle>
                            </svg>
                            <div className="absolute text-center flex flex-col items-center justify-center">
                                <span className="text-3xl font-headline font-extrabold text-on-surface">{utilizedPercent}%</span>
                                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1">Utilized</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4 max-h-[160px] overflow-y-auto">
                        {categorySpends.length === 0 ? (
                            <p className="text-xs text-center text-on-surface-variant py-4">No spends recorded this month</p>
                        ) : (
                            categorySpends.map((cat, i) => (
                                <div key={i} className="flex justify-between items-center p-3 bg-surface-container-lowest rounded-md shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <span className={`w-3 h-3 rounded-full ${getCategoryColor(cat.category)}`}></span>
                                        <span className="text-sm font-medium">{cat.category}</span>
                                    </div>
                                    <span className="text-sm font-bold">৳{cat.amount.toFixed(2)}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Stats & Savings Goal */}
                <div className="col-span-7 space-y-8">
                    {/* Savings Goal Section */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(40,43,81,0.06)]">
                        {primaryGoal ? (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-tertiary-container/30 text-tertiary rounded-md flex items-center justify-center">
                                            <span className="material-symbols-outlined">
                                                {primaryGoal.name.toLowerCase().includes('trip') || primaryGoal.name.toLowerCase().includes('travel') ? 'flight_takeoff' : 'laptop_mac'}
                                            </span>
                                        </div>
                                        <div>
                                            <h5 className="font-bold text-on-surface">{primaryGoal.name}</h5>
                                            <p className="text-xs text-on-surface-variant">{primaryGoal.notes || 'Active Target Milestone'}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-on-surface">
                                            ৳{parseFloat(primaryGoal.current_amount || 0).toLocaleString()} / ৳{parseFloat(primaryGoal.target_amount || 0).toLocaleString()}
                                        </p>
                                        <p className="text-[10px] font-bold text-tertiary uppercase">{primaryGoalPercent}% Complete</p>
                                    </div>
                                </div>
                                <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                                    <div className="bg-gradient-to-r from-tertiary to-tertiary-fixed h-full rounded-full" style={{width: `${Math.min(primaryGoalPercent, 100)}%`}}></div>
                                </div>
                                <div className="mt-6 flex justify-between items-center text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                                    <span>Target date: {primaryGoal.target_date ? new Date(primaryGoal.target_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Flexible'}</span>
                                    <span>Priority Goal</span>
                                </div>
                            </>
                        ) : (
                            <div className="flex flex-col items-center py-6">
                                <span className="material-symbols-outlined text-4xl text-outline-variant mb-2">track_changes</span>
                                <p className="text-sm font-bold text-on-surface">No savings goals initiated</p>
                                <Link to="/dashboard/goals/add" className="text-xs font-bold text-primary hover:underline mt-2">Start a goal now</Link>
                            </div>
                        )}
                    </div>

                    {/* Monthly Balance Progress Widget */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(40,43,81,0.06)] mb-8">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h5 className="font-headline font-bold text-on-surface">Monthly Budget Progress</h5>
                                <p className="text-xs text-on-surface-variant mt-1">
                                    Tracking against ৳{totalBudgetLimit > 0 ? totalBudgetLimit.toLocaleString() : '5,000'} monthly limit
                                </p>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-headline font-extrabold text-primary">
                                    {Math.max(remainingBudgetPercent, 0)}%
                                </span>
                                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Remaining</p>
                            </div>
                        </div>
                        <div className="relative mb-6">
                            <div className="w-full bg-surface-container h-4 rounded-full overflow-hidden">
                                <div 
                                    className="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,80,212,0.3)]" 
                                    style={{width: `${Math.max(Math.min(remainingBudgetPercent, 100), 0)}%`}}
                                ></div>
                            </div>
                            {/* Decorative markers */}
                            <div className="absolute top-6 left-0 right-0 flex justify-between text-[10px] font-bold text-outline uppercase tracking-tighter">
                                <span>৳0.00</span>
                                <span>৳{(totalBudgetLimit / 2).toLocaleString()}</span>
                                <span>৳{totalBudgetLimit.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="mt-10 flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-sm">account_balance</span>
                                </div>
                                <span className="text-sm font-medium text-on-surface">Current Total Balance</span>
                            </div>
                            <span className="text-sm font-extrabold text-primary">৳{totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                        </div>
                    </div>

                    {/* Today's Spending and Top Category */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Today's Spending */}
                        <div className="bg-surface-container-low rounded-xl p-6">
                            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Today's Spending</p>
                            <div className="flex items-baseline gap-2 mb-2">
                                <h6 className="text-3xl font-headline font-bold text-on-surface">৳{todaySpending.toFixed(2)}</h6>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                                <span className="material-symbols-outlined text-sm">schedule</span>
                                <span>Realtime Ledger Sum</span>
                            </div>
                        </div>

                        {/* Top Category */}
                        <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between">
                            <div>
                                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Savings Target Progress</p>
                                <div className="flex justify-between items-end flex-wrap gap-2 mb-2">
                                    <h6 className="text-3xl font-headline font-bold text-on-surface leading-none">৳{totalGoalCurrent.toLocaleString()}</h6>
                                    <p className="text-xs font-bold text-on-surface-variant">of ৳{totalGoalTarget.toLocaleString()}</p>
                                </div>
                                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-3">
                                    <div className="bg-primary h-full rounded-full" style={{width: `${Math.min(goalPercent, 100)}%`}}></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-primary font-bold">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>{goalPercent}% of target reached</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
