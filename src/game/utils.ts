import { Scene, GameObjects } from 'phaser'
import { FONT } from './constants'

// 선명한 텍스트 생성 헬퍼
export function addText(
  scene: Scene,
  x: number,
  y: number,
  content: string,
  style?: Partial<Phaser.Types.GameObjects.Text.TextStyle>,
): GameObjects.Text {
  return scene.add.text(x, y, content, {
    fontFamily: FONT.FAMILY,
    fontSize: FONT.SIZE_MD,
    color: '#ffffff',
    ...style,
  })
}
