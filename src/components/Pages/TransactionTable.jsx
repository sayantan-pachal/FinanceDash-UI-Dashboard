import React, { useState } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { Search, Plus, Trash2, Edit2, Filter, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import TransactionForm from './TransactionForm';
import CustomDropdown from './CustomDropdown';

const TransactionTable = () => {
  const {
    transactions,
    role,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    addTransaction,
    updateTransaction,
    deleteTransaction
  } = useDashboard();

  const [showForm, setShowForm] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  const displayData = transactions;

  return (
    <div className="flex flex-col space-y-4">
      {showForm && (
        <TransactionForm
          initialData={editingTx}
          onClose={() => {
            setShowForm(false);
            setEditingTx(null);
          }}
          onSubmit={(data) =>
            editingTx
              ? updateTransaction(editingTx.id, data)
              : addTransaction(data)
          }
        />
      )}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Table Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-50 p-6 dark:border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Transactions</h3>
            <p className="text-sm text-gray-500">Manage your recent financial activity</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>

            <CustomDropdown filterType={filterType} setFilterType={setFilterType} />

            {role === 'admin' && (
              <button
                onClick={() => setShowForm(true)}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 active:scale-95"
              >
                <Plus size={16} /> Add New
              </button>
            )}
          </div>
        </div>

        {/* The Actual Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-xs font-semibold uppercase text-gray-400 dark:bg-slate-800/50">
                <th className="px-6 py-4">Transaction</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-center">Date</th>
                <th className="px-6 py-4 text-right">Amount</th>
                {role === 'admin' && <th className="px-6 py-4 text-center">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-slate-800">
              {displayData.length ? displayData.map(tx => (
                <tr key={tx.id} className="group transition-colors hover:bg-gray-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-rose-100 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400'}`}>
                        {tx.type === 'income' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-white">{tx.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 dark:bg-slate-800 dark:text-slate-400">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-sm text-gray-500 dark:text-slate-400">{tx.date}</td>
                  <td className={`px-6 py-4 text-right text-sm font-bold ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {tx.type === 'income' ? '+' : '-'}₹{tx.amount.toLocaleString()}
                  </td>
                  {role === 'admin' && (
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <button
                          onClick={() => { setEditingTx(tx); setShowForm(true); }}
                          className="rounded-md p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteTransaction(tx.id)}
                          className="rounded-md p-1.5 text-gray-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              )) : (
                <tr>
                  <td colSpan={role === 'admin' ? 5 : 4} className="py-16 text-center text-gray-400">
                    <p className="text-lg">No transactions match your search</p>
                    <p className="text-sm">Try adjusting your filters or search term</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;