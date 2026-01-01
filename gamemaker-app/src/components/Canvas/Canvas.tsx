import React, { useRef, useEffect, useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import type { GameObject } from '../../types';

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const {
    project,
    editorState,
    addObject,
    updateObject,
    selectObject,
    deleteObject,
    saveToHistory,
  } = useGameStore();

  const currentScene = project?.scenes.find(
    (s) => s.id === editorState.currentSceneId
  );

  const selectedObject = currentScene?.objects.find(
    (obj) => obj.id === editorState.selectedObjectId
  );

  // Handle drag and drop from ObjectPanel
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const templateData = e.dataTransfer.getData('objectTemplate');
    if (!templateData || !canvasRef.current) return;

    const template = JSON.parse(templateData);
    const rect = canvasRef.current.getBoundingClientRect();

    // Calculate position relative to canvas, accounting for zoom
    let x = (e.clientX - rect.left) / editorState.zoom;
    let y = (e.clientY - rect.top) / editorState.zoom;

    // Snap to grid if enabled
    if (editorState.gridEnabled) {
      x = Math.round(x / editorState.gridSize) * editorState.gridSize;
      y = Math.round(y / editorState.gridSize) * editorState.gridSize;
    }

    const newObject: GameObject = {
      id: `obj-${Date.now()}`,
      type: template.type,
      name: template.name,
      x,
      y,
      width: template.width,
      height: template.height,
      sprite: template.type,
      layer: 1,
      properties: {
        solid: template.type === 'platform' || template.type === 'player',
        static: template.type === 'platform',
        gravity: template.type === 'player',
      },
    };

    addObject(newObject);
    selectObject(newObject.id);
    saveToHistory();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  // Handle object selection and dragging
  const handleObjectMouseDown = (
    e: React.MouseEvent,
    object: GameObject
  ) => {
    e.stopPropagation();
    selectObject(object.id);

    if (e.button === 0) {
      // Left click - start dragging
      setIsDragging(true);
      setDragOffset({
        x: e.clientX / editorState.zoom - object.x,
        y: e.clientY / editorState.zoom - object.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !selectedObject || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    let x = (e.clientX - rect.left) / editorState.zoom - dragOffset.x;
    let y = (e.clientY - rect.top) / editorState.zoom - dragOffset.y;

    // Snap to grid if enabled
    if (editorState.gridEnabled) {
      x = Math.round(x / editorState.gridSize) * editorState.gridSize;
      y = Math.round(y / editorState.gridSize) * editorState.gridSize;
    }

    updateObject(selectedObject.id, { x, y });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      saveToHistory();
    }
  };

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      selectObject(null);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Delete selected object
      if (
        (e.key === 'Delete' || e.key === 'Backspace') &&
        selectedObject
      ) {
        e.preventDefault();
        deleteObject(selectedObject.id);
        saveToHistory();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedObject, deleteObject, saveToHistory]);

  // Draw grid
  const renderGrid = () => {
    if (!editorState.gridEnabled || !project) return null;

    const gridSize = editorState.gridSize * editorState.zoom;
    const width = project.settings.resolution.width * editorState.zoom;
    const height = project.settings.resolution.height * editorState.zoom;

    const verticalLines = [];
    const horizontalLines = [];

    for (let x = 0; x <= width; x += gridSize) {
      verticalLines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={height}
          stroke="#374151"
          strokeWidth="1"
        />
      );
    }

    for (let y = 0; y <= height; y += gridSize) {
      horizontalLines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={width}
          y2={y}
          stroke="#374151"
          strokeWidth="1"
        />
      );
    }

    return (
      <svg
        className="absolute inset-0 pointer-events-none"
        style={{
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {verticalLines}
        {horizontalLines}
      </svg>
    );
  };

  // Render objects
  const renderObjects = () => {
    if (!currentScene) return null;

    return currentScene.objects.map((obj) => {
      const isSelected = obj.id === editorState.selectedObjectId;

      // Color mapping for object types
      const colorMap: Record<string, string> = {
        player: '#3B82F6',
        platform: '#8B4513',
        collectible: '#FCD34D',
        enemy: '#EF4444',
        goal: '#10B981',
        hazard: '#F59E0B',
        decoration: '#6B7280',
      };

      return (
        <div
          key={obj.id}
          onMouseDown={(e) => handleObjectMouseDown(e, obj)}
          style={{
            position: 'absolute',
            left: `${obj.x * editorState.zoom}px`,
            top: `${obj.y * editorState.zoom}px`,
            width: `${obj.width * editorState.zoom}px`,
            height: `${obj.height * editorState.zoom}px`,
            backgroundColor: colorMap[obj.type] || '#6B7280',
            border: isSelected ? '3px solid #60A5FA' : '2px solid rgba(0,0,0,0.3)',
            borderRadius: '4px',
            cursor: isDragging ? 'grabbing' : 'grab',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: `${12 * editorState.zoom}px`,
            fontWeight: 'bold',
            userSelect: 'none',
            boxShadow: isSelected
              ? '0 0 0 4px rgba(96, 165, 250, 0.3)'
              : 'none',
          }}
        >
          {obj.name}
        </div>
      );
    });
  };

  if (!project) return null;

  const canvasWidth = project.settings.resolution.width * editorState.zoom;
  const canvasHeight = project.settings.resolution.height * editorState.zoom;

  return (
    <div
      className="flex-1 bg-gray-900 overflow-auto relative"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="p-8">
        <div
          ref={canvasRef}
          style={{
            width: `${canvasWidth}px`,
            height: `${canvasHeight}px`,
            backgroundColor: currentScene?.background.color || '#87CEEB',
            position: 'relative',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            margin: '0 auto',
          }}
        >
          {renderGrid()}
          {renderObjects()}
        </div>
      </div>

      {/* Info overlay */}
      <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-90 text-white px-3 py-2 rounded text-sm">
        {currentScene?.name || 'Scene'} | {currentScene?.objects.length || 0}{' '}
        objects | Zoom: {Math.round(editorState.zoom * 100)}%
      </div>
    </div>
  );
};

export default Canvas;
