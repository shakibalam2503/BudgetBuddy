import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate();
    return (
        <main className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-surface font-body text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
            {/* Left Side: Visual Anchor */}
            <section className="hidden md:flex md:w-1/2 relative overflow-hidden bg-primary">
                <div className="absolute inset-0 z-0 opacity-80">
                    <img className="w-full h-full object-cover" alt="Modern university student using laptop" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZIU68Ku_AnGIeXG4wVzsVkLj-4dHJfgtdzZ-3eUv-zWjDvm0Jl5lijjywKeYSp_CxOJrMCIJUsNIHyCl2h3_VcXo1jf9dXw92iO_VxKUo2FcYDTgBEV_TQHoD2VGFC0lj88arXy2X_NWkortxTRb-pWI77149lylsvlWn2xdJPfCU3OC1ocXlUsLfYXQNI1zoqB4nOBnkpj-t1HATHn2ruYAmLLKR0C_zPu4u1BXikRpESF8cOi5CVjddvWGW5ADp-6wAyHEQ2zce"/>
                </div>
                
                {/* Branding Overlay */}
                <div className="relative z-10 p-16 flex flex-col justify-between w-full h-full bg-gradient-to-t from-primary/90 to-transparent">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>account_balance</span>
                        </div>
                        <span className="font-headline font-bold text-2xl text-surface-container-lowest tracking-tight text-white">BudgetBuddy</span>
                    </div>
                    
                    <div className="max-w-md">
                        <h1 className="font-headline font-extrabold text-5xl text-surface-container-lowest leading-tight tracking-tighter mb-6">
                            Master your <br/><span className="text-secondary-fixed">financial future</span>.
                        </h1>
                        <p className="text-on-primary text-lg font-medium opacity-90 leading-relaxed">
                            Join thousands of students managing their academic growth and financial stability in one curated digital workspace.
                        </p>
                    </div>
                    
                    <div className="flex gap-4">
                        <div className="flex -space-x-3">
                            <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" alt="user1" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNDRlcScVDZE3JBMQLi-gQNtHfziwGXSW2EG59hWCOX8vo0NH6DWVWzEyPzm9CtyGz4afnS7AZIVzZkYzxa80noCVfkWy9BmU6CwN4q_LSuvR01s2RH1H_BpDbe8xPmZ2RvakGC-R6xcRMM_tRC2g95kuad__N51mCNneUyccuA0sALECMa-juHDJSAOqofueBs0RzTizF_7VFrhuhPtCltIQ4kIbeiTqVoyG6wvx2Aq6Ym4EAxueAJtdvshoy2p4Qn5fuxrZmHBkE"/>
                            <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" alt="user2" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6eWd2YBMb6KFqXwHC4RgQFGRj7-kA80DRVSVLnVSjm4YsvLhJao2n0uuNYvSRA6TYpLvet1yZ4n5p_tyDvDSrBe8rDvBhAewz-SwVUu6uqFiwoGFkBjdGEe0SIKzcBWp_lWgyOjfX0Sqqe3YmGVEn2VZJtasWYSccfvg1K4LEvBTGYWx4zmPgjTAI92NIW11WFKfPve5_63gA7ZN_5LN0noM7uylcz1kbdPRqkwD-QsYBMCUZto2JLBliBu7dxsfpbZdl4BzTaxzZ"/>
                            <img className="w-10 h-10 rounded-full border-2 border-primary object-cover" alt="user3" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzpFbP_5HUWkqOGC6HGZE-MRbWJ9f44_3ezy_ATQriJlAQUazx8WBIJyLN0idlXzhO4XzKUmYe5nn-C88ww6MizNV_0rQnp9raaV1ubuHY2UqWkYuS2VL954j8WkSjXzcO_JxlHUSQMKsqAzQjwdEUZoJJbVODOX06v8yZqH2S_NX1FCgVVw8eFCQQFZgIzBM7IEglQu63DE8FtNc5gLCmwcUxK8wPVA8GnDxYNCp5EU33rhrwyPbBDXOwXJZjELcRarYUwI0A-9jH"/>
                        </div>
                        <p className="text-on-primary text-sm self-center font-medium">Joined by 12k+ students this month</p>
                    </div>
                </div>
            </section>

            {/* Right Side: Sign Up Form */}
            <section className="flex-1 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-surface relative">
                {/* Mobile Branding */}
                <div className="md:hidden flex items-center gap-2 mb-12 self-start">
                    <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-surface-container-lowest text-2xl" style={{fontVariationSettings: "'FILL' 1"}}>account_balance</span>
                    </div>
                    <span className="font-headline font-bold text-xl text-on-surface">BudgetBuddy</span>
                </div>
                
                <div className="w-full max-w-md mt-auto mb-auto">
                    <div className="mb-10">
                        <h2 className="font-headline font-bold text-[32px] text-on-surface tracking-tight mb-2">Create Account</h2>
                        <p className="text-on-surface-variant text-[15px] font-medium">Start your journey with BudgetBuddy today.</p>
                    </div>
                    
                    <form className="space-y-5" onSubmit={(e) => {
                        e.preventDefault();
                        navigate('/dashboard');
                    }}>
                        {/* Name Field */}
                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-semibold text-on-surface-variant ml-1" htmlFor="name">Name</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-xl">person</span>
                                <input className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none rounded-[10px] ring-1 ring-outline-variant/15 focus:ring-0 focus:outline-none transition-all placeholder:text-outline-variant/60 shadow-[0_2px_10px_rgba(40,43,81,0.02)]" id="name" placeholder="Enter your full name" type="text"/>
                            </div>
                        </div>
                        
                        {/* Phone Field */}
                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-semibold text-on-surface-variant ml-1" htmlFor="phone">Phone Number</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-xl">smartphone</span>
                                <input className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none rounded-[10px] ring-1 ring-outline-variant/15 focus:ring-0 focus:outline-none transition-all placeholder:text-outline-variant/60 shadow-[0_2px_10px_rgba(40,43,81,0.02)]" id="phone" placeholder="+1 (555) 000-0000" type="tel"/>
                            </div>
                        </div>
                        
                        {/* Email Field */}
                        <div className="space-y-1.5">
                            <label className="block text-[13px] font-semibold text-on-surface-variant ml-1" htmlFor="email">Email Address</label>
                            <div className="relative group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-xl">mail</span>
                                <input className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none rounded-[10px] ring-1 ring-outline-variant/15 focus:ring-0 focus:outline-none transition-all placeholder:text-outline-variant/60 shadow-[0_2px_10px_rgba(40,43,81,0.02)]" id="email" placeholder="name@university.edu" type="email"/>
                            </div>
                        </div>
                        
                        {/* Password Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="block text-[13px] font-semibold text-on-surface-variant ml-1" htmlFor="password">Password</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-xl">lock</span>
                                    <input className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none rounded-[10px] ring-1 ring-outline-variant/15 focus:ring-0 focus:outline-none transition-all placeholder:text-outline-variant/60 shadow-[0_2px_10px_rgba(40,43,81,0.02)]" id="password" placeholder="••••••••" type="password"/>
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="block text-[13px] font-semibold text-on-surface-variant ml-1" htmlFor="confirm-password">Confirm Password</label>
                                <div className="relative group">
                                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant group-focus-within:text-primary transition-colors text-xl">lock_reset</span>
                                    <input className="w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none rounded-[10px] ring-1 ring-outline-variant/15 focus:ring-0 focus:outline-none transition-all placeholder:text-outline-variant/60 shadow-[0_2px_10px_rgba(40,43,81,0.02)]" id="confirm-password" placeholder="••••••••" type="password"/>
                                </div>
                            </div>
                        </div>
                        
                        {/* Terms Checkbox */}
                        <div className="flex items-start gap-3 py-3">
                            <div className="flex items-center h-5">
                                <input className="w-4 h-4 rounded text-primary border-outline-variant/40 focus:ring-primary-container bg-surface-container-lowest cursor-pointer" id="terms" type="checkbox"/>
                            </div>
                            <label className="text-[13px] text-on-surface-variant leading-tight" htmlFor="terms">
                                I accept all the <span className="text-primary font-bold cursor-pointer hover:underline">terms and conditions</span> and the privacy policy of Academic Atelier.
                            </label>
                        </div>
                        
                        {/* Action Button */}
                        <div className="pt-2">
                            <button className="w-full py-4 px-6 bg-primary text-on-primary font-body font-semibold text-[15px] rounded-xl hover:bg-[#0046bb] shadow-[0_4px_14px_rgba(0,80,212,0.3)] active:scale-[0.98] transition-all duration-200" type="submit">
                                Create Account
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-10 text-center">
                        <p className="text-on-surface-variant font-medium text-[15px]">
                            Already have an account? <Link to="/signin" className="text-[#0050d4] font-bold hover:underline transition-all">Sign In</Link>
                        </p>
                    </div>
                </div>

                {/* Minimalist Footer in Bottom Right per Image Design */}
                <div className="hidden md:flex absolute bottom-8 right-12 gap-6 pb-2">
                    <a className="text-[10px] font-bold uppercase tracking-[0.08em] text-outline opacity-70 hover:opacity-100 hover:text-primary transition-all" href="#">Privacy Policy</a>
                    <a className="text-[10px] font-bold uppercase tracking-[0.08em] text-outline opacity-70 hover:opacity-100 hover:text-primary transition-all" href="#">Terms of Service</a>
                </div>
            </section>
        </main>
    );
};

export default SignUp;
