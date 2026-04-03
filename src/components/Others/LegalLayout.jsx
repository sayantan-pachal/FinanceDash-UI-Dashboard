import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

const LegalLayout = ({ title, lastUpdated, children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12 px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="group mb-8 flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-all"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          Back to Safety
        </button>

        {/* Header */}
        <header className="mb-12 border-b border-gray-100 dark:border-slate-800 pb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight">
            {title}
          </h1>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            <Clock size={14} />
            Last Updated: {lastUpdated}
          </div>
        </header>

        {/* Content Area */}
        <article className="prose prose-slate dark:prose-invert max-w-none 
          prose-headings:font-bold prose-headings:tracking-tight 
          prose-p:text-gray-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed">
          {children}
        </article>
      </div>
    </div>
  );
};

export default LegalLayout;