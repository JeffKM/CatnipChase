import { Scene } from 'phaser'

// 타이틀 화면 씬
export class TitleScene extends Scene {
  private blinkTimer?: Phaser.Time.TimerEvent

  constructor() {
    super('TitleScene')
  }

  create() {
    const { width, height } = this.scale

    // 게임 타이틀
    this.add.text(width / 2, height / 2 - 30, '캣닢 대탈환 작전', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    // 시작 안내 텍스트 (깜빡임)
    const startText = this.add.text(width / 2, height / 2 + 20, 'PRESS START', {
      fontSize: '10px',
      color: '#ffff00',
      fontFamily: 'monospace',
    }).setOrigin(0.5)

    this.blinkTimer = this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        startText.setVisible(!startText.visible)
      },
    })

    // 키 입력 바인딩
    this.input.keyboard?.on('keydown-SPACE', this.startGame, this)
    this.input.keyboard?.on('keydown-ENTER', this.startGame, this)
  }

  private startGame() {
    this.scene.start('GameScene')
  }
}
