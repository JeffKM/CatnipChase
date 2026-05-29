import { Scene } from 'phaser'

// 게임 오버 씬
export class GameOverScene extends Scene {
  private score = 0

  constructor() {
    super('GameOverScene')
  }

  init(data: { score?: number }) {
    this.score = data.score ?? 0
  }

  create() {
    const { width, height } = this.scale

    this.add.text(width / 2, height / 2 - 30, 'GAME OVER', {
      fontSize: '16px',
      color: '#ff0000',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    this.add.text(width / 2, height / 2, `SCORE: ${this.score}`, {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    this.add.text(width / 2, height / 2 + 30, 'PRESS ANY KEY TO RETURN', {
      fontSize: '8px',
      color: '#ffff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    // 아무 키 → 타이틀로 복귀
    this.input.keyboard?.on('keydown', () => {
      this.scene.start('TitleScene')
    })
  }
}
