import React from 'react';

const Dashboard = () => {
    return (
        <div className="relative font-body">
            {/* Top Bar / Header Section */}
            <header className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface">Good Morning, Alex</h2>
                    <p className="text-on-surface-variant font-medium mt-1">Here is what's happening with your academic budget today.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <button className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:text-primary transition-colors relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-3 right-3 w-2 h-2 bg-error rounded-full border-2 border-surface"></span>
                    </button>
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary-container">
                        <img alt="Student Profile Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0yqd9B3StoTF9KvVphgp4kiPbEQ8eqp3cGhLZMJe6SUKzYKGOrjLTHNelNABabZhUbfBiLA8lOovPXkXqMRKI6phWHN0ejH19PXuoNFzxhAr71MZpwh74FUOxx-BQrYyNcIDAyYz4XD3kFWb6b6QeI2vraV4MuoY91CI9lWIncoPYxNI5BeDJAqPQ26WWpBr0O1Q5ampsHBvKcH6hoCJJ2g-VgjF_fMH7RHRwnBB8KbbvhVvvDrLaDRjYNl73NzATX6rJUpwYuofE"/>
                    </div>
                </div>
            </header>

            {/* Bento Grid Layout */}
            <div className="grid grid-cols-12 gap-8">
                {/* Hero Balance Card (Asymmetric Elongated Format) */}
                <div className="col-span-8 bg-gradient-to-br from-primary to-primary-container rounded-xl p-8 text-on-primary flex flex-col justify-between min-h-[280px] relative overflow-hidden shadow-2xl shadow-primary/20">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary-container/20 rounded-full -ml-20 -mb-20 blur-2xl"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium opacity-80 uppercase tracking-widest">Total Balance</p>
                            <h3 className="font-headline text-6xl font-extrabold mt-2 tracking-tighter text-white">$4,250.00</h3>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-md">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-white/90">Academic Year 24/25</p>
                        </div>
                    </div>
                    <div className="relative z-10 flex gap-12 mt-auto">
                        <div>
                            <p className="text-xs font-medium opacity-70 mb-1">Monthly Allowance</p>
                            <p className="text-2xl font-bold">$1,200.00</p>
                        </div>
                        <div>
                            <p className="text-xs font-medium opacity-70 mb-1">Expenses YTD</p>
                            <p className="text-2xl font-bold">$8,420.50</p>
                        </div>
                        <div className="ml-auto">
                            <button className="bg-white text-primary px-6 py-3 rounded-md font-bold text-sm shadow-lg hover:scale-105 transition-transform">
                                Add Funds
                            </button>
                        </div>
                    </div>
                </div>

                {/* Remaining Budget Card */}
                <div className="col-span-4 bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(40,43,81,0.06)] flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-secondary-container/20 text-secondary rounded-full flex items-center justify-center mb-4">
                        <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                    </div>
                    <p className="text-on-surface-variant font-medium text-sm">Remaining Budget</p>
                    <h4 className="font-headline text-4xl font-bold text-on-surface my-2">$642.15</h4>
                    <div className="bg-secondary-container px-3 py-1 rounded-full inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                        <span className="text-[10px] font-extrabold text-on-secondary-container uppercase tracking-tight">On Track</span>
                    </div>
                    <p className="text-xs text-on-surface-variant mt-6 leading-relaxed">You've spent <span className="text-primary font-bold">12% less</span> than last month at this time. Keep it up!</p>
                </div>

                {/* Spending Visualization (Progress Ring) */}
                <div className="col-span-5 bg-surface-container-low rounded-xl p-8">
                    <div className="flex justify-between items-start mb-8">
                        <h5 className="font-headline text-xl font-bold text-on-surface">Your Spend In This Month</h5>
                        <button className="text-primary font-bold text-xs">View Report</button>
                    </div>
                    <div className="flex items-center justify-center py-4">
                        <div className="relative flex items-center justify-center">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle className="text-surface-container-high" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="14"></circle>
                                <circle className="text-primary transition-all duration-300" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502.65" strokeDashoffset="175.92" strokeLinecap="round" strokeWidth="14"></circle>
                            </svg>
                            <div className="absolute text-center flex flex-col items-center justify-center">
                                <span className="text-3xl font-headline font-extrabold text-on-surface">65%</span>
                                <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest mt-1">Utilized</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center p-3 bg-surface-container-lowest rounded-md shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-primary"></span>
                                <span className="text-sm font-medium">Academic Supplies</span>
                            </div>
                            <span className="text-sm font-bold">$420.00</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-surface-container-lowest rounded-md shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="w-3 h-3 rounded-full bg-secondary"></span>
                                <span className="text-sm font-medium">Housing &amp; Utils</span>
                            </div>
                            <span className="text-sm font-bold">$780.00</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats & Savings Goal */}
                <div className="col-span-7 space-y-8">
                    {/* Savings Goal Section */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(40,43,81,0.06)]">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-tertiary-container/30 text-tertiary rounded-md flex items-center justify-center">
                                    <span className="material-symbols-outlined">flight_takeoff</span>
                                </div>
                                <div>
                                    <h5 className="font-bold text-on-surface">Semester Abroad</h5>
                                    <p className="text-xs text-on-surface-variant">Saving for Florence, Italy</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-on-surface">$3,250 / $5,000</p>
                                <p className="text-[10px] font-bold text-tertiary uppercase">65% Complete</p>
                            </div>
                        </div>
                        <div className="w-full bg-surface-container rounded-full h-3 overflow-hidden">
                            <div className="bg-gradient-to-r from-tertiary to-tertiary-fixed h-full rounded-full" style={{width: "65%"}}></div>
                        </div>
                        <div className="mt-6 flex justify-between items-center text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                            <span>Started Feb 2024</span>
                            <span>Estimated Goal: Dec 2024</span>
                        </div>
                    </div>

                    {/* Monthly Balance Progress Widget */}
                    <div className="bg-surface-container-lowest rounded-xl p-8 shadow-[0px_20px_40px_rgba(40,43,81,0.06)] mb-8">
                        <div className="flex justify-between items-end mb-6">
                            <div>
                                <h5 className="font-headline font-bold text-on-surface">Monthly Balance Progress</h5>
                                <p className="text-xs text-on-surface-variant mt-1">Tracking against $5,000.00 starting budget</p>
                            </div>
                            <div className="text-right">
                                <span className="text-2xl font-headline font-extrabold text-primary">85%</span>
                                <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">Remaining</p>
                            </div>
                        </div>
                        <div className="relative mb-6">
                            <div className="w-full bg-surface-container h-4 rounded-full overflow-hidden">
                                <div className="bg-gradient-to-r from-primary to-primary-container h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(0,80,212,0.3)]" style={{width: "85%"}}></div>
                            </div>
                            {/* Decorative markers */}
                            <div className="absolute top-6 left-0 right-0 flex justify-between text-[10px] font-bold text-outline uppercase tracking-tighter">
                                <span>$0.00</span>
                                <span>$2,500.00</span>
                                <span>$5,000.00</span>
                            </div>
                        </div>
                        <div className="mt-10 flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined text-sm">account_balance</span>
                                </div>
                                <span className="text-sm font-medium text-on-surface">Current Total Balance</span>
                            </div>
                            <span className="text-sm font-extrabold text-primary">$4,250.00</span>
                        </div>
                    </div>

                    {/* Today's Spending and Top Category */}
                    <div className="grid grid-cols-2 gap-8">
                        {/* Today's Spending */}
                        <div className="bg-surface-container-low rounded-xl p-6">
                            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">Today's Spending</p>
                            <div className="flex items-baseline gap-2 mb-2">
                                <h6 className="text-3xl font-headline font-bold text-on-surface">$24.50</h6>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                                <span className="material-symbols-outlined text-sm">restaurant</span>
                                <span>Lunch, Coffee</span>
                            </div>
                        </div>

                        {/* Top Category */}
                        <div className="bg-surface-container-low rounded-xl p-6 flex flex-col justify-between">
                            <div>
                                <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-4">This Month's Saving Goal</p>
                                <div className="flex justify-between items-end mb-2">
                                    <h6 className="text-3xl font-headline font-bold text-on-surface">$1,200</h6>
                                    <p className="text-xs font-bold text-on-surface-variant">of $2,500</p>
                                </div>
                                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden mb-3">
                                    <div className="bg-primary h-full rounded-full" style={{width: "48%"}}></div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-primary font-bold">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                <span>48% of target reached</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contextual FAB */}
            <button className="fixed bottom-10 right-10 w-16 h-16 rounded-full bg-primary text-on-primary shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50">
                <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>add</span>
            </button>
        </div>
    );
};

export default Dashboard;
