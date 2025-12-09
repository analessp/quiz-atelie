import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { Clock, AlertCircle } from 'lucide-react';

export default function QuizGame({ playerName, onFinish }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isAnswered, setIsAnswered] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  // Lógica do Timer
  useEffect(() => {
    if (timeLeft === 0) {
      handleNext();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    setIsAnswered(true);
    if (option === currentQuestion.answer) {
      // Pontuação baseada na dificuldade
      const points = currentQuestion.difficulty === 'Fácil' ? 10 : currentQuestion.difficulty === 'Médio' ? 20 : 30;
      setScore((prev) => prev + points);
    }
    // Pequeno delay para mostrar feedback visual antes de passar
    setTimeout(() => handleNext(), 1000);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setTimeLeft(60);
      setIsAnswered(false);
    } else {
      onFinish(score);
    }
  };

  // Cores das badges de dificuldade
  const difficultyColor = {
    'Fácil': 'bg-green-500/20 text-green-400 border-green-500/50',
    'Médio': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    'Difícil': 'bg-red-500/20 text-red-400 border-red-500/50',
  };

  return (
    <div className="w-full space-y-6">
      {/* Header do Quiz */}
      <div className="flex justify-between items-center bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="text-sm font-bold">Questão {currentQuestionIndex + 1}/{questions.length}</span>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold border ${difficultyColor[currentQuestion.difficulty]}`}>
          {currentQuestion.difficulty}
        </div>
        <div className={`flex items-center gap-2 font-mono font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-blue-400'}`}>
          <Clock size={18} />
          {timeLeft}s
        </div>
      </div>

      {/* Pergunta */}
      <div className="py-4">
        <h2 className="text-2xl font-bold text-white leading-relaxed">
          {currentQuestion.question}
        </h2>
        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1">
          <AlertCircle size={14} /> Tema: {currentQuestion.topic}
        </p>
      </div>

      {/* Opções */}
      <div className="grid gap-3">
        {currentQuestion.options.map((option, idx) => (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => handleAnswer(option)}
            className={`
              w-full p-4 text-left rounded-xl border transition-all duration-200
              ${isAnswered && option === currentQuestion.answer 
                ? 'bg-green-500/20 border-green-500 text-green-100' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-blue-500 hover:text-white'}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}