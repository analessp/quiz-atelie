import React, { useEffect, useState } from 'react';
import { ArrowLeft, Trophy, Medal, Trash2 } from 'lucide-react';

export default function Ranking({ onBack }) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    // Busca os dados salvos no navegador ao carregar a tela
    const storedRanking = JSON.parse(localStorage.getItem('ccbj-quiz-ranking') || '[]');
    setRanking(storedRanking);
  }, []);

  // Função para limpar o histórico
  const handleClearHistory = () => {
    if (window.confirm("Tem certeza que deseja apagar todo o histórico de pontuações?")) {
      localStorage.removeItem('quiz-atelie');
      setRanking([]);
    }
  };

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy className="text-yellow-400 w-6 h-6" />;
    if (index === 1) return <Medal className="text-slate-300 w-6 h-6" />;
    if (index === 2) return <Medal className="text-amber-700 w-6 h-6" />;
    return <span className="text-slate-500 font-bold w-6 text-center">{index + 1}º</span>;
  };

  return (
    <div className="w-full max-w-lg mx-auto animate-fade-in flex flex-col h-full">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white"
          >
            <ArrowLeft />
          </button>
          <h2 className="text-2xl font-bold font-display text-white">Ranking Top 10</h2>
        </div>
      </div>

      {/* Lista de Ranking */}
      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {ranking.length === 0 ? (
          <div className="text-center py-10 text-slate-500 bg-slate-800/30 rounded-xl border border-slate-700/50">
            <Trophy className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>Nenhum recorde registrado ainda.</p>
            <p className="text-sm mt-2">Seja o primeiro a jogar!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ranking.map((player, index) => (
              <div 
                key={index}
                className={`
                  flex items-center justify-between p-4 rounded-xl border
                  ${index === 0 ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-slate-800/40 border-slate-700/50'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  <div>
                    <div className={`font-bold ${index === 0 ? 'text-yellow-400' : 'text-slate-200'}`}>
                      {player.name}
                    </div>
                    <div className="text-xs text-slate-500">{player.date}</div>
                  </div>
                </div>
                
                <div className="font-mono font-bold text-blue-400 text-lg">
                  {player.score} <span className="text-xs text-slate-500">pts</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Botão de Limpar Histórico (Só aparece se tiver ranking) */}
      {ranking.length > 0 && (
        <button
          onClick={handleClearHistory}
          className="w-full mt-6 bg-slate-900 border border-slate-800 hover:bg-red-950/30 hover:border-red-500/30 hover:text-red-400 text-slate-500 font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all group"
        >
          <Trash2 size={18} className="group-hover:scale-110 transition-transform" />
          Limpar Histórico
        </button>
      )}
    </div>
  );
}