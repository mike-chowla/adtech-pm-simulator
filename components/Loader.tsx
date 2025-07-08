
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="flex items-center space-x-2">
        <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        <span className="ml-4 text-slate-400">Engineering is thinking...</span>
      </div>
    </div>
  );
};

export default Loader;
