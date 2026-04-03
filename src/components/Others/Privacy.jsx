import React from 'react';
import LegalLayout from './LegalLayout';

const Privacy = () => (
  <LegalLayout title="Privacy Policy" lastUpdated="April 2026">
    <section className="space-y-6 text-black dark:text-gray-300">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Data Collection</h2>
      <p>We respect your financial data. FinanceDash UI operates primarily on <b>Local Storage</b>, meaning your transaction data stays on your machine unless you explicitly sync with our cloud services.</p>
      
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. How We Use Information</h2>
      <p>Any data collected via our analytics tools is used strictly to improve the dashboard performance and user experience. We do not sell your personal financial habits to third parties.</p>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 text-sm italic">
        Note: As a student project, no real-world tracking is active. This page is for UI demonstration purposes.
      </div>
    </section>
  </LegalLayout>
);

export default Privacy;