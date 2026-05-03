import React from 'react';

const Goals = () => {
    return (
        <div className="relative font-body">
            {/* Header Section */}
            <header className="flex justify-end items-center mb-8 pl-1">
                <div className="flex items-center gap-4">
                    <button className="w-12 h-12 flex items-center justify-center rounded-full bg-[#F3F4FB] text-[#71749E] hover:text-[#0050D4] transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                    </button>
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
                    <h2 className="font-headline text-[48px] font-extrabold leading-none mb-3.5 tracking-tight drop-shadow-sm">3 Active Goals</h2>
                    <p className="text-white/80 font-medium text-[15px] max-w-md leading-relaxed">
                        You're on track to save <span className="text-white font-extrabold">$12,450</span> this semester. Keep the focus, Scholar.
                    </p>
                </div>
                
                {/* Total Progress Box */}
                <div className="bg-white/10 border border-white/20 backdrop-blur-md rounded-[20px] p-7 w-full lg:w-auto lg:min-w-[300px] relative z-10 shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
                    <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/80 mb-2">Total Progress</div>
                    <div className="flex items-baseline gap-2 mb-4">
                        <span className="font-headline text-[40px] font-extrabold leading-none drop-shadow-md">48%</span>
                        <span className="text-white/70 text-[12px] font-semibold">Saved overall</span>
                    </div>
                    <div className="w-full bg-white/10 border border-white/5 h-[10px] rounded-full overflow-hidden flex">
                        <div className="bg-[#69F6B8] h-full shadow-[0_0_12px_rgba(105,246,184,0.6)]" style={{width: "48%"}}></div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-10">
                
                {/* Left Column - Current Ambitions */}
                <div className="lg:col-span-7 flex flex-col gap-6 w-full">
                    <div className="flex justify-between items-end mb-2 pr-2">
                        <h3 className="font-headline text-[22px] font-bold text-[#1E293B]">Current Ambitions</h3>
                        <a href="#" className="flex items-center gap-1.5 text-[12px] font-bold text-[#5284FE] hover:text-[#3B72E0] transition-colors py-1">
                            View All <span className="material-symbols-outlined text-[16px] font-bold">arrow_forward</span>
                        </a>
                    </div>

                    {/* Goal Card 1: Laptop */}
                    <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#F1F5F9] relative group hover:border-[#E2E8F0] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300">
                        <div className="absolute right-6 top-6 text-[#94A3B8] cursor-pointer hover:text-[#475569] transition-colors">
                            <span className="material-symbols-outlined text-[24px]">more_horiz</span>
                        </div>
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-14 h-14 rounded-[16px] bg-[#EEF2FF] text-[#5284FE] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                                <span className="material-symbols-outlined text-[26px]">laptop_mac</span>
                            </div>
                            <div>
                                <h4 className="font-headline font-bold text-[19px] text-[#1E293B] mb-0.5">Buy Laptop</h4>
                                <p className="text-[13px] text-[#64748B] font-medium">New MacBook Pro M3</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-4 px-1">
                            <div>
                                <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] mb-1.5">Saved So Far</div>
                                <div className="font-headline text-[32px] font-extrabold text-[#5284FE] leading-none">$700</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] mb-1.5">Target</div>
                                <div className="font-headline text-[19px] font-bold text-[#475569] leading-none">$1500</div>
                            </div>
                        </div>

                        <div className="w-full bg-[#E2E8F0] h-[10px] rounded-full overflow-hidden mb-8 shadow-inner">
                            <div className="bg-[#5284FE] h-full rounded-r-full shadow-[0_0_12px_rgba(82,132,254,0.4)]" style={{width: "46%"}}></div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="bg-[#A7F3D0] text-[#065F46] text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider backdrop-blur-sm shadow-sm ring-1 ring-black/5">
                                65% Complete
                            </div>
                            <button className="bg-[#5284FE] text-white text-[13px] font-bold px-5 py-2.5 rounded-[12px] shadow-[0_6px_16px_rgba(82,132,254,0.3)] hover:bg-[#3B72E0] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px]">add</span> Add Savings
                            </button>
                        </div>
                    </div>

                    {/* Goal Card 2: Summer Trip */}
                    <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#F1F5F9] relative group hover:border-[#E2E8F0] hover:shadow-[0_8px_32px_rgba(0,0,0,0.04)] transition-all duration-300">
                        <div className="absolute right-6 top-6 text-[#94A3B8] cursor-pointer hover:text-[#475569] transition-colors">
                            <span className="material-symbols-outlined text-[24px]">more_horiz</span>
                        </div>
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-14 h-14 rounded-[16px] bg-[#ECFDF5] text-[#10B981] flex items-center justify-center transform group-hover:scale-105 transition-transform duration-300">
                                <span className="material-symbols-outlined text-[26px]">flight_takeoff</span>
                            </div>
                            <div>
                                <h4 className="font-headline font-bold text-[19px] text-[#1E293B] mb-0.5">Summer Trip</h4>
                                <p className="text-[13px] text-[#64748B] font-medium">Japan Exploration 2024</p>
                            </div>
                        </div>

                        <div className="flex justify-between items-end mb-4 px-1">
                            <div>
                                <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] mb-1.5">Saved So Far</div>
                                <div className="font-headline text-[32px] font-extrabold text-[#10B981] leading-none">$1,000</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-[0.1em] mb-1.5">Target</div>
                                <div className="font-headline text-[19px] font-bold text-[#475569] leading-none">$5,000</div>
                            </div>
                        </div>

                        <div className="w-full bg-[#E2E8F0] h-[10px] rounded-full overflow-hidden mb-8 shadow-inner">
                            <div className="bg-[#10B981] h-full rounded-r-full shadow-[0_0_12px_rgba(16,185,129,0.4)]" style={{width: "20%"}}></div>
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="bg-[#E2E8F0] text-[#475569] text-[11px] font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm ring-1 ring-black/5">
                                20% Complete
                            </div>
                            <button className="bg-[#5284FE] text-white text-[13px] font-bold px-5 py-2.5 rounded-[12px] shadow-[0_6px_16px_rgba(82,132,254,0.3)] hover:bg-[#3B72E0] hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-[18px]">add</span> Add Savings
                            </button>
                        </div>
                    </div>

                    {/* Initiate New Goal */}
                    <div className="bg-[#F8FAFC] rounded-[24px] p-8 border-[2px] border-dashed border-[#CBD5E1] flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#94A3B8] hover:bg-[#F1F5F9] transition-all h-[180px] group w-full">
                        <div className="w-12 h-12 rounded-full bg-white text-[#5284FE] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300">
                            <span className="material-symbols-outlined text-[24px] font-bold">add</span>
                        </div>
                        <div className="text-center">
                            <h4 className="font-headline font-bold text-[16px] text-[#1E293B]">Initiate New Goal</h4>
                            <p className="text-[12px] text-[#64748B] font-medium mt-1">Define your next academic milestone</p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Side Widgets */}
                <div className="lg:col-span-5 flex flex-col gap-6 w-full">
                    
                    {/* Ring Chart Widget */}
                    <div className="bg-[#F8FAFC] rounded-[32px] p-10 pt-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#F1F5F9] flex flex-col items-center">
                        <div className="w-full flex items-center gap-2 mb-10 pl-2">
                            <span className="material-symbols-outlined text-[#5284FE] text-[20px]">calendar_today</span>
                            <h4 className="font-headline font-bold text-[#1E293B] text-[16px]">This Month's Saving Goal</h4>
                        </div>
                        
                        <div className="relative w-44 h-44 mb-10">
                            {/* Inner glow circle for better neumorphism/depth */}
                            <div className="absolute inset-2 rounded-full shadow-[inset_0_4px_16px_rgba(0,0,0,0.05)] bg-[#F8FAFC]"></div>
                            
                            <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 100 100">
                                {/* Background circle */}
                                <circle 
                                    cx="50" cy="50" r="42" 
                                    className="text-[#E2E8F0]" 
                                    strokeWidth="8" fill="none" stroke="currentColor"
                                />
                                {/* Progress circle */}
                                <circle 
                                    cx="50" cy="50" r="42" 
                                    className="text-[#5284FE]" 
                                    strokeWidth="8" fill="none" stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeDasharray="263.89" 
                                    strokeDashoffset="137.22" /* 48% completion of 263.89 */
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
                                <span className="font-headline text-[28px] font-extrabold text-[#5284FE] leading-none mb-1.5 drop-shadow-sm">48%</span>
                                <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-[0.15em]">Complete</span>
                            </div>
                        </div>

                        <div className="text-center w-full px-4">
                            <div className="flex items-end justify-center gap-2 mb-2">
                                <span className="font-headline text-[32px] font-extrabold text-[#1E293B] leading-none">$1,200</span>
                                <span className="text-[14px] text-[#64748B] font-bold mb-1">/ $2,500</span>
                            </div>
                            <p className="text-[12px] text-[#64748B] leading-relaxed font-medium">
                                You've reached nearly half your target for October!
                            </p>
                        </div>
                    </div>

                    {/* Academic Wins */}
                    <div className="mt-4 px-2">
                        <h4 className="font-headline font-bold text-[18px] text-[#1E293B] mb-8 pl-1">Academic Wins</h4>
                        
                        <div className="relative pl-[38px] space-y-6">
                            {/* Vertical Connecting Line */}
                            <div className="absolute left-[20px] top-[10px] bottom-[10px] w-[2px] bg-[#E2E8F0] z-0"></div>
                            
                            {/* Win 1 */}
                            <div className="relative z-10 flex gap-4 items-center">
                                <div className="absolute -left-[38px] w-10 h-10 rounded-full bg-[#A7F3D0] text-[#059669] flex items-center justify-center shrink-0 shadow-sm border-4 border-[#F8F5FF]">
                                    <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                                </div>
                                <div className="bg-white rounded-[16px] p-5 flex-1 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-[#F1F5F9] flex justify-between items-center group hover:border-[#E2E8F0] hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all">
                                    <div>
                                        <h5 className="font-bold text-[#1E293B] text-[13px] mb-1">New Sneakers</h5>
                                        <p className="text-[11px] text-[#64748B] font-medium">Saved $150 in 3 weeks</p>
                                    </div>
                                    <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest bg-[#F1F5F9] px-2 py-1 rounded-sm">Completed</span>
                                </div>
                            </div>
                            
                            {/* Win 2 */}
                            <div className="relative z-10 flex gap-4 items-center">
                                <div className="absolute -left-[38px] w-10 h-10 rounded-full bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center shrink-0 shadow-sm border-4 border-[#F8F5FF]">
                                    <span className="material-symbols-outlined text-[18px]">menu_book</span>
                                </div>
                                <div className="bg-white rounded-[16px] p-5 flex-1 shadow-[0_4px_16px_rgba(0,0,0,0.02)] border border-[#F1F5F9] flex justify-between items-center group hover:border-[#E2E8F0] hover:shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all">
                                    <div>
                                        <h5 className="font-bold text-[#1E293B] text-[13px] mb-1">Semester Textbooks</h5>
                                        <p className="text-[11px] text-[#64748B] font-medium">Saved $800 total</p>
                                    </div>
                                    <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest bg-[#F1F5F9] px-2 py-1 rounded-sm">Aug 2023</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total Savings Dark Card */}
                    <div className="bg-[#171A21] rounded-[24px] p-8 text-white relative overflow-hidden mt-6 shadow-[0_16px_32px_rgba(23,26,33,0.3)] min-h-[220px]">
                        {/* Background subtle icon */}
                        <span className="material-symbols-outlined absolute -bottom-6 -right-4 text-[140px] text-white/5 pointer-events-none transform -rotate-12">account_balance_wallet</span>
                        
                        <div className="flex justify-between items-start mb-14 relative z-10">
                            <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                                <span className="material-symbols-outlined text-[20px] text-white/90">account_balance_wallet</span>
                            </div>
                            <button className="text-white/40 hover:text-white transition-colors p-1">
                                <span className="material-symbols-outlined text-[20px]">sync</span>
                            </button>
                        </div>
                        
                        <div className="relative z-10 w-full flex flex-col">
                            <p className="text-[13px] font-medium text-white/70 tracking-wide mb-2">Total Savings</p>
                            <h3 className="font-headline text-[38px] font-extrabold leading-none tracking-tight mb-4 drop-shadow-md">$12,450.00</h3>
                            
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
