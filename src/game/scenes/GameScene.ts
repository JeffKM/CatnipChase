import { Scene } from 'phaser'

// 메인 게임 플레이 씬
export class GameScene extends Scene {
  constructor() {
    super('GameScene')
  }

  create() {
    const { width, height } = this.scale

    // 임시 안내 텍스트
    this.add.text(width / 2, height / 2 - 10, 'Game Scene', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    this.add.text(width / 2, height / 2 + 15, '개발 중', {
      fontSize: '10px',
      color: '#aaaaaa',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    // 테스트용 씬 전환 안내
    this.add.text(width / 2, height - 20, 'C: Clear / G: GameOver', {
      fontSize: '8px',
      color: '#666666',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    // 임시 테스트용 키 바인딩
    this.input.keyboard?.on('keydown-C', () => {
      this.scene.start('ClearScene', { score: 1000 })
    })
    this.input.keyboard?.on('keydown-G', () => {
      this.scene.start('GameOverScene', { score: 500 })
    })
  }
}
