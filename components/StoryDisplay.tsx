
import React from 'react';

interface StoryDisplayProps {
  story: string;
  isLoading: boolean;
}

const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, isLoading }) => {
  return (
    <div className={`bg-slate-900/50 p-4 rounded-lg min-h-[120px] transition-opacity duration-500 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
      <p className="text-slate-300 leading-relaxed">
        {story}
      </p>
    </div>
  );
};

export default StoryDisplay;
