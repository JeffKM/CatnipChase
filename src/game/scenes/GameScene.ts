import { Scene, GameObjects } from 'phaser'
import { PLAYER, GAME_CONFIG, STAGE, CAMERA, FONT } from '../constants'
import type { SceneData } from '../types'
import { Player } from '../entities/Player'

const S = GAME_CONFIG.RENDER_SCALE

// 메인 게임 플레이 씬
export class GameScene extends Scene {
  private player!: Player
  // 충격파 오브젝트 풀 (충돌 판정용)
  private shockwaves!: GameObjects.Group

  constructor() {
    super('GameScene')
  }

  create() {
    const viewWidth = GAME_CONFIG.WIDTH * S
    const viewHeight = GAME_CONFIG.HEIGHT * S
    const stageWidth = STAGE.WIDTH * S
    const groundY = viewHeight - 2 * S  // 바닥 Y 좌표 (하단에서 2px × 스케일 위)

    // 물리 월드를 스테이지 크기로 확장
    this.physics.world.setBounds(0, 0, stageWidth, viewHeight)

    // 플레이어 텍스처 생성
    Player.createTexture(this)

    // 바닥 생성 (스테이지 전체 너비, 시각적으로 보이는 지면)
    const ground = this.add.rectangle(stageWidth / 2, groundY + 2 * S, stageWidth, 4 * S, 0x333333)
    this.physics.add.existing(ground, true)

    // 스테이지 배경 눈금 (스크롤 확인용 디버그 마커)
    const markerInterval = 128 * S  // 128px 내부 해상도 간격
    for (let x = 0; x <= stageWidth; x += markerInterval) {
      // 수직 점선 마커
      const line = this.add.rectangle(x, viewHeight / 2, 1 * S, viewHeight, 0x1a1a1a)
      line.setDepth(-1)
      // 좌표 라벨
      const label = this.add.text(x + 4, 4, `${x / S}`, {
        fontSize: FONT.SIZE_XS,
        fontFamily: FONT.FAMILY,
        color: '#333333',
      })
      label.setDepth(-1)
    }

    // 플레이어 생성
    const spawnX = PLAYER.WIDTH
    const spawnY = groundY - PLAYER.HEIGHT / 2
    this.player = new Player(this, spawnX, spawnY)

    // 플레이어 ↔ 바닥 충돌
    this.physics.add.collider(this.player, ground)

    // 카메라 설정 — 플레이어를 화면 좌측에 배치
    const cam = this.cameras.main
    cam.setBounds(0, 0, stageWidth, viewHeight)
    cam.startFollow(this.player, true, 0.1, 1)
    cam.setFollowOffset(CAMERA.FOLLOW_OFFSET_X * S, 0)
    cam.setDeadzone(CAMERA.DEADZONE_WIDTH * S, viewHeight)

    // 충격파 그룹 초기화
    this.shockwaves = this.add.group()

    // 찧기 착지 이벤트 → 충격파 생성
    this.player.on('slam-land', (x: number, y: number) => {
      this.spawnShockwave(x, y)
    })

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

  // 충격파 시각 이펙트 생성
  private spawnShockwave(x: number, y: number): void {
    const radius = PLAYER.SHOCKWAVE_RADIUS * S
    const duration = 300 // ms

    // 원형 충격파 이펙트
    const circle = this.add.circle(x, y, 4, 0xffff00, 0.8)
    circle.setDepth(10)

    // 충격파 판정용 존 (물리 바디 포함)
    const zone = this.add.zone(x, y, radius * 2, radius * 2)
    this.physics.add.existing(zone, true) // 정적 바디
    this.shockwaves.add(zone)

    // 확산 애니메이션
    this.tweens.add({
      targets: circle,
      radius: { from: 4, to: radius },
      alpha: { from: 0.8, to: 0 },
      duration,
      ease: 'Quad.easeOut',
      onUpdate: () => {
        // 원형 크기 갱신 (Phaser circle은 radius 프로퍼티 변경 시 재렌더)
        circle.setRadius(circle.radius)
      },
      onComplete: () => {
        circle.destroy()
        zone.destroy()
        this.shockwaves.remove(zone)
      },
    })
  }

  // 충격파 그룹 반환 (장애물/적 충돌 판정용 인터페이스)
  getShockwaves(): GameObjects.Group {
    return this.shockwaves
  }
}
