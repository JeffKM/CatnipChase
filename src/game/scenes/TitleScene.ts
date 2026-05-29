import { Scene } from 'phaser'
import { FONT } from '../constants'
import { addText } from '../utils'

// 타이틀 화면 씬
export class TitleScene extends Scene {
  private blinkTimer?: Phaser.Time.TimerEvent

  constructor() {
    super('TitleScene')
  }

  create() {
    const { width, height } = this.scale

    // 게임 타이틀
    addText(this, width / 2, height / 2 - 90, '캣닢 대탈환 작전', {
      fontSize: FONT.SIZE_LG,
    }).setOrigin(0.5)

    // 시작 안내 텍스트 (깜빡임)
    const startText = addText(this, width / 2, height / 2 + 60, 'PRESS START', {
      fontSize: FONT.SIZE_SM,
      color: '#ffff00',
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
