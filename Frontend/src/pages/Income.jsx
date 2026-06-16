import React, { useState, useEffect, useRef } from 'react';
import api from '../api';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Income = () => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const recentActivityRef = useRef(null);
    const [downloadingPDF, setDownloadingPDF] = useState(false);
    
    // Form States
    const [amount, setAmount] = useState('');
    const [source, setSource] = useState('');
    const [category, setCategory] = useState('Part-Time');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const fetchIncomes = async () => {
        try {
            const response = await api.get('/api/income');
            setIncomes(response.data);
        } catch (err) {
            console.error("Error fetching incomes", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!amount || !source || !date) {
            setError('Please fill out all fields');
            return;
        }

        try {
            const parsedAmount = parseFloat(amount);
            if (isNaN(parsedAmount) || parsedAmount <= 0) {
                setError('Please enter a valid amount');
                return;
            }

            await api.post('/api/income', {
                source,
                category,
                amount: parsedAmount,
                date
            });

            setSuccess('Income added to ledger successfully!');
            setAmount('');
            setSource('');
            fetchIncomes();
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to record income');
        }
    };

    const handleDownloadReport = async () => {
        if (incomes.length === 0 || !recentActivityRef.current) return;
        
        setDownloadingPDF(true);
        try {
            const element = recentActivityRef.current;
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgWidth = 190;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            
            const marginX = 10;
            const marginY = 15;
            
            pdf.setFont('helvetica', 'bold');
            pdf.setFontSize(16);
            pdf.setTextColor(0, 80, 212);
            pdf.text('BudgetBuddy', marginX, marginY);
            
            pdf.setFont('helvetica', 'normal');
            pdf.setFontSize(9);
            pdf.setTextColor(85, 88, 129);
            pdf.text('Academic Capital Ledger - Recent Activity Report', marginX, marginY + 5);
            pdf.text(`Generated on: ${new Date().toLocaleString()}`, 200 - marginX, marginY + 5, { align: 'right' });
            
            pdf.setDrawColor(217, 218, 255);
            pdf.setLineWidth(0.5);
            pdf.line(marginX, marginY + 8, 200 - marginX, marginY + 8);

            pdf.addImage(imgData, 'PNG', marginX, marginY + 12, imgWidth, imgHeight);
            
            pdf.save(`budgetbuddy_recent_activity_${Date.now()}.pdf`);
        } catch (err) {
            console.error("Failed to generate PDF report:", err);
            alert("An error occurred while generating the PDF report.");
        } finally {
            setDownloadingPDF(false);
        }
    };

    // Calculations
    const monthlyTotal = incomes.reduce((acc, inc) => acc + parseFloat(inc.amount), 0);
    const jobAmt = incomes.filter(i => i.category === 'Part-Time' || i.category === 'Part-time Job').reduce((acc, i) => acc + parseFloat(i.amount), 0);
    const scholarshipAmt = incomes.filter(i => i.category === 'Scholarship' || i.category === 'Education').reduce((acc, i) => acc + parseFloat(i.amount), 0);
    const freelanceAmt = incomes.filter(i => i.category === 'Freelance').reduce((acc, i) => acc + parseFloat(i.amount), 0);
    const allowanceAmt = incomes.filter(i => i.category === 'Allowance' || i.category === 'Support').reduce((acc, i) => acc + parseFloat(i.amount), 0);
    const otherAmt = Math.max(0, monthlyTotal - (jobAmt + scholarshipAmt + freelanceAmt + allowanceAmt));

    const jobPct = monthlyTotal > 0 ? Math.round((jobAmt / monthlyTotal) * 100) : 0;
    const scholarshipPct = monthlyTotal > 0 ? Math.round((scholarshipAmt / monthlyTotal) * 100) : 0;
    const freelancePct = monthlyTotal > 0 ? Math.round((freelanceAmt / monthlyTotal) * 100) : 0;
    const allowancePct = monthlyTotal > 0 ? Math.round((allowanceAmt / monthlyTotal) * 100) : 0;
    const otherPct = monthlyTotal > 0 ? Math.round((otherAmt / monthlyTotal) * 100) : 0;

    const circumference = 251.327;
    const incomeCategories = [
        { name: 'Part-time Job', amount: jobAmt, pct: jobPct, color: '#10B981' },
        { name: 'Scholarship', amount: scholarshipAmt, pct: scholarshipPct, color: '#3B82F6' },
        { name: 'Freelance', amount: freelanceAmt, pct: freelancePct, color: '#8B5CF6' },
        { name: 'Allowance', amount: allowanceAmt, pct: allowancePct, color: '#F59E0B' },
        { name: 'Other Income', amount: otherAmt, pct: otherPct, color: '#EC4899' }
    ];

    let cumulativePercent = 0;
    const incomeCircles = incomeCategories
        .filter(c => c.amount > 0)
        .map(item => {
            const dashArrayVal = (item.pct / 100) * circumference;
            const dashArray = `${dashArrayVal.toFixed(1)} ${(circumference - dashArrayVal).toFixed(1)}`;
            const dashOffsetVal = -(cumulativePercent / 100) * circumference;
            const dashOffset = dashOffsetVal.toFixed(1);
            cumulativePercent += item.pct;
            return {
                ...item,
                dashArray,
                dashOffset
            };
        });

    const getIcon = (cat) => {
        if (!cat) return 'payments';
        const lower = cat.toLowerCase();
        if (lower.includes('job') || lower.includes('work') || lower.includes('part-time')) return 'work';
        if (lower.includes('scholar') || lower.includes('edu')) return 'school';
        if (lower.includes('free') || lower.includes('gig')) return 'design_services';
        return 'account_tree';
    };

    const getIconColorClass = (cat) => {
        if (!cat) return 'bg-[#DAE8FF] text-[#3A70EF]';
        const lower = cat.toLowerCase();
        if (lower.includes('job') || lower.includes('work') || lower.includes('part-time')) return 'bg-[#61EDB0] text-[#187547]';
        if (lower.includes('scholar') || lower.includes('edu')) return 'bg-[#BEA9FF] text-white';
        if (lower.includes('free') || lower.includes('gig')) return 'bg-[#DAE8FF] text-[#3A70EF]';
        return 'bg-[#FDE2FE] text-[#B96BC2]';
    };

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[60vh]">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

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
                    <h3 className="font-headline text-[100px] font-bold leading-none mb-8 tracking-tight text-white">৳{monthlyTotal.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</h3>
                    <div className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-md px-4 py-2 rounded-full cursor-pointer">
                        <span className="material-symbols-outlined text-sm font-bold">trending_up</span>
                        <span className="text-[13px] font-bold">Academic Capital Flow</span>
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
                            <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="40" className="text-[#EDF1FA]" strokeWidth="10" fill="none" stroke="currentColor"/>
                                {incomeCircles.length === 0 ? (
                                    <circle cx="50" cy="50" r="40" className="text-[#94A3B8]" strokeWidth="10" fill="none" stroke="currentColor"/>
                                ) : (
                                    incomeCircles.map((circle, idx) => (
                                        <circle 
                                            key={idx}
                                            cx="50" 
                                            cy="50" 
                                            r="40" 
                                            stroke={circle.color} 
                                            strokeWidth="10" 
                                            fill="none" 
                                            strokeDasharray={circle.dashArray} 
                                            strokeDashoffset={circle.dashOffset}
                                            className="transition-all duration-300"
                                        />
                                    ))
                                )}
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                                <span className="text-[18px] font-headline font-extrabold text-[#212435]">
                                    ৳{monthlyTotal.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                                </span>
                                <span className="text-[8px] font-bold text-[#64748B] uppercase tracking-[0.1em]">Total</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="space-y-4 max-w-[260px] mx-auto w-full mt-auto">
                        {incomeCategories.map((cat, idx) => (
                            <div key={idx} className="flex justify-between items-center text-[13px]">
                                <div className="flex items-center gap-2.5 text-[#5D647E] font-medium">
                                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></div>
                                    {cat.name} ({cat.pct}%)
                                </div>
                                <div className="font-bold text-[#2D334A] font-semibold">৳{cat.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Left: Log New Income */}
                <div className="lg:col-span-4 bg-white rounded-[24px] p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
                    <h4 className="font-headline font-bold text-lg text-[#2D334A] flex items-center gap-2.5 mb-8">
                        <span className="material-symbols-outlined text-[#3A70EF]">add_circle</span>
                        Log New Income
                    </h4>
                    
                    {error && <div className="mb-4 text-xs font-bold text-error bg-error-container p-3 rounded-lg">{error}</div>}
                    {success && <div className="mb-4 text-xs font-bold text-secondary bg-secondary-container p-3 rounded-lg">{success}</div>}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[11px] font-bold text-[#5D647E] uppercase tracking-widest mb-3">Source Name</label>
                            <input 
                                className="w-full bg-[#F3F4FB] text-[#2D334A] font-semibold px-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-shadow" 
                                type="text" 
                                placeholder="e.g. Library Desk Assistant" 
                                required
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold text-[#5D647E] uppercase tracking-widest mb-3">Amount (৳)</label>
                            <input 
                                className="w-full bg-[#F3F4FB] text-[#2D334A] font-semibold px-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-shadow" 
                                type="number" 
                                placeholder="0.00" 
                                step="0.01"
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </div>
                        
                        <div>
                            <label className="block text-[11px] font-bold text-[#5D647E] uppercase tracking-widest mb-3">Category</label>
                            <div className="relative">
                                <select 
                                    className="w-full bg-[#F3F4FB] bg-none text-[#2D334A] font-semibold px-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none appearance-none pr-10 cursor-pointer"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="Part-Time">Part-time Job</option>
                                    <option value="Scholarship">Scholarship</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Allowance">Allowance</option>
                                    <option value="Other">Other</option>
                                </select>
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-[#5D647E] pointer-events-none">expand_more</span>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-[11px] font-bold text-[#5D647E] uppercase tracking-widest mb-3">Transaction Date</label>
                            <input 
                                className="w-full bg-[#F3F4FB] text-[#2D334A] font-semibold px-4 py-4 rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-shadow" 
                                type="date" 
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        
                        <button className="w-full bg-[#5284FE] hover:bg-[#3D6CE5] text-white font-bold py-4 rounded-xl transition-all shadow-[0_8px_16px_rgba(82,132,254,0.25)] flex justify-center items-center gap-2 mt-4" type="submit">
                            Add to Ledger <span className="material-symbols-outlined text-[18px] font-bold">arrow_forward</span>
                        </button>
                    </form>
                </div>

                {/* Bottom Right: Recent Activity */}
                <div ref={recentActivityRef} className="lg:col-span-8 bg-white rounded-[24px] p-8 shadow-[0px_4px_24px_rgba(0,0,0,0.02)]">
                    <div className="flex justify-between items-center mb-8">
                        <h4 className="font-headline font-bold text-lg text-[#2D334A]">Recent Activity</h4>
                        <button 
                            onClick={handleDownloadReport}
                            disabled={incomes.length === 0 || downloadingPDF}
                            className="text-[#3A70EF] font-bold text-[13px] hover:underline flex items-center gap-1 tracking-wide disabled:opacity-50 disabled:no-underline cursor-pointer border-none bg-transparent flex items-center"
                        >
                            {downloadingPDF ? (
                                <>
                                    <span className="w-3.5 h-3.5 border-2 border-[#3A70EF] border-t-transparent rounded-full animate-spin mr-1.5 inline-block"></span>
                                    Generating PDF...
                                </>
                            ) : (
                                <>
                                    Download Report <span className="material-symbols-outlined text-[16px] ml-1">download</span>
                                </>
                            )}
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
                                {incomes.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="py-8 text-center text-on-surface-variant font-semibold">No income transactions found</td>
                                    </tr>
                                ) : (
                                    incomes.map((inc) => (
                                        <tr key={inc.id} className="border-b border-[#F8FAFC]">
                                            <td className="py-5 text-sm font-semibold text-[#2D334A]">
                                                {new Date(inc.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="py-5 text-sm font-bold text-[#2D334A] flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl ${getIconColorClass(inc.category)} flex items-center justify-center`}>
                                                    <span className="material-symbols-outlined text-[18px]">{getIcon(inc.category)}</span>
                                                </div>
                                                {inc.source}
                                            </td>
                                            <td className="py-5">
                                                <div className="inline-flex bg-[#EBF0FF] text-[#5569AC] text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                                                    {inc.category || 'Other'}
                                                </div>
                                            </td>
                                            <td className="py-5 text-[15px] font-bold text-[#118A4A] text-right">+৳{parseFloat(inc.amount).toFixed(2)}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Income;
