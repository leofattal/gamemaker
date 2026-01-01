import Phaser from 'phaser';
import type { GameProject, GameObject } from '../../types';

export class MainScene extends Phaser.Scene {
  private projectData: GameProject | null = null;
  private gameObjects: Map<string, Phaser.GameObjects.Rectangle> = new Map();
  private player: Phaser.GameObjects.Rectangle | null = null;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null;
  private keys: { [key: string]: Phaser.Input.Keyboard.Key } = {};
  private scoreText: Phaser.GameObjects.Text | null = null;
  private livesText: Phaser.GameObjects.Text | null = null;
  private score: number = 0;
  private lives: number = 3;

  constructor() {
    super({ key: 'MainScene' });
  }

  setProjectData(project: GameProject) {
    this.projectData = project;
  }

  preload() {
    // Preload assets here if needed
  }

  create() {
    if (!this.projectData) return;

    // Initialize score and lives from project
    this.score = this.projectData.variables.score as number || 0;
    this.lives = this.projectData.variables.lives as number || 3;

    const currentScene = this.projectData.scenes[0];
    if (!currentScene) return;

    // Set background color
    this.cameras.main.setBackgroundColor(currentScene.background.color);

    // Create game objects
    currentScene.objects.forEach((obj) => {
      this.createGameObject(obj);
    });

    // Setup input
    this.cursors = this.input.keyboard?.createCursorKeys() || null;

    // Setup WASD keys
    if (this.input.keyboard) {
      this.keys = {
        w: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
        a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        s: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
        space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      };
    }

    // Create UI
    this.createUI();

    // Setup collisions
    this.setupCollisions();
  }

  private createGameObject(obj: GameObject) {
    const colorMap: { [key: string]: number } = {
      player: 0x3b82f6,
      platform: 0x8b4513,
      collectible: 0xfcd34d,
      enemy: 0xef4444,
      goal: 0x10b981,
      hazard: 0xf59e0b,
      decoration: 0x6b7280,
    };

    const color = colorMap[obj.type] || 0x6b7280;

    // Create a rectangle as a placeholder for the sprite
    const gameObject = this.add.rectangle(
      obj.x + obj.width / 2,
      obj.y + obj.height / 2,
      obj.width,
      obj.height,
      color
    );

    // Add text label
    const label = this.add.text(
      obj.x + obj.width / 2,
      obj.y + obj.height / 2,
      obj.name,
      {
        fontSize: '12px',
        color: '#ffffff',
        align: 'center',
      }
    );
    label.setOrigin(0.5);

    // Enable physics if needed
    if (obj.properties.solid || obj.type === 'player') {
      this.physics.add.existing(gameObject);
      const body = gameObject.body as Phaser.Physics.Arcade.Body;

      if (obj.properties.static) {
        body.setImmovable(true);
        body.allowGravity = false;
      }

      if (!obj.properties.gravity) {
        body.allowGravity = false;
      }

      // Store the object
      this.gameObjects.set(obj.id, gameObject);

      // Store player reference
      if (obj.type === 'player') {
        this.player = gameObject;
        body.setCollideWorldBounds(true);

        // Store player properties
        gameObject.setData('speed', obj.properties.speed || 200);
        gameObject.setData('jumpForce', obj.properties.jumpForce || 400);
        gameObject.setData('canJump', true);
      }

      // Store object type and properties
      gameObject.setData('objectType', obj.type);
      gameObject.setData('objectId', obj.id);
      gameObject.setData('properties', obj.properties);
      gameObject.setData('label', label);
    }
  }

  private createUI() {
    if (!this.projectData) return;

    const settings = this.projectData.settings;

    // Score text
    if (settings.scoring.enabled) {
      this.scoreText = this.add.text(16, 16, `${settings.scoring.label}: ${this.score}`, {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      });
      this.scoreText.setScrollFactor(0);
      this.scoreText.setDepth(1000);
    }

    // Lives text
    if (settings.lives.enabled) {
      this.livesText = this.add.text(16, 50, `Lives: ${this.lives}`, {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 10, y: 5 },
      });
      this.livesText.setScrollFactor(0);
      this.livesText.setDepth(1000);
    }
  }

  private setupCollisions() {
    if (!this.player) return;

    const platforms: Phaser.GameObjects.Rectangle[] = [];
    const collectibles: Phaser.GameObjects.Rectangle[] = [];
    const enemies: Phaser.GameObjects.Rectangle[] = [];
    const goals: Phaser.GameObjects.Rectangle[] = [];
    const hazards: Phaser.GameObjects.Rectangle[] = [];

    this.gameObjects.forEach((obj) => {
      const type = obj.getData('objectType');
      if (type === 'platform') platforms.push(obj);
      if (type === 'collectible') collectibles.push(obj);
      if (type === 'enemy') enemies.push(obj);
      if (type === 'goal') goals.push(obj);
      if (type === 'hazard') hazards.push(obj);
    });

    // Player collides with platforms
    if (platforms.length > 0) {
      this.physics.add.collider(this.player, platforms, () => {
        if (this.player) {
          this.player.setData('canJump', true);
        }
      });
    }

    // Player collects items
    if (collectibles.length > 0) {
      this.physics.add.overlap(
        this.player,
        collectibles,
        this.collectItem as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
      );
    }

    // Player hits enemy
    if (enemies.length > 0) {
      this.physics.add.overlap(
        this.player,
        enemies,
        this.hitEnemy as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
      );
    }

    // Player reaches goal
    if (goals.length > 0) {
      this.physics.add.overlap(
        this.player,
        goals,
        this.reachGoal as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
      );
    }

    // Player hits hazard
    if (hazards.length > 0) {
      this.physics.add.overlap(
        this.player,
        hazards,
        this.hitHazard as Phaser.Types.Physics.Arcade.ArcadePhysicsCallback,
        undefined,
        this
      );
    }
  }

  private collectItem(
    _player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    item: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    const itemObj = item as Phaser.GameObjects.Rectangle;
    const value = itemObj.getData('properties').value || 10;

    // Add score
    this.score += value;
    if (this.scoreText) {
      this.scoreText.setText(`Score: ${this.score}`);
    }

    // Destroy the item
    const label = itemObj.getData('label');
    if (label) label.destroy();
    itemObj.destroy();
  }

  private hitEnemy(
    _player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    const damage = (enemy as Phaser.GameObjects.Rectangle).getData('properties').damage || 1;

    this.lives -= damage;
    if (this.livesText) {
      this.livesText.setText(`Lives: ${this.lives}`);
    }

    // Flash the screen
    this.cameras.main.flash(200, 255, 0, 0);

    if (this.lives <= 0) {
      this.gameOver();
    } else {
      // Respawn player at starting position
      if (this.projectData) {
        const playerObj = this.projectData.scenes[0].objects.find(
          (obj) => obj.type === 'player'
        );
        if (playerObj && this.player) {
          this.player.setPosition(
            playerObj.x + playerObj.width / 2,
            playerObj.y + playerObj.height / 2
          );
        }
      }
    }
  }

  private hitHazard(
    _player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    _hazard: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    this.lives -= 1;
    if (this.livesText) {
      this.livesText.setText(`Lives: ${this.lives}`);
    }

    this.cameras.main.flash(200, 255, 0, 0);

    if (this.lives <= 0) {
      this.gameOver();
    }
  }

  private reachGoal(
    _player: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile,
    _goal: Phaser.Types.Physics.Arcade.GameObjectWithBody | Phaser.Tilemaps.Tile
  ) {
    this.winGame();
  }

  private gameOver() {
    // Show game over text
    const gameOverText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'GAME OVER\n\nPress SPACE to Restart',
      {
        fontSize: '48px',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 20, y: 20 },
        align: 'center',
      }
    );
    gameOverText.setOrigin(0.5);
    gameOverText.setScrollFactor(0);
    gameOverText.setDepth(2000);

    // Pause the game
    this.physics.pause();

    // Wait for space to restart
    if (this.input.keyboard) {
      this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.restart();
      });
    }
  }

  private winGame() {
    // Show win text
    const winText = this.add.text(
      this.cameras.main.centerX,
      this.cameras.main.centerY,
      'YOU WIN!\n\nPress SPACE to Restart',
      {
        fontSize: '48px',
        color: '#ffffff',
        backgroundColor: '#10b981',
        padding: { x: 20, y: 20 },
        align: 'center',
      }
    );
    winText.setOrigin(0.5);
    winText.setScrollFactor(0);
    winText.setDepth(2000);

    // Pause the game
    this.physics.pause();

    // Wait for space to restart
    if (this.input.keyboard) {
      this.input.keyboard.once('keydown-SPACE', () => {
        this.scene.restart();
      });
    }
  }

  update() {
    if (!this.player) return;

    const body = this.player.body as Phaser.Physics.Arcade.Body;
    const speed = this.player.getData('speed') || 200;
    const jumpForce = this.player.getData('jumpForce') || 400;
    const canJump = this.player.getData('canJump');

    // Horizontal movement
    if (this.cursors?.left.isDown || this.keys.a?.isDown) {
      body.setVelocityX(-speed);
    } else if (this.cursors?.right.isDown || this.keys.d?.isDown) {
      body.setVelocityX(speed);
    } else {
      body.setVelocityX(0);
    }

    // Jumping
    if (
      (this.cursors?.up.isDown || this.keys.w?.isDown || this.keys.space?.isDown) &&
      canJump &&
      body.touching.down
    ) {
      body.setVelocityY(-jumpForce);
      this.player.setData('canJump', false);
    }

    // Reset jump when touching ground
    if (body.touching.down) {
      this.player.setData('canJump', true);
    }

    // Update label position to follow object
    this.gameObjects.forEach((obj) => {
      const label = obj.getData('label');
      if (label) {
        label.setPosition(obj.x, obj.y);
      }
    });

    // Camera follows player
    if (this.projectData?.settings.camera.mode === 'followPlayer') {
      this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    }
  }
}
