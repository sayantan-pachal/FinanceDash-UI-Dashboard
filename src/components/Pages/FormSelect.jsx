import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, TrendingUp, TrendingDown } from 'lucide-react';

const FormSelect = ({ value, onChange, name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  const options = [
    { value: 'income', label: 'Income', icon: <TrendingUp size={16} className="text-emerald-500" /> },
    { value: 'expense', label: 'Expense', icon: <TrendingDown size={16} className="text-rose-500" /> },
  ];

  const selected = options.find(opt => opt.value === value) || options[0];

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (optionValue) => {
    // Create a mock event object to stay compatible with your handleChange function
    onChange({
      target: {
        name: name,
        value: optionValue
      }
    });
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <button
        type="button" // Prevents form submission on click
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
      >
        <div className="flex items-center gap-3">
          {selected.icon}
          <span className="font-medium">{selected.label}</span>
        </div>
        <ChevronDown
          size={18}
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-[60] mt-2 w-full overflow-hidden rounded-2xl border border-gray-100 bg-white p-1 shadow-xl animate-in fade-in slide-in-from-top-2 dark:border-slate-700 dark:bg-slate-900">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${value === option.value
                  ? 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                  : 'text-gray-600 hover:bg-gray-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                }`}
            >
              <div className="flex items-center gap-3">
                {option.icon}
                {option.label}
              </div>
              {value === option.value && <Check size={16} strokeWidth={3} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FormSelect;