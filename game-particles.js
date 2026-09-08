// Particle system for Word Match — one canvas per layer (ambient drift + finite-life
// bursts/bolts), scoped to the .game-main container's own box rather than the viewport, so the
// effects stay inside the dark game area and never bleed over the light site header/footer.
//
// Split out of game.js because it references nothing else in it: only the DOM and window. It is
// loaded before game.js in game.html, and ParticleField is a function declaration, which at the
// top level of a classic script becomes a global — that is what makes it visible over there.
function ParticleField(canvas, container) {
    this.canvas = canvas;
    this.container = container;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.bolts = [];
    this.rings = [];
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();
}

ParticleField.prototype.resize = function () {
    const rect = this.container.getBoundingClientRect();
    this.w = Math.max(rect.width, 1);
    this.h = Math.max(rect.height, 1);
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
};

ParticleField.prototype.spawnAmbient = function (n) {
    for (let i = 0; i < n; i++) {
        this.particles.push({
            kind: 'ambient',
            x: Math.random() * this.w,
            y: Math.random() * this.h,
            vx: (Math.random() - 0.5) * 6,
            vy: -6 - Math.random() * 10,
            r: 0.6 + Math.random() * 1.6,
            color: Math.random() < 0.7 ? '212,166,75' : '244,206,122',
            alpha: 0.12 + Math.random() * 0.22,
            drift: Math.random() * Math.PI * 2,
        });
    }
};

ParticleField.prototype.spawnBurst = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 26;
    const colors = opts.colors || ['212,166,75', '244,206,122'];
    const speed = opts.speed || 180;
    const life = opts.life || 0.9;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const v = speed * (0.35 + Math.random() * 0.75);
        this.particles.push({
            kind: 'burst',
            x, y,
            vx: Math.cos(angle) * v,
            vy: Math.sin(angle) * v - 60,
            gravity: 420,
            r: 1.4 + Math.random() * 2.6,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: life * (0.7 + Math.random() * 0.6),
            age: 0,
        });
    }
};

// Jagged animated connector line between two points, for the phonetic-chain "lightning
// connect" move — a distinct visual from the round particle bursts used elsewhere.
ParticleField.prototype.spawnBolt = function (p1, p2, opts) {
    opts = opts || {};
    const segments = 7;
    const points = [];
    const dx = p2.x - p1.x, dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len, ny = dx / len;
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const jitter = (i === 0 || i === segments) ? 0 : (Math.random() - 0.5) * 24;
        points.push({ x: p1.x + dx * t + nx * jitter, y: p1.y + dy * t + ny * jitter });
    }
    this.bolts.push({ points, life: opts.life || 0.5, age: 0, color: opts.color || '127,224,255' });
};

// A plain expanding ring for an ordinary match's "confirmed" ripple, or (shape:'hex') a
// six-sided ring echoing the board's own honeycomb tiles for the Wakan blast -- visually
// distinct from the round burst/jagged bolt used elsewhere, and from each other.
ParticleField.prototype.spawnRing = function (x, y, opts) {
    opts = opts || {};
    this.rings.push({
        x, y,
        shape: opts.shape || 'circle',
        r0: opts.r0 != null ? opts.r0 : 6,
        r1: opts.r1 != null ? opts.r1 : 70,
        width: opts.width || 3,
        rotation: opts.rotation || 0,
        color: opts.color || '212,166,75',
        life: opts.life || 0.5,
        age: 0,
    });
};

// Four-point glints (a magic-sparkle silhouette, not a circle) scattered around a point --
// the powerup family's signature, distinct from every tile-clear burst.
ParticleField.prototype.spawnSparkle = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 10;
    const spread = opts.spread || 46;
    const size = opts.size || 10;
    const color = opts.color || '255,255,255';
    const life = opts.life || 0.6;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * spread;
        this.particles.push({
            kind: 'sparkle',
            x: x + Math.cos(angle) * dist,
            y: y + Math.sin(angle) * dist,
            vx: 0, vy: 0, gravity: 0,
            size: size * (0.6 + Math.random() * 0.8),
            rot: Math.random() * Math.PI,
            spin: (Math.random() - 0.5) * 5,
            color,
            life: life * (0.75 + Math.random() * 0.5),
            age: 0,
        });
    }
};

// Heavier, desaturated motes drifting mostly DOWNWARD instead of the upward "reward" arc every
// other burst uses -- the mismatch/penalty family's signature: a setback should read as things
// falling, not popping.
ParticleField.prototype.spawnDust = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 14;
    const colors = opts.colors || ['138,74,64'];
    const spread = opts.spread || 30;
    const speed = opts.speed || 55;
    const life = opts.life || 0.7;
    const size = opts.size || 3;
    for (let i = 0; i < count; i++) {
        const angle = Math.PI * 0.5 + (Math.random() - 0.5) * 1.5; // a downward-biased cone
        const v = speed * (0.4 + Math.random() * 0.9);
        this.particles.push({
            kind: 'burst',
            x: x + (Math.random() - 0.5) * spread,
            y,
            vx: Math.cos(angle) * v * 0.4,
            vy: Math.sin(angle) * v,
            gravity: opts.gravity != null ? opts.gravity : 220,
            r: size * (0.55 + Math.random() * 0.7),
            color: colors[Math.floor(Math.random() * colors.length)],
            life: life * (0.7 + Math.random() * 0.5),
            age: 0,
        });
    }
};

ParticleField.prototype.update = function (dt) {
    const next = [];
    for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (p.kind === 'ambient') {
            p.drift += dt * 0.6;
            p.x += (p.vx + Math.sin(p.drift) * 6) * dt * 0.1;
            p.y += p.vy * dt * 0.1;
            if (p.y < -20) { p.y = this.h + 20; p.x = Math.random() * this.w; }
            if (p.x < -20) p.x = this.w + 20;
            if (p.x > this.w + 20) p.x = -20;
            next.push(p);
        } else {
            p.age += dt;
            if (p.age >= p.life) continue;
            p.vy += p.gravity * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            next.push(p);
        }
    }
    this.particles = next;
    this.bolts = this.bolts.filter(b => { b.age += dt; return b.age < b.life; });
    this.rings = this.rings.filter(r => { r.age += dt; return r.age < r.life; });
};

ParticleField.prototype.draw = function () {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (p.kind === 'sparkle') {
            const t = p.age / p.life;
            const alpha = 1 - t;
            // quick pop to full size, then a gentle shrink -- distinct silhouette AND motion
            // from the round burst dots (which only ever shrink).
            const scale = Math.sin(Math.min(t * 3, 1) * Math.PI / 2) * (1 - t * 0.25);
            const s = p.size;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot + p.spin * p.age);
            ctx.scale(scale, scale);
            ctx.fillStyle = `rgba(${p.color},${Math.max(alpha, 0)})`;
            ctx.beginPath();
            ctx.moveTo(0, -s); ctx.lineTo(s * 0.28, -s * 0.28); ctx.lineTo(s, 0); ctx.lineTo(s * 0.28, s * 0.28);
            ctx.lineTo(0, s); ctx.lineTo(-s * 0.28, s * 0.28); ctx.lineTo(-s, 0); ctx.lineTo(-s * 0.28, -s * 0.28);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
            continue;
        }
        let alpha, r;
        if (p.kind === 'ambient') { alpha = p.alpha; r = p.r; }
        else { const t = p.age / p.life; alpha = 1 - t; r = p.r * (1 - t * 0.4); }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${Math.max(alpha, 0)})`;
        ctx.arc(p.x, p.y, Math.max(r, 0), 0, Math.PI * 2);
        ctx.fill();
    }
    this.rings.forEach(r => {
        const t = r.age / r.life;
        const rad = r.r0 + (r.r1 - r.r0) * t;
        const alpha = Math.max(1 - t, 0);
        ctx.save();
        ctx.strokeStyle = `rgba(${r.color},${alpha})`;
        ctx.lineWidth = r.width;
        ctx.shadowColor = `rgba(${r.color},${Math.min(alpha + 0.3, 1)})`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        if (r.shape === 'hex') {
            for (let i = 0; i < 6; i++) {
                const ang = (Math.PI / 3) * i - Math.PI / 2 + r.rotation;
                const px = r.x + Math.cos(ang) * rad;
                const py = r.y + Math.sin(ang) * rad;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.closePath();
        } else {
            ctx.arc(r.x, r.y, Math.max(rad, 0), 0, Math.PI * 2);
        }
        ctx.stroke();
        ctx.restore();
    });
    this.bolts.forEach(b => {
        const t = b.age / b.life;
        const alpha = Math.max(1 - t, 0);
        ctx.save();
        ctx.strokeStyle = `rgba(${b.color},${alpha})`;
        ctx.lineWidth = 2.5;
        ctx.shadowColor = `rgba(${b.color},${Math.min(alpha + 0.3, 1)})`;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        b.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)));
        ctx.stroke();
        // A bright pulse riding the bolt from end to end over its lifetime -- real traveling
        // current, not just a static jagged line.
        const segT = Math.min(t, 1) * (b.points.length - 1);
        const i0 = Math.min(Math.floor(segT), b.points.length - 2);
        const localT = segT - i0;
        const pA = b.points[i0], pB = b.points[i0 + 1];
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.shadowColor = `rgba(${b.color},1)`;
        ctx.shadowBlur = 18;
        ctx.arc(pA.x + (pB.x - pA.x) * localT, pA.y + (pB.y - pA.y) * localT, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });
};
