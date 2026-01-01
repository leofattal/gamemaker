import React from 'react';
import {
  Play,
  Save,
  Undo,
  Redo,
  Grid,
  ZoomIn,
  ZoomOut,
  Download,
  FileText,
} from 'lucide-react';
import { useGameStore } from '../../store/gameStore';

const Toolbar: React.FC = () => {
  const {
    project,
    editorState,
    setPreviewMode,
    setGridEnabled,
    setZoom,
    undo,
    redo,
    saveProject,
    historyIndex,
    history,
  } = useGameStore();

  const handlePlay = () => {
    setPreviewMode(true);
  };

  const handleSave = () => {
    saveProject();
    // Show toast notification (TODO: implement toast)
    console.log('Project saved!');
  };

  const handleZoomIn = () => {
    setZoom(Math.min(editorState.zoom + 0.25, 2));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(editorState.zoom - 0.25, 0.5));
  };

  const handleToggleGrid = () => {
    setGridEnabled(!editorState.gridEnabled);
  };

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export game');
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="h-14 bg-gray-800 border-b border-gray-700 flex items-center px-4 gap-2">
      {/* Logo/Title */}
      <div className="flex items-center gap-2 mr-4">
        <FileText className="w-6 h-6 text-blue-400" />
        <span className="text-white font-bold text-lg">GameMaker</span>
      </div>

      {/* Project Title */}
      <div className="text-white text-sm mr-auto">
        {project?.meta.title || 'Untitled Game'}
      </div>

      {/* Undo/Redo */}
      <button
        onClick={undo}
        disabled={!canUndo}
        className={`p-2 rounded hover:bg-gray-700 transition ${
          !canUndo ? 'opacity-50 cursor-not-allowed' : 'text-white'
        }`}
        title="Undo (Ctrl+Z)"
      >
        <Undo className="w-5 h-5" />
      </button>

      <button
        onClick={redo}
        disabled={!canRedo}
        className={`p-2 rounded hover:bg-gray-700 transition ${
          !canRedo ? 'opacity-50 cursor-not-allowed' : 'text-white'
        }`}
        title="Redo (Ctrl+Shift+Z)"
      >
        <Redo className="w-5 h-5" />
      </button>

      <div className="w-px h-8 bg-gray-700 mx-2" />

      {/* Grid Toggle */}
      <button
        onClick={handleToggleGrid}
        className={`p-2 rounded transition ${
          editorState.gridEnabled
            ? 'bg-blue-600 text-white'
            : 'text-white hover:bg-gray-700'
        }`}
        title="Toggle Grid"
      >
        <Grid className="w-5 h-5" />
      </button>

      {/* Zoom Controls */}
      <button
        onClick={handleZoomOut}
        className="p-2 rounded hover:bg-gray-700 text-white transition"
        title="Zoom Out"
      >
        <ZoomOut className="w-5 h-5" />
      </button>

      <span className="text-white text-sm w-12 text-center">
        {Math.round(editorState.zoom * 100)}%
      </span>

      <button
        onClick={handleZoomIn}
        className="p-2 rounded hover:bg-gray-700 text-white transition"
        title="Zoom In"
      >
        <ZoomIn className="w-5 h-5" />
      </button>

      <div className="w-px h-8 bg-gray-700 mx-2" />

      {/* Save */}
      <button
        onClick={handleSave}
        className="p-2 rounded hover:bg-gray-700 text-white transition"
        title="Save (Ctrl+S)"
      >
        <Save className="w-5 h-5" />
      </button>

      {/* Export */}
      <button
        onClick={handleExport}
        className="p-2 rounded hover:bg-gray-700 text-white transition"
        title="Export Game"
      >
        <Download className="w-5 h-5" />
      </button>

      <div className="w-px h-8 bg-gray-700 mx-2" />

      {/* Play/Preview */}
      <button
        onClick={handlePlay}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition flex items-center gap-2"
        title="Preview Game (Ctrl+Enter)"
      >
        <Play className="w-5 h-5" fill="currentColor" />
        <span className="font-medium">Play</span>
      </button>
    </div>
  );
};

export default Toolbar;
