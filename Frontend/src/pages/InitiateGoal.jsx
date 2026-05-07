import React from 'react';
import { useNavigate } from 'react-router-dom';

const InitiateGoal = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle goal submission logic here
        navigate('/dashboard/goals');
    };

    return (
        <div className="flex flex-col flex-1 pb-10">
            <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-8 py-6 shadow-sm rounded-xl mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard/goals')} className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors text-on-surface-variant">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary">Initiate Goal</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-on-surface-variant">
                        <button className="hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                        <button className="hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Focused Initiate Goal View */}
            <section className="flex-1 p-4 md:p-12 max-w-5xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
                    {/* Form Container */}
                    <div className="w-full lg:max-w-2xl bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0_20px_40px_rgba(40,43,81,0.06)] relative overflow-hidden text-on-surface">
                        {/* Subtle Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5284FE]/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        <header className="mb-10">
                            <h2 className="text-2xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">New Academic Milestone</h2>
                            <p className="text-on-surface-variant text-sm font-body">Define your target, set a date, and start saving towards your next achievement.</p>
                        </header>
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Goal Name Field */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Goal Name</label>
                                <div className="relative">
                                    <input 
                                        className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-on-surface font-headline font-bold text-xl placeholder:text-outline-variant focus:ring-2 focus:ring-[#5284FE]/20 transition-all focus:bg-surface-container-low" 
                                        placeholder="e.g., New MacBook Pro" 
                                        type="text"
                                        required
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Target Amount Field */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Target Amount</label>
                                    <div className="relative flex items-center group">
                                        <span className="absolute left-5 text-xl font-bold text-[#5284FE]">$</span>
                                        <input 
                                            className="w-full pl-10 pr-5 py-4 bg-surface-container-low border-none rounded-xl text-xl font-headline font-bold text-on-surface placeholder:text-outline-variant focus:ring-0 transition-all border-b-2 border-transparent focus:border-[#5284FE] focus:bg-surface-container-low" 
                                            placeholder="0.00" 
                                            step="0.01" 
                                            type="number"
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Target Date Field */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Target Date</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-on-surface font-body font-medium focus:ring-2 focus:ring-[#5284FE]/20 transition-all focus:bg-surface-container-low" 
                                            type="date"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Notes Field */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Motivation / Notes</label>
                                <textarea className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-on-surface font-body placeholder:text-outline-variant focus:ring-2 focus:ring-[#5284FE]/20 transition-all focus:bg-surface-container-low resize-none" placeholder="Why is this goal important?" rows="3"></textarea>
                            </div>
                            {/* Action Button */}
                            <button className="w-full py-5 bg-gradient-to-r from-[#4A85F6] to-[#5284FE] text-white font-headline font-bold text-lg rounded-xl shadow-lg shadow-[#5284FE]/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3" type="submit">
                                <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>track_changes</span>
                                Initiate Goal
                            </button>
                        </form>
                    </div>
                    {/* Contextual Info / Secondary Items */}
                    <div className="w-full lg:w-80 space-y-8">
                        <div className="bg-[#F8FAFC] rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#F1F5F9] flex flex-col items-center">
                            <div className="w-full flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-[#5284FE] text-[20px]">lightbulb</span>
                                <h4 className="font-headline font-bold text-[#1E293B] text-[16px]">Goal Strategy</h4>
                            </div>
                            <p className="text-[13px] text-[#64748B] leading-relaxed font-medium mb-4">
                                Breaking down your large goals into smaller, monthly milestones increases your chance of success by 40%.
                            </p>
                            <div className="w-full bg-[#EEF2FF] p-4 rounded-xl text-center">
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#5284FE] mb-1">Recommended Setup</span>
                                <span className="font-bold text-[#1E293B] text-[14px]">Set auto-savings rule</span>
                            </div>
                        </div>

                        {/* Recent Goals Quick List */}
                        <div className="bg-white p-6 rounded-[24px] border border-[#F1F5F9] shadow-sm">
                            <h4 className="font-headline font-bold text-[#1E293B] mb-4 text-[14px]">Active Priorities</h4>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#EEF2FF] flex items-center justify-center text-[#5284FE]">
                                        <span className="material-symbols-outlined text-[16px]">laptop_mac</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[12px] font-bold text-[#1E293B]">Buy Laptop</div>
                                        <div className="w-full bg-[#E2E8F0] h-[4px] rounded-full mt-1">
                                            <div className="bg-[#5284FE] h-full rounded-full" style={{width: '46%'}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#10B981]">
                                        <span className="material-symbols-outlined text-[16px]">flight_takeoff</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-[12px] font-bold text-[#1E293B]">Summer Trip</div>
                                        <div className="w-full bg-[#E2E8F0] h-[4px] rounded-full mt-1">
                                            <div className="bg-[#10B981] h-full rounded-full" style={{width: '20%'}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default InitiateGoal;
