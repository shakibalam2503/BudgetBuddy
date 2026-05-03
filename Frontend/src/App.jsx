import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, Wallet, Target, TrendingDown, TrendingUp, LogOut } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import Budget from './pages/Budget';
import Goals from './pages/Goals';
import Expenses from './pages/Expenses';
import Income from './pages/Income';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Landing from './pages/Landing';
import AddExpense from './pages/AddExpense';
import AddCategory from './pages/AddCategory';
import Insights from './pages/Insights';

import { NavLink, useLocation } from 'react-router-dom';

const Layout = () => {
    const location = useLocation();
    
    // Helper function to determine if link is active
    const isActive = (path) => {
        if (path === '/dashboard' && location.pathname === '/dashboard') return true;
        if (path !== '/dashboard' && location.pathname.startsWith(path)) return true;
        return false;
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: 'dashboard' },
        { name: 'Income', path: '/dashboard/income', icon: 'payments' },
        { name: 'Expenses', path: '/dashboard/expenses', icon: 'receipt_long' },
        { name: 'Budgets', path: '/dashboard/budget', icon: 'account_balance_wallet' },
        { name: 'Goals', path: '/dashboard/goals', icon: 'track_changes' },
        { name: 'Insights', path: '/dashboard/insights', icon: 'insights' }
    ];

    return (
        <div className="text-on-surface bg-surface min-h-screen flex font-body">
            {/* SideNavBar */}
            <aside className="hidden md:flex h-screen w-64 fixed left-0 top-0 bg-[#f1efff] dark:bg-slate-900 flex-col p-6 space-y-2 z-50 transition-all duration-300 ease-in-out">
                <div className="mb-10 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-lg shadow-primary/20">
                            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>school</span>
                        </div>
                        <div>
                            <h1 className="font-headline font-extrabold text-primary text-xl leading-tight">BudgetBuddy</h1>
                            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Academic Atelier</p>
                        </div>
                    </div>
                </div>
                
                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => (
                        <Link 
                            key={item.name}
                            to={item.path} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-in-out ${isActive(item.path) ? 'bg-white dark:bg-slate-800 text-primary shadow-[0px_20px_40px_rgba(40,43,81,0.06)]' : 'text-on-surface-variant hover:bg-white/50 dark:hover:bg-slate-800'}`}
                        >
                            <span className="material-symbols-outlined">{item.icon}</span>
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                    <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-white/50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined">person</span>
                        <span className="font-medium">Profile</span>
                    </Link>
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-white/50 dark:hover:bg-slate-800 rounded-xl transition-all duration-300">
                        <span className="material-symbols-outlined">logout</span>
                        <span className="font-medium">Logout</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content Canvas */}
            <main className="md:ml-64 flex-1 min-h-screen p-6 md:p-12 pb-24 flex flex-col">
                <div className="flex-1">
                    {/* Visual Global Breadcrumb */}
                    <div className="text-sm font-bold text-on-surface-variant mb-6">
                        <span className="text-primary">BudgetBuddy</span>
                        <span className="mx-2 opacity-50">/</span>
                        <span className="capitalize">{location.pathname === '/dashboard' ? 'Dashboard' : location.pathname.split('/').pop()}</span>
                    </div>
                    <Outlet />
                </div>
                
                {/* Footer */}
                <footer className="w-full border-t border-outline-variant/15 mt-12 py-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm font-body text-on-surface-variant">© 2026 BudgetBuddy. Built for the Academic Atelier.</p>
                        <div className="flex gap-8">
                            <a className="text-sm font-body text-on-surface-variant hover:text-primary underline transition-colors" href="#">Support</a>
                            <a className="text-sm font-body text-on-surface-variant hover:text-primary underline transition-colors" href="#">Privacy</a>
                            <a className="text-sm font-body text-on-surface-variant hover:text-primary underline transition-colors" href="#">Terms</a>
                            <a className="text-sm font-body text-on-surface-variant hover:text-primary underline transition-colors" href="#">Contact</a>
                        </div>
                    </div>
                </footer>
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest/80 backdrop-blur-xl flex justify-around items-center py-4 px-2 z-50 border-t border-outline-variant/10">
                <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${isActive('/dashboard') && location.pathname === '/dashboard' ? 'text-primary' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined">dashboard</span>
                    <span className="text-[10px] font-bold uppercase">Home</span>
                </Link>
                <Link to="/dashboard/expenses" className={`flex flex-col items-center gap-1 ${isActive('/dashboard/expenses') ? 'text-primary' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined">receipt_long</span>
                    <span className="text-[10px] font-bold uppercase">Expenses</span>
                </Link>
                <div className="relative -top-8">
                    <button className="bg-primary text-on-primary p-4 rounded-full shadow-xl shadow-primary/30">
                        <span className="material-symbols-outlined">add</span>
                    </button>
                </div>
                <Link to="/dashboard/budget" className={`flex flex-col items-center gap-1 ${isActive('/dashboard/budget') ? 'text-primary' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined">account_balance_wallet</span>
                    <span className="text-[10px] font-bold uppercase">Budget</span>
                </Link>
                <Link to="/profile" className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-primary' : 'text-on-surface-variant'}`}>
                    <span className="material-symbols-outlined">person</span>
                    <span className="text-[10px] font-bold uppercase">Profile</span>
                </Link>
            </div>
        </div>
    );
};

function DocumentTitleUpdater() {
  const location = useLocation();
  React.useEffect(() => {
    const path = location.pathname;
    let title = 'BudgetBuddy';
    if (path === '/') title = 'BudgetBuddy / Home';
    else if (path === '/signin') title = 'BudgetBuddy / Sign In';
    else if (path === '/signup') title = 'BudgetBuddy / Sign Up';
    else if (path === '/dashboard') title = 'BudgetBuddy / Dashboard';
    else if (path === '/dashboard/budget') title = 'BudgetBuddy / Budget';
    else if (path === '/dashboard/expenses') title = 'BudgetBuddy / Expenses';
    else if (path === '/dashboard/income') title = 'BudgetBuddy / Income';
    else if (path === '/dashboard/goals') title = 'BudgetBuddy / Goals';
    else if (path === '/dashboard/expenses/add') title = 'BudgetBuddy / Add Expense';
    
    document.title = title;
  }, [location.pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <DocumentTitleUpdater />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="budget" element={<Budget />} />
          <Route path="budget/add" element={<AddCategory />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="expenses/add" element={<AddExpense />} />
          <Route path="income" element={<Income />} />
          <Route path="goals" element={<Goals />} />
          <Route path="insights" element={<Insights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
