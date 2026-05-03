import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="bg-surface text-on-surface selection:bg-primary-container selection:text-on-primary-container font-body">
            {/* TopNavBar */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-[0px_20px_40px_rgba(40,43,81,0.06)]">
                <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                    <div className="text-2xl font-bold tracking-tight text-slate-900 font-headline">
                        BudgetBuddy
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-blue-600 font-semibold border-b-2 border-blue-600 text-sm">Home</Link>
                        <a className="text-slate-600 hover:text-blue-500 transition-colors text-sm font-medium" href="#">Features</a>
                        <a className="text-slate-600 hover:text-blue-500 transition-colors text-sm font-medium" href="#">About</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/signin" className="text-slate-600 hover:text-blue-600 text-sm font-semibold transition-all duration-200">Log In</Link>
                        <Link to="/signup" className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-6 py-2.5 rounded-md font-semibold text-sm hover:scale-95 duration-150 ease-in-out inline-block">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="pt-24 overflow-hidden">
                {/* Hero Section Redesign */}
                <section className="relative max-w-7xl mx-auto px-8 pt-12 pb-24 lg:pt-20 lg:pb-32">
                    {/* Background Decorative Blob */}
                    <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] -z-10"></div>
                    
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-7 space-y-10 relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
                                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                                Revolutionizing Student Finance
                            </div>
                            
                            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] text-on-surface font-headline">
                                Own Your <br/>
                                <span className="text-gradient">Financial Future.</span>
                            </h1>
                            
                            <p className="text-on-surface-variant text-xl md:text-2xl leading-relaxed max-w-2xl">
                                The all-in-one platform built for students to crush debt, automate savings, and master their money before graduation.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                                <Link to="/signup" className="w-full sm:w-auto bg-primary text-on-primary px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 text-center">
                                    Start Tracking Now
                                </Link>
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        <img alt="User" className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBrNB0vFfH00m-lG5pbXVZuVwTcamdVAiwzb3NlSSCYVwhM0_epFXLhPTbiZLRG26_OpUsgTGZ27cvjcmAb6RneVNiiVUb6qHTlf9-MCrv8qNjvz6plf3J0_WWk5dD6zZWMY_yIzcucjJmM-piErxVtnwoe4nJdwQVT18kLMToWKVrGTVlFiO14vjFf8QH81jSVT4RXTXpsxs-ov4AarD7S3hCs9Stq8BE15LxeXDX2ylbOepNKTe_SVzF9Bq07Y46tBGFrStQRsxBW"/>
                                        <img alt="User" className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_wqHb0vLs7aYo-NiH0CjR_oAn2orH6c_ZfqQU5TvscM9e6NG5Pj4A-ABTEh77uZ6-uuk_oQl6FVIjBMzbs8CAZxe1drdFQEJnaq1Paisn5feBTt0O-oE9U9xoncwfRx4Qzt84A5v8YeH_OcNLKuBKLjzDLACiNHmF3OFl9rGY19UC64Ama-x8GXhlb932hrUt6oKsIGbdVN8fSgGoNak6jMEby-G6aGGIFfHAe8AP5lxoea87BeJe04oNUHqhCucy85oRAUucc8c9"/>
                                        <img alt="User" className="w-12 h-12 rounded-full border-4 border-white object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdgfeCQmRPXgApF33j6QEffCC9xrtbwSvx2p6-hbRgm7PDireyzB_P1YgPyC80poQGw4AZoK2h7W02BQu_DZgaUABqT_Xn6K94TYGvEiUys9ijEQ-UwVbXFAm01sIDcNmrmhB6AS2hZ3--c3NuUvhm1bnlkb7oTxD9103NMzlLsvxJg0dN8nW1AUlgW_KPd3dtgSLOmzRoqwYaoCAzb8qkoLtlhJUuQQe3cEYCEWzNDhWOn0S-iRMtFExtgqQod89wjwhG3L8AJ6Vb"/>
                                        <div className="w-12 h-12 rounded-full border-4 border-white bg-surface-container flex items-center justify-center text-[10px] font-bold">+12k</div>
                                    </div>
                                    <p className="text-sm font-medium text-on-surface-variant">Trusted by 500k+ students</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-5 relative">
                            {/* Main Impact Visual */}
                            <div className="relative z-20 transform lg:translate-x-12">
                                <div className="bg-white rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,80,212,0.15)] overflow-hidden p-3 border border-primary/10">
                                    <img alt="Student Finance Visual" className="rounded-[2rem] w-full h-auto aspect-[4/5] object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcTsQ9VsUySVXHg0MWz1Isw338cDkuBU2MK37FTDD9v32v0no88SL5eemTTaqGpZzHP0AUlEv2dYVYr7APnH-n9Npd8BZNrzc-XAjmQHlILOH80hSRdzjv52Y3LwMv3s_wZNWZfNGXZSWlg-6IPTwVpBgDx3GF_6FRhK6h2cvQ3K8KIcfGmNabxsiuyMTA6jrgCwdb7xL_YLKgupPHwAlgXFWyJBT99RO6pIXKDIpAnEvE77c68sPzZ4sfC0TW0bLgXcXWlR7mlAic"/>
                                </div>
                                {/* Overlapping Dashboard Element */}
                                <div className="absolute -bottom-10 -left-12 bg-white/90 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 w-72 animate-bounce-slow hidden md:block">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-10 h-10 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
                                            <span className="material-symbols-outlined">payments</span>
                                        </div>
                                        <span className="text-xs font-bold text-secondary uppercase tracking-wider font-headline">Weekly Goal</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm font-bold">
                                            <span>Food Budget</span>
                                            <span>$42.50 / $80</span>
                                        </div>
                                        <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                                            <div className="h-full bg-secondary w-[53%] rounded-full"></div>
                                        </div>
                                    </div>
                                </div>
                                {/* Floating Badge */}
                                <div className="absolute -top-8 -right-4 bg-primary text-on-primary px-6 py-4 rounded-2xl shadow-xl transform rotate-12 hidden lg:block">
                                    <div className="text-2xl font-black italic font-headline">GEN-Z</div>
                                    <div className="text-[10px] uppercase font-bold tracking-tighter opacity-80">Banking Reimagined</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bento Grid Dashboard Features */}
                <section className="max-w-7xl mx-auto px-8 py-24">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-extrabold text-on-surface mb-4 font-headline">Your Financial Atelier</h2>
                        <p className="text-on-surface-variant max-w-2xl mx-auto">Everything you need to manage student life in one fluid dashboard. No lines, no clutter, just clarity.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {/* Expense Tracking Card */}
                        <div className="md:col-span-8 bg-surface-container-low rounded-[2rem] p-10 flex flex-col justify-between overflow-hidden relative group">
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-4 font-headline">Expense Tracking</h3>
                                <p className="text-on-surface-variant max-w-sm mb-8">Automatically categorize your spending from textbooks to late-night pizza. Real-time updates every time you swipe.</p>
                                <div className="space-y-3">
                                    <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-error-container rounded-full flex items-center justify-center text-on-error-container">
                                                <span className="material-symbols-outlined">restaurant</span>
                                            </div>
                                            <div>
                                                <div className="font-bold">Chipotle Grill</div>
                                                <div className="text-xs text-on-surface-variant">Food & Dining • Today</div>
                                            </div>
                                        </div>
                                        <div className="font-bold text-error">-$14.50</div>
                                    </div>
                                    <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center text-on-primary-container">
                                                <span className="material-symbols-outlined">school</span>
                                            </div>
                                            <div>
                                                <div className="font-bold">Campus Bookstore</div>
                                                <div className="text-xs text-on-surface-variant">Education • Yesterday</div>
                                            </div>
                                        </div>
                                        <div className="font-bold text-on-surface">-$182.00</div>
                                    </div>
                                </div>
                            </div>
                            <div className="absolute right-0 bottom-0 opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="material-symbols-outlined text-[15rem]" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                            </div>
                        </div>
                        {/* Savings Progress Card */}
                        <div className="md:col-span-4 bg-primary text-on-primary rounded-[2rem] p-10 flex flex-col gap-8">
                            <div>
                                <h3 className="text-2xl font-bold mb-2 font-headline">Savings Goals</h3>
                                <p className="text-on-primary/80 text-sm">Smart goals that adapt to your spending patterns.</p>
                            </div>
                            <div className="space-y-8">
                                <div>
                                    <div className="flex justify-between mb-3 text-sm">
                                        <span>Spring Break Trip</span>
                                        <span className="font-bold">75%</span>
                                    </div>
                                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary-fixed rounded-full" style={{ width: '75%' }}></div>
                                    </div>
                                    <div className="mt-2 text-xs opacity-70">$1,500 of $2,000 saved</div>
                                </div>
                                <div>
                                    <div className="flex justify-between mb-3 text-sm">
                                        <span>New MacBook Pro</span>
                                        <span className="font-bold">40%</span>
                                    </div>
                                    <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                                        <div className="h-full bg-secondary-fixed rounded-full" style={{ width: '40%' }}></div>
                                    </div>
                                    <div className="mt-2 text-xs opacity-70">$800 of $2,000 saved</div>
                                </div>
                            </div>
                            <button className="mt-auto bg-surface-container-lowest text-primary py-4 rounded-xl font-bold text-center">
                                Add New Goal
                            </button>
                        </div>
                        {/* Monthly Budget Visualization */}
                        <div className="md:col-span-5 bg-surface-container-high rounded-[2rem] p-10">
                            <h3 className="text-2xl font-bold mb-8 font-headline">Monthly Budget</h3>
                            <div className="flex flex-col items-center">
                                <div className="relative w-48 h-48 mb-8">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle className="text-surface-container" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeWidth="24"></circle>
                                        <circle className="text-secondary" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502.4" strokeDashoffset="150" strokeLinecap="round" strokeWidth="24"></circle>
                                        <circle className="text-primary" cx="96" cy="96" fill="transparent" r="80" stroke="currentColor" strokeDasharray="502.4" strokeDashoffset="400" strokeLinecap="round" strokeWidth="24"></circle>
                                    </svg>
                                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                                        <span className="text-3xl font-extrabold text-on-surface font-headline">$2.4k</span>
                                        <span className="text-xs text-on-surface-variant font-bold uppercase tracking-widest">Spent</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="bg-surface-container-lowest p-4 rounded-xl">
                                        <div className="text-xs font-bold text-primary uppercase mb-1">Fixed</div>
                                        <div className="text-lg font-bold p-0">$1,200</div>
                                    </div>
                                    <div className="bg-surface-container-lowest p-4 rounded-xl">
                                        <div className="text-xs font-bold text-secondary uppercase mb-1">Flexible</div>
                                        <div className="text-lg font-bold p-0">$840</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Insights Section */}
                        <div className="md:col-span-7 bg-surface-container-lowest rounded-[2rem] p-10 shadow-[0px_20px_40px_rgba(40,43,81,0.06)] flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="material-symbols-outlined text-primary">lightbulb</span>
                                    <h3 className="text-2xl font-bold font-headline">Smart Insights</h3>
                                </div>
                                <p className="text-on-surface-variant mb-8">Our AI analyzes your habits to find hidden savings. This month, you could have saved an extra $45 by brewing coffee at home.</p>
                                <div className="space-y-6">
                                    <div className="flex gap-4 p-4 hover:bg-surface-container-low rounded-2xl transition-colors group cursor-pointer">
                                        <div className="shrink-0 w-12 h-12 bg-secondary-container rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined">trending_down</span>
                                        </div>
                                        <div>
                                            <div className="font-bold group-hover:text-primary transition-colors">Subscription Audit</div>
                                            <div className="text-sm text-on-surface-variant">You have 3 inactive streaming services costing you $32/mo.</div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 p-4 hover:bg-surface-container-low rounded-2xl transition-colors group cursor-pointer">
                                        <div className="shrink-0 w-12 h-12 bg-tertiary-container rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined">celebration</span>
                                        </div>
                                        <div>
                                            <div className="font-bold group-hover:text-primary transition-colors">Goal Milestone</div>
                                            <div className="text-sm text-on-surface-variant">You're on track to hit your 'Europe Trip' goal 2 months early!</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Link to="/dashboard" className="mt-8 text-primary font-bold flex items-center gap-2 hover:translate-x-1 transition-transform inline-flex">
                                Explore All Insights <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Lifestyle Section */}
                <section className="bg-surface-container-lowest py-24 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <img alt="Students collaborating" className="rounded-[2.5rem] w-full aspect-[4/5] object-cover shadow-2xl" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8KukKNIyVzVIr-qLdCIHyTdBME-z1HRod3RIlf3uclR5klEtOki9JvSXXOBsAOd445_Bzk3Ne6M4s_qZsDJOxJ9X5dK8RVJYNc8LVbbvOWawQFE72m7fLykyDzpBnbZG8Uz5TvxQ-NBnt95FfqtCZXrtkfRAZcXFkeVmu2lgYxtBnbuoFyzjTYQhHEDsAy0A8Ya63rUAt76-72_Fv3ZdoVgAKDRZu5yp2C-x9HbT_8N58qwUCAelcxDn2U1cAfDtVY48_FQP-egze"/>
                            <div className="absolute -top-10 -right-10 bg-secondary-container p-8 rounded-[2rem] shadow-xl max-w-[200px] text-center">
                                <div className="text-4xl font-extrabold text-on-secondary-container mb-2 font-headline">98%</div>
                                <div className="text-xs font-bold uppercase tracking-tighter text-on-secondary-container/80">Student Satisfaction</div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <h2 className="text-5xl font-extrabold text-on-surface font-headline">Designed for the Hustle.</h2>
                            <p className="text-xl text-on-surface-variant leading-relaxed">
                                Being a student is hard. Managing your money shouldn't be. BudgetBuddy was built by former students who were tired of banking apps that felt like taxes. 
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-secondary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    <span className="font-bold text-lg">Zero Hidden Fees</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-secondary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    <span className="font-bold text-lg">Instant P2P Transfers</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="material-symbols-outlined text-secondary text-3xl" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                                    <span className="font-bold text-lg">Smart Loan Refinancing</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="max-w-7xl mx-auto px-8 py-24">
                    <div className="bg-primary-container rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden">
                        <div className="relative z-10 space-y-8">
                            <h2 className="text-4xl lg:text-6xl font-extrabold text-on-primary-container max-w-4xl mx-auto font-headline">Ready to master your financial future?</h2>
                            <p className="text-on-primary-container/80 text-xl max-w-2xl mx-auto">Join over 500,000 students who are taking control of their money with BudgetBuddy.</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link to="/signup" className="bg-on-primary-container text-surface-container-lowest px-10 py-5 rounded-2xl font-bold text-xl hover:scale-105 transition-transform">
                                    Create Your Free Account
                                </Link>
                            </div>
                        </div>
                        {/* Abstract decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-slate-50 w-full py-12 px-8 font-body">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto border-t border-slate-200/15 pt-12">
                    <div className="space-y-4">
                        <div className="text-lg font-bold text-slate-900 font-headline">BudgetBuddy</div>
                        <p className="text-slate-500 text-sm leading-relaxed">© 2024 BudgetBuddy. Empowering student financial freedom.</p>
                    </div>
                    <div>
                        <h4 className="text-slate-900 font-bold mb-4">Product</h4>
                        <ul className="space-y-2">
                            <li><a className="text-slate-500 hover:text-blue-600 transition-all text-xs uppercase tracking-wider font-semibold" href="#">Features</a></li>
                            <li><a className="text-slate-500 hover:text-blue-600 transition-all text-xs uppercase tracking-wider font-semibold" href="#">Security</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-slate-900 font-bold mb-4">Company</h4>
                        <ul className="space-y-2">
                            <li><a className="text-slate-500 hover:text-blue-600 transition-all text-xs uppercase tracking-wider font-semibold" href="#">About Us</a></li>
                            <li><a className="text-slate-500 hover:text-blue-600 transition-all text-xs uppercase tracking-wider font-semibold" href="#">Careers</a></li>
                            <li><a className="text-slate-500 hover:text-blue-600 transition-all text-xs uppercase tracking-wider font-semibold" href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-slate-900 font-bold mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a className="text-slate-500 hover:text-blue-600 transition-all text-xs uppercase tracking-wider font-semibold" href="#">Privacy Policy</a></li>
                            <li><a className="text-slate-500 hover:text-blue-600 transition-all text-xs uppercase tracking-wider font-semibold" href="#">Terms of Service</a></li>
                            <li><a className="text-slate-500 hover:text-blue-600 transition-all text-xs uppercase tracking-wider font-semibold" href="#">Support</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
