import { Physics, Scene, Input } from 'phaser'
import { PLAYER, GAME_CONFIG } from '../constants'
import { PlayerState, Direction } from '../types'

const TEXTURE_KEY = 'player'
const S = GAME_CONFIG.RENDER_SCALE

// 플레이어 엔티티 (시온)
export class Player extends Physics.Arcade.Sprite {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
  private jumpKey!: Input.Keyboard.Key
  private _state: PlayerState = PlayerState.IDLE
  private _direction: Direction = Direction.RIGHT

  // 플레이스홀더 텍스처 생성 (캐시 가드 포함)
  static createTexture(scene: Scene): void {
    if (scene.textures.exists(TEXTURE_KEY)) return

    const g = scene.add.graphics()
    g.fillStyle(0xffffff)
    g.fillRect(0, 0, PLAYER.WIDTH, PLAYER.HEIGHT)
    g.generateTexture(TEXTURE_KEY, PLAYER.WIDTH, PLAYER.HEIGHT)
    g.destroy()
  }

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y, TEXTURE_KEY)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    const body = this.body as Physics.Arcade.Body

    // 물리 설정 — 캔버스 스케일 반영
    body.setGravityY(PLAYER.GRAVITY * S)
    body.setMaxVelocity(PLAYER.MAX_SPEED * S, 2000)
    body.setCollideWorldBounds(true)

    // 히트박스를 텍스처 크기에 맞춤
    body.setSize(PLAYER.WIDTH, PLAYER.HEIGHT)

    // 키 바인딩
    const keyboard = scene.input.keyboard
    if (keyboard) {
      this.cursors = keyboard.createCursorKeys()
      this.jumpKey = keyboard.addKey(Input.Keyboard.KeyCodes.SPACE)
    }
  }

  update(delta: number): void {
    this.handleMovement(delta)
    this.handleJump()
    this.updateState()
  }

  // 가속/감속 이동 처리
  private handleMovement(delta: number): void {
    const body = this.body as Physics.Arcade.Body
    const accel = PLAYER.ACCELERATION * S
    const decel = PLAYER.DECELERATION * S

    if (this.cursors.left.isDown) {
      body.setAccelerationX(-accel)
      this._direction = Direction.LEFT
    } else if (this.cursors.right.isDown) {
      body.setAccelerationX(accel)
      this._direction = Direction.RIGHT
    } else {
      // 키를 뗐을 때 수동 감속
      body.setAccelerationX(0)
      const dt = delta / 1000
      const vx = body.velocity.x

      if (Math.abs(vx) > 1) {
        const reduction = decel * dt
        if (Math.abs(vx) <= reduction) {
          body.setVelocityX(0)
        } else {
          body.setVelocityX(vx > 0 ? vx - reduction : vx + reduction)
        }
      } else {
        body.setVelocityX(0)
      }
    }
  }

  // 1단 점프 처리
  private handleJump(): void {
    const body = this.body as Physics.Arcade.Body

    if (Input.Keyboard.JustDown(this.jumpKey) && body.blocked.down) {
      body.setVelocityY(PLAYER.JUMP_VELOCITY * S)
    }
  }

  // 플레이어 상태 갱신
  private updateState(): void {
    const body = this.body as Physics.Arcade.Body
    const onGround = body.blocked.down

    if (!onGround) {
      this._state = body.velocity.y < 0
        ? PlayerState.JUMPING
        : PlayerState.FALLING
    } else if (Math.abs(body.velocity.x) > 5) {
      this._state = PlayerState.MOVING
    } else {
      this._state = PlayerState.IDLE
    }
  }

  get playerState(): PlayerState {
    return this._state
  }

  get direction(): Direction {
    return this._direction
  }

  get isOnGround(): boolean {
    return (this.body as Physics.Arcade.Body).blocked.down
  }
}
