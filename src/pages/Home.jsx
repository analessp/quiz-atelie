import React, { useState } from 'react';
import { Play, Trophy, Clock, ListChecks, BarChart3 } from 'lucide-react';

export default function Home({ onStart, onOpenRanking }) {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      onStart(name);
    } else {
      alert("Por favor, digite seu nome para iniciar!");
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-8 animate-fade-in">
      {/* Badge Superior */}
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 text-white px-6 py-1 rounded-full text-sm font-bold tracking-widest uppercase shadow-lg shadow-blue-900/50">
        CCBJ Tech Lab
      </div>

      {/* Título */}
      <div className="space-y-2">
        <h1 className="text-5xl md:text-6xl font-black font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
          Quiz
        </h1>
        <p className="text-slate-400 text-lg">Ateliê de Montagem e Manutenção</p>
        <p className="text-slate-500 text-sm">Centro Cultural do Bom Jardim</p>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
        <InfoCard icon={<ListChecks />} text="5 Questões" sub="Teste Rápido" color="text-blue-400" />
        <InfoCard icon={<Clock />} text="1 min/questão" sub="Contra o tempo" color="text-purple-400" />
        <InfoCard icon={<BarChart3 />} text="3 Níveis" sub="Fácil a Difícil" color="text-emerald-400" />
      </div>

      {/* Área de Input e Botão */}
      <div className="w-full space-y-4 mt-8 bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <div className="text-left">
          <label 
            htmlFor="player-name" 
            className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1"
          >
            Digite seu nome para jogar
          </label>
          <input
            id="player-name"
            type="text"
            placeholder="Seu nome aqui..."
            className="w-full mt-2 bg-slate-900 border border-slate-700 text-white p-4 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex gap-4">
          {/* Botão de Iniciar Quiz */}
          <button
            onClick={handleStart}
            className="flex-1 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-600 hover:border-blue-400 group"
          >
            <Play className="w-5 h-5 fill-current group-hover:scale-110 transition-transform" />
            INICIAR QUIZ
          </button>
          
          {/* Botão do Ranking*/}
          <button 
            onClick={onOpenRanking}
            className="px-6 py-4 bg-slate-900 border border-slate-700 rounded-xl hover:bg-slate-800 text-yellow-500 transition-colors"
            aria-label="Ver Ranking de Jogadores"
          >
            <Trophy className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, text, sub, color }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700/50 p-4 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-slate-800 transition-colors">
      <div className={`${color} p-2 bg-slate-900 rounded-lg`}>
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div className="text-sm font-bold text-slate-200">{text}</div>
      <div className="text-xs text-slate-500">{sub}</div>
    </div>
  );
}