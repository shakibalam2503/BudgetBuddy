import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await api.post('/api/auth/signin', { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || 'Sign in failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-surface font-body text-on-surface overflow-hidden">
            <main className="flex min-h-screen">
                {/* Left Panel: Visual/Brand Side */}
                <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary-dim">
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-primary/40 to-primary-dim/80"></div>
                    <img 
                        alt="Students collaborating" 
                        className="absolute inset-0 w-full h-full object-cover" 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCErh2_o9yRb8y0KuwaCGN93xJDhtNmEEiGv2PrJNxDVknvMEB4uIjRP7lmUcKWcxSqWAaw0VHXvd39WTECfsFsHrjyhvJTCk2_2vAD4Nz5TiCkd59mqcvDNJwYxIaJr3Jx7Ef9KrvfsvX9iaUgqFHovXwXDoknzpFKW3vHkhVXvoDPhHT_uTKSn0_770B6nBhNuytbG_sAxoFQbNNUpOI6VJGaKo8IawgmXDVTqTl3JOF26DOy_oa_w_WtcYwUI221v3BheVQal00G"
                    />
                    {/* Branding Overlay */}
                    <div className="relative z-20 flex flex-col justify-between h-full p-16 text-on-primary">
                        <div>
                            <h1 className="font-headline font-extrabold text-3xl tracking-tighter text-white">BudgetBuddy</h1>
                        </div>
                        <div className="max-w-md">
                            <h2 className="font-headline font-bold text-5xl leading-tight mb-6 text-white">Master your academic capital.</h2>
                            <p className="text-lg text-primary-fixed/90 font-medium text-white">Join thousands of students optimizing their financial journey with our intelligent workspace.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-1 w-12 bg-on-primary rounded-full"></div>
                            <div className="h-1 w-12 bg-on-primary/30 rounded-full"></div>
                            <div className="h-1 w-12 bg-on-primary/30 rounded-full"></div>
                        </div>
                    </div>
                </section>
                
                {/* Right Panel: Authentication Form */}
                <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface">
                    <div className="w-full max-w-md space-y-8">
                        {/* Header */}
                        <div className="text-center lg:text-left">
                            <h3 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight mb-2">Welcome Back</h3>
                            <p className="text-on-surface-variant">Continue your financial journey.</p>
                        </div>
                        
                        {error && (
                            <div className="p-4 bg-error-container text-on-error-container rounded-xl text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined">error</span>
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Email address</label>
                                <div className="relative group">
                                    <input 
                                        className="w-full px-4 py-4 bg-surface-container-lowest border-none rounded-md outline outline-1 outline-outline-variant/15 focus:outline-primary focus:outline-2 transition-all placeholder:text-outline/50" 
                                        id="email" 
                                        name="email" 
                                        placeholder="name@bscse.uiu.ac.bd" 
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="block text-sm font-semibold text-on-surface-variant" htmlFor="password">Password</label>
                                    <Link className="text-xs font-bold text-primary hover:underline transition-all" to="/forgot-password">Forgot Password?</Link>
                                </div>
                                <div className="relative group">
                                    <input 
                                        className="w-full px-4 py-4 bg-surface-container-lowest border-none rounded-md outline outline-1 outline-outline-variant/15 focus:outline-primary focus:outline-2 transition-all placeholder:text-outline/50" 
                                        id="password" 
                                        name="password" 
                                        placeholder="••••••••" 
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button 
                                className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-4 rounded-md shadow-[0px_20px_40px_rgba(0,80,212,0.15)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50" 
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>
                        
                        {/* Divider */}
                        <div className="relative py-4">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-outline-variant/20"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-surface px-4 text-on-surface-variant font-bold tracking-widest">Or continue with</span>
                            </div>
                        </div>
                        
                        {/* Social Logins */}
                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-lowest border border-outline-variant/15 rounded-md hover:bg-surface-container-low transition-colors group">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"></path>
                                </svg>
                                <span className="text-sm font-semibold text-on-surface">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 py-3 px-4 bg-surface-container-lowest border border-outline-variant/15 rounded-md hover:bg-surface-container-low transition-colors group">
                                <svg className="w-5 h-5 fill-on-surface" viewBox="0 0 24 24">
                                    <path d="M17.05 20.28c-.96.95-2.06 1.81-3.23 1.81-1.14 0-1.52-.73-2.89-.73-1.36 0-1.79.71-2.89.71-1.1 0-2.11-.79-3.21-1.89-2.25-2.26-3.88-6.39-3.88-9.28 0-4.54 2.84-6.93 5.53-6.93 1.34 0 2.37.58 3.19.58.78 0 2.05-.73 3.54-.73 1.25 0 2.84.45 3.84 1.81-2.42 1.43-2.03 4.54.4 5.53-1.02 2.51-2.29 5.14-3.4 7.13zm-3.08-16.12c-.03 1.87-1.55 3.44-3.32 3.44-.1 0-.21-.01-.32-.02.08-1.92 1.63-3.5 3.35-3.5.1 0 .21.01.29.08z"></path>
                                </svg>
                                <span className="text-sm font-semibold text-on-surface">Apple ID</span>
                            </button>
                        </div>
                        
                        <div className="pt-6 text-center">
                            <p className="text-on-surface-variant text-sm">
                                Don't have an account? 
                                <Link className="text-primary font-bold hover:underline transition-all ml-1" to="/signup">Create Account</Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            
            {/* Simple Footer for Legal */}
            <footer className="fixed bottom-0 right-0 w-full lg:w-1/2 p-6 pointer-events-none">
                <div className="flex justify-center lg:justify-end gap-6 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/40 pointer-events-auto">
                    <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                    <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                    <span className="opacity-50">© 2026 BudgetBuddy</span>
                </div>
            </footer>
        </div>
    );
};

export default SignIn;
