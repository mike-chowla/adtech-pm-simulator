
import React from 'react';

interface OptionsListProps {
  options: string[];
  onSelectOption: (option: string) => void;
}

const OptionsList: React.FC<OptionsListProps> = ({ options, onSelectOption }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelectOption(option)}
          className="w-full text-left p-4 bg-indigo-600/80 rounded-lg text-white font-medium hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-400 transition-all duration-200 ease-in-out transform hover:scale-[1.02]"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionsList;
