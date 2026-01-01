import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Trash2 } from 'lucide-react';

const PropertiesPanel: React.FC = () => {
  const { project, editorState, updateObject, deleteObject, saveToHistory } =
    useGameStore();

  const currentScene = project?.scenes.find(
    (s) => s.id === editorState.currentSceneId
  );

  const selectedObject = currentScene?.objects.find(
    (obj) => obj.id === editorState.selectedObjectId
  );

  if (!selectedObject) {
    return (
      <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-white font-bold text-lg">Properties</h2>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-400">
          Select an object to edit its properties
        </div>
      </div>
    );
  }

  const handleChange = (field: string, value: any) => {
    updateObject(selectedObject.id, { [field]: value });
  };

  const handlePropertyChange = (propertyName: string, value: any) => {
    updateObject(selectedObject.id, {
      properties: {
        ...selectedObject.properties,
        [propertyName]: value,
      },
    });
  };

  const handleDelete = () => {
    if (confirm(`Delete ${selectedObject.name}?`)) {
      deleteObject(selectedObject.id);
      saveToHistory();
    }
  };

  const handleBlur = () => {
    saveToHistory();
  };

  return (
    <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <h2 className="text-white font-bold text-lg">Properties</h2>
        <button
          onClick={handleDelete}
          className="p-2 rounded hover:bg-red-600 text-red-400 hover:text-white transition"
          title="Delete Object"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>

      {/* Properties Form */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Object Type Badge */}
        <div className="bg-gray-700 rounded px-3 py-2 text-center">
          <div className="text-gray-400 text-xs mb-1">Object Type</div>
          <div className="text-white font-medium capitalize">
            {selectedObject.type}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-400 text-sm mb-2">Name</label>
          <input
            type="text"
            value={selectedObject.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={handleBlur}
            className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Transform Section */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-white font-medium mb-3">Transform</h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-400 text-sm mb-2">X</label>
              <input
                type="number"
                value={selectedObject.x}
                onChange={(e) =>
                  handleChange('x', parseFloat(e.target.value) || 0)
                }
                onBlur={handleBlur}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Y</label>
              <input
                type="number"
                value={selectedObject.y}
                onChange={(e) =>
                  handleChange('y', parseFloat(e.target.value) || 0)
                }
                onBlur={handleBlur}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Width</label>
              <input
                type="number"
                value={selectedObject.width}
                onChange={(e) =>
                  handleChange('width', parseFloat(e.target.value) || 1)
                }
                onBlur={handleBlur}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Height</label>
              <input
                type="number"
                value={selectedObject.height}
                onChange={(e) =>
                  handleChange('height', parseFloat(e.target.value) || 1)
                }
                onBlur={handleBlur}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Physics Properties */}
        <div className="border-t border-gray-700 pt-4">
          <h3 className="text-white font-medium mb-3">Physics</h3>

          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedObject.properties.solid || false}
                onChange={(e) =>
                  handlePropertyChange('solid', e.target.checked)
                }
                onBlur={handleBlur}
                className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-white">Solid (has collision)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedObject.properties.static || false}
                onChange={(e) =>
                  handlePropertyChange('static', e.target.checked)
                }
                onBlur={handleBlur}
                className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-white">Static (immovable)</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedObject.properties.gravity || false}
                onChange={(e) =>
                  handlePropertyChange('gravity', e.target.checked)
                }
                onBlur={handleBlur}
                className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-white">Affected by gravity</span>
            </label>
          </div>
        </div>

        {/* Type-specific Properties */}
        {selectedObject.type === 'player' && (
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-white font-medium mb-3">Player Properties</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Speed
                </label>
                <input
                  type="number"
                  value={selectedObject.properties.speed || 200}
                  onChange={(e) =>
                    handlePropertyChange(
                      'speed',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Jump Force
                </label>
                <input
                  type="number"
                  value={selectedObject.properties.jumpForce || 400}
                  onChange={(e) =>
                    handlePropertyChange(
                      'jumpForce',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Health
                </label>
                <input
                  type="number"
                  value={selectedObject.properties.health || 3}
                  onChange={(e) =>
                    handlePropertyChange(
                      'health',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {selectedObject.type === 'collectible' && (
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-white font-medium mb-3">
              Collectible Properties
            </h3>

            <div>
              <label className="block text-gray-400 text-sm mb-2">
                Point Value
              </label>
              <input
                type="number"
                value={selectedObject.properties.value || 10}
                onChange={(e) =>
                  handlePropertyChange(
                    'value',
                    parseFloat(e.target.value) || 0
                  )
                }
                onBlur={handleBlur}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {selectedObject.type === 'enemy' && (
          <div className="border-t border-gray-700 pt-4">
            <h3 className="text-white font-medium mb-3">Enemy Properties</h3>

            <div className="space-y-3">
              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Speed
                </label>
                <input
                  type="number"
                  value={selectedObject.properties.speed || 50}
                  onChange={(e) =>
                    handlePropertyChange(
                      'speed',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Damage
                </label>
                <input
                  type="number"
                  value={selectedObject.properties.damage || 1}
                  onChange={(e) =>
                    handlePropertyChange(
                      'damage',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-400 text-sm mb-2">
                  Patrol Distance
                </label>
                <input
                  type="number"
                  value={selectedObject.properties.patrolDistance || 200}
                  onChange={(e) =>
                    handlePropertyChange(
                      'patrolDistance',
                      parseFloat(e.target.value) || 0
                    )
                  }
                  onBlur={handleBlur}
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Layer */}
        <div className="border-t border-gray-700 pt-4">
          <label className="block text-gray-400 text-sm mb-2">Layer</label>
          <input
            type="number"
            value={selectedObject.layer}
            onChange={(e) =>
              handleChange('layer', parseInt(e.target.value) || 0)
            }
            onBlur={handleBlur}
            min="0"
            max="10"
            className="w-full px-3 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          />
          <div className="text-gray-500 text-xs mt-1">
            Higher layers appear in front
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;
