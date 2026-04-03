/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { INITIAL_TRANSACTIONS } from '../../Data/mockData';

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // 1. Initialize State with a Lazy Initializer
  const [transactions, setTransactions] = useState(() => {
  try {
    const saved = localStorage.getItem('finance_data');
    const parsed = saved ? JSON.parse(saved) : null;

    // If there's no data OR the saved data is noticeably shorter than our new mock data
    if (!parsed || parsed.length < INITIAL_TRANSACTIONS.length) {
      return INITIAL_TRANSACTIONS; 
    }
    return parsed;
  } catch (error) {
    return INITIAL_TRANSACTIONS;
  }
});

  const [role, setRole] = useState('admin');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // 2. Persistent Storage Sync
  useEffect(() => {
    localStorage.setItem('finance_data', JSON.stringify(transactions));
  }, [transactions]);

  /* =========================
      Computed Totals (Memoized)
  ========================== */
  const totals = useMemo(() => {
    const results = transactions.reduce((acc, t) => {
      const amt = Number(t.amount) || 0; // Safety check for numeric values
      if (t.type === 'income') acc.income += amt;
      if (t.type === 'expense') acc.expense += amt;
      return acc;
    }, { income: 0, expense: 0 });

    return {
      ...results,
      balance: results.income - results.expense
    };
  }, [transactions]);

  /* =========================
      Filtered Transactions
  ========================== */
  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            t.category.toLowerCase().includes(searchTerm.toLowerCase()); // Added category search
      const matchesType = filterType === 'all' || t.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [transactions, searchTerm, filterType]);

  /* =========================
      Actions (RBAC Protected)
  ========================== */
  const addTransaction = (newTx) => {
    if (role !== 'admin') {
      alert("Permission Denied: Only Admins can add transactions.");
      return;
    }
    // Spread the newTx to ensure we don't mutate state directly
    setTransactions(prev => [{ 
      ...newTx, 
      id: `tx-${Date.now()}-${Math.floor(Math.random() * 1000)}`, // Stronger ID
      amount: Number(newTx.amount) // Ensure amount is stored as a number
    }, ...prev]);
  };

  const updateTransaction = (id, updatedTx) => {
    if (role !== 'admin') return;
    setTransactions(prev => prev.map(tx => (
      tx.id === id ? { ...tx, ...updatedTx, amount: Number(updatedTx.amount || tx.amount) } : tx
    )));
  };

  const deleteTransaction = (id) => {
    if (role !== 'admin') return;
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const resetData = () => {
    if (window.confirm("Are you sure you want to reset all data to defaults?")) {
      setTransactions(INITIAL_TRANSACTIONS);
      setSearchTerm('');
      setFilterType('all');
    }
  };

  return (
    <DashboardContext.Provider
      value={{
        transactions: filteredTransactions,
        allTransactions: transactions,
        totals,
        role,
        setRole,
        searchTerm,
        setSearchTerm,
        filterType,
        setFilterType,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        resetData
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within a DashboardProvider");
  return context;
};