# Product Requirements Document: GameMaker - No-Code Browser Game Creation Platform

**Version:** 1.0
**Date:** December 30, 2025
**Author:** Product Team
**Status:** Draft for Review

---

## 1. Product Overview

### 1.1 Vision
GameMaker is a browser-based no-code game creation platform that empowers anyone—regardless of programming experience—to create, play, and share simple 2D games through an intuitive visual editor.

### 1.2 Value Proposition
"From idea to playable game in minutes, not months."

GameMaker removes the technical barriers to game development by:
- Providing drag-and-drop object placement
- Offering rule-based logic without code
- Enabling instant preview and sharing
- Requiring zero installation or setup

### 1.3 Problem Statement
**The Problem:**
- Traditional game development requires programming knowledge, deterring creative individuals
- Existing no-code platforms are either too complex, expensive, or require desktop installation
- Educators lack accessible tools to teach game design concepts
- Hobbyists spend more time debugging code than iterating on ideas

**Our Solution:**
A browser-based platform with:
- Visual-first interface with zero code required
- Templates for common game types
- Rule-based logic system using natural language concepts
- One-click export and sharing

### 1.4 Target Users

**Primary Users:**
1. **Young Learners (Ages 8-16)**
   - Learning game design fundamentals
   - Exploring creativity through interactive media
   - Building portfolio projects

2. **Educators**
   - Teaching STEM concepts through game design
   - Running coding clubs or workshops
   - Creating interactive learning materials

3. **Non-Technical Hobbyists**
   - Adults interested in game creation
   - No programming background
   - Interested in rapid prototyping

**Secondary Users:**
4. **Content Creators**
   - YouTubers/streamers creating simple games
   - Social media creators building interactive content

### 1.5 Why No-Code Game Creation?

**Educational Value:**
- Teaches logic, problem-solving, and systems thinking
- Lower barrier to entry than traditional programming
- Immediate feedback loop encourages experimentation

**Creative Empowerment:**
- Focus on design and mechanics over syntax
- Rapid iteration from concept to playable prototype
- Democratizes game development

**Market Opportunity:**
- Growing demand for STEM education tools
- Increasing interest in game development as a hobby
- No-code movement expanding across industries

---

## 2. Goals and Non-Goals

### 2.1 Primary Goals

1. **Ease of Use**
   - New users can create their first playable game within 15 minutes
   - No tutorials required for basic functionality
   - Visual feedback at every step

2. **Fast Creation Cycle**
   - Drag-and-drop object placement
   - Pre-built templates for common game types
   - Instant preview without build step

3. **Exportability & Sharing**
   - One-click export to playable HTML
   - Shareable hosted links
   - Embeddable games for websites/blogs

4. **Learning-Friendly**
   - Clear visual feedback for all actions
   - Understandable error messages
   - Progressive complexity (simple to start, powerful if needed)

### 2.2 Non-Goals

**Out of Scope (MVP):**
- ❌ Complex 3D game creation
- ❌ AAA-quality graphics or physics
- ❌ Heavy scripting or programming languages
- ❌ Multiplayer networking
- ❌ Mobile app export (native iOS/Android)
- ❌ Asset marketplace or monetization
- ❌ User accounts or cloud save (MVP uses local storage)
- ❌ Advanced animation tools or sprite editing
- ❌ VR/AR support

**Intentional Constraints:**
- Focus on 2D games only
- Limited to browser-compatible technologies
- Simplified physics (collision detection, not full physics engine)
- Template-based rather than fully freeform

---

## 3. Supported Game Types (Initial Scope)

### 3.1 Template: Platformer

**Description:**
Side-scrolling game where the player jumps between platforms to reach a goal while avoiding obstacles.

**Core Mechanics:**
- Left/right movement with arrow keys or WASD
- Jump mechanic with gravity
- Platform collision detection
- Collectibles (coins, stars)
- Hazards (spikes, pits, enemies)
- Goal/exit to win

**Constraints:**
- Single screen or horizontal scrolling
- Limited to 2-4 layers (background, platforms, objects, foreground)
- Maximum 50 objects per scene

**Example Games:**
- Collect 10 coins and reach the flag
- Avoid enemies while jumping to the exit
- Time-based challenge platformer

---

### 3.2 Template: Top-Down Movement Game

**Description:**
View from above where the player moves in four directions to navigate a space, collect items, or reach objectives.

**Core Mechanics:**
- 4-directional or 8-directional movement
- Collision with walls and objects
- Collectibles scattered in environment
- Enemy patrol patterns or stationary hazards
- Keys/doors mechanics
- Exit or goal zone

**Constraints:**
- Single screen or scrolling in all directions
- Grid-based or free movement
- Maximum 100 objects per scene

**Example Games:**
- Maze navigation
- Collect all gems without touching enemies
- Delivery/fetch quest game

---

### 3.3 Template: Clicker / Idle Game

**Description:**
Interactive game where clicking generates resources, which can unlock upgrades or progress.

**Core Mechanics:**
- Click on objects to gain points/resources
- Upgrade system (auto-clickers, multipliers)
- Unlockable objects or milestones
- Progress visualization (progress bars, counters)
- Optional timer-based auto-generation

**Constraints:**
- Primarily UI-based (less spatial than other templates)
- Maximum 20 interactive objects
- Simple math-based progression

**Example Games:**
- Cookie clicker style
- Resource gathering simulator
- Upgrade-based progression game

---

## 4. User Experience & Editor Design

### 4.1 Editor Interface Layout

**Main Components:**

1. **Canvas (Center)**
   - Visual representation of the game
   - Grid overlay (optional, toggle-able)
   - Zoom controls (50%, 100%, 200%)
   - Pan capability (spacebar + drag)

2. **Object Panel (Left Sidebar)**
   - Categorized object library:
     - Player
     - Enemies
     - Platforms/Walls
     - Collectibles
     - Decorations
     - UI Elements
   - Drag-and-drop to canvas
   - Search/filter functionality

3. **Properties Panel (Right Sidebar)**
   - Selected object properties:
     - Position (X, Y)
     - Size (Width, Height)
     - Visual (sprite, color, opacity)
     - Physics (solid, moveable, gravity-affected)
     - Rules/behaviors
   - Layer management
   - Name/label field

4. **Top Toolbar**
   - New / Open / Save
   - Undo / Redo
   - Play (preview)
   - Export
   - Settings

5. **Bottom Toolbar**
   - Game rules editor (see Section 5)
   - Global settings link
   - Asset manager

### 4.2 Canvas Behavior

**Grid System:**
- Optional snap-to-grid (default 32x32 pixels)
- Visual grid overlay (toggle)
- Free placement mode available

**Drag-and-Drop:**
- Drag from object panel → place on canvas
- Drag on canvas → reposition
- Multi-select with shift or rectangle selection
- Copy/paste support
- Delete with backspace/delete key

**Visual Feedback:**
- Hover highlight on objects
- Selection outline (blue border)
- Alignment guides when moving objects
- Collision bounds preview (optional overlay)

### 4.3 Object System

**Object Categories:**

1. **Player Object**
   - Only one allowed per scene
   - Movement controlled by user input
   - Can have health, lives, inventory

2. **Enemy Object**
   - AI-controlled or stationary
   - Can have patrol patterns
   - Causes damage or game over on collision

3. **Platform/Wall Object**
   - Solid, impassable boundaries
   - Can be ground, walls, or floating platforms
   - Static or moving

4. **Collectible Object**
   - Picked up on collision
   - Affects score, unlocks, or inventory
   - Disappears when collected

5. **Goal Object**
   - Triggers win condition
   - Examples: exit door, flag, finish line

6. **Hazard Object**
   - Causes damage or game over
   - Examples: spikes, pits, lava

7. **Decoration Object**
   - Visual only, no collision
   - Background elements, particles

**Object Properties (Universal):**
- **Transform:** X, Y, Width, Height, Rotation
- **Visual:** Sprite/Image, Color Tint, Opacity, Layer
- **Physics:** Solid (has collision), Moveable, Affected by Gravity
- **Behavior:** Linked rules (see Section 5)
- **Metadata:** Name, Tags, Notes

### 4.4 Asset Library and Custom Uploads

**Built-In Asset Library:**
- 100+ pre-made sprites organized by category:
  - Characters (player types, enemies)
  - Environment (platforms, tiles, backgrounds)
  - Items (coins, keys, power-ups)
  - UI elements (buttons, icons, text)
- Simple, colorful art style suitable for all ages
- SVG-based for scalability
- Consistent visual theme

**Custom Asset Upload:**
- Supported formats: PNG, JPG, GIF, SVG
- Maximum file size: 2MB per asset
- Automatic sprite sheet detection (optional)
- Background removal tool (basic)
- Image cropping and resizing

**Asset Management:**
- User asset library (stored locally)
- Search and filter
- Favorites/recent
- Bulk import

### 4.5 Undo/Redo and Autosave

**Undo/Redo:**
- Full history stack (last 50 actions)
- Keyboard shortcuts: Cmd/Ctrl + Z, Cmd/Ctrl + Shift + Z
- Actions tracked:
  - Object creation/deletion
  - Property changes
  - Rule modifications
  - Global settings changes

**Autosave:**
- Local browser storage (IndexedDB)
- Autosave every 30 seconds
- Manual save with Cmd/Ctrl + S
- "Unsaved changes" warning on exit
- Version history (last 5 autosaves)

---

## 5. No-Code Logic System

### 5.1 Overview

The logic system uses a **rule-based approach** structured as:

```
WHEN [event] HAPPENS
DO [action]
```

Rules are created through a visual interface with dropdown menus and value inputs—no code typing required.

### 5.2 Event Types (WHEN)

**Collision Events:**
- `WHEN [object A] touches [object B]`
- `WHEN [object] touches [tag/category]`
- `WHEN [object] stops touching [object B]`

**Input Events:**
- `WHEN [key] is pressed`
- `WHEN [key] is released`
- `WHEN [object] is clicked`
- `WHEN mouse hovers over [object]`

**Time Events:**
- `WHEN game starts`
- `WHEN [X] seconds pass`
- `WHEN timer reaches [X]`
- `WHEN [object] is created`

**Condition Events:**
- `WHEN score reaches [X]`
- `WHEN [object] count equals [X]`
- `WHEN [variable] is [comparison] [value]`

**Lifecycle Events:**
- `WHEN scene starts`
- `WHEN [object] is destroyed`

### 5.3 Action Types (DO)

**Object Actions:**
- `Destroy [object]`
- `Create [object] at [position]`
- `Move [object] to [position]`
- `Move [object] by [X, Y]`
- `Apply force to [object] in [direction]`
- `Change [object] sprite to [image]`
- `Play animation on [object]`

**Game State Actions:**
- `Add [X] to score`
- `Subtract [X] from score`
- `Set [variable] to [value]`
- `Increase [variable] by [X]`
- `Win game`
- `Lose game`
- `Restart level`
- `Go to [scene]`

**Audio/Visual Actions:**
- `Play sound [sound file]`
- `Show message [text]`
- `Show/Hide [object]`
- `Shake screen`
- `Flash screen [color]`

**UI Actions:**
- `Update text [element] to [value]`
- `Show/Hide UI element`
- `Enable/Disable button`

### 5.4 Rule Examples

**Example 1: Collect Coin**
```
WHEN [Player] touches [Coin]
DO:
  - Add 10 to score
  - Destroy [Coin]
  - Play sound "coin_pickup.mp3"
```

**Example 2: Enemy Collision**
```
WHEN [Player] touches [Enemy]
DO:
  - Subtract 1 from lives
  - Move [Player] to [spawn point]
  - Play sound "damage.mp3"
  - Flash screen [red]
```

**Example 3: Win Condition**
```
WHEN score reaches 100
DO:
  - Show message "You Win!"
  - Wait 2 seconds
  - Win game
```

**Example 4: Jump Mechanic**
```
WHEN [Space] is pressed
  AND [Player] is touching [Ground]
DO:
  - Apply force to [Player] in [up] direction (500)
  - Play sound "jump.wav"
```

**Example 5: Auto-Spawner**
```
WHEN 5 seconds pass
DO:
  - Create [Enemy] at [random top position]
  - Reset timer
```

### 5.5 Rule Editor UI

**Visual Rule Builder:**
1. Click "Add Rule" button
2. Select WHEN dropdown → choose event type
3. Fill in event parameters (dropdowns and inputs)
4. Click "Add Action" → choose action type
5. Fill in action parameters
6. Add multiple actions to same WHEN block (sequential execution)
7. Optional: Add AND/OR conditions

**Rule Organization:**
- Rules displayed as collapsible cards
- Color-coded by event type
- Attached to specific objects OR global
- Enable/disable toggle for testing
- Duplicate and delete options

### 5.6 Advanced Features (Post-MVP)

**Conditional Logic:**
- IF/ELSE branches within rules
- Complex AND/OR combinations

**Variables:**
- User-defined variables
- Math operations
- String concatenation

**Functions/Reusable Blocks:**
- Save common rule sequences
- Parameterized behaviors

---

## 6. Game Settings

### 6.1 Global Settings Panel

**Accessed via:** Settings button in top toolbar

**Categories:**

### 6.2 Controls Settings

**Platformer Controls:**
- Left/Right: Arrow keys, A/D, or custom
- Jump: Space, W, Up Arrow, or custom
- Action button: E, F, or custom

**Top-Down Controls:**
- Movement: Arrow keys, WASD, or custom
- Interact: Space, E, or custom
- 4-directional vs 8-directional toggle
- Movement speed slider

**Clicker Controls:**
- Mouse click zones
- Keyboard shortcuts for upgrades

**Custom Bindings:**
- Dropdown to reassign any action to any key
- Visual keyboard preview

### 6.3 Win/Lose Conditions

**Win Conditions (Select One or More):**
- Reach score of [X]
- Collect all [object type]
- Touch [goal object]
- Survive for [X] seconds
- Custom rule (via rule editor)

**Lose Conditions (Select One or More):**
- Lives reach 0
- Touch [hazard type]
- Timer runs out
- Fall off map
- Custom rule

**Behavior on Win/Lose:**
- Show message (customizable text)
- Restart level
- Go to next level
- Return to menu
- Custom action

### 6.4 Scoring System

**Score Settings:**
- Enable/Disable score display
- Starting score: [default 0]
- Score label text: [default "Score"]
- High score tracking (local)

**Timer Settings:**
- Enable countdown/countup timer
- Starting time
- Timer affects win/lose
- Display format (MM:SS, seconds)

**Lives System:**
- Enable/Disable lives
- Starting lives: [default 3]
- Lives icon/visual
- Game over on 0 lives

### 6.5 Difficulty Settings

**Physics Tuning:**
- Gravity strength slider
- Player speed slider
- Jump height slider
- Enemy speed slider

**Game Balance:**
- Enemy damage amount
- Collectible values
- Respawn behavior
- Invincibility time after damage

### 6.6 Sound and Visuals

**Audio:**
- Background music (upload or select from library)
- Background music volume
- Sound effects volume
- Mute toggle

**Visual Style:**
- Background color or image
- Background parallax layers
- Camera behavior:
  - Fixed
  - Follow player
  - Custom scripted
- Screen resolution/aspect ratio (default 800x600, 16:9, etc.)
- Fullscreen option

**UI Customization:**
- HUD position (top-left, top-right, etc.)
- Font selection
- UI color scheme

---

## 7. Preview, Testing, and Debugging

### 7.1 Live Preview Mode

**Activation:**
- Click "Play" button in toolbar
- Keyboard shortcut: Cmd/Ctrl + Enter

**Preview Window:**
- Full-screen overlay or embedded panel
- Identical to exported game experience
- All rules and physics active

**Exit Preview:**
- Click "Stop" button
- ESC key
- Automatically returns to edit mode

### 7.2 Reset and Replay

**During Preview:**
- Reset button (restarts from beginning)
- Maintains current editor state
- Instant reload (no build step)

**Hot-Reload (Post-MVP):**
- Changes in editor update live preview in real-time

### 7.3 Debug Overlays (Optional)

**Toggle Options:**
- Show collision bounds (rectangles/circles)
- Show object names and IDs
- Display coordinates on hover
- Show active rules firing (real-time log)
- FPS counter
- Object count

**Console Log:**
- Event log showing:
  - Object creation/destruction
  - Rule triggers
  - Collisions detected
  - Variable changes
- Filterable by event type
- Timestamps

**Step-Through Mode (Post-MVP):**
- Pause game
- Step forward one frame at a time
- Inspect object states

---

## 8. Export & Sharing

### 8.1 Export Formats

**1. Downloadable HTML Package**

**Contents:**
- Single `.html` file with embedded game
- Bundled assets (base64 encoded or separate folder)
- Standalone, no internet required to play
- Works offline

**Technical Details:**
- Minified JavaScript runtime
- All assets embedded or in `/assets` folder
- Responsive canvas (scales to window)
- Mobile-friendly touch controls (if applicable)

**User Experience:**
- Click "Export" → "Download HTML"
- ZIP file downloads containing:
  - `index.html`
  - `/assets` folder (if external assets)
  - `README.txt` (instructions)

---

**2. Shareable Hosted Link**

**Hosting:**
- Game uploaded to GameMaker's servers (or user-provided host)
- Unique URL generated (e.g., `gamemaker.app/play/abc123`)
- Optional custom URL slug (e.g., `gamemaker.app/play/my-awesome-game`)

**Features:**
- Public or unlisted (via link only)
- Optional password protection
- View counter (number of plays)
- QR code for mobile access

**User Experience:**
- Click "Export" → "Share Link"
- Game uploads in background
- Link copied to clipboard automatically
- Social sharing buttons (Twitter, Facebook, Reddit)

**Limitations (MVP):**
- Max 50MB per game
- Hosted for 30 days (free tier) or indefinitely (paid)
- No custom domain support initially

---

**3. Embeddable iFrame**

**Output:**
- HTML iframe code snippet
- Responsive embed sizing
- Configurable width/height

**User Experience:**
- Click "Export" → "Embed Code"
- Code snippet displayed in modal
- Copy to clipboard
- Preview of embedded game

**Example Code:**
```html
<iframe src="https://gamemaker.app/embed/abc123"
        width="800"
        height="600"
        frameborder="0"
        allowfullscreen>
</iframe>
```

**Use Cases:**
- Embedding in blogs/websites
- Educational platforms
- Portfolio sites

---

### 8.2 Technical Requirements for Export

**Export Process:**
1. Validate game (check for errors, missing assets)
2. Serialize game data to JSON
3. Bundle runtime engine (JavaScript)
4. Package assets
5. Generate HTML wrapper
6. Minify and compress
7. Output/upload

**Runtime Engine:**
- Lightweight JavaScript game engine
- Reads JSON game definition
- Renders canvas
- Handles input
- Executes rules
- Independent of editor code

**Asset Optimization:**
- Image compression (optional toggle)
- Sprite sheet generation for multiple frames
- Unused asset removal
- Audio format conversion (to web-compatible formats)

**Browser Compatibility:**
- Target: Chrome, Firefox, Safari, Edge (latest 2 versions)
- Fallbacks for older browsers (basic message)
- Mobile browser support (iOS Safari, Chrome Android)

---

### 8.3 UX Requirements

**Pre-Export Validation:**
- Check for:
  - Missing player object
  - No win/lose conditions
  - Unused assets (warning, not error)
  - Oversized assets
- Display warnings/errors in modal
- Allow export anyway (with warnings)

**Export Options Dialog:**
- Format selection (HTML, Link, Embed)
- Optimization level (none, standard, maximum)
- Include analytics toggle (play tracking)
- License/attribution settings

**Progress Indicator:**
- Show upload/compression progress
- Estimated time remaining
- Cancel option

**Post-Export Actions:**
- Success message with link/file
- "Play Now" button to test
- "Share" buttons for social media
- "Export Another Format" option

---

## 9. Technical Architecture

### 9.1 High-Level Architecture

**Three-Tier System:**

1. **Editor (Frontend)**
   - User-facing interface for game creation
   - React or Vue.js framework
   - Canvas manipulation via Fabric.js or Konva.js
   - Communicates with runtime engine for preview

2. **Runtime Engine (Frontend)**
   - JavaScript-based game engine
   - Reads JSON game definition
   - Handles rendering, physics, input, rules
   - Independent module (can run without editor)
   - Optionally uses Phaser.js or custom engine

3. **Backend (Optional for MVP)**
   - Cloud storage for hosted games
   - User account management (future)
   - Analytics tracking
   - Asset CDN

---

### 9.2 Frontend Technologies

**Editor Stack:**
- **Framework:** React 18+ (component-based UI)
- **Canvas Library:** Fabric.js or Konva.js (object manipulation)
- **State Management:** Redux or Zustand (game data state)
- **Styling:** Tailwind CSS (responsive, utility-first)
- **Build Tool:** Vite (fast dev server and builds)

**Runtime Engine Stack:**
- **Option A:** Custom lightweight engine
  - HTML5 Canvas API
  - RequestAnimationFrame for game loop
  - Custom collision detection
  - Minimal dependencies
  - ~50KB minified

- **Option B:** Phaser.js 3
  - Mature, battle-tested framework
  - Built-in physics, input, audio
  - Larger bundle size (~1MB)
  - Faster development
  - **Recommended for MVP**

**Why Phaser.js (Recommended):**
- Handles physics, sprites, input out-of-box
- Active community and documentation
- Plugin ecosystem for future features
- Reduces custom code maintenance

---

### 9.3 Data Model & Game Schema

**JSON-Based Game Definition:**

All games stored as a single JSON object that the runtime engine interprets.

**Schema Structure:**
```json
{
  "meta": { ... },
  "settings": { ... },
  "assets": [ ... ],
  "scenes": [ ... ],
  "rules": [ ... ],
  "variables": { ... }
}
```

(See Section 10 for detailed schema)

---

### 9.4 Separation: Editor vs. Runtime

**Editor Responsibilities:**
- Visual UI for game creation
- Object placement and property editing
- Rule builder interface
- Asset management
- Export/import functionality
- Save/load games from browser storage

**Runtime Responsibilities:**
- Load JSON game definition
- Initialize game world (scenes, objects)
- Game loop (update, render)
- Input handling
- Physics simulation
- Rule execution
- Audio playback

**Communication:**
- Editor generates JSON
- Runtime consumes JSON
- Preview mode: Editor passes JSON to embedded runtime instance
- Export: JSON bundled with standalone runtime

**Benefits:**
- Runtime is small and portable
- Editor complexity doesn't affect game performance
- Easy to update editor without changing runtime
- Games are future-proof (JSON format stable)

---

### 9.5 Asset Handling Strategy

**Storage Locations:**

**During Editing:**
- **Built-in assets:** Served from CDN (static URLs)
- **User uploads:** Stored in IndexedDB (browser storage)
- **Asset references:** Stored as IDs in game JSON

**On Export (HTML Download):**
- **Option A:** Base64 encode all assets into HTML
  - Pros: Single file, works offline
  - Cons: Larger file size
  - Use for: Small games (<5MB total)

- **Option B:** External asset folder
  - Pros: Faster loading, cacheable
  - Cons: Multiple files
  - Use for: Larger games

**On Export (Hosted Link):**
- Assets uploaded to CDN
- JSON references CDN URLs
- Runtime loads assets via URLs

**Asset Optimization:**
- Automatic image compression (lossy/lossless toggle)
- Unused asset removal before export
- Sprite sheet generation (combine multiple images)
- Lazy loading (load assets on-demand)

---

### 9.6 Browser Storage

**IndexedDB:**
- Stores game projects (JSON + metadata)
- Stores user-uploaded assets (blobs)
- Autosave snapshots
- Undo/redo history

**LocalStorage:**
- User preferences (UI settings, editor state)
- Recent projects list
- Analytics opt-in status

**Limits:**
- IndexedDB: ~50MB per origin (browser-dependent)
- Warn user when approaching limits
- Option to export project to file for backup

---

### 9.7 Performance Considerations

**Editor Performance:**
- Virtual scrolling for large object lists
- Canvas rendering optimizations (layer caching)
- Debounced autosave
- Lazy load asset thumbnails

**Runtime Performance:**
- Target 60 FPS on modern devices
- Object pooling (reuse destroyed objects)
- Spatial hashing for collision detection
- Limit max objects per scene (100-200)
- Warn if game exceeds performance budget

---

## 10. Data Model

### 10.1 Complete JSON Schema

```json
{
  "version": "1.0",
  "meta": {
    "id": "unique-game-id",
    "title": "My Awesome Game",
    "author": "Player Name",
    "description": "A fun platformer game!",
    "thumbnail": "data:image/png;base64,...",
    "created": "2025-01-15T10:30:00Z",
    "modified": "2025-01-20T14:22:00Z",
    "template": "platformer"
  },

  "settings": {
    "resolution": {
      "width": 800,
      "height": 600,
      "scaleMode": "fit"
    },
    "physics": {
      "gravity": 800,
      "enableCollisions": true
    },
    "controls": {
      "moveLeft": ["ArrowLeft", "KeyA"],
      "moveRight": ["ArrowRight", "KeyD"],
      "jump": ["Space", "ArrowUp", "KeyW"],
      "interact": ["KeyE"]
    },
    "scoring": {
      "enabled": true,
      "startingScore": 0,
      "label": "Score",
      "showHighScore": true
    },
    "lives": {
      "enabled": true,
      "startingLives": 3,
      "icon": "heart.png"
    },
    "timer": {
      "enabled": false,
      "startTime": 60,
      "countDown": true
    },
    "audio": {
      "bgMusic": "music_001.mp3",
      "bgMusicVolume": 0.5,
      "sfxVolume": 0.8,
      "muted": false
    },
    "camera": {
      "mode": "followPlayer",
      "smoothing": 0.1,
      "bounds": { "x": 0, "y": 0, "width": 2400, "height": 600 }
    }
  },

  "assets": [
    {
      "id": "player_sprite",
      "type": "image",
      "source": "data:image/png;base64,..." // or URL
    },
    {
      "id": "coin_sprite",
      "type": "image",
      "source": "assets/coin.png"
    },
    {
      "id": "jump_sound",
      "type": "audio",
      "source": "assets/jump.wav"
    }
  ],

  "scenes": [
    {
      "id": "level_1",
      "name": "Level 1",
      "background": {
        "color": "#87CEEB",
        "image": "bg_sky.png",
        "parallax": [
          { "image": "clouds.png", "scrollSpeed": 0.5 }
        ]
      },
      "objects": [
        {
          "id": "obj_001",
          "type": "player",
          "name": "Player",
          "x": 100,
          "y": 400,
          "width": 32,
          "height": 64,
          "sprite": "player_sprite",
          "layer": 2,
          "properties": {
            "speed": 200,
            "jumpForce": 400,
            "solid": true,
            "gravity": true,
            "health": 3
          }
        },
        {
          "id": "obj_002",
          "type": "platform",
          "name": "Ground",
          "x": 0,
          "y": 550,
          "width": 2400,
          "height": 50,
          "sprite": "grass_tile.png",
          "layer": 1,
          "properties": {
            "solid": true,
            "static": true
          }
        },
        {
          "id": "obj_003",
          "type": "collectible",
          "name": "Coin",
          "x": 300,
          "y": 400,
          "width": 24,
          "height": 24,
          "sprite": "coin_sprite",
          "layer": 2,
          "properties": {
            "value": 10
          }
        },
        {
          "id": "obj_004",
          "type": "enemy",
          "name": "Enemy",
          "x": 500,
          "y": 400,
          "width": 32,
          "height": 32,
          "sprite": "enemy_sprite",
          "layer": 2,
          "properties": {
            "speed": 50,
            "patrolDistance": 200,
            "damage": 1
          }
        },
        {
          "id": "obj_005",
          "type": "goal",
          "name": "Exit Flag",
          "x": 2300,
          "y": 450,
          "width": 48,
          "height": 96,
          "sprite": "flag_sprite",
          "layer": 2
        }
      ]
    }
  ],

  "rules": [
    {
      "id": "rule_001",
      "name": "Collect Coin",
      "enabled": true,
      "when": {
        "event": "collision",
        "objectA": { "type": "player" },
        "objectB": { "type": "collectible" }
      },
      "do": [
        {
          "action": "addScore",
          "value": 10
        },
        {
          "action": "playSound",
          "sound": "coin_sound"
        },
        {
          "action": "destroy",
          "target": "objectB"
        }
      ]
    },
    {
      "id": "rule_002",
      "name": "Enemy Damage",
      "enabled": true,
      "when": {
        "event": "collision",
        "objectA": { "type": "player" },
        "objectB": { "type": "enemy" }
      },
      "do": [
        {
          "action": "changeVariable",
          "variable": "lives",
          "operator": "subtract",
          "value": 1
        },
        {
          "action": "playSound",
          "sound": "damage_sound"
        },
        {
          "action": "flashScreen",
          "color": "#FF0000",
          "duration": 0.2
        },
        {
          "action": "moveObject",
          "target": "objectA",
          "position": { "x": 100, "y": 400 }
        }
      ]
    },
    {
      "id": "rule_003",
      "name": "Win Condition",
      "enabled": true,
      "when": {
        "event": "collision",
        "objectA": { "type": "player" },
        "objectB": { "id": "obj_005" }
      },
      "do": [
        {
          "action": "showMessage",
          "text": "You Win!",
          "duration": 2
        },
        {
          "action": "winGame"
        }
      ]
    },
    {
      "id": "rule_004",
      "name": "Game Over",
      "enabled": true,
      "when": {
        "event": "variableCondition",
        "variable": "lives",
        "operator": "equals",
        "value": 0
      },
      "do": [
        {
          "action": "showMessage",
          "text": "Game Over!",
          "duration": 2
        },
        {
          "action": "loseGame"
        }
      ]
    },
    {
      "id": "rule_005",
      "name": "Jump Input",
      "enabled": true,
      "when": {
        "event": "keyPress",
        "key": "jump",
        "condition": {
          "property": "touching",
          "object": { "type": "player" },
          "target": { "type": "platform" }
        }
      },
      "do": [
        {
          "action": "applyForce",
          "target": { "type": "player" },
          "direction": "up",
          "force": 400
        },
        {
          "action": "playSound",
          "sound": "jump_sound"
        }
      ]
    }
  ],

  "variables": {
    "score": 0,
    "lives": 3,
    "timer": 0,
    "level": 1,
    "coinsCollected": 0
  }
}
```

---

### 10.2 Schema Validation

**Editor Responsibilities:**
- Validate JSON schema before save/export
- Check for required fields
- Ensure object references exist
- Warn about unreferenced assets

**Runtime Responsibilities:**
- Parse JSON safely (try/catch)
- Fallback to defaults for missing optional fields
- Error logging for corrupted data

**Versioning:**
- Schema version field for future compatibility
- Migration functions for older game formats

---

## 11. Performance, Accessibility, and Security

### 11.1 Browser Compatibility

**Target Browsers:**
- Chrome 100+ (primary development target)
- Firefox 100+
- Safari 15+
- Edge 100+

**Mobile Browsers:**
- iOS Safari 15+
- Chrome for Android 100+

**Fallback for Unsupported Browsers:**
- Detection script on page load
- Display friendly message with browser recommendations
- No graceful degradation (require modern features)

**Required Browser Features:**
- HTML5 Canvas
- ES6+ JavaScript (async/await, modules)
- IndexedDB
- Web Audio API
- FileReader API (for uploads)

---

### 11.2 Performance Targets

**Editor Performance:**
- Initial load time: < 3 seconds (on 3G connection)
- Object placement lag: < 16ms (60 FPS)
- Autosave: < 100ms (non-blocking)
- Large projects (100+ objects): Smooth editing with optimizations

**Runtime Performance:**
- Game load time: < 2 seconds
- Frame rate: 60 FPS on desktop, 30 FPS minimum on mobile
- Input latency: < 50ms
- Memory usage: < 200MB for typical game

**Optimization Strategies:**
- Code splitting (load editor modules on-demand)
- Asset lazy loading
- Canvas rendering optimizations (dirty rectangles)
- Web Workers for heavy computations (future)

**Performance Budgets:**
- Editor bundle size: < 500KB (gzipped)
- Runtime bundle size: < 200KB (gzipped)
- Total asset size per game: < 50MB
- Max objects per scene: 200

---

### 11.3 Accessibility Considerations

**Editor Accessibility:**
- Keyboard navigation for all editor features
- Screen reader support (ARIA labels)
- High contrast mode
- Scalable UI (zoom support)
- Focus indicators
- Tooltips and help text

**Game Accessibility (Created Games):**
- Customizable controls (remapping)
- Option to disable flashing effects
- Subtitles for audio cues (future)
- Colorblind-friendly palettes (recommended)
- Pause functionality
- Adjustable difficulty settings

**WCAG Compliance:**
- Target: WCAG 2.1 Level AA
- Color contrast ratios for UI text
- Alternative text for images
- Keyboard-only operation

**Educational Accessibility:**
- Simple language in UI
- Visual feedback for all actions
- Undo capability reduces fear of mistakes
- Tutorials with illustrations

---

### 11.4 Security and Safety

**For Child Users:**

**No Account Required (MVP):**
- No personal data collection
- No email or password requirements
- Games stored locally in browser
- No user tracking (optional analytics)

**Content Safety:**
- No user-generated text (minimal risk)
- Asset upload restrictions:
  - File type whitelist (images, audio only)
  - Max file size enforcement
  - No executable files
  - No external URL loading (prevents XSS)

**Privacy:**
- No cookies (except essential for functionality)
- No third-party trackers
- Optional analytics (opt-in)
- COPPA compliant (Children's Online Privacy Protection Act)

**Data Security:**

**Local Storage:**
- Games stored in browser's IndexedDB
- No server-side storage (MVP)
- Export games to backup locally

**Hosted Games (Future):**
- HTTPS only
- Content moderation (if community features added)
- Rate limiting on uploads
- Virus scanning on asset uploads

**Code Safety:**
- No arbitrary code execution
- Sandboxed game runtime
- CSP (Content Security Policy) headers
- Input sanitization for all user data

---

### 11.5 Legal and Compliance

**Licensing:**
- Users own their created games
- Built-in assets: Creative Commons or proprietary (free to use in games)
- Exported games: No royalties, free to distribute

**Terms of Service:**
- Acceptable use policy (no harmful/offensive content)
- Age requirements (13+ without parental consent, per COPPA)
- Liability disclaimers

**Asset Attribution:**
- Optional attribution for built-in assets
- Users responsible for licensing of uploaded assets

---

## 12. Milestones & Phases

### 12.1 MVP (Phase 1) - Core Functionality
**Timeline:** 3-4 months
**Goal:** Ship a usable no-code game creator with one template

**Features:**
✅ Single template: Platformer
✅ Editor UI:
  - Canvas with drag-and-drop
  - Object panel (player, platforms, collectibles, enemies, goal)
  - Properties panel
  - Top toolbar (save, undo, redo, play, export)

✅ Object system:
  - 6 core object types
  - Basic properties (position, sprite, collision)

✅ Rule system:
  - 3 event types: collision, key press, game start
  - 5 action types: destroy, add score, win game, lose game, play sound

✅ Built-in asset library:
  - 30 sprites (characters, platforms, items)
  - 10 sound effects

✅ Preview mode:
  - Play game in editor
  - Reset and replay

✅ Export:
  - Download HTML package
  - Standalone playable game

✅ Local storage:
  - Save/load projects
  - Autosave

**Success Criteria:**
- User can create and export a playable platformer in < 30 minutes
- No critical bugs in export
- 60 FPS in runtime on target browsers

---

### 12.2 Phase 2 - Expand Templates & Sharing
**Timeline:** 2-3 months after MVP
**Goal:** Add more game types and sharing capabilities

**Features:**
✅ New templates:
  - Top-down movement game
  - Clicker/idle game

✅ Enhanced rule system:
  - Timer events
  - Variable conditions
  - More actions (move object, create object, show message)

✅ Sharing features:
  - Hosted game links
  - Embed codes
  - QR code generation

✅ Expanded asset library:
  - 100+ sprites
  - 30+ sound effects
  - Background music tracks

✅ Custom asset uploads:
  - Image upload
  - Audio upload
  - Asset management UI

✅ UI improvements:
  - Onboarding tutorial
  - Tooltips and help
  - Example games to remix

**Success Criteria:**
- 3 fully functional templates
- Hosted sharing with < 5 second upload time
- 80% of users can create a game without external help

---

### 12.3 Phase 3 - Advanced Features & Community
**Timeline:** 3-4 months after Phase 2
**Goal:** Add polish, advanced features, and community elements

**Features:**
✅ Advanced rule editor:
  - IF/ELSE conditionals
  - Variables and math operations
  - Reusable rule blocks

✅ Multi-scene support:
  - Level progression
  - Scene transitions
  - Global variables across scenes

✅ Enhanced physics:
  - Custom collision shapes
  - One-way platforms
  - Moving platforms

✅ Animation system:
  - Sprite animations
  - Tweening (move, scale, rotate)
  - Particle effects

✅ User accounts (optional):
  - Cloud save
  - Project management
  - Game library

✅ Community features:
  - Public game gallery
  - Remix other games
  - Comments and likes
  - Featured games

✅ Mobile export:
  - PWA (Progressive Web App) support
  - Touch control optimization
  - Responsive layouts

**Success Criteria:**
- User retention: 40% return within 7 days
- 1000+ games created and shared
- Average session time: 20+ minutes

---

### 12.4 Future Considerations (Phase 4+)

**Potential Features:**
- Multiplayer support (turn-based or real-time)
- 3D graphics (limited, isometric)
- Asset marketplace
- Monetization tools (ads, in-game purchases)
- Mobile app versions (native iOS/Android)
- Advanced scripting mode (optional code layer)
- Collaboration tools (multiplayer editing)
- AI-assisted game creation (generate sprites, suggest rules)

---

## 13. Risks & Open Questions

### 13.1 Technical Risks

**1. Browser Storage Limitations**
- **Risk:** Users exceed IndexedDB storage limits (~50MB)
- **Mitigation:**
  - Warn users approaching limit
  - Provide export-to-file backup
  - Compress project data
  - Asset optimization tools

**2. Runtime Performance on Low-End Devices**
- **Risk:** Games lag on older computers/tablets
- **Mitigation:**
  - Set object count limits
  - Performance profiling tools in editor
  - "Performance Mode" toggle (reduced effects)
  - Mobile-specific optimizations

**3. Phaser.js Bundle Size**
- **Risk:** Large initial download (1MB+ for Phaser)
- **Mitigation:**
  - Custom Phaser build (include only needed features)
  - Code splitting
  - CDN hosting for faster loads
  - Consider custom lightweight engine if critical

**4. Asset Upload Abuse**
- **Risk:** Users upload copyrighted/inappropriate content
- **Mitigation:**
  - File size limits
  - File type restrictions
  - Future: Content moderation for hosted games
  - Terms of service

**5. Cross-Browser Inconsistencies**
- **Risk:** Games behave differently in different browsers
- **Mitigation:**
  - Comprehensive cross-browser testing
  - Use well-tested libraries (Phaser.js)
  - Polyfills for missing features
  - Clear browser compatibility messaging

---

### 13.2 UX Risks

**1. Complexity Overwhelm**
- **Risk:** New users feel overwhelmed by editor features
- **Mitigation:**
  - Onboarding tutorial (first-time walkthrough)
  - Progressive disclosure (hide advanced features)
  - Templates with pre-configured examples
  - Tooltips and contextual help

**2. Unclear Rule System**
- **Risk:** Users don't understand WHEN/DO logic
- **Mitigation:**
  - Visual rule builder (no code syntax)
  - Real-time validation and preview
  - Example rules library
  - "Test this rule" feature

**3. Asset Discovery**
- **Risk:** Users can't find the right assets quickly
- **Mitigation:**
  - Search and filter
  - Categorization and tags
  - Recent/favorites
  - Visual thumbnails

**4. Export Confusion**
- **Risk:** Users don't understand different export formats
- **Mitigation:**
  - Clear descriptions for each format
  - Recommended format based on use case
  - Preview before export
  - Success confirmation with next steps

---

### 13.3 Scope Creep Risks

**1. Feature Bloat**
- **Risk:** Too many features make MVP too complex
- **Mitigation:**
  - Strict MVP scope (see 12.1)
  - User feedback drives Phase 2+
  - "Jobs to be done" framework for prioritization

**2. Perfectionism**
- **Risk:** Over-polish delays launch
- **Mitigation:**
  - Ship MVP with known limitations
  - Iterate based on real usage
  - "Good enough" threshold defined upfront

**3. Template Expansion**
- **Risk:** Trying to support too many game types
- **Mitigation:**
  - Start with 1 template (platformer)
  - Add templates based on user demand
  - Ensure each template is fully functional

---

### 13.4 Open Questions

**Product Questions:**

1. **Should we support user accounts in MVP?**
   - **Pro:** Cloud save, cross-device access
   - **Con:** Added complexity, privacy concerns, slower MVP
   - **Recommendation:** No accounts in MVP, use local storage only

2. **How do we handle asset licensing for uploaded content?**
   - **Option A:** Users certify they own rights (self-service)
   - **Option B:** Manual review (doesn't scale)
   - **Option C:** Automated content matching (expensive)
   - **Recommendation:** Option A with clear ToS

3. **Should exported games include GameMaker branding?**
   - **Pro:** Marketing, brand awareness
   - **Con:** Users may not want branding
   - **Recommendation:** Optional branding (on by default, can disable)

4. **What's the monetization strategy?**
   - **Options:**
     - Free forever (marketing tool)
     - Freemium (basic free, advanced paid)
     - Subscriptions (cloud features)
     - One-time purchase
   - **Recommendation:** Free MVP, freemium model in Phase 2

5. **How do we handle game versioning?**
   - Users may want to update published games
   - Do we support version history?
   - **Recommendation:** Phase 2 feature

**Technical Questions:**

6. **Custom engine vs. Phaser.js?**
   - **Custom:** Smaller bundle, full control, more work
   - **Phaser.js:** Proven, faster development, larger bundle
   - **Recommendation:** Phaser.js for MVP (speed to market)

7. **Server-side rendering for hosted games?**
   - Pure client-side vs. server-generated HTML
   - **Recommendation:** Client-side only (simpler, scalable)

8. **How do we handle game updates after export?**
   - Once exported, games are static
   - **Future:** Link to hosted version for updates

9. **Should we support mobile touch controls automatically?**
   - **Recommendation:** Yes, auto-detect touch devices and show on-screen controls

10. **How granular should undo/redo be?**
    - Every property change vs. batched actions
    - **Recommendation:** Batch related changes (e.g., multi-select move)

---

## 14. Success Metrics

### 14.1 Key Performance Indicators (KPIs)

**User Engagement:**
- **Time to First Playable Game:**
  - Target: < 15 minutes for new users
  - Measure: Time from landing page to first successful preview

- **Export Success Rate:**
  - Target: > 90% of users who preview successfully export
  - Measure: (Exports / Previews) × 100

- **User Retention:**
  - Target: 40% return within 7 days
  - Measure: (Returning users / Total users) × 100

- **Average Session Time:**
  - Target: > 20 minutes
  - Measure: Time from editor open to close

- **Games Created Per User:**
  - Target: 2+ games per active user
  - Measure: Total games / Active users

**Product Quality:**
- **Editor Error Rate:**
  - Target: < 2% of sessions encounter errors
  - Measure: Sessions with JS errors / Total sessions

- **Preview Success Rate:**
  - Target: > 95% of previews load without errors
  - Measure: Successful previews / Total preview attempts

- **Export File Size:**
  - Target: Median < 5MB
  - Measure: Distribution of exported game sizes

- **Runtime Performance (FPS):**
  - Target: > 90% of games run at 60 FPS on target devices
  - Measure: FPS tracking in exported games (if analytics enabled)

**Growth & Reach:**
- **Weekly Active Users (WAU):**
  - Target: Month-over-month growth of 20%
  - Measure: Unique users per week

- **Shared Games:**
  - Target: 30% of exported games are shared publicly
  - Measure: Hosted links / Total exports

- **Game Plays (Views):**
  - Target: 10 plays per shared game (average)
  - Measure: Total plays / Shared games

- **Referral Rate:**
  - Target: 15% of users come from shared games
  - Measure: Traffic from game embeds/links

---

### 14.2 User Research Metrics

**Usability Testing (Pre-Launch):**
- Task completion rate for key workflows
- Time on task (create object, add rule, export)
- User satisfaction scores (SUS - System Usability Scale)
- Number of errors per task

**Post-Launch Feedback:**
- Net Promoter Score (NPS)
  - Target: > 50 (promoters - detractors)
- User surveys (quarterly)
- Feature request voting
- Bug report volume and severity

---

### 14.3 Analytics Implementation

**Event Tracking:**
- Page views (editor, preview, export)
- Actions:
  - Object created
  - Rule added
  - Asset uploaded
  - Preview started
  - Export initiated
  - Game shared
- Errors:
  - JS exceptions
  - Failed exports
  - Failed asset uploads

**Privacy-First Analytics:**
- No personally identifiable information (PII)
- Aggregated data only
- Opt-in analytics toggle
- GDPR/COPPA compliant

**Tools:**
- Plausible or Simple Analytics (privacy-focused)
- Custom event logger (minimal)
- No Google Analytics (privacy concerns for child users)

---

### 14.4 Success Criteria by Phase

**MVP Success:**
✅ 100 users create and export a game
✅ < 5 critical bugs reported
✅ 80% user satisfaction in beta testing
✅ Average time to first game < 20 minutes

**Phase 2 Success:**
✅ 1,000 total games created
✅ 300 games shared publicly
✅ 40% 7-day retention
✅ 10,000+ game plays

**Phase 3 Success:**
✅ 10,000 total games created
✅ 50% 7-day retention
✅ NPS > 50
✅ Featured in 3+ educational/tech publications

---

## 15. Appendices

### 15.1 Glossary

**Terms:**
- **Canvas:** The visual editing area where game objects are placed
- **Object:** An entity in the game (player, enemy, platform, etc.)
- **Rule:** A WHEN/DO logic statement that defines game behavior
- **Asset:** An image, sound, or other media file used in the game
- **Runtime:** The JavaScript engine that plays the game
- **Export:** The process of creating a playable game file
- **Scene:** A distinct game level or screen
- **Template:** A pre-configured game type (platformer, top-down, etc.)

### 15.2 References

**Inspirations:**
- Scratch (MIT) - visual programming for kids
- GDevelop - no-code game engine
- Construct 3 - browser-based game creator
- Game Builder Garage (Nintendo) - game creation for Switch

**Technical References:**
- Phaser.js documentation
- MDN Web Docs (Canvas API, Web Audio)
- HTML5 Game Development best practices

### 15.3 Revision History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0 | 2025-12-30 | Initial PRD draft | Product Team |

---

## 16. Next Steps

### Immediate Actions:
1. **Stakeholder Review:** Circulate PRD to team for feedback
2. **Technical Feasibility:** Validate architecture choices
3. **Design Mockups:** Create wireframes for editor UI
4. **Prototype:** Build proof-of-concept for rule system
5. **User Research:** Conduct interviews with target users

### Decision Points:
- [ ] Approve MVP scope
- [ ] Confirm Phaser.js vs. custom engine
- [ ] Define success metrics thresholds
- [ ] Set launch timeline
- [ ] Allocate development resources

---

**End of Document**

For questions or feedback on this PRD, contact: [Product Team]
