import React from 'react';
import { Heart, Code2 } from 'lucide-react';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-900 flex items center justify-center p-4">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-8 relative flex flex-col min-h-[600px]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-2 bg-blue-500 blur-xl opacity-50"></div>

        <main className="flex-1 p-8 flex flex-col justify-center relative z-10">
        {children}
        </main>

        <footer className="py-6 bg-slate-950/30 border-t border-slate-800/50 backdrop-blur-sm">
          <div className="text-center space-y-1">
            <p className="text-slate-400 text-xs flex items-center justify-center gap-1.5">
              <Code2 size={14} className="text-blue-500" />
              Desenvolvido por
              <span className="text-slate-200 font-bold font-display tracking-wide">
                Ana Lessa.
              </span>
            </p>
            <p className="text-slate-600 text-[10px] uppercase tracking-wider">
              Ateliê de Montagem e Manutenção de Computadores
            </p>
            <p className="text-slate-700 text-[10px] pt-2">
              &copy; {new Date().getFullYear()} Centro Cultural do Bom Jardim
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}