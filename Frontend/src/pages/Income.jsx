import React from 'react';

const Income = () => {
    return (
        <div className="relative font-body">
            {/* Header */}
            <header className="mb-8 pl-1">
                <h2 className="font-headline text-[32px] font-extrabold tracking-tight text-on-surface">Income Management</h2>
                <p className="text-on-surface-variant font-medium mt-1">Track and grow your academic capital</p>
            </header>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Top Left: Revenue Card */}
                <div className="lg:col-span-8 bg-[#5284FE] rounded-[24px] p-10 text-white flex flex-col items-center justify-center relative shadow-[0_20px_40px_rgba(82,132,254,0.15)] min-h-[360px]">
                    <p className="text-[11px] font-bold tracking-[0.15em] uppercase mb-6 text-white/90">Current Monthly Revenue</p>
                    <h3 className="font-headline text-[100px] font-bold leading-none mb-8 tracking-tight text-white">$3,420</h3>
                    <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md px-4 py-2 rounded-full cursor-pointer">
                        <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
                        <span className="text-[13px] font-bold">+12.4% vs last month</span>
                    </div>
                </div>

                {/* Top Right: Income Sources */}
                <div className="lg:col-span-4 bg-[#F8FAFC] rounded-[24px] p-8 relative flex flex-col min-h-[360px]">
                    <div className="flex justify-between items-center mb-8">
                        <h4 className="font-headline font-bold text-lg text-[#2D334A]">Income Sources</h4>
                        <button className="text-[#3A70EF] hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined">pie_chart</span>
                        </button>
                    </div>
                    
                    <div className="flex justify-center mb-10 mt-2">
                        <div className="relative flex items-center justify-center">
                            <svg className="w-36 h-36 transform -rotate-90">
                                <circle className="text-[#EDF1FA]" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeWidth="18"></circle>
                                <circle className="text-[#E9EDFF]" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="376.99" strokeDashoffset="0" strokeLinecap="round" strokeWidth="18"></circle>
                                <circle className="text-[#EAECFF]" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="376.99" strokeDashoffset="40" strokeLinecap="round" strokeWidth="18"></circle>
                                <circle className="text-[#EAEDFA]" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="376.99" strokeDashoffset="80" strokeLinecap="round" strokeWidth="18"></circle>
                                <circle className="text-[#EAEDFA]" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="376.99" strokeDashoffset="120" strokeLinecap="round" strokeWidth="18"></circle>
                                
                                <circle className="text-[#E6EAFF]" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="376.99" strokeDashoffset="0" strokeLinecap="round" strokeWidth="18"></circle>

                                <circle className="text-[#DCE4FA]" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="376.99" strokeDashoffset="10" strokeLinecap="round" strokeWidth="18"></circle>

                            </svg>
                            <svg className="w-36 h-36 transform -rotate-90 absolute top-0 left-0">
                                <circle className="text-[#E9EDFF]" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="376.99" strokeDashoffset="280" strokeLinecap="round" strokeWidth="18"></circle>
                                <circle className="text-[#B3C5FF]" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="376.99" strokeDashoffset="340" strokeLinecap="round" strokeWidth="18"></circle>

                                <circle className="text-[#4E82FC] transition-all duration-300 drop-shadow-md" cx="72" cy="72" fill="transparent" r="60" stroke="currentColor" strokeDasharray="376.99" strokeDashoffset="143.25" strokeLinecap="round" strokeWidth="18"></circle>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-[26px] font-headline font-extrabold text-[#212435]">62%</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4 max-w-[260px] mx-auto w-full mt-auto">
                        <div className="flex justify-between items-center text-[13px]">
                            <div className="flex items-center gap-2.5 text-[#5D647E] font-medium">
                                <div className="w-2 h-2 rounded-full bg-[#187B4C]"></div>
                                Part-time Job
                            </div>
                            <div className="font-bold text-[#2D334A]">$2,120</div>
                        </div>
                        <div className="flex justify-between items-center text-[13px]">
                            <div className="flex items-center gap-2.5 text-[#5D647E] font-medium">
                                <div className="w-2 h-2 rounded-full bg-[#82ADFD]"></div>
                                Scholarship
                            </div>
                            <div className="font-bold text-[#2D334A]">$800</div>
                        </div>
                        <div className="flex justify-between items-center text-[13px]">
                            <div className="flex items-center gap-2.5 text-[#5D647E] font-medium">
                                <div className="w-2 h-2 rounded-full bg-[#C2BBFA]"></div>
                                Freelance
                            </div>
                            <div className="font-bold text-[#2D334A]">$500</div>
                        </div>
                    </div>
                </div>

                {/* Bottom Left: Log New Income */}
                <div className="lg:col-span-4 bg-white rounded-[24px] p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
                    <h4 className="font-headline font-bold text-lg text-[#2D334A] flex items-center gap-2.5 mb-8">
                        <span className="material-symbols-outlined text-[#3A70EF]">add_circle</span>
                        Log New Income
                    </h4>
                    
                    <form className="space-y-6">
                        <div>
                            <label className="block text-[11px] font-bold text-[#5D647E] uppercase tracking-widest mb-3">Amount ($)</label>
                            <input 
                                className="w-full bg-[#F3F4FB] text-[#2D334A] font-semibold px-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-shadow" 
                                type="text" 
                                placeholder="0.00" 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-[11px] font-bold text-[#5D647E] uppercase tracking-widest mb-3">Source / Category</label>
                            <div className="relative">
                                <select className="w-full bg-[#F3F4FB] bg-none text-[#2D334A] font-semibold px-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none appearance-none pr-10 cursor-pointer">
                                    <option>Part-time Job</option>
                                    <option>Scholarship</option>
                                    <option>Freelance</option>
                                    <option>Allowance</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#5D647E] pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-[11px] font-bold text-[#5D647E] uppercase tracking-widest mb-3">Transaction Date</label>
                            <input 
                                className="w-full bg-[#F3F4FB] text-[#2D334A] font-semibold px-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-shadow" 
                                type="date" 
                                placeholder="mm/dd/yyyy" 
                            />
                        </div>
                        
                        <button className="w-full bg-[#5284FE] hover:bg-[#3D6CE5] text-white font-bold py-4 rounded-xl transition-all shadow-[0_8px_16px_rgba(82,132,254,0.25)] flex justify-center items-center gap-2 mt-4" type="button">
                            Add to Ledger <span className="material-symbols-outlined text-[18px] font-bold">arrow_forward</span>
                        </button>
                    </form>
                </div>

                {/* Bottom Right: Recent Activity */}
                <div className="lg:col-span-8 bg-white rounded-[24px] p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
                    <div className="flex justify-between items-center mb-8">
                        <h4 className="font-headline font-bold text-lg text-[#2D334A]">Recent Activity</h4>
                        <button className="text-[#3A70EF] font-bold text-[13px] hover:underline flex items-center gap-1 tracking-wide">
                            Download Report <span className="material-symbols-outlined text-[16px]">download</span>
                        </button>
                    </div>
                    
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-[#F0F2F8]">
                                    <th className="pb-5 pt-2 text-[11px] font-bold text-[#5D647E] uppercase tracking-widest w-[140px]">Date</th>
                                    <th className="pb-5 pt-2 text-[11px] font-bold text-[#5D647E] uppercase tracking-widest">Source</th>
                                    <th className="pb-5 pt-2 text-[11px] font-bold text-[#5D647E] uppercase tracking-widest w-[120px]">Category</th>
                                    <th className="pb-5 pt-2 text-[11px] font-bold text-[#5D647E] uppercase tracking-widest text-right w-[100px]">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-[#F8FAFC]">
                                    <td className="py-5 text-sm font-semibold text-[#2D334A]">Oct 12, 2023</td>
                                    <td className="py-5 text-sm font-bold text-[#2D334A] flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#61EDB0] flex items-center justify-center text-[#187547]">
                                            <span className="material-symbols-outlined text-[18px]">work</span>
                                        </div>
                                        University Library
                                    </td>
                                    <td className="py-5">
                                        <div className="inline-flex bg-[#EBF0FF] text-[#5569AC] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                                            Part-Time
                                        </div>
                                    </td>
                                    <td className="py-5 text-[15px] font-bold text-[#118A4A] text-right">+$420.00</td>
                                </tr>
                                <tr className="border-b border-[#F8FAFC]">
                                    <td className="py-5 text-sm font-semibold text-[#2D334A]">Oct 10, 2023</td>
                                    <td className="py-5 text-sm font-bold text-[#2D334A] flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#BEA9FF] flex items-center justify-center text-white">
                                            <span className="material-symbols-outlined text-[18px]">school</span>
                                        </div>
                                        Merit Scholarship
                                    </td>
                                    <td className="py-5">
                                        <div className="inline-flex bg-[#EEECFC] text-[#7A6EC0] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                                            Education
                                        </div>
                                    </td>
                                    <td className="py-5 text-[15px] font-bold text-[#118A4A] text-right">+$2,500.00</td>
                                </tr>
                                <tr className="border-b border-[#F8FAFC]">
                                    <td className="py-5 text-sm font-semibold text-[#2D334A]">Oct 05, 2023</td>
                                    <td className="py-5 text-sm font-bold text-[#2D334A] flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#DAE8FF] flex items-center justify-center text-[#3A70EF]">
                                            <span className="material-symbols-outlined text-[18px]">design_services</span>
                                        </div>
                                        UI Design Gig
                                    </td>
                                    <td className="py-5">
                                        <div className="inline-flex bg-[#EEECFC] text-[#7A6EC0] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                                            Freelance
                                        </div>
                                    </td>
                                    <td className="py-5 text-[15px] font-bold text-[#118A4A] text-right">+$500.00</td>
                                </tr>
                                <tr>
                                    <td className="py-5 text-sm font-semibold text-[#2D334A]">Sep 28, 2023</td>
                                    <td className="py-5 text-sm font-bold text-[#2D334A] flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#FDE2FE] flex items-center justify-center text-[#B96BC2]">
                                            <span className="material-symbols-outlined text-[18px]">account_tree</span>
                                        </div>
                                        Monthly Allowance
                                    </td>
                                    <td className="py-5">
                                        <div className="inline-flex bg-[#F4F1FB] text-[#9181BD] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                                            Support
                                        </div>
                                    </td>
                                    <td className="py-5 text-[15px] font-bold text-[#118A4A] text-right">+$200.00</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Income;
