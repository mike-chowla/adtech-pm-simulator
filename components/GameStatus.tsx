
import React from 'react';

interface GameStatusProps {
  win: boolean;
  story: string;
  onRestart: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ win, story, onRestart }) => {
  return (
    <div className="text-center p-4">
      <h2 className={`text-3xl font-bold mb-4 ${win ? 'text-green-400' : 'text-red-400'}`}>
        {win ? 'Project Shipped!' : 'Game Over'}
      </h2>
      <div className="bg-slate-900/50 p-4 rounded-lg mb-6">
        <p className="text-slate-300 leading-relaxed">{story}</p>
      </div>
      <button
        onClick={onRestart}
        className="px-8 py-3 bg-slate-600 rounded-lg text-white font-bold hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-400 transition-all duration-200"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameStatus;
