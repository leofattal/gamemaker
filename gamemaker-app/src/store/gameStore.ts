import { create } from 'zustand';
import type { GameProject, GameObject, GameRule, EditorState, GameScene } from '../types';

interface GameStore {
  // Project data
  project: GameProject | null;

  // Editor state
  editorState: EditorState;

  // History for undo/redo
  history: GameProject[];
  historyIndex: number;

  // Actions
  setProject: (project: GameProject) => void;
  updateProject: (updates: Partial<GameProject>) => void;

  // Object actions
  addObject: (object: GameObject) => void;
  updateObject: (id: string, updates: Partial<GameObject>) => void;
  deleteObject: (id: string) => void;
  selectObject: (id: string | null) => void;

  // Rule actions
  addRule: (rule: GameRule) => void;
  updateRule: (id: string, updates: Partial<GameRule>) => void;
  deleteRule: (id: string) => void;

  // Scene actions
  addScene: (scene: GameScene) => void;
  setCurrentScene: (sceneId: string) => void;

  // Editor actions
  setGridEnabled: (enabled: boolean) => void;
  setZoom: (zoom: number) => void;
  setPreviewMode: (previewing: boolean) => void;

  // History actions
  undo: () => void;
  redo: () => void;
  saveToHistory: () => void;

  // Project actions
  newProject: (template: 'platformer' | 'topdown' | 'clicker') => void;
  saveProject: () => void;
  loadProject: (project: GameProject) => void;
}

const createDefaultProject = (template: 'platformer' | 'topdown' | 'clicker'): GameProject => {
  const now = new Date().toISOString();

  return {
    version: '1.0',
    meta: {
      id: `game-${Date.now()}`,
      title: 'My New Game',
      author: 'Player',
      description: 'A new game',
      created: now,
      modified: now,
      template,
    },
    settings: {
      resolution: {
        width: 800,
        height: 600,
        scaleMode: 'fit',
      },
      physics: {
        gravity: 800,
        enableCollisions: true,
      },
      controls: {
        moveLeft: ['ArrowLeft', 'KeyA'],
        moveRight: ['ArrowRight', 'KeyD'],
        jump: ['Space', 'ArrowUp', 'KeyW'],
        interact: ['KeyE'],
      },
      scoring: {
        enabled: true,
        startingScore: 0,
        label: 'Score',
        showHighScore: true,
      },
      lives: {
        enabled: true,
        startingLives: 3,
        icon: 'heart',
      },
      timer: {
        enabled: false,
        startTime: 60,
        countDown: true,
      },
      audio: {
        bgMusicVolume: 0.5,
        sfxVolume: 0.8,
        muted: false,
      },
      camera: {
        mode: 'followPlayer',
        smoothing: 0.1,
      },
    },
    assets: [],
    scenes: [
      {
        id: 'scene-1',
        name: 'Level 1',
        background: {
          color: '#87CEEB',
        },
        objects: template === 'platformer' ? [
          // Ground platform
          {
            id: 'platform-1',
            name: 'Ground',
            type: 'platform',
            x: 0,
            y: 550,
            width: 800,
            height: 50,
            sprite: '',
            layer: 0,
            properties: {
              solid: true,
              static: true,
              gravity: false,
            },
          },
          // Player
          {
            id: 'player-1',
            name: 'Player',
            type: 'player',
            x: 100,
            y: 400,
            width: 32,
            height: 48,
            sprite: '',
            layer: 1,
            properties: {
              solid: true,
              static: false,
              gravity: true,
              speed: 200,
              jumpForce: 400,
            },
          },
          // Left platform
          {
            id: 'platform-2',
            name: 'Platform 1',
            type: 'platform',
            x: 200,
            y: 450,
            width: 150,
            height: 20,
            sprite: '',
            layer: 0,
            properties: {
              solid: true,
              static: true,
              gravity: false,
            },
          },
          // Right platform
          {
            id: 'platform-3',
            name: 'Platform 2',
            type: 'platform',
            x: 450,
            y: 350,
            width: 150,
            height: 20,
            sprite: '',
            layer: 0,
            properties: {
              solid: true,
              static: true,
              gravity: false,
            },
          },
          // Collectible
          {
            id: 'collectible-1',
            name: 'Coin',
            type: 'collectible',
            x: 300,
            y: 400,
            width: 24,
            height: 24,
            sprite: '',
            layer: 1,
            properties: {
              solid: false,
              static: false,
              gravity: false,
              value: 10,
            },
          },
          // Goal
          {
            id: 'goal-1',
            name: 'Goal',
            type: 'goal',
            x: 700,
            y: 450,
            width: 50,
            height: 100,
            sprite: '',
            layer: 0,
            properties: {
              solid: false,
              static: false,
              gravity: false,
            },
          },
        ] : [],
      },
    ],
    rules: [],
    variables: {
      score: 0,
      lives: 3,
    },
  };
};

export const useGameStore = create<GameStore>((set, get) => ({
  project: null,
  editorState: {
    selectedObjectId: null,
    gridEnabled: true,
    gridSize: 32,
    zoom: 1,
    isPreviewing: false,
    currentSceneId: 'scene-1',
  },
  history: [],
  historyIndex: -1,

  setProject: (project) => set({ project }),

  updateProject: (updates) =>
    set((state) => ({
      project: state.project ? { ...state.project, ...updates } : null,
    })),

  addObject: (object) =>
    set((state) => {
      if (!state.project) return state;

      const currentScene = state.project.scenes.find(
        (s) => s.id === state.editorState.currentSceneId
      );

      if (!currentScene) return state;

      const updatedScenes = state.project.scenes.map((scene) =>
        scene.id === state.editorState.currentSceneId
          ? { ...scene, objects: [...scene.objects, object] }
          : scene
      );

      return {
        project: {
          ...state.project,
          scenes: updatedScenes,
          meta: {
            ...state.project.meta,
            modified: new Date().toISOString(),
          },
        },
      };
    }),

  updateObject: (id, updates) =>
    set((state) => {
      if (!state.project) return state;

      const updatedScenes = state.project.scenes.map((scene) => ({
        ...scene,
        objects: scene.objects.map((obj) =>
          obj.id === id ? { ...obj, ...updates } : obj
        ),
      }));

      return {
        project: {
          ...state.project,
          scenes: updatedScenes,
          meta: {
            ...state.project.meta,
            modified: new Date().toISOString(),
          },
        },
      };
    }),

  deleteObject: (id) =>
    set((state) => {
      if (!state.project) return state;

      const updatedScenes = state.project.scenes.map((scene) => ({
        ...scene,
        objects: scene.objects.filter((obj) => obj.id !== id),
      }));

      return {
        project: {
          ...state.project,
          scenes: updatedScenes,
          meta: {
            ...state.project.meta,
            modified: new Date().toISOString(),
          },
        },
        editorState: {
          ...state.editorState,
          selectedObjectId: state.editorState.selectedObjectId === id ? null : state.editorState.selectedObjectId,
        },
      };
    }),

  selectObject: (id) =>
    set((state) => ({
      editorState: { ...state.editorState, selectedObjectId: id },
    })),

  addRule: (rule) =>
    set((state) => {
      if (!state.project) return state;

      return {
        project: {
          ...state.project,
          rules: [...state.project.rules, rule],
          meta: {
            ...state.project.meta,
            modified: new Date().toISOString(),
          },
        },
      };
    }),

  updateRule: (id, updates) =>
    set((state) => {
      if (!state.project) return state;

      return {
        project: {
          ...state.project,
          rules: state.project.rules.map((rule) =>
            rule.id === id ? { ...rule, ...updates } : rule
          ),
          meta: {
            ...state.project.meta,
            modified: new Date().toISOString(),
          },
        },
      };
    }),

  deleteRule: (id) =>
    set((state) => {
      if (!state.project) return state;

      return {
        project: {
          ...state.project,
          rules: state.project.rules.filter((rule) => rule.id !== id),
          meta: {
            ...state.project.meta,
            modified: new Date().toISOString(),
          },
        },
      };
    }),

  addScene: (scene) =>
    set((state) => {
      if (!state.project) return state;

      return {
        project: {
          ...state.project,
          scenes: [...state.project.scenes, scene],
          meta: {
            ...state.project.meta,
            modified: new Date().toISOString(),
          },
        },
      };
    }),

  setCurrentScene: (sceneId) =>
    set((state) => ({
      editorState: { ...state.editorState, currentSceneId: sceneId },
    })),

  setGridEnabled: (enabled) =>
    set((state) => ({
      editorState: { ...state.editorState, gridEnabled: enabled },
    })),

  setZoom: (zoom) =>
    set((state) => ({
      editorState: { ...state.editorState, zoom },
    })),

  setPreviewMode: (previewing) =>
    set((state) => ({
      editorState: { ...state.editorState, isPreviewing: previewing },
    })),

  undo: () =>
    set((state) => {
      if (state.historyIndex <= 0) return state;

      const newIndex = state.historyIndex - 1;
      return {
        project: state.history[newIndex],
        historyIndex: newIndex,
      };
    }),

  redo: () =>
    set((state) => {
      if (state.historyIndex >= state.history.length - 1) return state;

      const newIndex = state.historyIndex + 1;
      return {
        project: state.history[newIndex],
        historyIndex: newIndex,
      };
    }),

  saveToHistory: () =>
    set((state) => {
      if (!state.project) return state;

      const newHistory = state.history.slice(0, state.historyIndex + 1);
      newHistory.push(JSON.parse(JSON.stringify(state.project)));

      // Keep only last 50 states
      if (newHistory.length > 50) {
        newHistory.shift();
      }

      return {
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }),

  newProject: (template) => {
    const project = createDefaultProject(template);
    set({
      project,
      history: [JSON.parse(JSON.stringify(project))],
      historyIndex: 0,
      editorState: {
        selectedObjectId: null,
        gridEnabled: true,
        gridSize: 32,
        zoom: 1,
        isPreviewing: false,
        currentSceneId: 'scene-1',
      },
    });
  },

  saveProject: () => {
    const state = get();
    if (state.project) {
      localStorage.setItem('gamemaker-project', JSON.stringify(state.project));
      localStorage.setItem('gamemaker-autosave', new Date().toISOString());
    }
  },

  loadProject: (project) => {
    set({
      project,
      history: [JSON.parse(JSON.stringify(project))],
      historyIndex: 0,
      editorState: {
        selectedObjectId: null,
        gridEnabled: true,
        gridSize: 32,
        zoom: 1,
        isPreviewing: false,
        currentSceneId: project.scenes[0]?.id || 'scene-1',
      },
    });
  },
}));
