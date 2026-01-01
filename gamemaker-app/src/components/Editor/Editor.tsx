import React, { useEffect } from 'react';
import { useGameStore } from '../../store/gameStore';
import Toolbar from '../Toolbar/Toolbar';
import ObjectPanel from '../ObjectPanel/ObjectPanel';
import Canvas from '../Canvas/Canvas';
import PropertiesPanel from '../PropertiesPanel/PropertiesPanel';
import Preview from '../Preview/Preview';

const Editor: React.FC = () => {
  const { project, editorState, newProject, loadProject } = useGameStore();

  useEffect(() => {
    // Try to load saved project from localStorage
    const savedProject = localStorage.getItem('gamemaker-project');
    if (savedProject) {
      try {
        loadProject(JSON.parse(savedProject));
      } catch (error) {
        console.error('Failed to load saved project:', error);
        newProject('platformer');
      }
    } else {
      newProject('platformer');
    }
  }, []);

  // Autosave every 30 seconds
  useEffect(() => {
    if (!project) return;

    const interval = setInterval(() => {
      localStorage.setItem('gamemaker-project', JSON.stringify(project));
      localStorage.setItem('gamemaker-autosave', new Date().toISOString());
    }, 30000);

    return () => clearInterval(interval);
  }, [project]);

  if (!project) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <div className="text-2xl mb-4">Loading GameMaker...</div>
          <div className="animate-pulse">Please wait</div>
        </div>
      </div>
    );
  }

  if (editorState.isPreviewing) {
    return <Preview />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-900">
      {/* Top Toolbar */}
      <Toolbar />

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Object Panel */}
        <ObjectPanel />

        {/* Center - Canvas */}
        <Canvas />

        {/* Right Sidebar - Properties Panel */}
        <PropertiesPanel />
      </div>
    </div>
  );
};

export default Editor;
