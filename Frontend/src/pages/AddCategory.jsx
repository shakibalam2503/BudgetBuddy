import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const AddCategory = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("Subscription");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [customCategoryName, setCustomCategoryName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const categories = [
        { id: "Travel", icon: "flight", color: "#A7F3D0", textColor: "#065F46" },
        { id: "Health", icon: "ecg_heart", color: "#FDE8E8", textColor: "#E02424" },
        { id: "Subscription", icon: "ondemand_video", color: "#E0E7FF", textColor: "#4F46E5" },
        { id: "Food", icon: "restaurant", color: "#F3E8FF", textColor: "#9333EA" },
        { id: "Education", icon: "school", color: "#DCFCE7", textColor: "#16A34A" },
        { id: "Other", icon: "add", color: "#F1F5F9", textColor: "#64748B", dashed: true }
    ];

    const mapCategoryToDbName = (cat) => {
        const m = {
            Travel: 'Transport',
            Food: 'Food',
            Education: 'Study',
            Subscription: 'Entertainment',
            Health: 'Health',
            Other: 'Other'
        };
        return m[cat] || cat;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError('');

        let categoryToSave = selectedCategory;
        if (selectedCategory === 'Other') {
            const trimmedName = customCategoryName.trim();
            if (!trimmedName) {
                setError('Please enter a name for the custom category.');
                return;
            }
            categoryToSave = trimmedName;
        }

        if (!amount) {
            setError('Please enter a budget limit.');
            return;
        }

        const limit = parseFloat(amount);
        if (isNaN(limit) || limit <= 0) {
            setError('Please enter a valid positive number.');
            return;
        }

        setLoading(true);
        try {
            await api.post('/api/budget', {
                category: mapCategoryToDbName(categoryToSave),
                amount_limit: limit
            });
            navigate('/dashboard/budget');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to save budget.');
        } finally {
            setLoading(false);
        }
    };

    const selectedCatObj = categories.find(cat => cat.id === selectedCategory) || categories[5];

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
                    <div className="w-12 h-12 rounded-full overflow-hidden outline outline-2 outline-[#CBD5E1] cursor-pointer">
                        <img alt="User Avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0yqd9B3StoTF9KvVphgp4kiPbEQ8eqp3cGhLZMJe6SUKzYKGOrjLTHNelNABabZhUbfBiLA8lOovPXkXqMRKI6phWHN0ejH19PXuoNFzxhAr71MZpwh74FUOxx-BQrYyNcIDAyYz4XD3kFWb6b6QeI2vraV4MuoY91CI9lWIncoPYxNI5BeDJAqPQ26WWpBr0O1Q5ampsHBvKcH6hoCJJ2g-VgjF_fMH7RHRwnBB8KbbvhVvvDrLaDRjYNl73NzATX6rJUpwYuofE" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </header>

            {error && (
                <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-sm font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined">error</span>
                    {error}
                </div>
            )}

            {/* Top Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                {/* Available to allocate */}
                <div className="bg-[#5284FE] rounded-[24px] p-8 text-white flex flex-col justify-center relative shadow-[0_12px_24px_rgba(82,132,254,0.25)] h-[200px] overflow-hidden">
                    <p className="text-[11px] font-bold tracking-[0.1em] uppercase mb-1 text-white/80">Available to Allocate</p>
                    <div className="flex items-baseline gap-1 mt-2 mb-4">
                        <span className="text-[28px] font-bold opacity-80">৳</span>
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
                {/* 1. Visual Card Preview */}
                <div className="lg:col-span-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-[5px] h-6 bg-[#5284FE] rounded-full"></div>
                        <h3 className="font-headline text-[20px] font-bold text-[#1E293B]">Category Preview</h3>
                    </div>
                    
                    <div 
                        className="h-[280px] rounded-[32px] flex flex-col items-center justify-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border transition-all duration-300 ease-in-out relative overflow-hidden"
                        style={{ 
                            backgroundColor: selectedCatObj.color + '20', 
                            borderColor: selectedCatObj.color 
                        }}
                    >
                        <div 
                            className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-20"
                            style={{ backgroundColor: selectedCatObj.color }}
                        ></div>
                        
                        <div 
                            className="w-[96px] h-[96px] rounded-[24px] flex items-center justify-center shadow-lg transition-all duration-500 transform hover:scale-105" 
                            style={{ backgroundColor: selectedCatObj.color, color: selectedCatObj.textColor }}
                        >
                            <span className="material-symbols-outlined text-[48px]">{selectedCatObj.icon}</span>
                        </div>
                        
                        <div className="text-center px-6">
                            <h4 className="font-headline font-extrabold text-[28px] text-[#1E293B] mb-2">
                                {selectedCategory === 'Other' ? (customCategoryName.trim() || 'Custom Category') : selectedCategory}
                            </h4>
                            <p className="text-[13px] text-[#64748B] font-semibold tracking-wide uppercase">
                                {selectedCategory === 'Other' ? 'Custom Category' : 'Default Category'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. Allocate Amount & Settings */}
                <div className="lg:col-span-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-[5px] h-6 bg-[#5284FE] rounded-full"></div>
                        <h3 className="font-headline text-[20px] font-bold text-[#1E293B]">Budget Settings</h3>
                    </div>
                    
                    <form onSubmit={handleSave} className="flex-1 flex flex-col bg-white rounded-[28px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-[#F1F5F9] gap-6">
                        {/* Custom Category Dropdown */}
                        <div className="relative">
                            <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-3 pl-1 block">Select Category</label>
                            
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full bg-white px-5 py-4 border border-[#E2E8F0] rounded-[20px] text-[#1E293B] font-body font-semibold focus:ring-2 focus:ring-[#5284FE] outline-none shadow-sm flex items-center justify-between transition-all hover:bg-[#F8FAFC]"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div 
                                        className="w-[34px] h-[34px] rounded-[10px] flex items-center justify-center" 
                                        style={{ backgroundColor: selectedCatObj.color, color: selectedCatObj.textColor }}
                                    >
                                        <span className="material-symbols-outlined text-[18px]">{selectedCatObj.icon}</span>
                                    </div>
                                    <span className="text-[15px] font-bold">{selectedCatObj.id}</span>
                                </div>
                                <span className={`material-symbols-outlined text-[#64748B] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                            </button>
                            
                            {isDropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
                                    <div className="absolute left-0 right-0 mt-2 bg-white border border-[#E2E8F0] rounded-[22px] shadow-[0_15px_35px_rgba(0,0,0,0.1)] z-50 overflow-hidden py-2 max-h-[320px] overflow-y-auto">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedCategory(cat.id);
                                                    setIsDropdownOpen(false);
                                                    if (cat.id !== 'Other') {
                                                        setCustomCategoryName('');
                                                    }
                                                }}
                                                className={`w-full flex items-center justify-between px-5 py-3 hover:bg-[#F8FAFC] transition-colors text-left font-body font-bold text-[14px] ${
                                                    selectedCategory === cat.id ? 'text-[#5284FE] bg-[#EFF3FF]/40' : 'text-[#1E293B]'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div 
                                                        className="w-[30px] h-[30px] rounded-[8px] flex items-center justify-center" 
                                                        style={{ backgroundColor: cat.color, color: cat.textColor }}
                                                    >
                                                        <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                                                    </div>
                                                    <span>{cat.id}</span>
                                                </div>
                                                {selectedCategory === cat.id && (
                                                    <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Inline Custom Category Name Field */}
                        {selectedCategory === 'Other' && (
                            <div className="flex flex-col">
                                <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-3 pl-1">What is the name of the category?</label>
                                <input 
                                    type="text"
                                    className="w-full bg-white px-5 py-4 border border-[#E2E8F0] rounded-[20px] text-[#1E293B] font-body font-semibold focus:ring-2 focus:ring-[#5284FE] outline-none shadow-sm transition-all placeholder-[#CBD5E1]"
                                    placeholder="e.g. Gym, Books, Rent"
                                    required
                                    value={customCategoryName}
                                    onChange={(e) => setCustomCategoryName(e.target.value)}
                                />
                            </div>
                        )}

                        {/* Allocate Budget Amount */}
                        <div className="flex flex-col">
                            <label className="text-[11px] font-bold text-[#64748B] uppercase tracking-widest mb-3 pl-1">Allocate Budget Amount</label>
                            <div className="bg-white rounded-[20px] px-6 py-6 shadow-sm border border-[#E2E8F0] flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#5284FE] transition-all">
                                <span className="text-[#94A3B8] font-headline text-[24px] font-bold">৳</span>
                                <input 
                                    type="number"
                                    step="0.01"
                                    className="w-full text-[#1E293B] font-headline text-[32px] tracking-tight font-extrabold bg-transparent border-none outline-none focus:text-[#5284FE] transition-colors placeholder-[#CBD5E1]"
                                    placeholder="0.00"
                                    required
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div className="bg-[#F8FAFC] rounded-[20px] p-5 border border-[#F1F5F9]">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-[12px] font-semibold text-[#64748B]">Usage preview</span>
                                <span className="text-[12px] font-bold text-[#5284FE]">Setup limit</span>
                            </div>
                            <div className="w-full bg-[#E2E8F0] h-[7px] rounded-full overflow-hidden mb-3">
                                <div className="bg-[#5284FE] h-full" style={{width: "100%"}}></div>
                            </div>
                            <p className="text-[11px] text-[#94A3B8] font-medium leading-relaxed">
                                Allocating this amount will set the monthly budget limit for category "{selectedCategory === 'Other' ? (customCategoryName || 'custom category') : mapCategoryToDbName(selectedCategory)}".
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-3 mt-auto">
                            <button 
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#5284FE] text-white font-bold text-[14px] py-4 rounded-[14px] shadow-[0_8px_16px_rgba(82,132,254,0.25)] hover:bg-[#3B72E0] transition-colors hover:scale-[1.01] disabled:opacity-50"
                            >
                                {loading ? 'Saving...' : 'Save Category'}
                            </button>
                            <button 
                                type="button"
                                onClick={() => navigate('/dashboard/budget')}
                                className="w-full bg-[#F1F5F9] text-[#475569] font-bold text-[14px] py-4 rounded-[14px] hover:bg-[#E2E8F0] transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
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
                        <p className="text-[12.5px] text-[#64748B] leading-relaxed font-medium">Prioritize a small safety net before luxury categories. Aim for at least ৳500 for unexpected school or living costs.</p>
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
