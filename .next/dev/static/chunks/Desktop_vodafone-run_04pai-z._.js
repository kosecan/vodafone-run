(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>VodafoneRunner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/vodafone-run/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/vodafone-run/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
// ─── Constants ────────────────────────────────────────────────────────────────
const FRAMES = [
    '/assets/run0.png',
    '/assets/run1.png',
    '/assets/run2.png',
    '/assets/run3.png',
    '/assets/run4.png'
];
const GROUND_TOP = 504;
const PLAYER_H = 160;
const HB_LEFT = 162;
const HB_W = 58;
const GRAVITY = 2700;
const JUMP_V = 1080;
function VodafoneRunner() {
    _s();
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('ready');
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [best, setBest] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [modemCount, setModemCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [hasShield, setHasShield] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Mirror refs — game loop reads these instead of stale state
    const statusRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('ready');
    const bestRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // DOM refs (cached on mount, never queried inside loop)
    const stageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const playerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const shadowRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const scoreElRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bestElRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const obstaclesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const collectiblesRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const shieldFlashRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const groundRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const bushRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const midRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const farRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cloudImgsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    const rotateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const rafRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    // Mutable game state — written every frame, no re-renders
    const g = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
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
            {
                x: 1100,
                top: 48,
                h: 90,
                op: 0.95
            },
            {
                x: 1500,
                top: 112,
                h: 62,
                op: 0.80
            },
            {
                x: 1900,
                top: 62,
                h: 76,
                op: 0.88
            }
        ],
        obstacles: [],
        lastObstacleType: '',
        collectibles: [],
        collectibleSpawnDist: 900,
        modemCount: 0,
        hasShield: false,
        shieldFlashing: false,
        spawnedInInterval: 0,
        lastInterval: 0,
        worldW: 1000,
        paused: false,
        last: 0
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "VodafoneRunner.useEffect": ()=>{
            // Preload sprite frames
            FRAMES.forEach({
                "VodafoneRunner.useEffect": (src)=>{
                    const im = new Image();
                    im.src = src;
                }
            }["VodafoneRunner.useEffect"]);
            // Restore best score
            try {
                const saved = parseInt(localStorage.getItem('vfr_best') ?? '0', 10) || 0;
                bestRef.current = saved;
                setBest(saved);
                if (bestElRef.current) bestElRef.current.textContent = String(saved);
            } catch  {}
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
                g.current.worldW = Math.ceil(vw / s);
                const stage = stageRef.current;
                if (stage) {
                    stage.style.width = g.current.worldW + 'px';
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
                const allTypes = [
                    'cone',
                    'hurdle',
                    'crate'
                ];
                const available = allTypes.filter({
                    "VodafoneRunner.useEffect.spawn.available": (t)=>t !== g.current.lastObstacleType
                }["VodafoneRunner.useEffect.spawn.available"]);
                const t = available[Math.random() * available.length | 0];
                g.current.lastObstacleType = t;
                const spawnX = (g.current.worldW || 1000) + 60;
                // If a collectible is still to the right (not yet on screen) and too close, push it further right
                g.current.collectibles.forEach({
                    "VodafoneRunner.useEffect.spawn": (c)=>{
                        if (c.x >= spawnX - 80 && c.x < spawnX + 220) {
                            c.x = spawnX + 260;
                            c.el.style.transform = `translateX(${c.x}px)`;
                        }
                    }
                }["VodafoneRunner.useEffect.spawn"]);
                const el = document.createElement('div');
                el.style.cssText = 'position:absolute;bottom:96px;left:0;will-change:transform;';
                let w, h;
                if (t === 'cone') {
                    w = 46;
                    h = 56;
                    el.innerHTML = `
          <div style="position:relative;width:${w}px;height:${h}px;overflow:hidden;clip-path:polygon(50% 0,100% 100%,0 100%);background:linear-gradient(180deg,#ff6a32,#e63100);">
            <div style="position:absolute;top:34%;left:-10%;width:120%;height:8px;background:#fff;"></div>
            <div style="position:absolute;top:62%;left:-10%;width:120%;height:9px;background:#fff;"></div>
          </div>
          <div style="position:absolute;bottom:-4px;left:-6px;width:${w + 12}px;height:9px;border-radius:4px;background:#1f1f1f;"></div>`;
                } else if (t === 'hurdle') {
                    w = 58;
                    h = 80;
                    el.innerHTML = `
          <div style="position:relative;width:${w}px;height:${h}px;">
            <div style="position:absolute;left:4px;bottom:0;width:7px;height:${h}px;background:#1f1f1f;border-radius:3px;"></div>
            <div style="position:absolute;right:4px;bottom:0;width:7px;height:${h}px;background:#1f1f1f;border-radius:3px;"></div>
            <div style="position:absolute;left:0;top:6px;width:${w}px;height:24px;border:3px solid #1a1a1a;border-radius:4px;background:repeating-linear-gradient(45deg,#E60000 0 13px,#fff 13px 26px);"></div>
          </div>`;
                } else {
                    w = 52;
                    h = 52;
                    el.innerHTML = `
          <div style="position:relative;width:${w}px;height:${h}px;border:3px solid #1a1a1a;border-radius:8px;background:linear-gradient(180deg,#ff3b3b,#cc0000);box-shadow:inset 0 -6px 0 rgba(0,0,0,.18);">
            <div style="position:absolute;inset:0;margin:auto;width:22px;height:22px;border-radius:50%;background:#fff;box-shadow:inset 0 0 0 5px #E60000;"></div>
          </div>`;
                }
                obstaclesRef.current?.appendChild(el);
                g.current.obstacles.push({
                    el: el,
                    x: spawnX,
                    w,
                    h
                });
            }
            function spawnCollectible() {
                const spawnX = (g.current.worldW || 1000) + 60;
                // Don't spawn on top of an obstacle
                const blocked = g.current.obstacles.some({
                    "VodafoneRunner.useEffect.spawnCollectible.blocked": (o)=>Math.abs(o.x - spawnX) < 200
                }["VodafoneRunner.useEffect.spawnCollectible.blocked"]);
                if (blocked) {
                    g.current.collectibleSpawnDist = 250;
                    return;
                }
                const wrapper = document.createElement('div');
                wrapper.style.cssText = 'position:absolute;bottom:110px;left:0;width:48px;height:48px;will-change:transform;z-index:6;';
                const el = document.createElement('img');
                el.src = '/assets/wifi-good.svg';
                el.style.cssText = 'width:48px;height:48px;object-fit:contain;animation:vfr-float 1.2s ease-in-out infinite;';
                wrapper.appendChild(el);
                collectiblesRef.current?.appendChild(wrapper);
                g.current.collectibles.push({
                    el: wrapper,
                    x: spawnX
                });
            }
            function collectEffect() {
                const el = document.createElement('img');
                el.src = '/assets/wifi-good.svg';
                el.style.cssText = `position:absolute;left:${HB_LEFT}px;bottom:110px;width:48px;height:48px;object-fit:contain;pointer-events:none;z-index:9;animation:vfr-collect 0.55s ease forwards;`;
                stageRef.current?.appendChild(el);
                setTimeout({
                    "VodafoneRunner.useEffect.collectEffect": ()=>el.remove()
                }["VodafoneRunner.useEffect.collectEffect"], 560);
            }
            function gameOver() {
                const final = Math.floor(g.current.scoreF);
                let newBest = bestRef.current;
                if (final > newBest) {
                    newBest = final;
                    bestRef.current = newBest;
                    try {
                        localStorage.setItem('vfr_best', String(newBest));
                    } catch  {}
                    if (bestElRef.current) bestElRef.current.textContent = String(newBest);
                }
                statusRef.current = 'over';
                setStatus('over');
                setScore(final);
                setBest(newBest);
            }
            // ── Game loop ─────────────────────────────────────────────────────────────
            function loop(now) {
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
                            const reactionTime = 0.95 - 0.45 * difficulty; // 0.95s → 0.50s
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
                        for(let i = state.obstacles.length - 1; i >= 0; i--){
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
                                    setHasShield(false);
                                    setModemCount(0);
                                    // flash effect
                                    const flash = shieldFlashRef.current;
                                    if (flash) {
                                        flash.style.opacity = '1';
                                        setTimeout({
                                            "VodafoneRunner.useEffect.loop": ()=>{
                                                if (flash) flash.style.opacity = '0';
                                            }
                                        }["VodafoneRunner.useEffect.loop"], 400);
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
                        for(let i = state.collectibles.length - 1; i >= 0; i--){
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
                        for(let i = 0; i < state.clouds.length; i++){
                            const c = state.clouds[i];
                            c.x -= sp * 0.12 * dt;
                            if (c.x + c.h * 1.9 < 0) {
                                let newX = state.worldW + 60 + Math.random() * 300;
                                for(let attempt = 0; attempt < 8; attempt++){
                                    const tooClose = state.clouds.some({
                                        "VodafoneRunner.useEffect.loop.tooClose": (other, j)=>j !== i && Math.abs(other.x - newX) < 220
                                    }["VodafoneRunner.useEffect.loop.tooClose"]);
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
                            rot = state.vy > 0 ? -6 : 5;
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
                } else if (st === 'playing') {
                    if (g.current.grounded) {
                        g.current.vy = JUMP_V;
                        g.current.grounded = false;
                    }
                }
            }
            // ── Event listeners ───────────────────────────────────────────────────────
            const onResize = {
                "VodafoneRunner.useEffect.onResize": ()=>fit()
            }["VodafoneRunner.useEffect.onResize"];
            const onKey = {
                "VodafoneRunner.useEffect.onKey": (e)=>{
                    if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
                        e.preventDefault();
                        if (!e.repeat) input();
                    }
                }
            }["VodafoneRunner.useEffect.onKey"];
            const onPointer = {
                "VodafoneRunner.useEffect.onPointer": (e)=>{
                    e.preventDefault();
                    input();
                }
            }["VodafoneRunner.useEffect.onPointer"];
            window.addEventListener('resize', onResize);
            window.addEventListener('orientationchange', onResize);
            window.addEventListener('keydown', onKey);
            window.addEventListener('pointerdown', onPointer, {
                passive: false
            });
            fit();
            g.current.last = performance.now();
            rafRef.current = requestAnimationFrame(loop);
            return ({
                "VodafoneRunner.useEffect": ()=>{
                    cancelAnimationFrame(rafRef.current);
                    window.removeEventListener('resize', onResize);
                    window.removeEventListener('orientationchange', onResize);
                    window.removeEventListener('keydown', onKey);
                    window.removeEventListener('pointerdown', onPointer);
                }
            })["VodafoneRunner.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["VodafoneRunner.useEffect"], []);
    // ─── Render ─────────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'fixed',
            inset: 0,
            overflow: 'hidden',
            background: '#bfe8ff'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: stageRef,
                style: {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '1000px',
                    height: '600px',
                    transformOrigin: '0 0',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    userSelect: 'none'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            background: 'linear-gradient(180deg, #bfe8ff 0%, #dff4ff 45%, #ffe9e6 100%)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 528,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            left: 760,
                            top: 78,
                            width: 96,
                            height: 96,
                            borderRadius: '50%',
                            background: 'radial-gradient(circle at 38% 36%, #fff6db, #ffd56b)',
                            animation: 'vfr-sun 4s ease-in-out infinite'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 529,
                        columnNumber: 9
                    }, this),
                    [
                        {
                            top: 48,
                            h: 90,
                            op: 0.95
                        },
                        {
                            top: 112,
                            h: 62,
                            op: 0.80
                        },
                        {
                            top: 62,
                            h: 76,
                            op: 0.88
                        }
                    ].map((c, i)=>// eslint-disable-next-line @next/next/no-img-element
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            ref: (el)=>{
                                cloudImgsRef.current[i] = el;
                            },
                            src: "/assets/cloud.png",
                            alt: "",
                            style: {
                                position: 'absolute',
                                left: 0,
                                top: c.top,
                                height: c.h,
                                width: 'auto',
                                opacity: c.op,
                                pointerEvents: 'none',
                                willChange: 'transform'
                            }
                        }, i, false, {
                            fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                            lineNumber: 545,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: farRef,
                        style: {
                            position: 'absolute',
                            left: 0,
                            bottom: 96,
                            width: '300%',
                            height: 230,
                            backgroundRepeat: 'repeat-x',
                            backgroundSize: '520px 230px',
                            backgroundImage: "url('/assets/far.svg')",
                            opacity: 0.85
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 561,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: midRef,
                        style: {
                            position: 'absolute',
                            left: 0,
                            bottom: 96,
                            width: '300%',
                            height: 180,
                            backgroundRepeat: 'repeat-x',
                            backgroundSize: '460px 180px',
                            backgroundImage: "url('/assets/mid.svg')"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 573,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: bushRef,
                        style: {
                            position: 'absolute',
                            left: 0,
                            bottom: 90,
                            width: '300%',
                            height: 80,
                            backgroundRepeat: 'repeat-x',
                            backgroundSize: '320px 80px',
                            backgroundImage: "url('/assets/bush.svg')"
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 584,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            height: 96,
                            background: 'linear-gradient(180deg, #3a3f4a 0%, #2b2f38 100%)',
                            boxShadow: 'inset 0 6px 0 #54a0e8'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 595,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: groundRef,
                        style: {
                            position: 'absolute',
                            left: 0,
                            bottom: 42,
                            width: '300%',
                            height: 8,
                            backgroundRepeat: 'repeat-x',
                            backgroundSize: '120px 8px',
                            backgroundImage: 'linear-gradient(90deg, #f4c20d 0 60px, transparent 60px 120px)'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 602,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: obstaclesRef,
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 4,
                            pointerEvents: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: collectiblesRef,
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 6,
                            pointerEvents: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 616,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: shieldFlashRef,
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 10,
                            background: 'rgba(230,0,0,0.25)',
                            opacity: 0,
                            transition: 'opacity 0.4s ease',
                            pointerEvents: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 619,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        ref: shadowRef,
                        style: {
                            position: 'absolute',
                            left: 150,
                            bottom: 84,
                            width: 90,
                            height: 22,
                            zIndex: 4,
                            borderRadius: '50%',
                            background: 'radial-gradient(ellipse at center, rgba(0,0,0,.34) 0%, rgba(0,0,0,.18) 46%, rgba(0,0,0,0) 72%)',
                            pointerEvents: 'none',
                            transformOrigin: 'center center'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 631,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        ref: playerRef,
                        src: "/assets/run0.png",
                        alt: "Vodafone runner",
                        style: {
                            position: 'absolute',
                            left: 130,
                            bottom: 96,
                            height: 160,
                            width: 'auto',
                            zIndex: 5,
                            transformOrigin: '50% 100%',
                            pointerEvents: 'none'
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 645,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            left: 22,
                            top: 18,
                            zIndex: 8,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 12
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/assets/logo.png",
                                alt: "Vodafone",
                                style: {
                                    width: 46,
                                    height: 46,
                                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,.25))'
                                }
                            }, void 0, false, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 662,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 3
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontFamily: 'var(--font-press-start), monospace',
                                            fontSize: 9,
                                            letterSpacing: 1,
                                            color: '#7a1212'
                                        },
                                        children: "SKOR"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                        lineNumber: 664,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        ref: scoreElRef,
                                        style: {
                                            fontFamily: 'var(--font-press-start), monospace',
                                            fontSize: 20,
                                            color: '#E60000',
                                            textShadow: '0 2px 0 rgba(0,0,0,.12)'
                                        },
                                        children: "0"
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                        lineNumber: 665,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 663,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 659,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            right: 22,
                            top: 18,
                            zIndex: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            gap: 3
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'var(--font-press-start), monospace',
                                    fontSize: 9,
                                    letterSpacing: 1,
                                    color: '#555'
                                },
                                children: "EN İYİ"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 671,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                ref: bestElRef,
                                style: {
                                    fontFamily: 'var(--font-press-start), monospace',
                                    fontSize: 14,
                                    color: '#1a1a1a'
                                },
                                children: "0"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 672,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 670,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            left: '50%',
                            top: 16,
                            transform: 'translateX(-50%)',
                            zIndex: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 5
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 8,
                                    alignItems: 'center'
                                },
                                children: [
                                    0,
                                    1,
                                    2
                                ].map((i)=>{
                                    const filled = hasShield || i < modemCount;
                                    const color = filled ? '#E60000' : '#555';
                                    const glow = hasShield ? '0 0 8px 2px rgba(230,0,0,0.7)' : 'none';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "26",
                                        height: "22",
                                        viewBox: "0 0 7 6",
                                        style: {
                                            filter: `drop-shadow(${hasShield ? '0 0 4px #E60000' : '0 1px 2px rgba(0,0,0,.4)'})`,
                                            transition: 'all 0.2s',
                                            transform: hasShield ? 'scale(1.18)' : 'scale(1)'
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "1",
                                                y: "0",
                                                width: "2",
                                                height: "1",
                                                fill: color
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 684,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "4",
                                                y: "0",
                                                width: "2",
                                                height: "1",
                                                fill: color
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 685,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "0",
                                                y: "1",
                                                width: "7",
                                                height: "1",
                                                fill: color
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 686,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "0",
                                                y: "2",
                                                width: "7",
                                                height: "1",
                                                fill: color
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 687,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "1",
                                                y: "3",
                                                width: "5",
                                                height: "1",
                                                fill: color
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 688,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "2",
                                                y: "4",
                                                width: "3",
                                                height: "1",
                                                fill: color
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 689,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                                                x: "3",
                                                y: "5",
                                                width: "1",
                                                height: "1",
                                                fill: color
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 690,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                        lineNumber: 683,
                                        columnNumber: 17
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 677,
                                columnNumber: 11
                            }, this),
                            hasShield && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: 'var(--font-press-start), monospace',
                                    fontSize: 7,
                                    color: '#E60000',
                                    letterSpacing: 1,
                                    animation: 'vfr-blink 1s steps(1) infinite'
                                },
                                children: "KALKAN AKTİF"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 696,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 676,
                        columnNumber: 9
                    }, this),
                    status === 'ready' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 9,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 22,
                            background: 'rgba(255,255,255,.18)',
                            backdropFilter: 'blur(1px)'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 16,
                                    animation: 'vfr-bob 2.4s ease-in-out infinite'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: "/assets/logo.png",
                                        alt: "Vodafone",
                                        style: {
                                            width: 64,
                                            height: 64,
                                            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.3))'
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                        lineNumber: 715,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        style: {
                                            fontFamily: 'var(--font-press-start), monospace',
                                            fontSize: 34,
                                            lineHeight: 1.2,
                                            color: '#E60000',
                                            textShadow: '0 4px 0 rgba(0,0,0,.18), 0 0 18px rgba(230,0,0,.25)'
                                        },
                                        children: [
                                            "VODAFONE",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 724,
                                                columnNumber: 25
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    color: '#1a1a1a'
                                                },
                                                children: "RUN"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 725,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                        lineNumber: 716,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 712,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: 'var(--font-outfit), sans-serif',
                                    fontWeight: 600,
                                    fontSize: 19,
                                    color: '#2a2f38'
                                },
                                children: "Engellerden zıpla, WiFi topla, mümkün olduğunca koş!"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 728,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    padding: '13px 24px',
                                    borderRadius: 999,
                                    background: '#E60000',
                                    boxShadow: '0 8px 0 #9c0000, 0 14px 26px rgba(230,0,0,.4)',
                                    animation: 'vfr-blink 1.3s steps(1) infinite'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: 'var(--font-press-start), monospace',
                                        fontSize: 11,
                                        color: '#fff'
                                    },
                                    children: "BAŞLAMAK İÇİN DOKUN"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                    lineNumber: 740,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 731,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 704,
                        columnNumber: 11
                    }, this),
                    status === 'over' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            position: 'absolute',
                            inset: 0,
                            zIndex: 9,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 18,
                            background: 'rgba(10,12,18,.62)',
                            backdropFilter: 'blur(2px)',
                            animation: 'vfr-pop .25s ease both'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: 'var(--font-press-start), monospace',
                                    fontSize: 32,
                                    color: '#E60000',
                                    textShadow: '0 4px 0 rgba(0,0,0,.5)'
                                },
                                children: "OYUN BİTTİ"
                            }, void 0, false, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 758,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    gap: 40,
                                    alignItems: 'flex-end'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-press-start), monospace',
                                                    fontSize: 10,
                                                    color: '#ff8a8a'
                                                },
                                                children: "SKOR"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 763,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-press-start), monospace',
                                                    fontSize: 30,
                                                    color: '#fff'
                                                },
                                                children: score
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 764,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                        lineNumber: 762,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: 8
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-press-start), monospace',
                                                    fontSize: 10,
                                                    color: '#9fd0ff'
                                                },
                                                children: "EN İYİ"
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 767,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                style: {
                                                    fontFamily: 'var(--font-press-start), monospace',
                                                    fontSize: 30,
                                                    color: '#fff'
                                                },
                                                children: best
                                            }, void 0, false, {
                                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                                lineNumber: 768,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                        lineNumber: 766,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 761,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 10,
                                    marginTop: 6,
                                    padding: '13px 26px',
                                    borderRadius: 999,
                                    background: '#E60000',
                                    boxShadow: '0 8px 0 #9c0000, 0 14px 26px rgba(230,0,0,.45)',
                                    animation: 'vfr-blink 1.1s steps(1) infinite'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: 'var(--font-press-start), monospace',
                                        fontSize: 11,
                                        color: '#fff'
                                    },
                                    children: "TEKRAR OYNA ↺"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                    lineNumber: 780,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 771,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 749,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                lineNumber: 513,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: rotateRef,
                style: {
                    position: 'absolute',
                    inset: 0,
                    zIndex: 50,
                    display: 'none',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 24,
                    background: '#0a0c12',
                    textAlign: 'center',
                    padding: 30
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: "/assets/logo.png",
                        alt: "Vodafone",
                        style: {
                            width: 54,
                            height: 54
                        }
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 802,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            width: 60,
                            height: 100,
                            border: '5px solid #fff',
                            borderRadius: 13,
                            position: 'relative',
                            animation: 'vfr-rot 2.2s ease-in-out infinite'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                position: 'absolute',
                                left: '50%',
                                bottom: 7,
                                transform: 'translateX(-50%)',
                                width: 13,
                                height: 13,
                                border: '3px solid #fff',
                                borderRadius: '50%'
                            }
                        }, void 0, false, {
                            fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                            lineNumber: 811,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 803,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: 'var(--font-press-start), monospace',
                            fontSize: 14,
                            lineHeight: 1.7,
                            color: '#E60000'
                        },
                        children: [
                            "TELEFONU",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                                lineNumber: 821,
                                columnNumber: 19
                            }, this),
                            "YAN ÇEVİR"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 820,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            fontFamily: 'var(--font-outfit), sans-serif',
                            fontWeight: 600,
                            fontSize: 16,
                            color: '#cdd3dd'
                        },
                        children: "Oyun yatay modda oynanır"
                    }, void 0, false, {
                        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                        lineNumber: 823,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
                lineNumber: 789,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/vodafone-run/components/VodafoneRunner.tsx",
        lineNumber: 511,
        columnNumber: 5
    }, this);
}
_s(VodafoneRunner, "A+DJcAq+EuneRMV+JrFlVw++JPQ=");
_c = VodafoneRunner;
var _c;
__turbopack_context__.k.register(_c, "VodafoneRunner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/vodafone-run/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/vodafone-run/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Desktop/vodafone-run/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Desktop/vodafone-run/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$vodafone$2d$run$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Desktop/vodafone-run/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Desktop/vodafone-run/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=Desktop_vodafone-run_04pai-z._.js.map