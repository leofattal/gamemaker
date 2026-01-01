import Phaser from 'phaser';
import { GameProject, GameObject } from '../types';
import { MainScene } from './scenes/MainScene';

export class GameEngine {
  private game: Phaser.Game | null = null;
  private project: GameProject;
  private container: HTMLElement;

  constructor(container: HTMLElement, project: GameProject) {
    this.container = container;
    this.project = project;
  }

  start() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: this.project.settings.resolution.width,
      height: this.project.settings.resolution.height,
      parent: this.container,
      backgroundColor: this.project.scenes[0]?.background.color || '#87CEEB',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: this.project.settings.physics.gravity, x: 0 },
          debug: false,
        },
      },
      scene: MainScene,
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    };

    this.game = new Phaser.Game(config);

    // Pass project data to the scene
    if (this.game.scene.scenes[0]) {
      (this.game.scene.scenes[0] as MainScene).setProjectData(this.project);
    }
  }

  restart() {
    if (this.game) {
      this.game.scene.scenes.forEach((scene) => {
        scene.scene.restart();
      });
    }
  }

  destroy() {
    if (this.game) {
      this.game.destroy(true);
      this.game = null;
    }
  }
}
