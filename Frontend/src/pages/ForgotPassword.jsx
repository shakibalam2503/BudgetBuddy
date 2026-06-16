import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter Code & New Password
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendCode = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/api/auth/forgot-password', { email });
            setSuccess(response.data.message || 'Verification code sent to your email.');
            setStep(2);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to send verification code. Please check the email.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!code || !newPassword || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/api/auth/reset-password', {
                email,
                code,
                newPassword
            });
            setSuccess(response.data.message || 'Password reset successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/signin');
            }, 3000);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to reset password. Please verify the code.');
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
                            <h2 className="font-headline font-bold text-5xl leading-tight mb-6 text-white">Recover your account.</h2>
                            <p className="text-lg text-primary-fixed/90 font-medium text-white">Access your academic capital and financial intelligence workspace securely.</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="h-1 w-12 bg-on-primary/30 rounded-full"></div>
                            <div className="h-1 w-12 bg-on-primary rounded-full"></div>
                            <div className="h-1 w-12 bg-on-primary/30 rounded-full"></div>
                        </div>
                    </div>
                </section>
                
                {/* Right Panel: Reset Password Form */}
                <section className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-surface">
                    <div className="w-full max-w-md space-y-8">
                        {/* Header */}
                        <div className="text-center lg:text-left">
                            <h3 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight mb-2">
                                {step === 1 ? 'Forgot Password?' : 'Reset Password'}
                            </h3>
                            <p className="text-on-surface-variant">
                                {step === 1 
                                    ? 'Enter your email address and we\'ll send you a 6-digit recovery code.' 
                                    : `We've logged a 6-digit code for ${email} to the console. Enter it below to set your new password.`}
                            </p>
                        </div>
                        
                        {error && (
                            <div className="p-4 bg-error-container text-on-error-container rounded-xl text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined">error</span>
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="p-4 bg-secondary-container text-on-secondary-container rounded-xl text-sm font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined">check_circle</span>
                                {success}
                            </div>
                        )}

                        {/* Step 1: Input Email */}
                        {step === 1 && (
                            <form className="space-y-6" onSubmit={handleSendCode}>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-on-surface-variant ml-1" htmlFor="email">Email address</label>
                                    <div className="relative group">
                                        <input 
                                            className="w-full px-4 py-4 bg-surface-container-lowest border-none rounded-md outline outline-1 outline-outline-variant/15 focus:outline-primary focus:outline-2 transition-all placeholder:text-outline/50" 
                                            id="email" 
                                            name="email" 
                                            placeholder="name@university.edu" 
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <button 
                                    className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-4 rounded-md shadow-[0px_20px_40px_rgba(0,80,212,0.15)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2" 
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Sending Code...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-lg">send</span>
                                            Send Recovery Code
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                        {/* Step 2: Input Code and New Password */}
                        {step === 2 && (
                            <form className="space-y-6" onSubmit={handleResetPassword}>
                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-on-surface-variant ml-1" htmlFor="code">Verification Code</label>
                                    <div className="relative group">
                                        <input 
                                            className="w-full px-4 py-4 bg-surface-container-lowest border-none rounded-md outline outline-1 outline-outline-variant/15 focus:outline-primary focus:outline-2 transition-all placeholder:text-outline/50 tracking-[0.2em] font-mono text-center text-lg" 
                                            id="code" 
                                            name="code" 
                                            placeholder="123456" 
                                            type="text"
                                            maxLength="6"
                                            required
                                            value={code}
                                            onChange={(e) => setCode(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-on-surface-variant ml-1" htmlFor="newPassword">New Password</label>
                                    <div className="relative group">
                                        <input 
                                            className="w-full px-4 py-4 bg-surface-container-lowest border-none rounded-md outline outline-1 outline-outline-variant/15 focus:outline-primary focus:outline-2 transition-all placeholder:text-outline/50" 
                                            id="newPassword" 
                                            name="newPassword" 
                                            placeholder="••••••••" 
                                            type="password"
                                            required
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-semibold text-on-surface-variant ml-1" htmlFor="confirmPassword">Confirm New Password</label>
                                    <div className="relative group">
                                        <input 
                                            className="w-full px-4 py-4 bg-surface-container-lowest border-none rounded-md outline outline-1 outline-outline-variant/15 focus:outline-primary focus:outline-2 transition-all placeholder:text-outline/50" 
                                            id="confirmPassword" 
                                            name="confirmPassword" 
                                            placeholder="••••••••" 
                                            type="password"
                                            required
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button 
                                    className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-bold py-4 rounded-md shadow-[0px_20px_40px_rgba(0,80,212,0.15)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-2" 
                                    type="submit"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Resetting Password...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-lg">published_with_changes</span>
                                            Reset Password
                                        </>
                                    )}
                                </button>
                                
                                <div className="text-center pt-2">
                                    <button 
                                        type="button" 
                                        onClick={() => setStep(1)}
                                        className="text-xs font-bold text-primary hover:underline"
                                    >
                                        Back to Enter Email
                                    </button>
                                </div>
                            </form>
                        )}
                        
                        <div className="pt-6 text-center">
                            <p className="text-on-surface-variant text-sm">
                                Remember your password? 
                                <Link className="text-primary font-bold hover:underline transition-all ml-1" to="/signin">Sign In</Link>
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

export default ForgotPassword;
