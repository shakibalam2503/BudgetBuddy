import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const AddSavings = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [goalId, setGoalId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [source, setSource] = useState('paycheck');
    const [notes, setNotes] = useState('');
    const [goals, setGoals] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await api.get('/api/goals');
                // Only saving to active goals where target not fully reached yet
                const active = response.data.filter(g => parseFloat(g.current_amount) < parseFloat(g.target_amount));
                setGoals(active);
                if (active.length > 0) {
                    setGoalId(active[0].id);
                }
            } catch (err) {
                console.error("Error fetching goals", err);
            }
        };

        fetchGoals();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!amount || !goalId || !date) {
            setError('Please enter amount, select a goal, and enter date.');
            return;
        }

        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            setError('Please enter a valid amount.');
            return;
        }

        setLoading(true);
        try {
            await api.post(`/api/goals/${goalId}/savings`, {
                amount: parsedAmount
            });
            // We can also record this as a special transaction or ledger note if desired, but updating the goal amount directly is the API design
            navigate('/dashboard/goals');
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to add savings.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 pb-10">
            <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-8 py-6 shadow-sm rounded-xl mb-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/dashboard/goals')} className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors text-on-surface-variant">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary">Add Savings</h1>
                </div>
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-4 text-on-surface-variant">
                        <button className="hover:opacity-80 transition-opacity">
                            <span className="material-symbols-outlined">help_outline</span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Focused Add Savings View */}
            <section className="flex-1 p-4 md:p-12 max-w-5xl mx-auto w-full">
                <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
                    {/* Form Container */}
                    <div className="w-full lg:max-w-2xl bg-surface-container-lowest p-8 md:p-10 rounded-xl shadow-[0_20px_40px_rgba(40,43,81,0.06)] relative overflow-hidden text-on-surface">
                        {/* Subtle Background Decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#10B981]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                        <header className="mb-10">
                            <h2 className="text-2xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Deposit Savings</h2>
                            <p className="text-on-surface-variant text-sm font-body">Record your recent savings to see your progress update.</p>
                        </header>

                        {error && (
                            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined">error</span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Amount Field */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Amount to Add</label>
                                    <div className="relative flex items-center group">
                                        <span className="absolute left-5 text-xl font-bold text-[#10B981]">৳</span>
                                        <input 
                                            className="w-full pl-10 pr-5 py-4 bg-surface-container-low border-none rounded-xl text-xl font-headline font-bold text-on-surface placeholder:text-outline-variant focus:ring-0 transition-all border-b-2 border-transparent focus:border-[#10B981] focus:bg-surface-container-low" 
                                            placeholder="0.00" 
                                            step="0.01" 
                                            type="number"
                                            required
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Goal Field */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Select Goal</label>
                                    <div className="relative">
                                        <select 
                                            className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl appearance-none bg-[image:none] text-on-surface font-body font-medium focus:ring-2 focus:ring-[#10B981]/20 transition-all focus:bg-surface-container-low" 
                                            required
                                            value={goalId}
                                            onChange={(e) => setGoalId(e.target.value)}
                                        >
                                            {goals.length === 0 ? (
                                                <option value="" disabled>No active goals found...</option>
                                            ) : (
                                                goals.map((g) => (
                                                    <option key={g.id} value={g.id}>{g.name} (৳{parseFloat(g.current_amount).toLocaleString()} / ৳{parseFloat(g.target_amount).toLocaleString()})</option>
                                                ))
                                            )}
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-on-surface-variant">expand_more</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Date Field */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Date</label>
                                    <div className="relative">
                                        <input 
                                            className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-on-surface font-body font-medium focus:ring-2 focus:ring-[#10B981]/20 transition-all focus:bg-surface-container-low" 
                                            type="date"
                                            required
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                {/* Source Field */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Source</label>
                                    <div className="relative">
                                        <select 
                                            className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl appearance-none bg-[image:none] text-on-surface font-body font-medium focus:ring-2 focus:ring-[#10B981]/20 transition-all focus:bg-surface-container-low"
                                            value={source}
                                            onChange={(e) => setSource(e.target.value)}
                                        >
                                            <option value="paycheck">Paycheck</option>
                                            <option value="freelance">Freelance/Side Hustle</option>
                                            <option value="gift">Gift</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-on-surface-variant">expand_more</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Notes Field */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Notes</label>
                                <textarea 
                                    className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-on-surface font-body placeholder:text-outline-variant focus:ring-2 focus:ring-[#10B981]/20 transition-all focus:bg-surface-container-low resize-none" 
                                    placeholder="Any details..." 
                                    rows="2"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>
                            
                            {/* Action Button */}
                            <button 
                                className="w-full py-5 bg-[#10B981] text-white font-headline font-bold text-lg rounded-xl shadow-lg shadow-[#10B981]/30 hover:scale-[1.01] active:scale-95 hover:bg-[#059669] transition-all flex items-center justify-center gap-3 disabled:opacity-50" 
                                type="submit"
                                disabled={loading || goals.length === 0}
                            >
                                <span className="material-symbols-outlined text-white" style={{fontVariationSettings: "'FILL' 1"}}>add_circle</span>
                                {loading ? 'Depositing Savings...' : 'Add Savings'}
                            </button>
                        </form>
                    </div>

                    {/* Contextual Info / Secondary Items */}
                    <div className="w-full lg:w-80 space-y-8">
                        <div className="bg-[#ECFDF5] rounded-[32px] p-8 border border-[#D1FAE5] flex flex-col items-center shadow-sm">
                            <div className="w-full flex items-center gap-2 mb-6">
                                <span className="material-symbols-outlined text-[#10B981] text-[20px]">emoji_events</span>
                                <h4 className="font-headline font-bold text-[#065F46] text-[16px]">Consistency Matters</h4>
                            </div>
                            <p className="text-[13px] text-[#047857] leading-relaxed font-medium mb-4">
                                Smaller, frequent saving transactions are better than waiting to make a large one. You're building a habit!
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AddSavings;
