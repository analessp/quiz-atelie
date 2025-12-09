import React from 'react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-8 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-2 bg-blue-500 blur-xl opacity-50"></div>
        {children}
      </div>
    </div>
  );
}