import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Goals = () => {
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await api.get('/api/goals');
                setGoals(response.data);
            } catch (err) {
                console.error("Error fetching goals data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchGoals();
    }, []);

    // Helper to map icons based on goal names
    const getGoalIconInfo = (name = '') => {
        const n = name.toLowerCase();
        if (n.includes('laptop') || n.includes('mac') || n.includes('computer')) {
            return { icon: 'laptop_mac', bg: 'bg-[#EEF2FF]', color: 'text-[#5284FE]', stroke: '#5284FE' };
        }
        if (n.includes('trip') || n.includes('travel') || n.includes('flight') || n.includes('japan') || n.includes('summer')) {
            return { icon: 'flight_takeoff', bg: 'bg-[#ECFDF5]', color: 'text-[#10B981]', stroke: '#10B981' };
        }
        if (n.includes('car') || n.includes('ride') || n.includes('bike')) {
            return { icon: 'directions_car', bg: 'bg-[#FEF2F2]', color: 'text-[#EF4444]', stroke: '#EF4444' };
        }
        if (n.includes('sneaker') || n.includes('shoe') || n.includes('clothing') || n.includes('buy')) {
            return { icon: 'workspace_premium', bg: 'bg-[#A7F3D0]', color: 'text-[#059669]', stroke: '#059669' };
        }
        if (n.includes('book') || n.includes('study') || n.includes('semester') || n.includes('education')) {
            return { icon: 'menu_book', bg: 'bg-[#EDE9FE]', color: 'text-[#7C3AED]', stroke: '#7C3AED' };
        }
        return { icon: 'savings', bg: 'bg-[#FFF7ED]', color: 'text-[#F97316]', stroke: '#F97316' };
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-[#5284FE] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    // Calculations
    const activeGoals = goals.filter(g => parseFloat(g.current_amount) < parseFloat(g.target_amount));
    const completedGoals = goals.filter(g => parseFloat(g.current_amount) >= parseFloat(g.target_amount));

    const totalActiveTarget = activeGoals.reduce((sum, g) => sum + parseFloat(g.target_amount), 0);
    
    const totalGoalTarget = goals.reduce((acc, g) => acc + parseFloat(g.target_amount), 0);
    const totalGoalCurrent = goals.reduce((acc, g) => acc + parseFloat(g.current_amount), 0);
    const totalPercent = totalGoalTarget > 0 ? Math.round((totalGoalCurrent / totalGoalTarget) * 100) : 0;
    
    // Circle SVG calculation: 42 radius = 263.89 circumference
    const strokeDasharray = "263.89";
    const strokeDashoffset = totalGoalTarget > 0 ? 263.89 - (263.89 * Math.min(totalPercent, 100)) / 100 : 263.89;

    return (
        <div className="relative font-body">
            {/* Header Section */}
            <header className="flex justify-between items-end mb-10 pl-1">
                <div>
                    <h2 className="font-headline text-[32px] font-extrabold tracking-tight text-on-surface">Financial Goals</h2>
                    <p className="text-on-surface-variant font-medium mt-1">Set and track milestones for your academic and personal journey.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden outline outline-2 outline-[#CBD5E1] cursor-pointer hover:opacity-90 transition-opacity">
                        <img alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0yqd9B3StoTF9KvVphgp4kiPbEQ8eqp3cGhLZMJe6SUKzYKGOrjLTHNelNABabZhUbfBiLA8lOovPXkXqMRKI6phWHN0ejH19PXuoNFzxhAr71MZpwh74FUOxx-BQrYyNcIDAyYz4XD3kFWb6b6QeI2vraV4MuoY91CI9lWIncoPYxNI5BeDJAqPQ26WWpBr0O1Q5ampsHBvKcH6hoCJJ2g-VgjF_fMH7RHRwnBB8KbbvhVvvDrLaDRjYNl73NzATX6rJUpwYuofE" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </header>

            {/* Hero Banner */}
            <div className="bg-gradient-to-r from-[#4A85F6] to-[#5284FE] rounded-[24px] p-10 text-white flex justify-between items-center mb-12 w-full overflow-hidden shadow-[0_12px_24px_rgba(82,132,254,0.25)] flex-col lg:flex-row gap-8 relative">
                <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="flex-1 relative z-10 w-full">
                    <div className="inline-flex items-center justify-center bg-white/20 px-3.5 py-1.5 rounded-full mb-5 border border-white/10 backdrop-blur-md">
                        <span className="text-[10px] font-bold tracking-[0.1em] uppercase">Active Momentum</span>
                    </div>
                    <h2 className="font-headline text-[48px] font-extrabold leading-none mb-3.5 tracking-tight drop-shadow-sm">{activeGoals.length} Active {activeGoals.length === 1 ? 'Goal' : 'Goals'}</h2>
                    <p className="text-white/80 font-medium text-[15px] max-w-md leading-relaxed">
                        You're on track to save <span className="text-white font-extrabold">৳{totalActiveTarget.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span> this semester. Keep the focus, Scholar.
                    </p>
                </div>
                
                {/* Total Progress Box */}
                <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-[20px] p-7 w-full lg:w-auto lg:min-w-[300px] relative z-10 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                    <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80 mb-2">Total Progress</div>
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="font-headline text-[40px] font-extrabold leading-none drop-shadow-md">{totalPercent}%</span>
                        <span className="text-white/70 text-[12px] font-semibold">Saved overall</span>
                    </div>
                    <div className="w-full bg-white/10 border border-white/5 h-[10px] rounded-full overflow-hidden flex">
                        <div className="bg-[#69F6B8] h-full shadow-[0_0_12px_rgba(105,246,184,0.6)]" style={{width: `${totalPercent}%`}}></div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10">
                
                {/* Left Column - Current Ambitions */}
                <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                    <div className="flex justify-between items-end mb-2 pr-2">
                        <h3 className="font-headline text-[22px] font-bold text-[#1E293B]">Current Ambitions</h3>
                    </div>

                    {/* Active Goals List */}
                    {activeGoals.length === 0 ? (
                        <div className="bg-white rounded-[24px] p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#F1F5F9] text-center">
                            <span className="material-symbols-outlined text-4xl text-[#94A3B8] mb-3">track_changes</span>
                            <h4 className="font-headline font-bold text-[16px] text-[#1E293B]">No Active Goals</h4>
                            <p className="text-[13px] text-[#64748B] font-medium mt-1">Ready to start saving? Create your first goal below.</p>
                        </div>
                    ) : (
                        activeGoals.map((g) => {
                            const iconInfo = getGoalIconInfo(g.name);
                            const completionRate = Math.round((g.current_amount / g.target_amount) * 100);
                            return (
                                <div key={g.id} className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#F1F5F9] relative group hover:border-[#E2E8F0] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300">
                                    <div className="flex items-center gap-5 mb-8">
                                        <div className={`w-14 h-14 rounded-[16px] ${iconInfo.bg} ${iconInfo.color} flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300`}>
                                            <span className="material-symbols-outlined text-[26px]">{iconInfo.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-headline font-bold text-[19px] text-[#1E293B] mb-0.5">{g.name}</h4>
                                            <p className="text-[13px] text-[#64748B] font-medium">{g.notes || 'Target Milestone'}</p>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-end mb-4 px-1">
                                        <div>
                                            <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] mb-1.5">Saved So Far</div>
                                            <div className={`font-headline text-[32px] font-extrabold ${iconInfo.color} leading-none`}>৳{parseFloat(g.current_amount).toLocaleString()}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] mb-1.5">Target</div>
                                            <div className="font-headline text-[19px] font-bold text-[#475569] leading-none">৳{parseFloat(g.target_amount).toLocaleString()}</div>
                                        </div>
                                    </div>

                                    <div className="w-full bg-[#E2E8F0] h-[10px] rounded-full overflow-hidden mb-8 shadow-inner">
                                        <div className={`h-full rounded-r-full`} style={{width: `${Math.min(completionRate, 100)}%`, backgroundColor: iconInfo.stroke}}></div>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <div className="bg-[#A7F3D0] text-[#065F46] text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm ring-1 ring-black/5">
                                            {completionRate}% Complete
                                        </div>
                                        <Link to="/dashboard/goals/add-savings" className="bg-[#5284FE] text-white text-[13px] font-bold px-5 py-2.5 rounded-[12px] shadow-[0_6px_16px_rgba(82,132,254,0.3)] hover:bg-[#3B72E0] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#5284FE] focus:ring-offset-2">
                                            <span className="material-symbols-outlined text-[18px]">add</span> Add Savings
                                        </Link>
                                    </div>
                                </div>
                            );
                        })
                    )}

                    {/* Initiate New Goal Button */}
                    <Link to="/dashboard/goals/add" className="bg-[#F8FAFC] rounded-[24px] p-8 border-[2px] border-dashed border-[#CBD5E1] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#94A3B8] hover:bg-[#F1F5F9] transition-all h-[180px] group w-full block outline-none focus:ring-2 focus:ring-[#5284FE] focus:ring-offset-2">
                        <div className="w-12 h-12 rounded-full bg-white text-[#5284FE] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-[24px] font-bold">add</span>
                        </div>
                        <div className="text-center">
                            <h4 className="font-headline font-bold text-[16px] text-[#1E293B]">Initiate New Goal</h4>
                            <p className="text-[12px] text-[#64748B] font-medium mt-1">Define your next academic milestone</p>
                        </div>
                    </Link>
                </div>

                {/* Right Column - Side Widgets */}
                <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                    
                    {/* Ring Chart Widget */}
                    <div className="bg-[#F8FAFC] rounded-[32px] p-10 pt-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#F1F5F9] flex flex-col items-center">
                        <div className="w-full flex items-center gap-2 mb-10 pl-2">
                            <span className="material-symbols-outlined text-[#5284FE] text-[20px]">calendar_today</span>
                            <h4 className="font-headline font-bold text-[#1E293B] text-[16px]">Total savings Goal</h4>
                        </div>
                        
                        <div className="relative w-44 h-44 mb-10">
                            <div className="absolute inset-2 rounded-full shadow-[inset_0_4px_16px_rgba(0,0,0,0.05)] bg-[#F8FAFC]"></div>
                            
                            <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                                <circle 
                                    cx="50" cy="50" r="42" 
                                    className="text-[#E2E8F0]" 
                                    strokeWidth="8" fill="none" stroke="currentColor"
                                />
                                <circle 
                                    cx="50" cy="50" r="42" 
                                    className="text-[#5284FE] transition-all duration-500" 
                                    strokeWidth="8" fill="none" stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeDasharray={strokeDasharray} 
                                    strokeDashoffset={strokeDashoffset} 
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                                <span className="font-headline text-[28px] font-extrabold text-[#5284FE] leading-none mb-1.5 drop-shadow-sm">{totalPercent}%</span>
                                <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Complete</span>
                            </div>
                        </div>

                        <div className="text-center w-full px-4">
                            <div className="flex items-end justify-center gap-2 mb-2">
                                <span className="font-headline text-[32px] font-extrabold text-[#1E293B] leading-none">৳{totalGoalCurrent.toLocaleString()}</span>
                                <span className="text-[14px] text-[#64748B] font-bold mb-1">/ ৳{totalGoalTarget.toLocaleString()}</span>
                            </div>
                            <p className="text-[12px] text-[#64748B] leading-relaxed font-medium">
                                You've reached {totalPercent}% of your total target goals! Keep the habit.
                            </p>
                        </div>
                    </div>

                    {/* Academic Wins (Completed Goals) */}
                    <div className="mt-4 px-2">
                        <h4 className="font-headline font-bold text-[18px] text-[#1E293B] mb-8 pl-1">Academic Wins</h4>
                        
                        <div className="relative pl-[38px] space-y-6">
                            {/* Vertical Connecting Line */}
                            <div className="absolute left-[20px] top-[10px] bottom-[10px] w-[2px] bg-[#E2E8F0] z-0"></div>
                            
                            {completedGoals.length === 0 ? (
                                <div className="bg-white rounded-[16px] p-6 text-center shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-[#F1F5F9] w-full">
                                    <p className="text-[12px] text-[#64748B] font-medium">No completed goals yet. Keep saving to reach your milestones!</p>
                                </div>
                            ) : (
                                completedGoals.map((cg) => {
                                    const iconInfo = getGoalIconInfo(cg.name);
                                    return (
                                        <div key={cg.id} className="relative z-10 flex gap-4 items-center">
                                            <div className={`absolute -left-[38px] w-10 h-10 rounded-full ${iconInfo.bg} ${iconInfo.color} flex items-center justify-center shrink-0 shadow-sm border-4 border-[#F8F5FF]`}>
                                                <span className="material-symbols-outlined text-[20px]">{iconInfo.icon}</span>
                                            </div>
                                            <div className="bg-white rounded-[16px] p-5 flex-1 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-[#F1F5F9] flex justify-between items-center group hover:border-[#E2E8F0] hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all">
                                                <div>
                                                    <h5 className="font-bold text-[#1E293B] text-[13px] mb-1">{cg.name}</h5>
                                                    <p className="text-[11px] text-[#64748B] font-medium">Saved ৳{parseFloat(cg.target_amount).toLocaleString()} total</p>
                                                </div>
                                                <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest bg-[#F1F5F9] px-2 py-1 rounded-sm">Completed</span>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Total Savings Dark Card */}
                    <div className="bg-[#171A21] rounded-[24px] p-8 text-white relative overflow-hidden mt-6 shadow-[0_16px_32px_rgba(23,26,33,0.3)] min-h-[220px]">
                        <span className="material-symbols-outlined absolute -bottom-6 -right-4 text-[140px] text-white/5 pointer-events-none transform -rotate-12">account_balance_wallet</span>
                        
                        <div className="flex justify-between items-start mb-14 relative z-10">
                            <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                                <span className="material-symbols-outlined text-[20px] text-white/90">account_balance_wallet</span>
                            </div>
                        </div>
                        
                        <div className="relative z-10 w-full flex flex-col">
                            <p className="text-[13px] font-medium text-white/70 tracking-wide mb-2">Total Savings</p>
                            <h3 className="font-headline text-[38px] font-extrabold leading-none tracking-tight mb-4 drop-shadow-md">
                                ৳{totalGoalCurrent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </h3>
                            
                            <div className="flex items-center gap-1.5 text-[#69F6B8] text-[11px] font-medium">
                                <span className="material-symbols-outlined text-[16px] font-bold">trending_up</span>
                                +12% from last month
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Goals;
