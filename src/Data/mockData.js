export const INITIAL_TRANSACTIONS = [
  // --- INCOME ---
  { id: 1, date: '2026-03-01', amount: 5000, category: 'Salary', type: 'income', name: 'Monthly Paycheck' },
  { id: 2, date: '2026-03-12', amount: 450, category: 'Freelance', type: 'income', name: 'UI Design Project' },
  { id: 3, date: '2026-03-25', amount: 100, category: 'Investments', type: 'income', name: 'Stock Dividends' },

  // --- HOUSING & UTILITIES ---
  { id: 4, date: '2026-03-02', amount: 1200, category: 'Rent', type: 'expense', name: 'Apartment Rent' },
  { id: 5, date: '2026-03-04', amount: 85, category: 'Utilities', type: 'expense', name: 'Electricity Bill' },
  { id: 6, date: '2026-03-06', amount: 45, category: 'Utilities', type: 'expense', name: 'Water & Gas' },

  // --- FOOD & DINING ---
  { id: 7, date: '2026-03-05', amount: 120, category: 'Food', type: 'expense', name: 'Weekly Groceries' },
  { id: 8, date: '2026-03-08', amount: 45, category: 'Food', type: 'expense', name: 'Starbucks Coffee' },
  { id: 9, date: '2026-03-15', amount: 85, category: 'Food', type: 'expense', name: 'Dinner with Friends' },

  // --- TRANSPORT ---
  { id: 10, date: '2026-03-10', amount: 60, category: 'Transport', type: 'expense', name: 'Fuel Refill' },
  { id: 11, date: '2026-03-18', amount: 25, category: 'Transport', type: 'expense', name: 'Uber Ride' },

  // --- ENTERTAINMENT & SUBSCRIPTIONS ---
  { id: 12, date: '2026-03-07', amount: 15, category: 'Subscriptions', type: 'expense', name: 'Netflix' },
  { id: 13, date: '2026-03-14', amount: 10, category: 'Subscriptions', type: 'expense', name: 'Spotify Premium' },
  { id: 14, date: '2026-03-22', amount: 120, category: 'Entertainment', type: 'expense', name: 'Movie Night & Popcorn' },

  // --- SHOPPING & PERSONAL ---
  { id: 15, date: '2026-03-11', amount: 250, category: 'Shopping', type: 'expense', name: 'Nike Sneakers' },
  { id: 16, date: '2026-03-28', amount: 40, category: 'Health', type: 'expense', name: 'Gym Supplement' },
];

export const CATEGORIES = [
  'Salary', 
  'Freelance', 
  'Investments', 
  'Food', 
  'Rent', 
  'Utilities', 
  'Transport', 
  'Subscriptions', 
  'Entertainment', 
  'Shopping', 
  'Health'
];