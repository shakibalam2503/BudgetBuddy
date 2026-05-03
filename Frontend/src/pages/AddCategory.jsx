import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("Subscription");

    const categories = [
        { id: "Travel", icon: "flight", color: "#A7F3D0", textColor: "#065F46" },
        { id: "Health", icon: "ecg_heart", color: "#FDE8E8", textColor: "#E02424" },
        { id: "Subscription", icon: "ondemand_video", color: "#E0E7FF", textColor: "#4F46E5" },
        { id: "Food", icon: "restaurant", color: "#F3E8FF", textColor: "#9333EA" },
        { id: "Education", icon: "school", color: "#DCFCE7", textColor: "#16A34A" },
        { id: "Others", icon: "add", color: "#F1F5F9", textColor: "#64748B", dashed: true }
    ];

    return (
        <div className="relative font-body">
            {/* Header Section */}
            <header className="flex justify-between items-end mb-8 pl-1">
                <div>
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-3">
                        <Link to="/dashboard/budget" className="hover:text-[#5284FE] transition-colors">Budgets</Link>
                        <span className="material-symbols-outlined text-[12px] mt-0.5">chevron_right</span>
                        <span className="text-[#1E293B]">New Category</span>
                    </div>
                    <h2 className="font-headline text-[32px] font-extrabold tracking-tight text-[#1E293B]">Add Category</h2>
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

            {/* Top Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {/* Available to allocate */}
                <div className="bg-[#5284FE] rounded-[24px] p-8 text-white flex flex-col justify-center relative shadow-[0_12px_24px_rgba(82,132,254,0.25)] h-[200px] overflow-hidden">
                    <p className="text-[11px] font-bold tracking-[0.1em] uppercase mb-1 text-white/80">Available to Allocate</p>
                    <div className="flex items-baseline gap-1 mt-2 mb-4">
                        <span className="text-[28px] font-bold opacity-80">$</span>
                        <h3 className="font-headline text-[64px] font-extrabold leading-none tracking-tight text-white">750.00</h3>
                    </div>
                    <div className="inline-flex items-center gap-1.5 bg-white/10 w-max px-3.5 py-1.5 rounded-full mt-auto backdrop-blur-md">
                        <span className="material-symbols-outlined text-[13px]">info</span>
                        <span className="text-[10px] font-medium tracking-wide">Resetting in 12 days</span>
                    </div>
                    <div className="absolute right-0 top-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                </div>

                {/* Hint Card */}
                <div className="bg-[#F8FAFC] rounded-[24px] p-10 h-[200px] flex flex-col justify-center border border-[#E2E8F0]/60">
                    <h4 className="font-headline font-bold text-[#1E293B] text-[18px] mb-3">Academic Workspace Hint</h4>
                    <p className="text-[13px] text-[#64748B] leading-[1.6] font-medium pr-8">
                        Allocating funds to categories helps you track specific spending patterns. We recommend keeping at least 15% of your monthly budget as an <a href="#" className="text-[#5284FE] underline font-bold transition-opacity hover:opacity-80">Emergency Fund</a>.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
                {/* 1. Select Category */}
                <div className="lg:col-span-7">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-[5px] h-6 bg-[#5284FE] rounded-full"></div>
                        <h3 className="font-headline text-[20px] font-bold text-[#1E293B]">1. Select Category</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                        {categories.map((cat) => (
                            <div 
                                key={cat.id} 
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`h-[135px] rounded-[22px] flex flex-col items-center justify-center gap-3.5 cursor-pointer transition-all duration-200 relative ${
                                    cat.dashed 
                                        ? 'bg-[#F8FAFC] border-2 border-dashed border-[#CBD5E1] hover:border-[#94A3B8]' 
                                        : 'bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
                                } ${
                                    selectedCategory === cat.id 
                                        ? 'border-[2.5px] border-[#5284FE] shadow-[0_12px_24px_rgba(82,132,254,0.15)] ring-4 ring-[#EFF3FF] transform scale-[1.02]' 
                                        : cat.dashed ? '' : 'border border-[#F1F5F9] hover:border-[#E2E8F0] hover:-translate-y-1'
                                }`}
                            >
                                {selectedCategory === cat.id && (
                                    <div className="absolute top-3.5 right-3.5 w-6 h-6 bg-[#5284FE] rounded-full flex items-center justify-center text-white shadow-md">
                                        <span className="material-symbols-outlined text-[14px] font-bold">check</span>
                                    </div>
                                )}
                                <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mt-2 transition-transform duration-300" style={{ backgroundColor: cat.color, color: cat.textColor }}>
                                    <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
                                </div>
                                <span className="text-[13px] font-bold text-[#1E293B]">{cat.id}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Allocate Amount */}
                <div className="lg:col-span-5 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-[5px] h-6 bg-[#5284FE] rounded-full"></div>
                        <h3 className="font-headline text-[20px] font-bold text-[#1E293B]">2. Allocate Amount</h3>
                    </div>
                    
                    <div className="flex-1 flex flex-col">
                        <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-3 pl-1">Allocate Budget Amount</label>
                        <div className="bg-white rounded-[20px] px-6 py-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] mb-6 flex items-center gap-3 border border-[#F1F5F9]">
                            <span className="text-[#94A3B8] font-headline text-[28px] font-bold">$</span>
                            <input 
                                type="text"
                                className="w-full text-[#CBD5E1] font-headline text-[44px] tracking-tight font-extrabold bg-transparent border-none outline-none focus:text-[#5284FE] transition-colors placeholder-[#CBD5E1]"
                                placeholder="0.00"
                            />
                        </div>
                        
                        <div className="bg-[#F8FAFC] rounded-[20px] p-6 mb-8 flex-1 border border-[#F1F5F9]">
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-[12px] font-semibold text-[#64748B]">Usage preview</span>
                                <span className="text-[12px] font-bold text-[#5284FE]">0% of total</span>
                            </div>
                            <div className="w-full bg-[#E2E8F0] h-[9px] rounded-full overflow-hidden mb-4">
                                <div className="bg-[#5284FE] h-full" style={{width: "15%"}}></div>
                            </div>
                            <p className="text-[11px] text-[#94A3B8] font-medium leading-relaxed">
                                Allocating this amount will leave you with $750.00 for other needs.
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-3 mt-auto">
                            <button className="w-full bg-[#5284FE] text-white font-bold text-[14px] py-4 rounded-[14px] shadow-[0_8px_16px_rgba(82,132,254,0.25)] hover:bg-[#3B72E0] transition-colors hover:scale-[1.01]">
                                Save Category
                            </button>
                            <button 
                                onClick={() => navigate('/dashboard/budget')}
                                className="w-full bg-[#F1F5F9] text-[#475569] font-bold text-[14px] py-4 rounded-[14px] hover:bg-[#E2E8F0] transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Card - Best Practices */}
            <div className="bg-white rounded-[24px] p-10 relative shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-[#F1F5F9]">
                <div className="absolute right-8 -top-6 w-[56px] h-[56px] bg-[#059669] rounded-[16px] shadow-[0_10px_24px_rgba(5,150,105,0.4)] flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform cursor-pointer">
                    <span className="material-symbols-outlined text-white text-[28px]">verified</span>
                </div>
                
                <h3 className="font-headline text-[22px] font-bold text-[#1E293B] mb-8">Budgeting Best Practices</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div>
                        <div className="flex items-center gap-2.5 text-[10px] font-bold text-[#5284FE] uppercase tracking-widest mb-3.5">
                            <span className="material-symbols-outlined text-[16px]">pie_chart</span> Rule of Thumb
                        </div>
                        <h5 className="font-bold text-[#1E293B] text-[15px] mb-2.5">The 50/30/20 Rule</h5>
                        <p className="text-[12.5px] text-[#64748B] leading-relaxed font-medium">Allocate 50% for needs, 30% for wants, and 20% for savings or debt repayment to maintain academic balance.</p>
                    </div>
                    
                    <div>
                        <div className="flex items-center gap-2.5 text-[10px] font-bold text-[#E02424] uppercase tracking-widest mb-3.5">
                            <span className="material-symbols-outlined text-[16px]">asterisk</span> Security First
                        </div>
                        <h5 className="font-bold text-[#1E293B] text-[15px] mb-2.5">Emergency Fund Priority</h5>
                        <p className="text-[12.5px] text-[#64748B] leading-relaxed font-medium">Prioritize a small safety net before luxury categories. Aim for at least $500 for unexpected school or living costs.</p>
                    </div>
                    
                    <div>
                        <div className="flex items-center gap-2.5 text-[10px] font-bold text-[#059669] uppercase tracking-widest mb-3.5">
                            <span className="material-symbols-outlined text-[16px]">update</span> Sustainability
                        </div>
                        <h5 className="font-bold text-[#1E293B] text-[15px] mb-2.5">Review Monthly</h5>
                        <p className="text-[12.5px] text-[#64748B] leading-relaxed font-medium">Your spending changes between semesters. Adjust your category limits every 30 days based on your actual data.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;
