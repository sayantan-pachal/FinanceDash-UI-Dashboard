import React, { useMemo } from 'react';
import StatCard from '../StatCard/StatCard';
import TransactionTable from '../Pages/TransactionTable';
import { useDashboard } from '../context/DashboardContext';
import { Lightbulb, ArrowUpRight, TrendingUp, DownloadCloud } from 'lucide-react';
import { BalanceTrend, CategoryPie } from '../Pages/Visuals'; 

const DashboardHome = () => {
    const { transactions, allTransactions } = useDashboard();

    // ==========================================
    // Memoized Derived Data
    // ==========================================
    const { totalIncome, totalExpense, highestExpense, savingsRate } = useMemo(() => {
        const expenses = transactions.filter(t => t.type === 'expense');
        const income = transactions.filter(t => t.type === 'income');

        const totalEx = expenses.reduce((sum, t) => sum + t.amount, 0);
        const totalIn = income.reduce((sum, t) => sum + t.amount, 0);

        const highestEx = expenses.length
            ? expenses.reduce((max, t) => (t.amount > max.amount ? t : max))
            : null;

        const rate = totalIn > 0 
            ? Math.round(((totalIn - totalEx) / totalIn) * 100) 
            : 0;

        return { 
            totalIncome: totalIn, 
            totalExpense: totalEx, 
            highestExpense: highestEx, 
            savingsRate: rate 
        };
    }, [transactions]);

    const exportToCSV = () => {
        const headers = ["Date,Name,Category,Type,Amount\n"];
        const rows = transactions.map(t => `${t.date},${t.name},${t.category},${t.type},${t.amount}`);
        const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'finance_report.csv';
        a.click();
    };

    return (
        <div className="min-h-screen space-y-8 p-6 transition-colors md:p-10 animate-in fade-in duration-500 bg-gray-50 dark:bg-[linear-gradient(180deg,#0f1724,#05060a_60%)]">

            {/* 1. Summary Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <StatCard title="Total Balance" type="balance" />
                <StatCard title="Total Income" type="income" />
                <StatCard title="Total Expenses" type="expense" />
            </div>

            {/* 2. Main Dashboard Grid */}
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

                {/* Left Side: Chart & Table */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Time-based Visualization */}
                    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                <TrendingUp className="text-blue-500" size={20} />
                                Balance Trend
                            </h3>
                            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-md dark:bg-blue-900/20">Real-time Sync</span>
                        </div>
                        <div className="h-64 w-full">
                            {/* We use allTransactions so the trend line stays consistent while searching */}
                            <BalanceTrend data={allTransactions} />
                        </div>
                    </div>

                    <TransactionTable />
                </div>

                {/* Right Side: Sidebar Insights */}
                <div className="space-y-6">
                    {/* Premium Export Button */}
                    <button 
                        onClick={exportToCSV}
                        className="group flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-200 bg-white/50 p-5 text-sm font-bold text-gray-500 transition-all hover:border-blue-400 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-500 dark:hover:text-blue-400"
                    >
                        <DownloadCloud size={20} className="transition-transform group-hover:-translate-y-1" />
                        Export Financial Report
                    </button>

                    {/* Insights Card */}
                    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                        <div className="flex items-center gap-2 mb-6 text-amber-500">
                            <Lightbulb size={22} className="fill-amber-500/20" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Smart Insights</h3>
                        </div>

                        {transactions.length === 0 ? (
                            <div className="text-center py-6">
                                <p className="text-sm text-gray-400 italic">No data to analyze yet.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {highestExpense && (
                                    <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-900/10 border border-rose-100/50 dark:border-rose-900/20">
                                        <p className="text-[10px] uppercase tracking-widest font-black text-rose-600 dark:text-rose-400">Highest Spending</p>
                                        <p className="text-sm font-semibold mt-1 text-gray-800 dark:text-gray-200">{highestExpense.name}</p>
                                        <p className="text-2xl font-black text-rose-500 mt-1">₹{highestExpense.amount.toLocaleString('en-IN')}</p>
                                        <p className="text-xs text-rose-400 mt-1 italic">{highestExpense.category}</p>
                                    </div>
                                )}

                                <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-900/10 border border-emerald-100/50 dark:border-emerald-900/20">
                                    <p className="text-[10px] uppercase tracking-widest font-black text-emerald-600 dark:text-emerald-400">Savings Rate</p>
                                    <div className="flex items-end gap-2 mt-1">
                                        <span className="text-2xl font-black text-emerald-500">{savingsRate}%</span>
                                        <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mb-1">
                                            <ArrowUpRight size={14} strokeWidth={3} />
                                            SAVED
                                        </div>
                                    </div>
                                    <p className="text-xs text-emerald-400 mt-1">You saved ₹{(totalIncome - totalExpense).toLocaleString('en-IN')} this period.</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Categorical Visualization */}
                    <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
                        <h3 className="text-sm font-bold mb-4 text-gray-900 dark:text-white uppercase tracking-wider">Spending by Category</h3>
                        <div className="h-44 w-full">
                            <CategoryPie data={allTransactions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;