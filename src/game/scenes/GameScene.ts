import { Scene } from 'phaser'
import { PLAYER } from '../constants'
import type { SceneData } from '../types'
import { Player } from '../entities/Player'

// 메인 게임 플레이 씬
export class GameScene extends Scene {
  private player!: Player

  constructor() {
    super('GameScene')
  }

  create() {
    const { width, height } = this.scale

    // 플레이어 텍스처 생성
    Player.createTexture(this)

    // 투명 정적 바닥 생성
    const ground = this.add.rectangle(width / 2, height, width, 4, 0x000000, 0)
    this.physics.add.existing(ground, true)

    // 플레이어 생성
    const spawnX = PLAYER.WIDTH
    const spawnY = height - PLAYER.HEIGHT / 2
    this.player = new Player(this, spawnX, spawnY)

    // 플레이어 ↔ 바닥 충돌
    this.physics.add.collider(this.player, ground)

    // 테스트용 씬 전환 키 바인딩
    this.input.keyboard?.on('keydown-C', () => {
      this.scene.start('ClearScene', { score: 1000 } satisfies SceneData)
    })
    this.input.keyboard?.on('keydown-G', () => {
      this.scene.start('GameOverScene', { score: 500 } satisfies SceneData)
    })
  }

  update(_time: number, delta: number) {
    this.player.update(delta)
  }
}
