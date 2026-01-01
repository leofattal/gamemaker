import React, { useState } from 'react';
import { User, Box, Coins, Ghost, Flag, Zap, Image } from 'lucide-react';
import type { ObjectType } from '../../types';

interface ObjectTemplate {
  type: ObjectType;
  name: string;
  icon: React.ReactNode;
  color: string;
  defaultWidth: number;
  defaultHeight: number;
}

const objectTemplates: ObjectTemplate[] = [
  {
    type: 'player',
    name: 'Player',
    icon: <User className="w-6 h-6" />,
    color: '#3B82F6',
    defaultWidth: 32,
    defaultHeight: 64,
  },
  {
    type: 'platform',
    name: 'Platform',
    icon: <Box className="w-6 h-6" />,
    color: '#8B4513',
    defaultWidth: 128,
    defaultHeight: 32,
  },
  {
    type: 'collectible',
    name: 'Collectible',
    icon: <Coins className="w-6 h-6" />,
    color: '#FCD34D',
    defaultWidth: 24,
    defaultHeight: 24,
  },
  {
    type: 'enemy',
    name: 'Enemy',
    icon: <Ghost className="w-6 h-6" />,
    color: '#EF4444',
    defaultWidth: 32,
    defaultHeight: 32,
  },
  {
    type: 'goal',
    name: 'Goal',
    icon: <Flag className="w-6 h-6" />,
    color: '#10B981',
    defaultWidth: 48,
    defaultHeight: 96,
  },
  {
    type: 'hazard',
    name: 'Hazard',
    icon: <Zap className="w-6 h-6" />,
    color: '#F59E0B',
    defaultWidth: 32,
    defaultHeight: 32,
  },
  {
    type: 'decoration',
    name: 'Decoration',
    icon: <Image className="w-6 h-6" />,
    color: '#6B7280',
    defaultWidth: 64,
    defaultHeight: 64,
  },
];

const ObjectPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredObjects = objectTemplates.filter((obj) =>
    obj.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDragStart = (e: React.DragEvent, template: ObjectTemplate) => {
    e.dataTransfer.setData(
      'objectTemplate',
      JSON.stringify({
        type: template.type,
        name: template.name,
        width: template.defaultWidth,
        height: template.defaultHeight,
      })
    );
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-white font-bold text-lg mb-3">Objects</h2>
        <input
          type="text"
          placeholder="Search objects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Object List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredObjects.map((template) => (
          <div
            key={template.type}
            draggable
            onDragStart={(e) => handleDragStart(e, template)}
            className="bg-gray-700 rounded-lg p-3 cursor-move hover:bg-gray-600 transition border-2 border-transparent hover:border-blue-500 active:scale-95"
            style={{
              borderLeftColor: template.color,
              borderLeftWidth: '4px',
            }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded flex items-center justify-center"
                style={{ backgroundColor: template.color + '20' }}
              >
                <div style={{ color: template.color }}>{template.icon}</div>
              </div>
              <div className="flex-1">
                <div className="text-white font-medium">{template.name}</div>
                <div className="text-gray-400 text-xs">
                  {template.defaultWidth}x{template.defaultHeight}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Help Text */}
      <div className="p-4 border-t border-gray-700 text-gray-400 text-sm">
        Drag objects onto the canvas to add them to your game
      </div>
    </div>
  );
};

export default ObjectPanel;
