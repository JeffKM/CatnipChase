'use client'

import { useEffect, useRef } from 'react'
import '@kfonts/neodgm'

// Phaser 캔버스를 마운트하는 React 래퍼
export default function GameCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    const initGame = async () => {
      // 폰트 로드 대기 후 게임 시작
      await document.fonts.ready
      const { createGame } = await import('@/game/main')
      gameRef.current = createGame(containerRef.current!)
    }

    initGame()

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', maxWidth: '768px', aspectRatio: '256 / 240' }}
    />
  )
}
