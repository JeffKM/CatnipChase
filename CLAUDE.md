# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

"캣닢 대탈환 작전" — Phaser 3 기반 8비트 레트로 횡스크롤 아케이드 액션 게임. Next.js로 호스팅하며, 고양이 캐릭터 시온이 강아지 악당 콤비로부터 캣닢 씨앗을 되찾는 스토리.

## 명령어

```bash
npm run dev      # 개발 서버 (localhost:3000)
npm run build    # 프로덕션 빌드 (타입 체크 포함)
npm run lint     # ESLint 실행
```

## 기술 스택

- **Next.js 16** (App Router) + **React 19** + **TypeScript 5** (strict)
- **Phaser 3.90.0** — 게임 엔진 (WebGL, arcade physics)
- **TailwindCSS v4** — 게임 래퍼 페이지 스타일링
- **jsfxr** — 8비트 효과음 생성
- 경로 별칭: `@/*` → `./src/*`

## 아키텍처

### Next.js ↔ Phaser 통합

Next.js는 게임 호스팅 페이지만 담당. Phaser는 클라이언트 전용이므로 반드시 동적 임포트(`"use client"` + `dynamic import`)로 SSR을 방지해야 한다.

- `src/app/page.tsx` — `<div id="game-container" />` 마운트 포인트
- `src/components/GameCanvas.tsx` — Phaser 인스턴스를 마운트하는 React 래퍼

### 게임 코드 구조 (`src/game/`)

```
game/
├── main.ts          # Phaser.Game 설정 및 초기화
├── constants.ts     # PRD 수치 상수 전부 (속도, 점수, 타이밍 등)
├── types.ts         # 게임 타입 정의
├── scenes/          # Phaser 씬 4개: Title → Game → Clear/GameOver
├── entities/        # Player, Boss, Obstacle, Item
└── systems/         # HeartSystem, ScoreSystem, HUD
```

### 게임 씬 흐름

```
Title → (시작) → Game → (보스 처치) → Clear → Title
                     → (하트 0개) → GameOver → Title
```

### 게임 해상도

내부 해상도 256×240, 브라우저에서 정수배 스케일 + 16:9 레터박스.

## 핵심 규칙

- **게임 상수는 `constants.ts`에서 관리** — 하드코딩 금지
- **한국어**: 주석, 커밋 메시지, 문서 모두 한국어. 변수/함수명만 영어
- **들여쓰기 2칸**, camelCase (함수/변수), PascalCase (컴포넌트/클래스)
- **개별 임포트** 선호 (트리쉐이킹)
- **Server Components 우선**, 필요시만 `"use client"`

## 도메인 용어 (CONTEXT.md 참조)

- **시온(Sion)**: 플레이어 캐릭터 (뚱뚱한 얼룩고양이, 탱크형 조작감)
- **선아(Seona)**: Stage 1 미니보스 (푸들, 유모차 돌진 패턴)
- **수아(Sua)**: 빌런 (닥스훈트, 땅굴 함정)
- **슈퍼 엉덩이 찧기(Heavy Thump)**: 시온 전용 스킬 (수직 급강하 + 충격파)
- 장애물 3종: 땅굴 함정, 굴러오는 쓰레기통, 불타는 바리케이드
- 아이템 2종: 생선뼈(+500점), 참치캔(하트 회복)

## 관련 문서

- `PRD.md` — 기능 명세 및 물리/수치 상세
- `CONTEXT.md` — 도메인 용어집
- `ROADMAP.md` — 개발 로드맵 (Phase 1~10, Task 001~031)
- `tasks/` — 개별 Task 상세 명세
