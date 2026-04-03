import React, { useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { useDashboard } from '../context/DashboardContext';
import { Database } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

// Reusable Empty State Component
const EmptyState = ({ message }) => (
  <div className="flex flex-col items-center justify-center h-full text-gray-400 animate-in fade-in zoom-in-95">
    <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-full mb-2">
      <Database size={20} />
    </div>
    <p className="text-[10px] font-medium uppercase tracking-wider">{message}</p>
  </div>
);

export const BalanceTrend = () => {
  const { allTransactions } = useDashboard(); // Use allTransactions for consistent trend lines

  const chartData = useMemo(() => {
    if (!allTransactions.length) return [];

    // 1. Sort by date
    const sorted = [...allTransactions].sort((a, b) => new Date(a.date) - new Date(b.date));

    // 2. Reduce to daily totals to avoid multiple points on the same date
    const dailyData = sorted.reduce((acc, curr) => {
      const lastEntry = acc[acc.length - 1];
      const amount = curr.type === 'income' ? curr.amount : -curr.amount;

      if (lastEntry && lastEntry.date === curr.date) {
        lastEntry.balance += amount;
      } else {
        const prevBalance = lastEntry ? lastEntry.balance : 0;
        acc.push({ date: curr.date, balance: prevBalance + amount });
      }
      return acc;
    }, []);

    return dailyData;
  }, [allTransactions]);

  if (!chartData.length) return <EmptyState message="No trend data available" />;

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
          <XAxis
            dataKey="date"
            fontSize={10}
            tickMargin={10}
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8' }}
          />
          <YAxis
            fontSize={10}
            axisLine={false}
            tickLine={false}
            tickFormatter={(val) => `₹${val >= 1000 ? (val / 1000).toFixed(1) + 'k' : val}`}
            tick={{ fill: '#94a3b8' }}
          />
          <Tooltip
            contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '12px' }}
            formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Net Balance']}
            labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
          />
          <Area
            type="monotone"
            dataKey="balance"
            stroke="#3b82f6"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorBalance)"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const CategoryPie = () => {
  const { allTransactions } = useDashboard();

  const data = useMemo(() => {
    const expenses = allTransactions.filter(t => t.type === 'expense');
    return expenses.reduce((acc, curr) => {
      const found = acc.find(item => item.name === curr.category);
      if (found) found.value += curr.amount;
      else acc.push({ name: curr.category, value: curr.amount });
      return acc;
    }, []);
  }, [allTransactions]);

  if (!data.length) return <EmptyState message="No expenses to categorize" />;

  return (
    <div className="h-44 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={8}
            dataKey="value"
            stroke="none"
            animationBegin={0}
            animationDuration={1200}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '11px' }}
            formatter={(value) => `₹${value.toLocaleString('en-IN')}`}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};