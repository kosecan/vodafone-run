'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type GameStatus = 'ready' | 'playing' | 'over';

interface Obstacle {
  el: HTMLDivElement;
  x: number;
  w: number;
  h: number;
}

interface Collectible {
  el: HTMLImageElement;
  x: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FRAMES = [
  '/assets/run0.png',
  '/assets/run1.png',
  '/assets/run2.png',
  '/assets/run3.png',
  '/assets/run4.png',
];


const GROUND_TOP = 504;
const PLAYER_H = 160;
const HB_LEFT = 162;
const HB_W = 58;
const GRAVITY = 3150;
const JUMP_V = 1100;

// ─── Leaderboard ──────────────────────────────────────────────────────────────

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
}

function maskName(name: string): string {
  return name.split(' ').map(part =>
    part.length <= 1 ? part : part[0] + '*'.repeat(part.length - 1)
  ).join(' ');
}

// Burası ileride API çağrısına dönüştürülecek
function getLeaderboard(): LeaderboardEntry[] {
  return [
    { rank: 1,  name: 'Mehmet Yılmaz',   score: 4820 },
    { rank: 2,  name: 'Ayşe Kara',       score: 4210 },
    { rank: 3,  name: 'Burak Demir',     score: 3980 },
    { rank: 4,  name: 'Zeynep Aktaş',    score: 3750 },
    { rank: 5,  name: 'Emre Şahin',      score: 3540 },
    { rank: 6,  name: 'Fatma Çelik',     score: 3310 },
    { rank: 7,  name: 'Oğuzhan Kurt',    score: 3100 },
    { rank: 8,  name: 'Selin Arslan',    score: 2980 },
    { rank: 9,  name: 'Kemal Doğan',     score: 2760 },
    { rank: 10, name: 'Deniz Aydın',     score: 2590 },
    { rank: 11, name: 'Hakan Bulut',     score: 2430 },
    { rank: 12, name: 'Merve Güneş',     score: 2280 },
    { rank: 13, name: 'Tarık Özdemir',   score: 2110 },
    { rank: 14, name: 'Ceren Yıldız',    score: 1970 },
    { rank: 15, name: 'Serkan Koç',      score: 1840 },
    { rank: 16, name: 'Elif Polat',      score: 1720 },
    { rank: 17, name: 'Murat Erdoğan',   score: 1610 },
    { rank: 18, name: 'Gizem Turan',     score: 1500 },
    { rank: 19, name: 'Alp Aslan',       score: 1390 },
    { rank: 20, name: 'Neslihan Acar',   score: 1290 },
  ];
}

// Kullanıcının sırasını best score'a göre hesapla — ileride API'dan gelecek
function getUserRank(best: number, board: LeaderboardEntry[]): number {
  const lower = board.filter(e => e.score > best).length;
  return lower + 1;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function VodafoneRunner() {
  const [status, setStatus] = useState<GameStatus>('ready');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [modemCount, setModemCount] = useState(0);
  const [hasShield, setHasShield] = useState(false);
  const [muted, setMuted] = useState(false);

  const mutedRef = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgGainRef = useRef<GainNode | null>(null);
  const bgStartedRef = useRef(false);

  // Mirror refs — game loop reads these instead of stale state
  const statusRef = useRef<GameStatus>('ready');
  const bestRef = useRef(0);

  // DOM refs (cached on mount, never queried inside loop)
  const stageRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const scoreElRef = useRef<HTMLSpanElement>(null);
  const bestElRef = useRef<HTMLSpanElement>(null);
  const obstaclesRef = useRef<HTMLDivElement>(null);
  const collectiblesRef = useRef<HTMLDivElement>(null);
  const shieldFlashRef = useRef<HTMLDivElement>(null);
  const groundRef = useRef<HTMLDivElement>(null);
  const bushRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const farRef = useRef<HTMLDivElement>(null);
  const cloudImgsRef = useRef<(HTMLImageElement | null)[]>([]);
  const rotateRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef(0);

  // Mutable game state — written every frame, no re-renders
  const g = useRef({
    speed: 360,
    dist: 0,
    scoreF: 0,
    y: 0,
    vy: 0,
    grounded: true,
    frame: 0,
    frameTimer: 0,
    spawnDist: 520,
    bgFar: 0,
    bgMid: 0,
    bgBush: 0,
    bgGround: 0,
    clouds: [
      { x: 1100, top: 48,  h: 90, op: 0.95 },
      { x: 1500, top: 112, h: 62, op: 0.80 },
      { x: 1900, top: 62,  h: 76, op: 0.88 },
    ],
    obstacles: [] as Obstacle[],
    lastObstacleType: '',
    collectibles: [] as Collectible[],
    collectibleSpawnDist: 900,
    modemCount: 0,
    hasShield: false,
    shieldFlashing: false,
    spawnedInInterval: 0,
    lastInterval: 0,
    worldW: 1000,
    paused: false,
    last: 0,
  });

  useEffect(() => {
    // Preload sprite frames
    FRAMES.forEach((src) => {
      const im = new Image();
      im.src = src;
    });

    // Restore best score
    try {
      const saved = parseInt(localStorage.getItem('vfr_best') ?? '0', 10) || 0;
      bestRef.current = saved;
      setBest(saved);
      if (bestElRef.current) bestElRef.current.textContent = String(saved);
    } catch {}

    // ── Audio ─────────────────────────────────────────────────────────────────

    function getCtx(): AudioContext {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      return audioCtxRef.current;
    }

    function playJump() {
      if (mutedRef.current) return;
      const ctx = getCtx();
      const t = ctx.currentTime;

      // Katman 1: hızlı "boing" — frekans aşağı düşer (arcade spring hissi)
      const osc1 = ctx.createOscillator();
      const g1 = ctx.createGain();
      osc1.connect(g1); g1.connect(ctx.destination);
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(900, t);
      osc1.frequency.exponentialRampToValueAtTime(280, t + 0.15);
      g1.gain.setValueAtTime(0.28, t);
      g1.gain.exponentialRampToValueAtTime(0.001, t + 0.16);
      osc1.start(t); osc1.stop(t + 0.18);

      // Katman 2: hafif "click" başlangıç vuruşu
      const osc2 = ctx.createOscillator();
      const g2 = ctx.createGain();
      osc2.connect(g2); g2.connect(ctx.destination);
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(1200, t);
      osc2.frequency.exponentialRampToValueAtTime(600, t + 0.04);
      g2.gain.setValueAtTime(0.08, t);
      g2.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc2.start(t); osc2.stop(t + 0.06);
    }

    function playCollect() {
      if (mutedRef.current) return;
      const ctx = getCtx();
      [0, 0.08, 0.16].forEach((t, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain); gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = [520, 660, 880][i];
        gain.gain.setValueAtTime(0.14, ctx.currentTime + t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.12);
        osc.start(ctx.currentTime + t);
        osc.stop(ctx.currentTime + t + 0.12);
      });
    }

    function playShieldOn() {
      if (mutedRef.current) return;
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'square';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(900, ctx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start(); osc.stop(ctx.currentTime + 0.35);
    }

    function playShieldBreak() {
      if (mutedRef.current) return;
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.4);
      gain.gain.setValueAtTime(0.22, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc.start(); osc.stop(ctx.currentTime + 0.4);
    }

    function playHit() {
      if (mutedRef.current) return;
      const ctx = getCtx();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.3, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
      const src = ctx.createBufferSource();
      const gain = ctx.createGain();
      src.buffer = buf; src.connect(gain); gain.connect(ctx.destination);
      gain.gain.value = 0.22;
      src.start();
    }

    let bgLoopTimeout: ReturnType<typeof setTimeout> | null = null;

    function startBg() {
      if (bgLoopTimeout) clearTimeout(bgLoopTimeout);
      bgStartedRef.current = true;
      const ctx = getCtx();

      if (!bgGainRef.current) {
        const gain = ctx.createGain();
        gain.connect(ctx.destination);
        bgGainRef.current = gain;
      }
      bgGainRef.current.gain.value = mutedRef.current ? 0 : 0.06;

      function makeLoop() {
        if (!bgStartedRef.current) return;
        const master = bgGainRef.current!;
        const BPM = 160;
        const beat = 60 / BPM;
        const bar = beat * 4;      // 4 beats = 1 bar
        const bars = 2;            // loop every 2 bars
        const t0 = ctx.currentTime + 0.01;

        // ── helper: schedule one note ──────────────────────────────────────
        function note(freq: number, start: number, dur: number, type: OscillatorType, vol: number) {
          const g = ctx.createGain();
          g.gain.setValueAtTime(0, start);
          g.gain.linearRampToValueAtTime(vol, start + 0.01);
          g.gain.exponentialRampToValueAtTime(0.001, start + dur);
          g.connect(master);
          const osc = ctx.createOscillator();
          osc.type = type;
          osc.frequency.value = freq;
          osc.connect(g);
          osc.start(start);
          osc.stop(start + dur + 0.05);
        }

        // ── helper: kick drum (sine thump) ────────────────────────────────
        function kick(start: number) {
          const g = ctx.createGain();
          g.gain.setValueAtTime(1.2, start);
          g.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
          g.connect(master);
          const osc = ctx.createOscillator();
          osc.frequency.setValueAtTime(160, start);
          osc.frequency.exponentialRampToValueAtTime(40, start + 0.25);
          osc.connect(g);
          osc.start(start); osc.stop(start + 0.4);
        }

        // ── helper: hi-hat (noise burst) ──────────────────────────────────
        function hat(start: number, vol = 0.18) {
          const bufSize = ctx.sampleRate * 0.05;
          const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
          const d = buf.getChannelData(0);
          for (let i = 0; i < bufSize; i++) d[i] = Math.random() * 2 - 1;
          const src = ctx.createBufferSource();
          src.buffer = buf;
          const filt = ctx.createBiquadFilter();
          filt.type = 'highpass'; filt.frequency.value = 8000;
          const g = ctx.createGain();
          g.gain.setValueAtTime(vol, start);
          g.gain.exponentialRampToValueAtTime(0.001, start + 0.06);
          src.connect(filt); filt.connect(g); g.connect(master);
          src.start(start); src.stop(start + 0.08);
        }

        // ── melody (A minor pentatonic) ───────────────────────────────────
        // A3=220 C4=261 D4=293 E4=329 G4=392 A4=440 C5=523 E5=659
        const mel = [440,440,523,392, 440,329,293,329, 440,440,523,659, 523,440,392,440];
        const melDur = beat * 0.45;
        mel.forEach((freq, i) => {
          const t = t0 + i * (bar * bars / mel.length);
          note(freq, t, melDur, 'square', 0.18);
        });

        // ── bass line (root + fifth pattern) ──────────────────────────────
        const bass = [110,110,0,110, 98,98,0,110]; // A2=110 G2=98; 0=rest
        bass.forEach((freq, i) => {
          if (!freq) return;
          const t = t0 + i * beat * (bars / bass.length) * 4;
          note(freq, t, beat * 0.8, 'sawtooth', 0.22);
        });

        // ── arp (16th notes, high octave) ─────────────────────────────────
        const arp = [880,1046,880,784, 880,659,784,880];
        arp.forEach((freq, i) => {
          const t = t0 + i * (beat / 2);
          note(freq, t, beat * 0.22, 'triangle', 0.06);
        });

        // ── drums (kick + hat) ────────────────────────────────────────────
        for (let b = 0; b < bars * 4; b++) {
          const t = t0 + b * beat;
          if (b % 4 === 0 || b % 4 === 2) kick(t);          // kick on 1 & 3
          hat(t);                                              // hat every beat
          hat(t + beat / 2, 0.10);                            // off-beat hat
        }

        bgLoopTimeout = setTimeout(makeLoop, bars * bar * 1000 - 30);
      }

      if (ctx.state === 'suspended') {
        ctx.resume().then(makeLoop);
      } else {
        makeLoop();
      }
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    function fit() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const rot = rotateRef.current;
      if (vh > vw) {
        g.current.paused = true;
        if (rot) rot.style.display = 'flex';
        return;
      }
      g.current.paused = false;
      if (rot) rot.style.display = 'none';
      const s = vh / 600;
      g.current.worldW = Math.ceil(vw / s) + 2;
      const stage = stageRef.current;
      if (stage) {
        stage.style.width = g.current.worldW + 'px';
        stage.style.transformOrigin = '0 0';
        stage.style.transform = `scale(${s})`;
      }
    }

    function resetGame() {
      const state = g.current;
      state.speed = 360;
      state.dist = 0;
      state.scoreF = 0;
      state.y = 0;
      state.vy = 0;
      state.grounded = true;
      state.frame = 0;
      state.frameTimer = 0;
      state.spawnDist = 520;
      state.bgFar = 0;
      state.bgMid = 0;
      state.bgBush = 0;
      state.bgGround = 0;
      state.clouds[0].x = 1100;
      state.clouds[1].x = 1500;
      state.clouds[2].x = 1900;
      state.obstacles = [];
      state.lastObstacleType = '';
      state.collectibles = [];
      state.collectibleSpawnDist = 900;
      state.modemCount = 0;
      state.hasShield = false;
      state.shieldFlashing = false;
      state.spawnedInInterval = 0;
      state.lastInterval = 0;
      const obs = obstaclesRef.current;
      if (obs) obs.innerHTML = '';
      const col = collectiblesRef.current;
      if (col) col.innerHTML = '';
      if (scoreElRef.current) scoreElRef.current.textContent = '0';
      setModemCount(0);
      setHasShield(false);
    }

    function spawn() {
      const allTypes = ['cone', 'hurdle', 'crate'];
      const available = allTypes.filter(t => t !== g.current.lastObstacleType);
      const t = available[(Math.random() * available.length) | 0];
      g.current.lastObstacleType = t;
      const spawnX = (g.current.worldW || 1000) + 60;
      // If a collectible is still to the right (not yet on screen) and too close, push it further right
      g.current.collectibles.forEach(c => {
        if (c.x >= spawnX - 80 && c.x < spawnX + 220) {
          c.x = spawnX + 260;
          c.el.style.transform = `translateX(${c.x}px)`;
        }
      });
      const el = document.createElement('div');
      el.style.cssText = 'position:absolute;bottom:96px;left:0;will-change:transform;';
      let w: number, h: number;

      if (t === 'cone') {
        w = 46; h = 56;
        el.innerHTML = `
          <div style="position:relative;width:${w}px;height:${h}px;overflow:hidden;clip-path:polygon(50% 0,100% 100%,0 100%);background:linear-gradient(180deg,#ff6a32,#e63100);">
            <div style="position:absolute;top:34%;left:-10%;width:120%;height:8px;background:#fff;"></div>
            <div style="position:absolute;top:62%;left:-10%;width:120%;height:9px;background:#fff;"></div>
          </div>
          <div style="position:absolute;bottom:-4px;left:-6px;width:${w + 12}px;height:9px;border-radius:4px;background:#1f1f1f;"></div>`;
      } else if (t === 'hurdle') {
        w = 58; h = 80;
        el.innerHTML = `
          <div style="position:relative;width:${w}px;height:${h}px;">
            <div style="position:absolute;left:4px;bottom:0;width:7px;height:${h}px;background:#1f1f1f;border-radius:3px;"></div>
            <div style="position:absolute;right:4px;bottom:0;width:7px;height:${h}px;background:#1f1f1f;border-radius:3px;"></div>
            <div style="position:absolute;left:0;top:6px;width:${w}px;height:24px;border:3px solid #1a1a1a;border-radius:4px;background:repeating-linear-gradient(45deg,#E60000 0 13px,#fff 13px 26px);"></div>
          </div>`;
      } else {
        w = 52; h = 52;
        el.innerHTML = `
          <div style="position:relative;width:${w}px;height:${h}px;border:3px solid #1a1a1a;border-radius:8px;overflow:hidden;background:repeating-linear-gradient(45deg,#E60000 0 13px,#fff 13px 26px);box-shadow:inset 0 -6px 0 rgba(0,0,0,.18);"></div>`;
      }

      obstaclesRef.current?.appendChild(el);
      g.current.obstacles.push({ el: el as HTMLDivElement, x: spawnX, w, h });
    }

    function spawnCollectible() {
      const spawnX = (g.current.worldW || 1000) + 60;
      // Don't spawn on top of an obstacle
      const blocked = g.current.obstacles.some(o => Math.abs(o.x - spawnX) < 200);
      if (blocked) {
        g.current.collectibleSpawnDist = 250;
        return;
      }
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'position:absolute;bottom:110px;left:0;width:48px;height:48px;will-change:transform;z-index:6;';
      const el = document.createElement('img') as HTMLImageElement;
      el.src = '/assets/wifi-good.svg';
      el.style.cssText = 'width:48px;height:48px;object-fit:contain;animation:vfr-float 1.2s ease-in-out infinite;';
      wrapper.appendChild(el);
      collectiblesRef.current?.appendChild(wrapper);
      g.current.collectibles.push({ el: wrapper as unknown as HTMLImageElement, x: spawnX });
    }

    function collectEffect() {
      playCollect();
      const el = document.createElement('img') as HTMLImageElement;
      el.src = '/assets/wifi-good.svg';
      el.style.cssText = `position:absolute;left:${HB_LEFT}px;bottom:110px;width:48px;height:48px;object-fit:contain;pointer-events:none;z-index:9;animation:vfr-collect 0.55s ease forwards;filter:drop-shadow(1px 0 0 #000) drop-shadow(-1px 0 0 #000) drop-shadow(0 1px 0 #000) drop-shadow(0 -1px 0 #000);`;
      stageRef.current?.appendChild(el);
      setTimeout(() => el.remove(), 560);
    }

    function gameOver() {
      const final = Math.floor(g.current.scoreF);
      let newBest = bestRef.current;
      if (final > newBest) {
        newBest = final;
        bestRef.current = newBest;
        try { localStorage.setItem('vfr_best', String(newBest)); } catch {}
        if (bestElRef.current) bestElRef.current.textContent = String(newBest);
      }
      playHit();
      bgStartedRef.current = false;
      if (bgGainRef.current) bgGainRef.current.gain.value = 0;
      statusRef.current = 'over';
      setStatus('over');
      setScore(final);
      setBest(newBest);
    }

    // ── Game loop ─────────────────────────────────────────────────────────────

    function loop(now: number) {
      const state = g.current;
      let dt = (now - state.last) / 1000;
      state.last = now;
      if (dt > 0.05) dt = 0.05;

      if (!state.paused) {
        const playing = statusRef.current === 'playing';
        const over = statusRef.current === 'over';

        if (playing) {
          state.speed = Math.min(620, state.speed + 5 * dt);
          state.dist += state.speed * dt;
          state.scoreF += state.speed * dt * 0.025;

          // Jump physics
          if (!state.grounded) {
            state.vy -= GRAVITY * dt;
            state.y += state.vy * dt;
            if (state.y <= 0) {
              state.y = 0;
              state.vy = 0;
              state.grounded = true;
            }
          }

          // Spawn obstacles
          state.spawnDist -= state.speed * dt;
          if (state.spawnDist <= 0) {
            spawn();
            // Zorluk mesafeye bağlı — hız kapına ulaşılsa bile gap daralmaya devam eder
            const difficulty = Math.min(1, state.dist / 40000); // ~40k px'de zirve
            const reactionTime = 1.05 - 0.45 * difficulty;     // 1.05s → 0.60s
            const minGap = state.speed * reactionTime;
            const maxGap = state.speed * (2.00 - 1.15 * difficulty); // 2.00 → 0.85
            state.spawnDist = minGap + Math.random() * (maxGap - minGap);
          }

          // Yeni 500'lük dilime geçince sayacı sıfırla
          const currentInterval = Math.floor(state.scoreF / 500);
          if (currentInterval > state.lastInterval) {
            state.lastInterval = currentInterval;
            state.spawnedInInterval = 0;
            state.collectibleSpawnDist = 400;
          }

          // Spawn collectibles — her 500 puanlık dilimde max 3 tane
          state.collectibleSpawnDist -= state.speed * dt;
          if (state.collectibleSpawnDist <= 0) {
            if (!state.hasShield && state.spawnedInInterval < 3) {
              spawnCollectible();
              state.spawnedInInterval += 1;
            }
            // 3 spawn olduysa bir sonraki dilime kadar bekleme süresi önemli değil
            state.collectibleSpawnDist = 500 + Math.random() * 400;
          }

          // Move obstacles + AABB collision
          const pL = HB_LEFT;
          const pR = HB_LEFT + HB_W;
          const pBot = GROUND_TOP - state.y;
          const pTop = pBot - (PLAYER_H - 34);

          for (let i = state.obstacles.length - 1; i >= 0; i--) {
            const o = state.obstacles[i];
            o.x -= state.speed * dt;
            o.el.style.transform = `translateX(${o.x}px)`;

            const oL = o.x;
            const oR = o.x + o.w;
            const oTop = GROUND_TOP - o.h;

            if (pR > oL && pL < oR && pBot > oTop && pTop < GROUND_TOP) {
              if (state.hasShield) {
                state.hasShield = false;
                state.modemCount = 0;
                state.spawnedInInterval = 0;
                state.collectibleSpawnDist = 1200 + Math.random() * 800;
                playShieldBreak();
                setHasShield(false);
                setModemCount(0);
                // flash effect
                const flash = shieldFlashRef.current;
                if (flash) {
                  flash.style.opacity = '1';
                  setTimeout(() => { if (flash) flash.style.opacity = '0'; }, 400);
                }
                o.el.remove();
                state.obstacles.splice(i, 1);
              } else {
                gameOver();
              }
              break;
            }
            if (o.x + o.w < -40) {
              o.el.remove();
              state.obstacles.splice(i, 1);
            }
          }

          // Move collectibles + pickup collision
          for (let i = state.collectibles.length - 1; i >= 0; i--) {
            const c = state.collectibles[i];
            c.x -= state.speed * dt;
            c.el.style.transform = `translateX(${c.x}px)`;

            if (pR > c.x && pL < c.x + 48 && pBot > GROUND_TOP - 110 - 48 && pTop < GROUND_TOP - 110) {
              c.el.remove();
              state.collectibles.splice(i, 1);
              collectEffect();
              state.modemCount += 1;
              if (state.modemCount >= 3) {
                state.modemCount = 0;
                state.hasShield = true;
                setHasShield(true);
                playShieldOn();
              }
              setModemCount(state.modemCount);
              continue;
            }
            if (c.x + 48 < -40) {
              c.el.remove();
              state.collectibles.splice(i, 1);
            }
          }

          // Score HUD (direct DOM for performance — avoids React re-render every frame)
          if (scoreElRef.current) {
            scoreElRef.current.textContent = String(Math.floor(state.scoreF));
          }
        }

        // Background parallax scroll
        const sp = playing ? state.speed : statusRef.current === 'ready' ? 90 : 0;
        if (sp > 0) {
          state.bgGround = (state.bgGround - sp * dt) % 120;
          state.bgBush = (state.bgBush - sp * 0.7 * dt) % 320;
          state.bgMid = (state.bgMid - sp * 0.42 * dt) % 460;
          state.bgFar = (state.bgFar - sp * 0.22 * dt) % 520;

          if (groundRef.current) groundRef.current.style.backgroundPositionX = state.bgGround + 'px';
          if (bushRef.current) bushRef.current.style.backgroundPositionX = state.bgBush + 'px';
          if (midRef.current) midRef.current.style.backgroundPositionX = state.bgMid + 'px';
          if (farRef.current) farRef.current.style.backgroundPositionX = state.bgFar + 'px';

          for (let i = 0; i < state.clouds.length; i++) {
            const c = state.clouds[i];
            c.x -= sp * 0.12 * dt;
            if (c.x + c.h * 1.9 < 0) {
              let newX = state.worldW + 60 + Math.random() * 300;
              for (let attempt = 0; attempt < 8; attempt++) {
                const tooClose = state.clouds.some((other, j) =>
                  j !== i && Math.abs(other.x - newX) < 220
                );
                if (!tooClose) break;
                newX = state.worldW + 60 + Math.random() * 500;
              }
              c.x = newX;
            }
            const el = cloudImgsRef.current[i];
            if (el) el.style.transform = `translateX(${c.x}px)`;
          }
        }

        // Shadow
        const sh = shadowRef.current;
        if (sh) {
          const k = Math.max(0, Math.min(1, state.y / 240));
          sh.style.transform = `scale(${1 - 0.5 * k})`;
          sh.style.opacity = String(0.34 - 0.22 * k);
        }

        // Player sprite animation
        const p = playerRef.current;
        if (p) {
          let rot = 0;
          if (over) {
            p.src = FRAMES[0];
          } else if (!state.grounded && playing) {
            p.src = state.vy > 0 ? FRAMES[3] : FRAMES[0];
            p.style.height = '160px';
          } else {
            state.frameTimer += dt * 1000;
            const interval = Math.max(58, 112 - (state.speed - 360) * 0.07);
            if (state.frameTimer >= interval) {
              state.frameTimer = 0;
              state.frame = (state.frame + 1) % 5;
              p.src = FRAMES[state.frame];
            }
          }
          p.style.transform = `translateY(${-state.y}px) rotate(${rot}deg)`;
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    // ── Input handler ─────────────────────────────────────────────────────────

    function input() {
      const st = statusRef.current;
      if (st === 'ready' || st === 'over') {
        resetGame();
        statusRef.current = 'playing';
        setStatus('playing');
        setScore(0);
        startBg();
      } else if (st === 'playing') {
        const now = performance.now();
        const state = g.current;
        if (state.grounded) {
          state.vy = JUMP_V;
          state.grounded = false;
          playJump();
        }
      }
    }

    // ── Event listeners ───────────────────────────────────────────────────────

    const onResize = () => fit();
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        if (!e.repeat) input();
      }
    };
    const onPointer = (e: PointerEvent) => {
      e.preventDefault();
      input();
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', () => setTimeout(onResize, 300));
    window.addEventListener('keydown', onKey);
    window.addEventListener('pointerdown', onPointer, { passive: false });

    fit();
    setTimeout(fit, 100);
    g.current.last = performance.now();
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('pointerdown', onPointer);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'linear-gradient(180deg, #bfe8ff 0%, #dff4ff 45%, #ffe9e6 100%)' }}>
      {/* ── Stage ──────────────────────────────────────────────────────────── */}
      <div
        ref={stageRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          height: '600px',
          transformOrigin: '0 0',
          overflow: 'hidden',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        {/* Sky */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #bfe8ff 0%, #dff4ff 45%, #ffe9e6 100%)' }} />
        <div
          style={{
            position: 'absolute', left: 760, top: 78, width: 96, height: 96,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 36%, #fff6db, #ffd56b)',
            animation: 'vfr-sun 4s ease-in-out infinite',
          }}
        />

        {/* Clouds — each tracked independently, wraps off left edge → re-enters from right */}
        {[
          { top: 48,  h: 90, op: 0.95 },
          { top: 112, h: 62, op: 0.80 },
          { top: 62,  h: 76, op: 0.88 },
        ].map((c, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            ref={el => { cloudImgsRef.current[i] = el; }}
            src="/assets/cloud.png"
            alt=""
            style={{
              position: 'absolute', left: 0, top: c.top,
              height: c.h, width: 'auto',
              opacity: c.op, pointerEvents: 'none',
              willChange: 'transform',
            }}
          />
        ))}


        {/* Far skyline */}
        <div
          ref={farRef}
          style={{
            position: 'absolute', left: 0, bottom: 96, width: '300%', height: 230,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '520px 230px',
            backgroundImage: "url('/assets/far.svg')",
            opacity: 0.85,
          }}
        />

        {/* Mid skyline */}
        <div
          ref={midRef}
          style={{
            position: 'absolute', left: 0, bottom: 96, width: '300%', height: 180,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '460px 180px',
            backgroundImage: "url('/assets/mid.svg')",
          }}
        />

        {/* Bushes */}
        <div
          ref={bushRef}
          style={{
            position: 'absolute', left: 0, bottom: 90, width: '300%', height: 80,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '320px 80px',
            backgroundImage: "url('/assets/bush.svg')",
          }}
        />

        {/* Ground */}
        <div
          style={{
            position: 'absolute', left: 0, bottom: 0, width: '100%', height: 96,
            background: 'linear-gradient(180deg, #3a3f4a 0%, #2b2f38 100%)',
            boxShadow: 'inset 0 6px 0 #54a0e8',
          }}
        />
        <div
          ref={groundRef}
          style={{
            position: 'absolute', left: 0, bottom: 42, width: '300%', height: 8,
            backgroundRepeat: 'repeat-x',
            backgroundSize: '120px 8px',
            backgroundImage: 'linear-gradient(90deg, #f4c20d 0 60px, transparent 60px 120px)',
          }}
        />

        {/* Obstacle container */}
        <div ref={obstaclesRef} style={{ position: 'absolute', inset: 0, zIndex: 4, pointerEvents: 'none' }} />

        {/* Collectible container */}
        <div ref={collectiblesRef} style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }} />

        {/* Shield flash overlay */}
        <div
          ref={shieldFlashRef}
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: 'rgba(230,0,0,0.25)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Player shadow */}
        <div
          ref={shadowRef}
          style={{
            position: 'absolute', left: 150, bottom: 84, width: 90, height: 22,
            zIndex: 4,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,.34) 0%, rgba(0,0,0,.18) 46%, rgba(0,0,0,0) 72%)',
            pointerEvents: 'none',
            transformOrigin: 'center center',
          }}
        />

        {/* Player sprite */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={playerRef}
          src="/assets/run0.png"
          alt="Vodafone runner"
          style={{
            position: 'absolute', left: 130, bottom: 96,
            height: 160, width: 'auto',
            zIndex: 5,
            transformOrigin: '50% 100%',
            pointerEvents: 'none',
          }}
        />

        {/* HUD — score */}
        <div style={{ position: 'absolute', left: 22, top: 18, zIndex: 8, display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.png" alt="Vodafone" style={{ width: 46, height: 46, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.25))' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 9, letterSpacing: 1, color: '#7a1212' }}>SKOR</span>
            <span ref={scoreElRef} style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 20, color: '#E60000', textShadow: '0 2px 0 rgba(0,0,0,.12)' }}>0</span>
          </div>
        </div>

        {/* HUD — best */}
        <div style={{ position: 'absolute', right: 22, top: 18, zIndex: 8, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 3 }}>
          <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 9, letterSpacing: 1, color: '#555' }}>EN İYİ</span>
          <span ref={bestElRef} style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 14, color: '#1a1a1a' }}>0</span>
        </div>

        {/* HUD — ses ikonu */}
        <button
          onClick={() => {
            const next = !mutedRef.current;
            mutedRef.current = next;
            setMuted(next);
            if (bgGainRef.current) bgGainRef.current.gain.value = next ? 0 : 0.06;
          }}
          style={{
            position: 'absolute', right: 22, top: 52, zIndex: 8,
            background: 'rgba(0,0,0,0.15)', border: 'none', cursor: 'pointer',
            padding: '5px 6px', borderRadius: 8, lineHeight: 1, display: 'flex', alignItems: 'center',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            {muted ? (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#333"/>
                <line x1="23" y1="9" x2="17" y2="15" stroke="#E60000" strokeWidth="2.5" strokeLinecap="round"/>
                <line x1="17" y1="9" x2="23" y2="15" stroke="#E60000" strokeWidth="2.5" strokeLinecap="round"/>
              </>
            ) : (
              <>
                <path d="M11 5L6 9H2v6h4l5 4V5z" fill="#333"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#333" strokeWidth="2.5" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>

        {/* HUD — kalp / kalkan */}
        <div style={{ position: 'absolute', left: '50%', top: 16, transform: 'translateX(-50%)', zIndex: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {[0, 1, 2].map(i => {
              const filled = hasShield || i < modemCount;
              const color = filled ? '#E60000' : '#555';
              const glow = hasShield ? '0 0 8px 2px rgba(230,0,0,0.7)' : 'none';
              return (
                <svg key={i} width="26" height="22" viewBox="0 0 7 6" style={{ filter: `drop-shadow(${hasShield ? '0 0 4px #E60000' : '0 1px 2px rgba(0,0,0,.4)'})`, transition: 'all 0.2s', transform: hasShield ? 'scale(1.18)' : 'scale(1)' }}>
                  <rect x="1" y="0" width="2" height="1" fill={color}/>
                  <rect x="4" y="0" width="2" height="1" fill={color}/>
                  <rect x="0" y="1" width="7" height="1" fill={color}/>
                  <rect x="0" y="2" width="7" height="1" fill={color}/>
                  <rect x="1" y="3" width="5" height="1" fill={color}/>
                  <rect x="2" y="4" width="3" height="1" fill={color}/>
                  <rect x="3" y="5" width="1" height="1" fill={color}/>
                </svg>
              );
            })}
          </div>
          {hasShield && (
            <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 14, color: '#E60000', letterSpacing: 1, animation: 'vfr-blink 1s steps(1) infinite' }}>
              KALKAN AKTİF
            </span>
          )}
        </div>

        {/* Ready screen */}
        {status === 'ready' && (() => {
          const board = getLeaderboard();
          const userRank = getUserRank(best, board);
          const userEntry: LeaderboardEntry = { rank: userRank, name: 'SİZİN SIRALAMANIZ', score: best };
          const fullBoard: LeaderboardEntry[] = [];
          board.forEach(e => {
            if (e.rank < userRank) fullBoard.push(e);
          });
          fullBoard.push(userEntry);
          board.forEach(e => {
            if (e.rank >= userRank) fullBoard.push(e);
          });
          const userIdx = fullBoard.findIndex(e => e.name === 'SİZİN SIRALAMANIZ');
          const start = Math.max(0, userIdx - 5);
          const end = Math.min(fullBoard.length, userIdx + 6);
          const visible = fullBoard.slice(start, end);

          return (
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 9,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 40,
              background: 'rgba(255,255,255,.18)',
              backdropFilter: 'blur(1px)',
              padding: '0 32px',
            }}
          >
            {/* Sol: logo + başlık + buton */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, animation: 'vfr-bob 2.4s ease-in-out infinite' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/logo.png" alt="Vodafone" style={{ width: 64, height: 64, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.3))' }} />
                <h1 style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 34, lineHeight: 1.2, color: '#E60000', textShadow: '0 4px 0 rgba(0,0,0,.18)' }}>
                  VODAFONE<br /><span style={{ color: '#1a1a1a' }}>RUN</span>
                </h1>
              </div>
              <p style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 600, fontSize: 19, color: '#2a2f38', textAlign: 'center' }}>
                Engellerden zıpla, WiFi topla, mümkün olduğunca koş!
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 24px', borderRadius: 999, background: '#E60000', boxShadow: '0 8px 0 #9c0000, 0 14px 26px rgba(230,0,0,.4)', animation: 'vfr-blink 1.3s steps(1) infinite' }}>
                <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 11, color: '#fff' }}>BAŞLAMAK İÇİN DOKUN</span>
              </div>
            </div>

            {/* Sağ: liderlik tablosu */}
            <div style={{
              width: 280, background: 'rgba(255,255,255,0.82)', borderRadius: 16,
              boxShadow: '0 8px 32px rgba(0,0,0,0.13)', overflow: 'hidden',
              border: '2px solid rgba(230,0,0,0.15)',
            }}>
              <div style={{ background: '#E60000', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 16 }}>🏆</span>
                <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 10, color: '#fff', letterSpacing: 1 }}>LİDERLİK</span>
              </div>
              <div style={{ padding: '6px 0' }}>
                {visible.map((entry) => {
                  const isUser = entry.name === 'SİZİN SIRALAMANIZ';
                  return (
                    <div key={entry.rank} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '7px 14px',
                      background: isUser ? 'rgba(230,0,0,0.10)' : 'transparent',
                      borderLeft: isUser ? '3px solid #E60000' : '3px solid transparent',
                    }}>
                      <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 9, color: isUser ? '#E60000' : '#888', minWidth: 24 }}>
                        #{entry.rank}
                      </span>
                      <span style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: isUser ? 700 : 500, fontSize: 13, color: isUser ? '#E60000' : '#1a1a1a', flex: 1 }}>
                        {isUser ? entry.name : maskName(entry.name)}
                      </span>
                      <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 10, color: isUser ? '#E60000' : '#333' }}>
                        {entry.score}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          );
        })()}

        {/* Game over screen */}
        {status === 'over' && (() => {
          const board = getLeaderboard();
          const userRank = getUserRank(best, board);
          const userEntry: LeaderboardEntry = { rank: userRank, name: 'SİZİN SIRALAMANIZ', score: best };
          const fullBoard: LeaderboardEntry[] = [];
          board.forEach(e => { if (e.rank < userRank) fullBoard.push(e); });
          fullBoard.push(userEntry);
          board.forEach(e => { if (e.rank >= userRank) fullBoard.push(e); });
          const userIdx = fullBoard.findIndex(e => e.name === 'SİZİN SIRALAMANIZ');
          const start = Math.max(0, userIdx - 4);
          const end = Math.min(fullBoard.length, userIdx + 5);
          const visible = fullBoard.slice(start, end);
          return (
          <div
            style={{
              position: 'absolute', inset: 0, zIndex: 9,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 14,
              background: 'rgba(10,12,18,.72)',
              backdropFilter: 'blur(2px)',
              animation: 'vfr-pop .25s ease both',
            }}
          >
            <h1 style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 32, color: '#E60000', textShadow: '0 4px 0 rgba(0,0,0,.5)' }}>
              OYUN BİTTİ
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 10, color: '#ff8a8a' }}>SKOR</span>
              <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 30, color: '#fff' }}>{score}</span>
            </div>

            {/* Liderlik tablosu */}
            <div style={{ width: 300, background: '#fff', borderRadius: 14, overflow: 'hidden', border: '2px solid rgba(230,0,0,0.15)', boxShadow: '0 8px 32px rgba(0,0,0,0.13)' }}>
              <div style={{ background: '#E60000', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 14 }}>🏆</span>
                <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 9, color: '#fff', letterSpacing: 1 }}>LİDERLİK</span>
              </div>
              <div style={{ padding: '4px 0' }}>
                {visible.map((entry) => {
                  const isUser = entry.name === 'SİZİN SIRALAMANIZ';
                  return (
                    <div key={entry.rank} style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '6px 14px',
                      background: isUser ? 'rgba(230,0,0,0.25)' : 'transparent',
                      borderLeft: isUser ? '3px solid #E60000' : '3px solid transparent',
                    }}>
                      <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 8, color: isUser ? '#E60000' : '#999', minWidth: 24 }}>
                        #{entry.rank}
                      </span>
                      <span style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: isUser ? 700 : 500, fontSize: 12, color: isUser ? '#c00' : '#444', flex: 1 }}>
                        {isUser ? entry.name : maskName(entry.name)}
                      </span>
                      <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 9, color: isUser ? '#E60000' : '#666' }}>
                        {entry.score}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                marginTop: 6, padding: '13px 26px', borderRadius: 999,
                background: '#E60000',
                boxShadow: '0 8px 0 #9c0000, 0 14px 26px rgba(230,0,0,.45)',
                animation: 'vfr-blink 1.1s steps(1) infinite',
              }}
            >
              <span style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 11, color: '#fff' }}>
                TEKRAR OYNA ↺
              </span>
            </div>
          </div>
          );
        })()}
      </div>

      {/* Portrait rotate prompt (mobile) */}
      <div
        ref={rotateRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 50,
          display: 'none',
          flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 24,
          background: '#0a0c12',
          textAlign: 'center',
          padding: 30,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/logo.png" alt="Vodafone" style={{ width: 54, height: 54 }} />
        <div
          style={{
            width: 62, height: 108,
            border: '4px solid #fff', borderRadius: 16,
            position: 'relative',
            background: 'rgba(255,255,255,0.05)',
            animation: 'vfr-rot 2.2s ease-in-out infinite',
          }}
        >
          {/* Dynamic Island çentiği */}
          <div style={{
            position: 'absolute', top: 7, left: '50%',
            transform: 'translateX(-50%)',
            width: 20, height: 6,
            background: '#fff', borderRadius: 4,
          }} />
          {/* Ev çubuğu */}
          <div style={{
            position: 'absolute', bottom: 7, left: '50%',
            transform: 'translateX(-50%)',
            width: 24, height: 3,
            background: '#fff', borderRadius: 2,
          }} />
        </div>
        <p style={{ fontFamily: 'var(--font-press-start), monospace', fontSize: 14, lineHeight: 1.7, color: '#E60000' }}>
          TELEFONU<br />YAN ÇEVİR
        </p>
        <p style={{ fontFamily: 'var(--font-outfit), sans-serif', fontWeight: 600, fontSize: 16, color: '#cdd3dd' }}>
          Oynamak için telefonu yan çevirin
        </p>
      </div>
    </div>
  );
}
