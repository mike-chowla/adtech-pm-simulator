
import React, { useState, useCallback, useEffect } from 'react';
import type { GameState } from './types';
import { getNextStep } from './services/geminiService';
import StoryDisplay from './components/StoryDisplay';
import OptionsList from './components/OptionsList';
import GameStatus from './components/GameStatus';
import Loader from './components/Loader';
import ShipIcon from './components/icons/ShipIcon';

const INITIAL_GAME_STATE: GameState = {
  story: "You are a Senior Product Manager at 'AdNauseam,' a giant in the ad-tech world. Your new project, 'Project Chimera,' aims to revolutionize personalized advertising using a novel AI model. If you succeed, you're on the fast track to a Director role. If you fail... well, the job market is tough. Your first big meeting is today. You need to get both Engineering and GTM teams aligned on your vision.",
  options: ["Let's do this! Start the meeting."],
  gameOver: false,
  win: false,
};

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectOption = useCallback(async (option: string) => {
    setLoading(true);
    setError(null);
    try {
      const nextState = await getNextStep(gameState.story, option);
      setGameState(nextState);
    } catch (e) {
      console.error(e);
      setError('The AI is contemplating its life choices. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [gameState.story]);

  const handleRestart = () => {
    setGameState(INITIAL_GAME_STATE);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      <main className="w-full max-w-2xl bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-indigo-900/50 ring-1 ring-white/10">
        <div className="p-6 sm:p-8">
          <header className="text-center mb-6 border-b border-slate-700 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white flex items-center justify-center gap-3">
              <ShipIcon className="w-8 h-8 text-indigo-400" />
              AdTech PM Simulator
            </h1>
            <p className="text-indigo-300 mt-2 text-sm sm:text-base">Your goal: Ship Project Chimera.</p>
          </header>

          {error && (
            <div className="bg-red-500/20 text-red-300 p-4 rounded-lg mb-4 text-center">
              <p><strong>Error:</strong> {error}</p>
            </div>
          )}

          {gameState.gameOver ? (
            <GameStatus win={gameState.win} story={gameState.story} onRestart={handleRestart} />
          ) : (
            <>
              <StoryDisplay story={gameState.story} isLoading={loading} />
              <div className="mt-6">
                {loading ? (
                  <Loader />
                ) : (
                  <OptionsList
                    options={gameState.options}
                    onSelectOption={handleSelectOption}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <footer className="text-center mt-8 text-slate-500 text-sm">
        <p>Powered by Gemini. A text adventure by a world-class React engineer.</p>
      </footer>
    </div>
  );
};

export default App;
