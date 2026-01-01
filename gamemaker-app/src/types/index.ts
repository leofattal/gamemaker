// Game Object Types
export type ObjectType = 'player' | 'platform' | 'collectible' | 'enemy' | 'goal' | 'hazard' | 'decoration';

export interface GameObject {
  id: string;
  type: ObjectType;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  sprite: string;
  layer: number;
  properties: ObjectProperties;
}

export interface ObjectProperties {
  solid?: boolean;
  static?: boolean;
  gravity?: boolean;
  speed?: number;
  jumpForce?: number;
  health?: number;
  damage?: number;
  value?: number;
  patrolDistance?: number;
  [key: string]: any;
}

// Rule System Types
export type EventType =
  | 'collision'
  | 'keyPress'
  | 'keyRelease'
  | 'click'
  | 'gameStart'
  | 'timer'
  | 'variableCondition'
  | 'objectCreated'
  | 'objectDestroyed';

export type ActionType =
  | 'destroy'
  | 'create'
  | 'move'
  | 'addScore'
  | 'subtractScore'
  | 'playSound'
  | 'winGame'
  | 'loseGame'
  | 'showMessage'
  | 'changeVariable'
  | 'applyForce'
  | 'flashScreen';

export interface GameRule {
  id: string;
  name: string;
  enabled: boolean;
  when: RuleEvent;
  do: RuleAction[];
}

export interface RuleEvent {
  event: EventType;
  [key: string]: any;
}

export interface RuleAction {
  action: ActionType;
  [key: string]: any;
}

// Scene Types
export interface GameScene {
  id: string;
  name: string;
  background: {
    color: string;
    image?: string;
    parallax?: Array<{
      image: string;
      scrollSpeed: number;
    }>;
  };
  objects: GameObject[];
}

// Asset Types
export interface Asset {
  id: string;
  type: 'image' | 'audio';
  source: string;
  name?: string;
}

// Game Settings Types
export interface GameSettings {
  resolution: {
    width: number;
    height: number;
    scaleMode: 'fit' | 'fill' | 'none';
  };
  physics: {
    gravity: number;
    enableCollisions: boolean;
  };
  controls: {
    moveLeft: string[];
    moveRight: string[];
    jump: string[];
    interact: string[];
  };
  scoring: {
    enabled: boolean;
    startingScore: number;
    label: string;
    showHighScore: boolean;
  };
  lives: {
    enabled: boolean;
    startingLives: number;
    icon: string;
  };
  timer: {
    enabled: boolean;
    startTime: number;
    countDown: boolean;
  };
  audio: {
    bgMusic?: string;
    bgMusicVolume: number;
    sfxVolume: number;
    muted: boolean;
  };
  camera: {
    mode: 'fixed' | 'followPlayer' | 'custom';
    smoothing: number;
    bounds?: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  };
}

// Complete Game Schema
export interface GameProject {
  version: string;
  meta: {
    id: string;
    title: string;
    author: string;
    description: string;
    thumbnail?: string;
    created: string;
    modified: string;
    template: 'platformer' | 'topdown' | 'clicker';
  };
  settings: GameSettings;
  assets: Asset[];
  scenes: GameScene[];
  rules: GameRule[];
  variables: {
    [key: string]: number | string | boolean;
  };
}

// Editor State Types
export interface EditorState {
  selectedObjectId: string | null;
  gridEnabled: boolean;
  gridSize: number;
  zoom: number;
  isPreviewing: boolean;
  currentSceneId: string;
}

// Template Types
export type GameTemplate = 'platformer' | 'topdown' | 'clicker';

export interface TemplateConfig {
  id: GameTemplate;
  name: string;
  description: string;
  defaultSettings: Partial<GameSettings>;
  defaultObjects: GameObject[];
  defaultRules: GameRule[];
}
