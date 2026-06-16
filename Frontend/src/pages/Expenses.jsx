import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const [showWarning, setShowWarning] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [dateFilter, setDateFilter] = useState('this-month'); // 'all', 'this-month', 'last-month', 'this-week'
    const [categoryFilter, setCategoryFilter] = useState('all'); // 'all', 'Food', etc.
    const [showDateDropdown, setShowDateDropdown] = useState(false);
    const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

    const fetchExpenses = async () => {
        try {
            const response = await api.get('/api/expenses');
            setExpenses(response.data);
        } catch (err) {
            console.error("Error fetching expenses", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this expense?")) return;
        try {
            await api.delete(`/api/expenses/${id}`);
            fetchExpenses();
        } catch (err) {
            console.error("Failed to delete expense", err);
        }
    };

    const parseLocalDate = (dateStr) => {
        if (!dateStr) return new Date();
        const cleanDateStr = dateStr.split('T')[0];
        const [year, month, day] = cleanDateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    };

    const today = new Date();
    const currentMonthNum = today.getMonth();
    const currentYear = today.getFullYear();
    const monthlyTotal = expenses
        .filter(exp => {
            const d = parseLocalDate(exp.date);
            return d.getMonth() === currentMonthNum && d.getFullYear() === currentYear;
        })
        .reduce((acc, exp) => acc + parseFloat(exp.amount), 0);

    const getFilteredExpenses = () => {
        return expenses.filter(exp => {
            // 1. Search Query Filter
            const searchLower = searchQuery.toLowerCase();
            const descLower = (exp.description || '').toLowerCase();
            const catLower = (exp.category || '').toLowerCase();
            const matchesSearch = descLower.includes(searchLower) || catLower.includes(searchLower);

            if (!matchesSearch) return false;

            // 2. Category Filter
            if (categoryFilter !== 'all' && exp.category !== categoryFilter) {
                return false;
            }

            // 3. Date Range Filter
            const expDate = parseLocalDate(exp.date);
            const todayDate = new Date();
            todayDate.setHours(0, 0, 0, 0);

            if (dateFilter === 'this-month') {
                return expDate.getMonth() === todayDate.getMonth() && expDate.getFullYear() === todayDate.getFullYear();
            } else if (dateFilter === 'last-month') {
                let lastMonthNum = todayDate.getMonth() - 1;
                let lastMonthYear = todayDate.getFullYear();
                if (lastMonthNum === -1) {
                    lastMonthNum = 11;
                    lastMonthYear = todayDate.getFullYear() - 1;
                }
                return expDate.getMonth() === lastMonthNum && expDate.getFullYear() === lastMonthYear;
            } else if (dateFilter === 'this-week') {
                const dayOfWeek = todayDate.getDay();
                const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
                const startOfWeek = new Date(todayDate);
                startOfWeek.setDate(todayDate.getDate() - daysToMonday);
                startOfWeek.setHours(0, 0, 0, 0);

                const endOfWeek = new Date(startOfWeek);
                endOfWeek.setDate(startOfWeek.getDate() + 7);

                return expDate.getTime() >= startOfWeek.getTime() && expDate.getTime() < endOfWeek.getTime();
            }

            return true; // 'all'
        });
    };

    const filteredExpenses = getFilteredExpenses();

    const getCategoryStyle = (cat) => {
        const styles = {
            Food: { icon: 'restaurant', color: 'bg-[#FDE8E8] text-[#E02424]' },
            Transport: { icon: 'directions_bus', color: 'bg-[#E0E7FF] text-[#4F46E5]' },
            Study: { icon: 'menu_book', color: 'bg-[#F3E8FF] text-[#9333EA]' },
            Housing: { icon: 'home', color: 'bg-slate-100 text-slate-700' },
            Entertainment: { icon: 'sports_esports', color: 'bg-[#DCFCE7] text-[#16A34A]' },
            Health: { icon: 'ecg_heart', color: 'bg-[#FDE8E8] text-[#E02424]' }
        };
        return styles[cat] || { icon: 'receipt', color: 'bg-surface-variant text-on-surface-variant' };
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="font-body">
            {/* Header Section */}
            <header className="flex justify-between items-end mb-10 pl-1">
                <div>
                    <h2 className="font-headline text-[32px] font-extrabold tracking-tight text-on-surface">Expenses</h2>
                    <p className="text-on-surface-variant font-medium mt-1">Track your academic and personal spending with fluid precision. Manage your student budget effortlessly.</p>
                </div>
                <div>
                    <Link to="/dashboard/expenses/add" className="hidden md:flex bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-xl font-bold items-center gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-transform duration-300">
                        <span className="material-symbols-outlined">add_circle</span>
                        New Expense
                    </Link>
                </div>
            </header>

            {/* Filters & Tools Bento Grid */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
                {/* Search & Filters */}
                <div className="md:col-span-8 bg-surface-container-low p-6 rounded-2xl flex flex-wrap items-center gap-4">
                    <div className="flex-1 min-w-[240px] relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg">search</span>
                        <input 
                            className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-xl text-sm focus:ring-2 focus:ring-primary transition-all shadow-sm" 
                            placeholder="Search expenses..." 
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    setShowDateDropdown(!showDateDropdown);
                                    setShowCategoryDropdown(false);
                                }}
                                className="px-4 py-3 bg-surface-container-lowest rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm border border-outline-variant/15 hover:bg-surface-container-low transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                {dateFilter === 'all' && 'All Time'}
                                {dateFilter === 'this-month' && 'This Month'}
                                {dateFilter === 'last-month' && 'Last Month'}
                                {dateFilter === 'this-week' && 'This Week'}
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                            {showDateDropdown && (
                                <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-slate-100 rounded-xl shadow-lg z-30 overflow-hidden text-xs font-semibold py-1">
                                    <button 
                                        onClick={() => { setDateFilter('all'); setShowDateDropdown(false); }}
                                        className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer ${dateFilter === 'all' ? 'text-primary bg-blue-50/50' : 'text-[#475569]'}`}
                                    >
                                        All Time
                                    </button>
                                    <button 
                                        onClick={() => { setDateFilter('this-month'); setShowDateDropdown(false); }}
                                        className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer ${dateFilter === 'this-month' ? 'text-primary bg-blue-50/50' : 'text-[#475569]'}`}
                                    >
                                        This Month
                                    </button>
                                    <button 
                                        onClick={() => { setDateFilter('last-month'); setShowDateDropdown(false); }}
                                        className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer ${dateFilter === 'last-month' ? 'text-primary bg-blue-50/50' : 'text-[#475569]'}`}
                                    >
                                        Last Month
                                    </button>
                                    <button 
                                        onClick={() => { setDateFilter('this-week'); setShowDateDropdown(false); }}
                                        className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer ${dateFilter === 'this-week' ? 'text-primary bg-blue-50/50' : 'text-[#475569]'}`}
                                    >
                                        This Week
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    setShowCategoryDropdown(!showCategoryDropdown);
                                    setShowDateDropdown(false);
                                }}
                                className="px-4 py-3 bg-surface-container-lowest rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm border border-outline-variant/15 hover:bg-surface-container-low transition-colors"
                            >
                                <span className="material-symbols-outlined text-sm">filter_list</span>
                                {categoryFilter === 'all' ? 'All Categories' : categoryFilter}
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                            {showCategoryDropdown && (
                                <div className="absolute top-full left-0 mt-2 w-44 bg-white border border-slate-100 rounded-xl shadow-lg z-30 overflow-hidden text-xs font-semibold py-1">
                                    {['all', 'Food', 'Transport', 'Study', 'Housing', 'Entertainment', 'Health'].map((cat) => (
                                        <button 
                                            key={cat}
                                            onClick={() => { setCategoryFilter(cat); setShowCategoryDropdown(false); }}
                                            className={`w-full text-left px-4 py-2.5 hover:bg-slate-50 transition-colors border-none bg-transparent cursor-pointer ${categoryFilter === cat ? 'text-primary bg-blue-50/50' : 'text-[#475569]'}`}
                                        >
                                            {cat === 'all' ? 'All Categories' : cat}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="md:col-span-4 bg-primary text-on-primary p-6 rounded-2xl flex flex-col justify-between shadow-xl shadow-primary/10">
                    <span className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Total Monthly Spent</span>
                    <div className="flex items-baseline gap-2 mt-4">
                        <h3 className="text-3xl font-headline font-extrabold tracking-tight text-white">৳{monthlyTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
                        <span className="text-secondary-container text-xs font-bold flex items-center">
                            <span className="material-symbols-outlined text-xs">trending_down</span>
                            4%
                        </span>
                    </div>
                </div>
            </section>

            {/* Expense List (The Fluid List) */}
            <section className="bg-surface-container-low rounded-3xl overflow-hidden p-2">
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold border-b border-outline-variant/5">
                                <th className="px-8 py-6 whitespace-nowrap">Date</th>
                                <th className="px-6 py-6 whitespace-nowrap">Description</th>
                                <th className="px-6 py-6 whitespace-nowrap">Category</th>
                                <th className="px-6 py-6 text-right whitespace-nowrap">Amount</th>
                                <th className="px-8 py-6 text-center whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm font-body">
                            {filteredExpenses.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="py-8 text-center text-on-surface-variant font-semibold">No matching expenses found.</td>
                                </tr>
                            ) : (
                                filteredExpenses.map((expense) => {
                                    const style = getCategoryStyle(expense.category);
                                    return (
                                        <tr key={expense.id} className="group hover:bg-surface-container-low transition-colors">
                                            <td className="px-8 py-5 text-on-surface-variant font-medium whitespace-nowrap">
                                                {new Date(expense.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 min-w-10 rounded-xl bg-surface-container flex items-center justify-center">
                                                        <span className="material-symbols-outlined text-primary">{style.icon}</span>
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-bold text-on-surface">{expense.description || expense.category}</span>
                                                            {expense.receipt_url && (
                                                                <button 
                                                                    onClick={() => setSelectedReceipt(expense.receipt_url)}
                                                                    className="flex items-center text-primary hover:text-primary-dim transition-colors"
                                                                    title="View Receipt"
                                                                >
                                                                    <span className="material-symbols-outlined text-[16px] font-bold bg-[#EBF0FF] text-[#0050D4] p-1 rounded-lg">attachment</span>
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 whitespace-nowrap">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${style.color}`}>
                                                    {expense.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 text-right font-extrabold text-on-background whitespace-nowrap">
                                                -৳{parseFloat(expense.amount).toFixed(2)}
                                            </td>
                                            <td className="px-8 py-5 whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button 
                                                        onClick={() => expense.receipt_url ? setSelectedReceipt(expense.receipt_url) : setShowWarning(true)}
                                                        className="p-2 hover:bg-primary/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer" 
                                                        title="View Receipt"
                                                    >
                                                        <span className="material-symbols-outlined text-lg">visibility</span>
                                                    </button>
                                                    <button className="p-2 hover:bg-[#E02424]/10 rounded-lg text-on-surface-variant hover:text-[#E02424] transition-colors cursor-pointer" onClick={() => handleDelete(expense.id)} title="Delete">
                                                        <span className="material-symbols-outlined text-lg">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination/Footer of List */}
                <div className="px-8 py-6 flex flex-col md:flex-row gap-4 justify-between items-center text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    <span>Showing 1-{filteredExpenses.length} of {filteredExpenses.length} Expenses</span>
                    <div className="flex gap-2">
                        <button className="p-2 bg-surface-container-lowest rounded-lg hover:bg-primary hover:text-on-primary transition-colors shadow-sm focus:outline-none">
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button className="px-4 py-2 bg-primary text-on-primary rounded-lg shadow-sm focus:outline-none">1</button>
                        <button className="p-2 bg-surface-container-lowest rounded-lg hover:bg-primary hover:text-on-primary transition-colors shadow-sm focus:outline-none">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            </section>

            {selectedReceipt && (
                <ReceiptModal 
                    receiptUrl={selectedReceipt} 
                    onClose={() => setSelectedReceipt(null)} 
                />
            )}

            {showWarning && (
                <WarningModal 
                    onClose={() => setShowWarning(false)} 
                />
            )}
        </div>
    );
};

const ReceiptModal = ({ receiptUrl, onClose }) => {
    const [zoomScale, setZoomScale] = useState(1);

    const handleZoomIn = () => setZoomScale(prev => Math.min(prev + 0.25, 3));
    const handleZoomOut = () => setZoomScale(prev => Math.max(prev - 0.25, 0.5));
    const handleReset = () => setZoomScale(1);

    const fullUrl = `${api.defaults.baseURL || 'http://localhost:5000'}${receiptUrl}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-default" onClick={onClose}></div>
            
            {/* Modal Content */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden max-w-2xl w-full flex flex-col relative z-10 border border-slate-100 dark:border-slate-800 transition-all transform scale-100">
                
                {/* Modal Header */}
                <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-2xl">receipt_long</span>
                        <h3 className="font-headline text-lg font-bold text-on-surface mb-0">Receipt View</h3>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer flex items-center justify-center border-none bg-transparent"
                        title="Close"
                    >
                        <span className="material-symbols-outlined text-xl">close</span>
                    </button>
                </div>

                {/* Viewport */}
                <div className="relative overflow-auto max-h-[60vh] flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 min-h-[300px]">
                    <div 
                        style={{ 
                            transform: `scale(${zoomScale})`, 
                            transition: 'transform 0.2s ease-in-out',
                            transformOrigin: 'center center' 
                        }}
                        className="max-w-full flex items-center justify-center"
                    >
                        <img 
                            src={fullUrl} 
                            alt="Receipt Attachment" 
                            className="max-w-full max-h-[50vh] object-contain rounded-lg shadow-sm"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = 'https://placehold.co/600x400?text=Receipt+Not+Found';
                            }}
                        />
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="px-6 py-4 bg-slate-50 dark:bg-slate-900/50 flex flex-wrap justify-between items-center gap-4 border-t border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    {/* Zoom Buttons */}
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={handleZoomOut}
                            disabled={zoomScale <= 0.5}
                            className="p-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-primary hover:text-on-primary transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center border border-slate-200 dark:border-slate-700 text-on-surface"
                            title="Zoom Out"
                        >
                            <span className="material-symbols-outlined text-sm">zoom_out</span>
                        </button>
                        <span className="min-w-[45px] text-center text-[10px] text-on-surface">{Math.round(zoomScale * 100)}%</span>
                        <button 
                            onClick={handleZoomIn}
                            disabled={zoomScale >= 3}
                            className="p-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-primary hover:text-on-primary transition-colors shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center border border-slate-200 dark:border-slate-700 text-on-surface"
                            title="Zoom In"
                        >
                            <span className="material-symbols-outlined text-sm">zoom_in</span>
                        </button>
                        <button 
                            onClick={handleReset}
                            disabled={zoomScale === 1}
                            className="px-3 py-2 bg-white dark:bg-slate-800 rounded-lg hover:bg-primary hover:text-on-primary transition-colors shadow-sm disabled:opacity-50 cursor-pointer text-[10px] border border-slate-200 dark:border-slate-700 text-on-surface"
                        >
                            Reset
                        </button>
                    </div>

                    {/* Open External */}
                    <a 
                        href={fullUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-primary hover:text-primary-dim transition-colors text-[11px] no-underline"
                    >
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                        Open in New Tab
                    </a>
                </div>

            </div>
        </div>
    );
};

const WarningModal = ({ onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in">
            {/* Backdrop click to close */}
            <div className="absolute inset-0 cursor-default" onClick={onClose}></div>
            
            {/* Modal Content */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center text-center relative z-10 border border-slate-100 dark:border-slate-800 transition-all transform scale-100">
                <div className="w-16 h-16 bg-[#FEF3C7] dark:bg-amber-950/30 text-[#D97706] rounded-full flex items-center justify-center mb-5 shadow-sm">
                    <span className="material-symbols-outlined text-[32px]">warning</span>
                </div>
                <h4 className="font-headline text-lg font-bold text-on-surface mb-2">No Receipt Attached</h4>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                    This transaction was logged without an attached receipt image.
                </p>
                <button 
                    onClick={onClose}
                    className="w-full py-3.5 bg-primary text-on-primary font-headline font-bold text-sm rounded-xl hover:bg-primary-dim shadow-md transition-colors cursor-pointer border-none"
                >
                    Dismiss
                </button>
            </div>
        </div>
    );
};

export default Expenses;

