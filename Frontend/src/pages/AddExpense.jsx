import React from 'react';

const AddExpense = () => {
    return (
        <div className="flex flex-col flex-1 pb-10">
            <header className="sticky top-0 z-40 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl flex justify-between items-center px-6 md:px-8 py-6 shadow-sm rounded-xl mb-6">
                <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary">Expenses</h1>
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
                        <form className="space-y-8">
                            {/* Amount Field */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Amount</label>
                                <div className="relative flex items-center group">
                                    <span className="absolute left-6 text-2xl font-bold text-primary">$</span>
                                    <input 
                                        className="w-full pl-12 pr-6 py-5 bg-surface-container-low border-none rounded-xl text-4xl font-headline font-extrabold text-on-surface placeholder:text-outline-variant focus:ring-0 transition-all border-b-2 border-transparent focus:border-primary focus:bg-surface-container-low" 
                                        placeholder="0.00" 
                                        step="0.01" 
                                        type="number"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Category Field */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Category</label>
                                    <div className="relative">
                                        <select className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl appearance-none text-on-surface font-body font-medium focus:ring-2 focus:ring-primary/20 transition-all focus:bg-surface-container-low">
                                            <option value="food">Food & Dining</option>
                                            <option value="transport">Transport</option>
                                            <option value="study">Study Materials</option>
                                            <option value="housing">Housing</option>
                                            <option value="entertainment">Entertainment</option>
                                        </select>
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-on-surface-variant">expand_more</span>
                                    </div>
                                </div>
                                {/* Date Field */}
                                <div className="space-y-2">
                                    <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Date</label>
                                    <div className="relative">
                                        <input className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-on-surface font-body font-medium focus:ring-2 focus:ring-primary/20 transition-all focus:bg-surface-container-low" type="date"/>
                                    </div>
                                </div>
                            </div>
                            {/* Notes Field */}
                            <div className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant/70 ml-1">Description / Notes</label>
                                <textarea className="w-full px-5 py-4 bg-surface-container-low border-none rounded-xl text-on-surface font-body placeholder:text-outline-variant focus:ring-2 focus:ring-primary/20 transition-all focus:bg-surface-container-low resize-none" placeholder="What was this for?" rows="3"></textarea>
                            </div>
                            {/* Action Button */}
                            <button className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-headline font-bold text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-3" type="submit">
                                <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>add_circle</span>
                                Add Expense
                            </button>
                        </form>
                    </div>
                    {/* Contextual Info / Secondary Items */}
                    <div className="w-full lg:w-80 space-y-8">
                        {/* Receipt Preview */}
                        <div className="relative group rounded-xl overflow-hidden aspect-[4/3] shadow-xl">
                            <img alt="Receipt Upload" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbv2HXAXofwmQkE7p10Sin4ktp8hAVbl80HCHYkucqkjl_mA_r-kGWGXOr4THG-AUdofmUkikF0GKb3zgAYUAQrB9aMFfPPZ05GK2SxZBJyclaebpE61LOh-5i_H15-lXK37eXLGwCAk6Cpf9LbIruRN_EsISHFVPuP0Q6ZlPnz-zL8TqKrvnkQo2YQEVlmbarUePogEFdbefVdqYTn86pjezLEp-Pcg8mKqI-hbhyHJdMQyav8exO89d5mWkVY9EuHofQNgC0Lc0F"/>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                                <button className="flex items-center gap-2 bg-white/20 backdrop-blur-md text-white py-2 px-4 rounded-full border border-white/30 text-sm font-semibold hover:bg-white/30 transition-all self-start">
                                    <span className="material-symbols-outlined text-sm">camera_alt</span>Add Receipt
                                </button>
                            </div>
                        </div>
                        {/* Quick Tips */}
                        <div className="bg-primary/5 p-6 rounded-xl border border-primary/10 text-on-surface">
                            <div className="flex items-start gap-4">
                                <div className="p-2 bg-white rounded-lg text-primary shadow-sm.">
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
