/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDashboard } from '../context/DashboardContext';
import ThemeToggle from "./ThemeToggle";
import { User, ShieldCheck, Eye, Layout, LogOut, Settings, Key, UserCircle} from 'lucide-react';

const Header = () => {
  const { role, setRole } = useDashboard();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const roles = [
    { id: 'viewer', label: 'Viewer', icon: Eye },
    { id: 'admin', label: 'Admin', icon: ShieldCheck },
  ];

  // Dynamic Avatar properties based on Role
  const avatarName = role === 'admin' ? 'Admin' : 'Viewer';
  const avatarColor = role === 'admin' ? '10b981' : '3b82f6'; // Emerald vs Blue
  const avatarBg = role === 'admin' ? 'd1fae5' : 'dbeafe';

  const handleLogout = () => {
    // Add your logout logic here
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b bg-white/70 px-6 backdrop-blur-xl transition-all duration-300 md:px-10 dark:border-slate-800 dark:bg-slate-950/90">

      {/* Left Section: Branding */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20">
          <Layout size={20} />
        </Link>
        <div>
          <h2 className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">FinanceDash UI</h2>
          <p className="text-lg font-bold text-gray-900 dark:text-white">Dashboard</p>
        </div>
      </div>

      {/* Right Section: Controls */}
      <div className="flex items-center gap-3 md:gap-6">

        {/* Role Segmented Control */}
        <div className="flex items-center gap-1 rounded-xl bg-gray-100 p-1 dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
          {roles.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setRole(id)}
              className={`group flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-bold transition-all duration-300 ${role === id
                  ? 'bg-white shadow-md text-blue-600 dark:bg-slate-800 dark:text-blue-400'
                  : 'text-gray-500 hover:bg-gray-200/50 dark:text-slate-500 dark:hover:bg-slate-800/40'
                }`}
            >
              <Icon size={14} className={role === id ? "animate-pulse" : ""} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        <div className="h-6 w-[1px] bg-gray-200 dark:bg-slate-800 hidden sm:block" />

        <div className="flex items-center gap-3">
          <ThemeToggle />

          {/* User Profile Dropdown Container */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="relative group focus:outline-none"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 rounded-full opacity-20 blur-sm transition-all duration-500 group-hover:opacity-40 ${role === 'admin' ? 'bg-emerald-500' : 'bg-blue-500'
                }`} />

              {/* Avatar Container */}
              <div
                className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${role === 'admin'
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20'
                    : 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  }`}
              >
                {/* The Centered Icon */}
                <User
                  size={22}
                  strokeWidth={2.5}
                  className={role === 'admin' ? 'text-emerald-600' : 'text-blue-600'}
                />
              </div>
              {/* Status Indicator */}
              <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-slate-950 ${role === 'admin' ? 'bg-emerald-500' : 'bg-blue-500'
                }`} />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-gray-200 bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-slate-800 dark:bg-slate-900 animate-in fade-in zoom-in duration-200">
                <div className="p-4 border-b dark:border-slate-800">
                  <p className="text-sm font-bold text-gray-900 dark:text-white capitalize">{avatarName}</p>
                  <p className="text-xs text-gray-500 truncate">user@example.com</p>
                </div>

                <div className="p-2">
                  <MenuLink to="/dashboard" icon={Layout} label="Dashboard" onClick={() => setIsMenuOpen(false)} />
                  <MenuLink to="/profile" icon={UserCircle} label="My Profile" onClick={() => setIsMenuOpen(false)} />
                  <MenuLink to="/settings" icon={Settings} label="Settings" onClick={() => setIsMenuOpen(false)} />
                  <MenuLink to="/security" icon={Key} label="Security" onClick={() => setIsMenuOpen(false)} />
                </div>

                <div className="p-2 border-t dark:border-slate-800">
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Helper component for cleaner dropdown links
const MenuLink = ({ to, icon: Icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-100 hover:text-blue-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-blue-400"
  >
    <Icon size={16} />
    {label}
  </Link>
);

export default Header;