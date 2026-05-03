import React from 'react';

const Insights = () => {
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
                        <button className="hover:text-[#1E293B] transition-colors"><span className="material-symbols-outlined text-[24px]">notifications</span></button>
                        <button className="hover:text-[#1E293B] transition-colors"><span className="material-symbols-outlined text-[24px]">help</span></button>
                    </div>
                    <div className="h-8 w-px bg-[#E2E8F0]"></div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-[14px] font-bold text-[#1E293B]">Nafiz</div>
                            <div className="text-[11px] text-[#64748B] font-medium">CSE , UIU</div>
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
                    <button className="px-6 py-2.5 rounded-full border border-[#CBD5E1] text-[#475569] font-bold text-[13px] hover:bg-[#F8FAFC] transition-colors">
                        Export Report
                    </button>
                    <button className="px-6 py-2.5 rounded-full bg-[#69F6B8] text-[#006947] font-bold text-[13px] hover:bg-[#58E7AB] transition-colors flex items-center gap-2">
                        <span className="material-symbols-outlined text-[16px]">calendar_today</span> September 2026
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
                    <h3 className="font-headline text-[36px] font-extrabold leading-none mb-6 text-white">$50,000.00</h3>
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
                    <h3 className="font-headline text-[36px] font-extrabold leading-none mb-6 text-white">$37,500.00</h3>
                    <div className="w-full bg-white/20 h-[6px] rounded-full overflow-hidden mb-2">
                        <div className="bg-white h-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ width: '75%' }}></div>
                    </div>
                    <span className="text-[9px] font-bold text-white/70 uppercase tracking-widest">75% OF TOTAL UTILIZED</span>
                </div>

                {/* Net Savings */}
                <div className="bg-[#035E37] rounded-[24px] p-8 text-white relative overflow-hidden shadow-[0_12px_24px_rgba(3,94,55,0.25)]">
                    <div className="flex justify-between items-start mb-6">
                        <span className="uppercase text-[11px] font-bold tracking-[0.15em] text-white/80">Net Savings</span>
                        <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <span className="material-symbols-outlined text-[18px]">savings</span>
                        </div>
                    </div>
                    <h3 className="font-headline text-[36px] font-extrabold leading-none mb-6 text-white">$12,500.00</h3>
                    <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                        <div className="w-2 h-2 rounded-full bg-[#69F6B8]"></div>
                        <span className="text-[10px] font-bold tracking-wider uppercase">On Track</span>
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
                            <button className="px-4 py-1.5 rounded-md text-[#64748B] font-bold text-[11px] hover:bg-white/50 transition-colors">Monthly</button>
                        </div>
                    </div>
                    
                    {/* SVG Line Graph */}
                    <div className="w-full relative h-[180px] flex items-end">
                        <svg viewBox="0 0 800 200" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                            <path d="M 0,200 L 0,160 C 100,160 200,100 300,160 C 400,200 450,40 600,140 C 700,200 750,140 800,80 L 800,200 Z" fill="url(#blue-grad-insights)" opacity="0.8" />
                            <path d="M 0,160 C 100,160 200,100 300,160 C 400,200 450,40 600,140 C 700,200 750,140 800,80" fill="none" stroke="#0050D4" strokeWidth="4" />
                            <circle cx="410" cy="100" r="4" fill="white" stroke="#0050D4" strokeWidth="2" />
                        </svg>
                        <defs>
                            <linearGradient id="blue-grad-insights" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#E0E7FF" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#E0E7FF" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </div>
                    
                    <div className="flex justify-between w-full mt-4 px-2">
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Week 1</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest pl-[10%]">Week 2</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest pr-[8%]">Week 3</span>
                        <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest pr-4">Week 4</span>
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
                            {/* Blue 40% */}
                            <circle cx="50" cy="50" r="40" className="text-[#0251CA]" strokeWidth="12" fill="none" stroke="currentColor" strokeDasharray="100 151.2" strokeDashoffset="0"/>
                            {/* Green 25% */}
                            <circle cx="50" cy="50" r="40" className="text-[#035E37]" strokeWidth="12" fill="none" stroke="currentColor" strokeDasharray="62.8 188.4" strokeDashoffset="-100"/>
                            {/* Purple 20% */}
                            <circle cx="50" cy="50" r="40" className="text-[#6B23C8]" strokeWidth="12" fill="none" stroke="currentColor" strokeDasharray="50.2 201" strokeDashoffset="-162.8"/>
                            {/* Red/Orange 15% */}
                            <circle cx="50" cy="50" r="40" className="text-[#FF4B4B]" strokeWidth="12" fill="none" stroke="currentColor" strokeDasharray="37.6 213.6" strokeDashoffset="-213"/>
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="font-headline text-[24px] font-extrabold text-[#1E293B] leading-none mb-1">$37k</span>
                            <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-[0.1em]">Total Spent</span>
                        </div>
                    </div>

                    <div className="w-full space-y-3 px-2">
                        <div className="flex justify-between items-center text-[12px] font-bold">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#0251CA]"></div><span className="text-[#475569]">Study Materials</span></div>
                            <span className="text-[#1E293B]">40%</span>
                        </div>
                        <div className="flex justify-between items-center text-[12px] font-bold">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#035E37]"></div><span className="text-[#475569]">Food</span></div>
                            <span className="text-[#1E293B]">25%</span>
                        </div>
                        <div className="flex justify-between items-center text-[12px] font-bold">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#6B23C8]"></div><span className="text-[#475569]">Entertainment</span></div>
                            <span className="text-[#1E293B]">20%</span>
                        </div>
                        <div className="flex justify-between items-center text-[12px] font-bold">
                            <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FF4B4B]"></div><span className="text-[#475569]">Transport</span></div>
                            <span className="text-[#1E293B]">15%</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Highest Expenses */}
                <div className="lg:col-span-4 bg-[#F8FAFC] rounded-[24px] p-8 border border-[#F1F5F9]">
                    <div className="flex justify-between items-end mb-6">
                        <h4 className="font-headline text-[18px] font-bold text-[#1E293B]">Highest Expenses</h4>
                        <a href="#" className="font-bold text-[11px] text-[#5284FE] hover:underline">See Details</a>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-white rounded-[16px] p-4 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#5284FE] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">menu_book</span>
                            </div>
                            <div className="flex-1">
                                <h5 className="font-bold text-[#1E293B] text-[13px]">Arch. Textbooks</h5>
                                <p className="text-[11px] text-[#64748B]">Academic Supplies</p>
                            </div>
                            <div className="text-right font-headline font-bold text-[15px] text-[#1E293B]">$4,200</div>
                        </div>
                        <div className="bg-white rounded-[16px] p-4 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">shopping_basket</span>
                            </div>
                            <div className="flex-1">
                                <h5 className="font-bold text-[#1E293B] text-[13px]">Weekly Groceries</h5>
                                <p className="text-[11px] text-[#64748B]">Unimart Superstore</p>
                            </div>
                            <div className="text-right font-headline font-bold text-[15px] text-[#1E293B]">$2,800</div>
                        </div>
                        <div className="bg-white rounded-[16px] p-4 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#9333EA] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">movie</span>
                            </div>
                            <div className="flex-1">
                                <h5 className="font-bold text-[#1E293B] text-[13px]">Cineplex Premium</h5>
                                <p className="text-[11px] text-[#64748B]">Entertainment</p>
                            </div>
                            <div className="text-right font-headline font-bold text-[15px] text-[#1E293B]">$1,500</div>
                        </div>
                        <div className="bg-white rounded-[16px] p-4 flex items-center gap-4 shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                            <div className="w-10 h-10 rounded-xl bg-[#FEF2F2] text-[#EF4444] flex items-center justify-center">
                                <span className="material-symbols-outlined text-[20px]">directions_car</span>
                            </div>
                            <div className="flex-1">
                                <h5 className="font-bold text-[#1E293B] text-[13px]">Ride Sharing</h5>
                                <p className="text-[11px] text-[#64748B]">Pathao/Uber Trips</p>
                            </div>
                            <div className="text-right font-headline font-bold text-[15px] text-[#1E293B]">$1,200</div>
                        </div>
                    </div>
                </div>

                {/* Savings Growth */}
                <div className="lg:col-span-8 bg-[#F8FAFC] rounded-[24px] p-8 pb-6 border border-[#F1F5F9] flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <h4 className="font-headline text-[18px] font-bold text-[#1E293B]">Savings Growth</h4>
                            <p className="text-[13px] text-[#64748B] font-medium">April - September performance</p>
                        </div>
                        <div className="text-right">
                            <div className="font-headline text-[24px] font-extrabold text-[#035E37] leading-none mb-1">$75.4k</div>
                            <div className="text-[9px] font-bold tracking-[0.1em] text-[#64748B] uppercase">Yearly Accumulation</div>
                        </div>
                    </div>
                    
                    {/* SVG Bar Chart Overlay */}
                    <div className="w-full flex-1 flex items-end justify-between px-2 gap-4 pt-8">
                        <div className="w-full bg-[#E2E8F0] rounded-t-xl opacity-70" style={{ height: '30%' }}></div>
                        <div className="w-full bg-[#E2E8F0] rounded-t-xl opacity-70" style={{ height: '45%' }}></div>
                        <div className="w-full bg-[#E2E8F0] rounded-t-xl opacity-70" style={{ height: '35%' }}></div>
                        <div className="w-full bg-[#E2E8F0] rounded-t-xl opacity-70" style={{ height: '60%' }}></div>
                        <div className="w-full bg-[#E2E8F0] rounded-t-xl opacity-70" style={{ height: '80%' }}></div>
                        <div className="w-full bg-[#0251CA] rounded-t-xl shadow-[0_0_24px_rgba(2,81,202,0.4)]" style={{ height: '100%' }}></div>
                    </div>
                    
                    <div className="flex justify-between w-full mt-4 px-2">
                        <span className="text-[10px] w-full text-center font-bold text-[#64748B] uppercase tracking-widest">Apr</span>
                        <span className="text-[10px] w-full text-center font-bold text-[#64748B] uppercase tracking-widest">May</span>
                        <span className="text-[10px] w-full text-center font-bold text-[#64748B] uppercase tracking-widest">Jun</span>
                        <span className="text-[10px] w-full text-center font-bold text-[#64748B] uppercase tracking-widest">Jul</span>
                        <span className="text-[10px] w-full text-center font-bold text-[#64748B] uppercase tracking-widest">Aug</span>
                        <span className="text-[10px] w-full text-center font-bold text-[#0251CA] uppercase tracking-widest">Sep</span>
                    </div>
                </div>
            </div>

            {/* Footer Links (Optional since global footer exists, but to match specific layout request) */}
            <div className="flex justify-end gap-6 mt-10 opacity-70">
                <a href="#" className="text-[10px] font-bold tracking-wider text-[#64748B] hover:text-[#1E293B]">System Status</a>
                <a href="#" className="text-[10px] font-bold tracking-wider text-[#64748B] hover:text-[#1E293B]">Privacy Policy</a>
                <a href="#" className="text-[10px] font-bold tracking-wider text-[#64748B] hover:text-[#1E293B]">Terms of Workspace</a>
            </div>

        </div>
    );
};

export default Insights;
