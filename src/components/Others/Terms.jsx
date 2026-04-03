import React from 'react';
import LegalLayout from './LegalLayout';

const Terms = () => (
  <LegalLayout title="Terms of Service" lastUpdated="April 2026">
    <section className="space-y-6 text-black dark:text-gray-300">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
      <p>By accessing FinanceDash UI, you agree to be bound by these student-level terms of service. This app is provided "as is" for educational demonstration.</p>
      
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">2. Usage License</h2>
      <p>You are granted a limited license to explore the dashboard features. Modification of the core source code for commercial resale is prohibited under the current project license.</p>
    </section>
  </LegalLayout>
);

export default Terms;