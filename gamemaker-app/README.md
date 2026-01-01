# GameMaker - No-Code Game Creation Platform

A browser-based no-code platform for creating simple 2D games using a visual editor and Phaser.js game engine.

## Features

### Editor
- **Drag-and-Drop Interface** - Intuitive visual editor with three-panel layout
- **Object Library** - 7 pre-built game object types (Player, Platform, Collectible, Enemy, Goal, Hazard, Decoration)
- **Properties Panel** - Real-time property editing for selected objects
- **Grid System** - Snap-to-grid with toggleable grid overlay
- **Zoom Controls** - Zoom in/out (50% to 200%)
- **Undo/Redo** - 50-action history stack
- **Autosave** - Automatic saving every 30 seconds to localStorage

### Game Engine (Phaser.js)
- **Full Physics System** - Gravity, collision detection, and platformer mechanics
- **Player Controls** - Keyboard input (Arrow keys + WASD)
- **Score & Lives System** - Built-in HUD with customizable UI
- **Win/Lose Conditions** - Goal-based and lives-based game endings
- **Responsive Canvas** - Auto-scaling to fit screen

### Data Persistence
- **LocalStorage** - Projects saved automatically in browser
- **Auto-Load** - Last project loads on startup
- **Export Ready** - JSON-based game format for future export features

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:5173
```

### Production Build

```bash
# Build for production
npm run build

# The build output will be in the ./dist folder
```

## Usage Guide

### Creating Your First Game

1. **Add Objects**
   - Drag object types from the left panel onto the canvas
   - Start with a Platform (ground) and a Player

2. **Edit Properties**
   - Click any object to select it
   - Edit properties in the right panel:
     - Position (X, Y)
     - Size (Width, Height)
     - Physics (Solid, Static, Gravity)
     - Type-specific properties (Speed, Jump Force, Damage, etc.)

3. **Build Your Level**
   - Add Collectibles for scoring
   - Place Enemies for challenges
   - Add a Goal to win the game
   - Use Hazards for danger zones

4. **Test Your Game**
   - Click the green "Play" button
   - Use Arrow Keys or WASD to move
   - Space/W/Up to jump
   - Press ESC to return to editor

### Object Types

| Object | Description | Default Size | Use Case |
|--------|-------------|--------------|----------|
| **Player** | Controllable character | 32x64 | Main character |
| **Platform** | Solid ground/walls | 128x32 | Level terrain |
| **Collectible** | Items to collect | 24x24 | Coins, stars |
| **Enemy** | Hostile objects | 32x32 | Challenges |
| **Goal** | Win condition | 48x96 | Level exit |
| **Hazard** | Damage zones | 32x32 | Spikes, pits |
| **Decoration** | Visual only | 64x64 | Background art |

### Keyboard Shortcuts

**Editor:**
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo
- `Ctrl/Cmd + S` - Save
- `Delete/Backspace` - Delete selected object
- `Ctrl/Cmd + Enter` - Preview game

**Game Preview:**
- `Arrow Keys` or `WASD` - Move left/right
- `Space`, `W`, or `Up Arrow` - Jump
- `ESC` - Exit preview

## Project Structure

```
gamemaker-app/
├── src/
│   ├── components/
│   │   ├── Editor/           # Main editor container
│   │   ├── Toolbar/          # Top toolbar with controls
│   │   ├── ObjectPanel/      # Left sidebar with object library
│   │   ├── Canvas/           # Center canvas area
│   │   ├── PropertiesPanel/  # Right sidebar with properties
│   │   └── Preview/          # Full-screen game preview
│   ├── engine/
│   │   ├── GameEngine.ts     # Phaser game initialization
│   │   └── scenes/
│   │       └── MainScene.ts  # Main game scene with physics
│   ├── store/
│   │   └── gameStore.ts      # Zustand state management
│   ├── types/
│   │   └── index.ts          # TypeScript type definitions
│   └── App.tsx               # Root component
├── dist/                     # Production build output
└── package.json
```

## Technology Stack

- **Frontend Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **State Management:** Zustand
- **Game Engine:** Phaser.js 3
- **Icons:** Lucide React

## Deployment

### Option 1: Static Hosting (Recommended)

The production build is a static site that can be deployed to any static hosting service:

**Vercel:**
```bash
npm install -g vercel
cd dist
vercel
```

**Netlify:**
```bash
# Drag and drop the ./dist folder to netlify.com/drop
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

**GitHub Pages:**
```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npx gh-pages -d dist
```

### Option 2: Self-Hosted

Serve the `dist` folder with any web server:

```bash
# Using Python
cd dist
python -m http.server 8080

# Using Node.js serve
npx serve dist

# Using nginx
# Copy dist/* to /var/www/html/
```

### Environment Variables

No environment variables required! The app runs entirely client-side.

## Browser Compatibility

- ✅ Chrome 100+
- ✅ Firefox 100+
- ✅ Safari 15+
- ✅ Edge 100+

## Known Limitations (MVP)

- ❌ No rule editor (coming soon)
- ❌ No asset upload
- ❌ No HTML export
- ❌ No cloud sync
- ❌ Single scene only
- ❌ No sound effects
- ❌ No custom backgrounds

## Roadmap

### Phase 2 (Coming Soon)
- [ ] Rule editor (WHEN/DO logic system)
- [ ] Asset upload (images, sounds)
- [ ] HTML export
- [ ] Top-down and clicker game templates
- [ ] Multiple scenes/levels

### Phase 3
- [ ] User accounts
- [ ] Cloud storage
- [ ] Game sharing (hosted links)
- [ ] Community gallery
- [ ] Advanced physics options

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues or questions, check the [PRD.md](../prd.md) for detailed specifications.

## Acknowledgments

- Built with [Phaser.js](https://phaser.io/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by Scratch, GDevelop, and Construct

---

**Made with ❤️ for aspiring game creators**
