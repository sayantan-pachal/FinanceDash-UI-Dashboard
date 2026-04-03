import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Filter, TrendingUp, TrendingDown, LayoutGrid } from 'lucide-react';

const CustomDropdown = ({ filterType, setFilterType }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { value: 'all', label: 'All Types', icon: <LayoutGrid size={14} /> },
        { value: 'income', label: 'Income', icon: <TrendingUp size={14} className="text-emerald-500" /> },
        { value: 'expense', label: 'Expense', icon: <TrendingDown size={14} className="text-rose-500" /> },
    ];

    const selectedOption = options.find(opt => opt.value === filterType);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block w-44" ref={dropdownRef}>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between gap-2 rounded-xl border border-gray-100 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-gray-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600"
            >
                <div className="flex items-center gap-2">
                    <Filter size={14} className="text-gray-400" />
                    {selectedOption?.label}
                </div>
                <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute z-50 mt-2 w-full animate-in fade-in zoom-in-95 duration-200 rounded-2xl border border-gray-100 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                setFilterType(option.value);
                                setIsOpen(false);
                            }}
                            className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition-colors ${filterType === option.value
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                : 'text-gray-600 hover:bg-gray-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                                }`}
                        >
                            <div className="flex items-center gap-2">
                                {option.icon}
                                {option.label}
                            </div>
                            {filterType === option.value && <Check size={14} strokeWidth={3} />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;