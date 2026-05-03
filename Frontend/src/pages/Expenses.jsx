import React from 'react';
import { Link } from 'react-router-dom';

const Expenses = () => {
    const expenses = [
        { id: 1, date: 'Oct 24, 2024', desc: 'Starbucks Reserve', category: 'Food & Drink', categoryColor: 'bg-secondary-container text-on-secondary-container', amount: '-$12.45', icon: 'coffee' },
        { id: 2, date: 'Oct 22, 2024', desc: 'University Bookstore - Math 101', category: 'Study', categoryColor: 'bg-tertiary-container text-on-tertiary-container', amount: '-$184.00', icon: 'menu_book' },
        { id: 3, date: 'Oct 20, 2024', desc: 'Monthly Rent - Campus Heights', category: 'Housing', categoryColor: 'bg-surface-variant text-on-surface-variant', amount: '-$850.00', icon: 'home' },
        { id: 4, date: 'Oct 18, 2024', desc: 'Monthly Bus Pass', category: 'Transport', categoryColor: 'bg-primary-container text-on-primary-container', amount: '-$45.00', icon: 'directions_bus' },
        { id: 5, date: 'Oct 15, 2024', desc: 'Entertainment Subscription', category: 'Life', categoryColor: 'bg-secondary-container text-on-secondary-container', amount: '-$14.99', icon: 'sports_esports' },
    ];

    return (
        <div className="font-body">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="space-y-2">
                    <nav className="flex text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
                        <span>Finances</span>
                        <span className="mx-2">/</span>
                        <span className="text-primary">Expenses</span>
                    </nav>
                    <h2 className="text-5xl md:text-6xl font-headline font-extrabold tracking-tight text-on-background">Expenses</h2>
                    <p className="text-on-surface-variant max-w-md font-body">Track your academic and personal spending with fluid precision. Manage your student budget effortlessly.</p>
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
                        <input className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border-none rounded-xl text-sm focus:ring-2 focus:ring-primary transition-all shadow-sm" placeholder="Search expenses..." type="text"/>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative group">
                            <button className="px-4 py-3 bg-surface-container-lowest rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm border border-outline-variant/15">
                                <span className="material-symbols-outlined text-sm">calendar_today</span>
                                This Month
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                        </div>
                        <div className="relative group">
                            <button className="px-4 py-3 bg-surface-container-lowest rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm border border-outline-variant/15">
                                <span className="material-symbols-outlined text-sm">filter_list</span>
                                All Categories
                                <span className="material-symbols-outlined text-sm">expand_more</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="md:col-span-4 bg-primary text-on-primary p-6 rounded-2xl flex flex-col justify-between shadow-xl shadow-primary/10">
                    <span className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Total Monthly Spent</span>
                    <div className="flex items-baseline gap-2 mt-4">
                        <h3 className="text-3xl font-headline font-extrabold tracking-tight text-white">$1,420.50</h3>
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
                            {expenses.map((expense) => (
                                <tr key={expense.id} className="group hover:bg-surface-container-low transition-colors">
                                    <td className="px-8 py-5 text-on-surface-variant font-medium whitespace-nowrap">{expense.date}</td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 min-w-10 rounded-xl bg-surface-container flex items-center justify-center">
                                                <span className="material-symbols-outlined text-primary">{expense.icon}</span>
                                            </div>
                                            <span className="font-bold text-on-surface">{expense.desc}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${expense.categoryColor}`}>
                                            {expense.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 text-right font-extrabold text-on-background whitespace-nowrap">{expense.amount}</td>
                                    <td className="px-8 py-5 whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-2">
                                            <button className="p-2 hover:bg-primary/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer" title="View">
                                                <span className="material-symbols-outlined text-lg">visibility</span>
                                            </button>
                                            <button className="p-2 hover:bg-primary/10 rounded-lg text-on-surface-variant hover:text-primary transition-colors cursor-pointer" title="Edit">
                                                <span className="material-symbols-outlined text-lg">edit</span>
                                            </button>
                                            <button className="p-2 hover:bg-error/10 rounded-lg text-on-surface-variant hover:text-error transition-colors cursor-pointer" title="Delete">
                                                <span className="material-symbols-outlined text-lg">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                {/* Pagination/Footer of List */}
                <div className="px-8 py-6 flex flex-col md:flex-row gap-4 justify-between items-center text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    <span>Showing 1-5 of 42 Expenses</span>
                    <div className="flex gap-2">
                        <button className="p-2 bg-surface-container-lowest rounded-lg hover:bg-primary hover:text-on-primary transition-colors shadow-sm focus:outline-none">
                            <span className="material-symbols-outlined text-sm">chevron_left</span>
                        </button>
                        <button className="px-4 py-2 bg-primary text-on-primary rounded-lg shadow-sm focus:outline-none">1</button>
                        <button className="px-4 py-2 bg-surface-container-lowest rounded-lg hover:bg-white transition-colors shadow-sm focus:outline-none">2</button>
                        <button className="px-4 py-2 bg-surface-container-lowest rounded-lg hover:bg-white transition-colors shadow-sm focus:outline-none">3</button>
                        <button className="p-2 bg-surface-container-lowest rounded-lg hover:bg-primary hover:text-on-primary transition-colors shadow-sm focus:outline-none">
                            <span className="material-symbols-outlined text-sm">chevron_right</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Expenses;
