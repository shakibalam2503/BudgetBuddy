import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddExpense = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [categories, setCategories] = useState([
        { value: 'Food', label: 'Food & Dining' },
        { value: 'Transport', label: 'Transport' },
        { value: 'Study', label: 'Study Materials' },
        { value: 'Housing', label: 'Housing' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Health', label: 'Health' }
    ]);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [notes, setNotes] = useState('');
    const [receiptUrl, setReceiptUrl] = useState('');
    const [uploadingReceipt, setUploadingReceipt] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchBudgetCategories = async () => {
            try {
                const res = await api.get('/api/budget');
                const budgetCategories = res.data.map(b => b.category);
                
                setCategories(prev => {
                    const combined = [...prev];
                    budgetCategories.forEach(cat => {
                        if (!combined.some(item => item.value === cat)) {
                            combined.push({ value: cat, label: cat });
                        }
                    });
                    return combined;
                });
            } catch (err) {
                console.error("Failed to load budget categories", err);
            }
        };
        fetchBudgetCategories();
    }, []);

    const handleReceiptChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 5 * 1024 * 1024) {
            setError('Receipt image must be smaller than 5MB.');
            return;
        }

        const formData = new FormData();
        formData.append('receipt', file);

        setUploadingReceipt(true);
        setError('');
        try {
            const response = await api.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setReceiptUrl(response.data.receipt_url);
        } catch (err) {
            console.error("Failed to upload receipt", err);
            setError(err.response?.data?.error || 'Failed to upload receipt.');
        } finally {
            setUploadingReceipt(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!amount || !category || !date) {
            setError('Please enter amount, category, and date.');
            return;
        }

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        setLoading(true);
        try {
            await api.post('/api/expenses', {
                category,
                amount: parsedAmount,
                date,
                description: notes,
                receipt_url: receiptUrl
            });
            navigate('/dashboard/expenses');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add expense.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 pb-10">
            <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-8 py-6 shadow-sm rounded-xl mb-6">
                <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary">Expenses</h1>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-on-surface-variant">
                        <button className="hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Focused Add Expense View */}
            <section className="flex-1 p-4 md:p-12 max-w-5xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
                    {/* Form Container */}
                    <div className="w-full lg:max-w-2xl bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0_20px_40px_rgba(40,43,81,0.06)] relative overflow-hidden text-on-surface">
                        {/* Subtle Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        <header className="mb-10">
                            <h2 className="text-2xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Add New Expense</h2>
                            <p className="text-on-surface-variant text-sm font-body">Log your latest spend to keep your academic budget on track.</p>
                        </header>

                        {error && (
                            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined">error</span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Amount Field */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Amount</label>
                                <div className="relative flex items-center group">
                                    <span className="absolute left-6 text-2xl font-bold text-primary">৳</span>
                                    <input 
                                        className="w-full pl-12 pr-6 py-5 bg-surface-container-low border-none rounded-xl text-4xl font-headline font-extrabold text-on-surface placeholder:text-outline-variant focus:ring-0 transition-all border-b-2 border-transparent focus:border-primary focus:bg-surface-container-low" 
                                        placeholder="0.00" 
                                        step="0.01" 
                                        type="number"
                                        required
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category Field */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Category</label>
                                    <div className="relative">
                                        <select 
                                            className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl appearance-none bg-[image:none] text-on-surface font-body font-medium focus:ring-2 focus:ring-primary/20 transition-all focus:bg-surface-container-low"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat.value} value={cat.value}>{cat.label}</option>
                                            ))}
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-on-surface-variant">expand_more</span>
                                    </div>
                                </div>
                                {/* Date Field */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Date</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-on-surface font-body font-medium focus:ring-2 focus:ring-primary/20 transition-all focus:bg-surface-container-low" 
                                            type="date"
                                            required
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Notes Field */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Description / Notes</label>
                                <textarea 
                                    className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-on-surface font-body placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 transition-all focus:bg-surface-container-low resize-none" 
                                    placeholder="What was this for?" 
                                    rows="3"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>
                            {/* Action Button */}
                            <button 
                                className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50" 
                                type="submit"
                                disabled={loading}
                            >
                                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>add_circle</span>
                                {loading ? 'Adding Expense...' : 'Add Expense'}
                            </button>
                        </form>
                    </div>
                    {/* Contextual Info / Secondary Items */}
                    <div className="w-full lg:w-80 space-y-8">
                        {/* Receipt Preview */}
                        <div className="relative group rounded-xl overflow-hidden aspect-[4/3] shadow-xl bg-slate-100 flex items-center justify-center border border-dashed border-slate-300">
                            <input 
                                type="file" 
                                ref={fileInputRef} 
                                onChange={handleReceiptChange} 
                                accept="image/*" 
                                className="hidden" 
                            />
                            {uploadingReceipt ? (
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                                    <span className="text-xs font-semibold text-primary">Uploading...</span>
                                </div>
                            ) : receiptUrl ? (
                                <>
                                    <img 
                                        alt="Receipt Preview" 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                        src={`${api.defaults.baseURL || 'http://localhost:5000'}${receiptUrl}`}
                                    />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="bg-white/80 hover:bg-white text-on-surface py-2 px-4 rounded-full text-xs font-bold shadow-md transition-colors"
                                        >
                                            Change Receipt
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center gap-3 p-6 text-center">
                                    <span className="material-symbols-outlined text-[36px] text-slate-400">receipt_long</span>
                                    <div>
                                        <p className="text-xs font-bold text-slate-700">No Receipt Added</p>
                                        <p className="text-[10px] text-slate-400 mt-0.5">Upload a picture to attach to this expense</p>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="flex items-center gap-2 bg-primary text-on-primary py-2 px-4 rounded-full text-xs font-bold shadow-md hover:bg-primary-dim transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">camera_alt</span>Add Receipt
                                    </button>
                                </div>
                            )}
                        </div>
                        {/* Quick Tips */}
                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 text-on-surface">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white rounded-lg text-primary shadow-sm">
                                    <span className="material-symbols-outlined">lightbulb</span>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-on-surface">Pro Tip</p>
                                    <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">Students who track expenses daily save an average of 22% more each semester.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddExpense;
