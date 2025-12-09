import React, { useEffect } from 'react';
import { Trophy, RefreshCcw } from 'lucide-react';

export default function Result({ score, totalQuestions, playerName, onRestart }) {
  
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('ccbj-quiz-ranking') || '[]');
    history.push({ name: playerName, score, date: new Date().toLocaleDateString() });
    // Ordenar e manter top 10
    const sorted = history.sort((a, b) => b.score - a.score).slice(0, 10);
    localStorage.setItem('ccbj-quiz-ranking', JSON.stringify(sorted));
  }, [score, playerName]);

  return (
    <div className="text-center space-y-8 animate-fade-in">
      <div className="flex justify-center">
        <div className="bg-yellow-500/20 p-6 rounded-full border-2 border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
          <Trophy size={64} className="text-yellow-400" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-bold text-white">Parabéns, {playerName}!</h2>
        <p className="text-slate-400">Você concluiu o Quiz de Hardware do CCBJ.</p>
      </div>

      <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700">
        <div className="text-sm text-slate-500 uppercase tracking-widest mb-2">Pontuação Final</div>
        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
          {score} <span className="text-lg text-slate-500 font-normal">pontos</span>
        </div>
      </div>

      <button
        onClick={onRestart}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
      >
        <RefreshCcw size={20} />
        JOGAR NOVAMENTE
      </button>
    </div>
  );
}