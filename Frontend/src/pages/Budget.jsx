import React from 'react';
import { useNavigate } from 'react-router-dom';

const Budget = () => {
    const navigate = useNavigate();
    return (
        <div className="relative font-body">
            {/* Header Section */}
            <header className="flex justify-between items-end mb-10 pl-1">
                <div>
                    <h2 className="font-headline text-[32px] font-extrabold tracking-tight text-on-surface">Budgets</h2>
                    <p className="text-on-surface-variant font-medium mt-1">Manage your academic and lifestyle spending.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F3F4FB] text-[#71749E] hover:text-[#0050D4] transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
                    <div className="w-12 h-12 rounded-full overflow-hidden outline outline-2 outline-[#CBD5E1] cursor-pointer">
                        <img alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0yqd9B3StoTF9KvVphgp4kiPbEQ8eqp3cGhLZMJe6SUKzYKGOrjLTHNelNABabZhUbfBiLA8lOovPXkXqMRKI6phWHN0ejH19PXuoNFzxhAr71MZpwh74FUOxx-BQrYyNcIDAyYz4XD3kFWb6b6QeI2vraV4MuoY91CI9lWIncoPYxNI5BeDJAqPQ26WWpBr0O1Q5ampsHBvKcH6hoCJJ2g-VgjF_fMH7RHRwnBB8KbbvhVvvDrLaDRjYNl73NzATX6rJUpwYuofE" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </header>

            {/* Total Budget Hero Card */}
            <div className="bg-[#0D47A1] rounded-[24px] p-10 flex text-white relative shadow-2xl justify-between items-center mb-10 w-full overflow-hidden">
                <div className="relative z-10 flex-1">
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-4 text-white/80">Total Monthly Budget</p>
                    <h3 className="font-headline text-[64px] font-extrabold leading-none mb-10 text-white">$5,000.00</h3>
                    
                    <div className="flex justify-between text-sm font-bold w-full max-w-lg mb-2">
                        <span className="text-white/90">Spent: $4,250.00</span>
                        <span>85%</span>
                    </div>
                    <div className="w-full max-w-lg bg-[#003180] h-3 rounded-full overflow-hidden">
                        <div className="h-full bg-[#69F6B8] rounded-full" style={{width: "85%"}}></div>
                    </div>
                </div>
                <div className="relative z-10 flex flex-col gap-4">
                    <button className="bg-white text-[#0D47A1] px-8 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.03] transition-transform">
                        <span className="material-symbols-outlined text-[18px]">edit_square</span> Set Budget
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-8 py-3.5 rounded-xl font-bold transition-colors">
                        Monthly Report
                    </button>
                </div>
            </div>

            {/* Category Breakdown Header */}
            <div className="flex justify-between items-center mb-6 pl-1 pr-1">
                <h3 className="font-headline text-[22px] font-bold text-[#1E293B]">Category Breakdown</h3>
                <div className="flex items-center gap-6">
                    <div className="flex gap-2">
                        <button className="w-9 h-9 rounded-lg bg-[#EBF0FF] text-[#0050D4] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">grid_view</span>
                        </button>
                        <button className="w-9 h-9 rounded-lg text-[#94A3B8] hover:bg-[#F1F5F9] hover:text-[#475569] flex items-center justify-center transition-colors">
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

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Food & Drink */}
                <div className="bg-[#F8FAFC] rounded-[20px] p-6 relative">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-[12px] bg-[#FDE8E8] text-[#E02424] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">restaurant</span>
                        </div>
                        <div className="bg-[#FCA5A5] text-[#7F1D1D] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest leading-relaxed">Exceeded</div>
                    </div>
                    <h4 className="font-headline font-bold text-[17px] text-[#1E293B] mb-1">Food & Drink</h4>
                    <p className="text-[11px] text-[#64748B] font-medium leading-tight h-8">Monthly Grocery <br/>& Dining</p>
                    
                    <div className="flex justify-between items-end mt-6 mb-2.5">
                        <span className="text-[20px] font-bold text-[#E02424]">$3,150</span>
                        <span className="text-[11px] text-[#64748B] font-semibold">of $3,000</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-[7px] rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-[#E02424] rounded-full" style={{width: "100%"}}></div>
                    </div>
                    <p className="text-[11px] text-[#E02424] font-bold flex items-center gap-1.5 align-middle">
                        <span className="material-symbols-outlined text-[12px] font-bold mb-[1px]">warning</span> $150 over your limit
                    </p>
                </div>

                {/* Transport */}
                <div className="bg-[#F8FAFC] rounded-[20px] p-6 relative">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-[12px] bg-[#E0E7FF] text-[#4F46E5] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">directions_bus</span>
                        </div>
                        <div className="bg-[#A7F3D0] text-[#065F46] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest leading-relaxed">On Track</div>
                    </div>
                    <h4 className="font-headline font-bold text-[17px] text-[#1E293B] mb-1">Transport</h4>
                    <p className="text-[11px] text-[#64748B] font-medium leading-tight h-8">Commute & Travel</p>
                    
                    <div className="flex justify-between items-end mt-6 mb-2.5">
                        <span className="text-[20px] font-bold text-[#1E293B]">$640</span>
                        <span className="text-[11px] text-[#64748B] font-semibold">of $1,000</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-[7px] rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-[#4F46E5] rounded-full" style={{width: "64%"}}></div>
                    </div>
                    <p className="text-[11px] text-[#475569] font-medium flex items-center gap-1.5 align-middle">
                        <span className="material-symbols-outlined text-[12px] font-bold mb-[1px]">check_circle</span> $360 remaining
                    </p>
                </div>

                {/* Study */}
                <div className="bg-[#F8FAFC] rounded-[20px] p-6 relative">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-[12px] bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">menu_book</span>
                        </div>
                        <div className="bg-[#FDE047] text-[#854D0E] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest leading-relaxed">Critical</div>
                    </div>
                    <h4 className="font-headline font-bold text-[17px] text-[#1E293B] mb-1">Study</h4>
                    <p className="text-[11px] text-[#64748B] font-medium leading-tight h-8">Books & Course <br/>Material</p>
                    
                    <div className="flex justify-between items-end mt-6 mb-2.5">
                        <span className="text-[20px] font-bold text-[#D97706]">$475</span>
                        <span className="text-[11px] text-[#64748B] font-semibold">of $500</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-[7px] rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-[#F59E0B] rounded-full" style={{width: "95%"}}></div>
                    </div>
                    <p className="text-[11px] text-[#D97706] font-bold flex items-center gap-1.5 align-middle">
                        <span className="material-symbols-outlined text-[12px] font-bold mb-[1px]">schedule</span> 95% reached
                    </p>
                </div>

                {/* Entertainment */}
                <div className="bg-[#F8FAFC] rounded-[20px] p-6 relative">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-[12px] bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">sports_esports</span>
                        </div>
                        <div className="bg-[#A7F3D0] text-[#065F46] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-widest leading-relaxed">On Track</div>
                    </div>
                    <h4 className="font-headline font-bold text-[17px] text-[#1E293B] mb-1">Entertainment</h4>
                    <p className="text-[11px] text-[#64748B] font-medium leading-tight h-8">Events & Hobbies</p>
                    
                    <div className="flex justify-between items-end mt-6 mb-2.5">
                        <span className="text-[20px] font-bold text-[#1E293B]">$120</span>
                        <span className="text-[11px] text-[#64748B] font-semibold">of $500</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-[7px] rounded-full overflow-hidden mb-3">
                        <div className="h-full bg-[#16A34A] rounded-full" style={{width: "24%"}}></div>
                    </div>
                    <p className="text-[11px] text-[#475569] font-medium flex items-center gap-1.5 align-middle">
                        <span className="material-symbols-outlined text-[12px] font-bold mb-[1px]">check_circle</span> Healthy balance
                    </p>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10">
                {/* Graph Area */}
                <div className="md:col-span-8 bg-[#F8FAFC] rounded-[24px] p-8 pt-10 relative">
                    <div className="flex justify-between items-center mb-10">
                        <h4 className="font-headline text-[18px] font-bold text-[#1E293B]">Weekly Spending Trend</h4>
                        <div className="flex gap-4">
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#64748B]"><span className="w-2.5 h-2.5 rounded-full bg-[#0050D4]"></span> Current</div>
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#94A3B8]"><span className="w-2.5 h-2.5 rounded-full bg-[#A7AAD7]"></span> Previous</div>
                        </div>
                    </div>
                    {/* Mock Line Chart */}
                    <div className="w-full h-56 relative border-b border-[#E2E8F0] flex items-end">
                        <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                            <path d="M 0,200 L 0,160 L 150,80 L 300,120 L 450,40 L 600,160 L 800,180 L 800,200 Z" fill="url(#blue-grad)" opacity="1" />
                            <path d="M 0,160 L 150,80 L 300,120 L 450,40 L 600,160 L 800,180" fill="none" stroke="#0050D4" strokeWidth="4" />
                            <path d="M 0,180 L 150,170 L 300,140 L 450,150 L 600,120 L 800,140" fill="none" stroke="#A7AAD7" strokeWidth="3" strokeDasharray="6 6" />
                            
                            {/* Interactive Data Nodes */}
                            <circle cx="150" cy="80" r="4.5" fill="white" stroke="#0050D4" strokeWidth="3" className="cursor-pointer hover:r-[6]" />
                            <circle cx="450" cy="40" r="4.5" fill="#E02424" stroke="white" strokeWidth="2.5" className="cursor-pointer hover:r-[6]" />
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
                
                {/* Right Side: Smart Insights */}
                <div className="md:col-span-4 bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#F1F5F9]">
                    <h4 className="font-headline text-[18px] font-bold text-[#1E293B] mb-6">Smart Insights</h4>
                    
                    <div className="bg-[#FFF1F2] rounded-r-[16px] rounded-l-sm border-l-[4px] border-[#E11D48] p-5 mb-5 shadow-[0_2px_10px_rgba(225,29,72,0.05)]">
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-[#E11D48] text-[20px] mt-0.5">trending_up</span>
                            <div>
                                <h5 className="font-bold text-[#111827] text-[13px] mb-1.5">Spending Alert</h5>
                                <p className="text-[11.5px] text-[#4B5563] leading-relaxed font-medium">Food spending is 20% higher than last month. Consider cooking at home this week.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-[#F0FDF4] rounded-r-[16px] rounded-l-sm border-l-[4px] border-[#16A34A] p-5 shadow-[0_2px_10px_rgba(22,163,74,0.05)]">
                        <div className="flex gap-4">
                            <span className="material-symbols-outlined text-[#16A34A] text-[20px] mt-0.5">savings</span>
                            <div>
                                <h5 className="font-bold text-[#111827] text-[13px] mb-1.5">Saving Goal</h5>
                                <p className="text-[11.5px] text-[#4B5563] leading-relaxed font-medium">You're on track to save $250 for your graduation fund this semester.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Budget;
