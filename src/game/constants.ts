// 게임 설정
export const GAME_CONFIG = {
  WIDTH: 256,
  HEIGHT: 240,
  SCALE_MODE: 'FIT',
  BACKGROUND_COLOR: 0x000000,
  PHYSICS: 'arcade',
  PIXEL_ART: true,
} as const;

// 플레이어 (시온)
export const PLAYER = {
  MAX_SPEED: 120,            // px/s
  ACCELERATION: 600,         // px/s²
  DECELERATION: 500,         // px/s²
  JUMP_VELOCITY: -220,       // px/s
  GRAVITY: 600,              // px/s²
  SLAM_VELOCITY: 500,        // px/s (찧기 낙하)
  SHOCKWAVE_RADIUS: 40,      // px
  INVINCIBLE_DURATION: 1500,  // ms
  KNOCKBACK: 20,             // px
  MAX_HEARTS: 4,
} as const;

// 보스 (선아)
export const BOSS = {
  HP: 3,                     // 찧기 히트 수
  PATROL_SPEED: 60,          // px/s
  CHARGE_SPEED: 250,         // px/s
  CHARGE_DELAY: 800,         // ms (돌진 선딜레이)
  CHARGE_COOLDOWN: 2500,     // ms (돌진 쿨타임)
} as const;

// 장애물
export const OBSTACLES = {
  // 땅굴 함정 (수아)
  TUNNEL_TRAP: {
    DAMAGE: 1,
    DESTROYABLE: false,
  },
  // 굴러오는 쓰레기통
  TRASH_CAN: {
    DAMAGE: 1,
    SPEED: 80,               // px/s (우→좌)
    DESTROYABLE: true,
    DESTROY_SCORE: 200,
  },
  // 불타는 바리케이드
  BARRICADE: {
    DAMAGE: 1,
    DESTROYABLE: true,        // 찧기로만 파괴
    SLAM_ONLY: true,
  },
} as const;

// 아이템
export const ITEMS = {
  FISH_BONE: {
    SCORE: 500,
    COUNT_PER_STAGE: { MIN: 5, MAX: 7 },
  },
  TUNA_CAN: {
    HEAL: 1,
    COUNT_PER_STAGE: { MIN: 1, MAX: 2 },
  },
} as const;

// 점수
export const SCORE = {
  FISH_BONE: 500,
  TRASH_CAN_DESTROY: 200,
} as const;
