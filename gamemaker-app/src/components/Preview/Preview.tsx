import React, { useEffect, useRef } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { GameEngine } from '../../engine/GameEngine';

const Preview: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const gameEngineRef = useRef<GameEngine | null>(null);

  const { project, setPreviewMode } = useGameStore();

  useEffect(() => {
    if (!project || !gameContainerRef.current) return;

    // Initialize the game engine
    gameEngineRef.current = new GameEngine(gameContainerRef.current, project);
    gameEngineRef.current.start();

    return () => {
      // Cleanup on unmount
      if (gameEngineRef.current) {
        gameEngineRef.current.destroy();
        gameEngineRef.current = null;
      }
    };
  }, [project]);

  const handleClose = () => {
    setPreviewMode(false);
  };

  const handleRestart = () => {
    if (gameEngineRef.current) {
      gameEngineRef.current.restart();
    }
  };

  return (
    <div className="w-full h-full bg-black flex flex-col">
      {/* Preview Toolbar */}
      <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-4">
        <div className="text-white font-bold text-lg">Preview Mode</div>

        <button
          onClick={handleRestart}
          className="ml-auto px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart</span>
        </button>

        <button
          onClick={handleClose}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          <span>Close Preview (ESC)</span>
        </button>
      </div>

      {/* Game Container */}
      <div className="flex-1 flex items-center justify-center">
        <div ref={gameContainerRef} id="game-container"></div>
      </div>
    </div>
  );
};

export default Preview;
