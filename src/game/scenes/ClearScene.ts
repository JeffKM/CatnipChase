import { Scene } from 'phaser'

// 스테이지 클리어 씬
export class ClearScene extends Scene {
  private score = 0

  constructor() {
    super('ClearScene')
  }

  init(data: { score?: number }) {
    this.score = data.score ?? 0
  }

  create() {
    const { width, height } = this.scale

    this.add.text(width / 2, height / 2 - 30, 'STAGE CLEAR', {
      fontSize: '16px',
      color: '#00ff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    this.add.text(width / 2, height / 2, `SCORE: ${this.score}`, {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    this.add.text(width / 2, height / 2 + 30, 'PRESS ANY KEY', {
      fontSize: '10px',
      color: '#ffff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    // 아무 키 → 타이틀로 복귀
    this.input.keyboard?.on('keydown', () => {
      this.scene.start('TitleScene')
    })
  }
}
