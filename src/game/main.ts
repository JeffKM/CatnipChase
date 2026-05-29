import * as Phaser from 'phaser'
import { GAME_CONFIG } from './constants'
import { TitleScene } from './scenes/TitleScene'
import { GameScene } from './scenes/GameScene'
import { ClearScene } from './scenes/ClearScene'
import { GameOverScene } from './scenes/GameOverScene'

const S = GAME_CONFIG.RENDER_SCALE

// Phaser 게임 인스턴스 생성
export function createGame(parent: HTMLElement): Phaser.Game {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: GAME_CONFIG.WIDTH * S,
    height: GAME_CONFIG.HEIGHT * S,
    parent,
    backgroundColor: GAME_CONFIG.BACKGROUND_COLOR,
    pixelArt: GAME_CONFIG.PIXEL_ART,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { x: 0, y: 0 },
      },
    },
    scene: [TitleScene, GameScene, ClearScene, GameOverScene],
  }

  return new Phaser.Game(config)
}
