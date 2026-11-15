// Canvas particle field, shared by Word Match and Grammar Connect.
//
// A field draws into one canvas sized to a CONTAINER's box, not the viewport, so the effects
// stay inside the tool's own area and never spill over the site header or footer. Word Match
// keeps two fields (a slow ambient drift, and the burst that marks a cleared level); Grammar
// Connect keeps one, for a ring and sparkles on a right answer and falling dust on a wrong one.
//
// Grammar Connect used to carry its own copy of this (GcParticleField). The two differed only
// in a few default numbers, which are options now, so each caller states the values it wants
// and neither page's effects changed when the copies were merged.
//
// Classic script, loaded before the page's own. ParticleField is a function declaration, which
// at the top level of a classic script is a global -- that is what makes it visible to
// game-fx.js and to grammar.js (a module, which can still read globals).
function ParticleField(canvas, container) {
    this.canvas = canvas;
    this.container = container;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.rings = [];
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();
}

// The canvas's width and height ATTRIBUTES are in device pixels. Its CSS box must be sized by
// the stylesheet (width/height: 100%), because a canvas is a replaced element and `inset: 0`
// alone leaves it at this intrinsic size.
ParticleField.prototype.resize = function () {
    const rect = this.container.getBoundingClientRect();
    this.w = Math.max(rect.width, 1);
    this.h = Math.max(rect.height, 1);
    this.canvas.width = this.w * this.dpr;
    this.canvas.height = this.h * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
};

ParticleField.pick = list => list[Math.floor(Math.random() * list.length)];

// Slow motes that drift upward for ever and wrap at the edges. Never expire.
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

// Round dots thrown outward from a point, arcing up and then falling.
//   lift     initial upward kick, px/s          gravity   px/s^2
//   grain    how much the dot radius varies above its 1.4px floor
ParticleField.prototype.spawnBurst = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 26;
    const colors = opts.colors || ['212,166,75', '244,206,122'];
    const speed = opts.speed || 180;
    const life = opts.life || 0.9;
    const lift = opts.lift != null ? opts.lift : 60;
    const gravity = opts.gravity != null ? opts.gravity : 420;
    const grain = opts.grain != null ? opts.grain : 2.6;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const v = speed * (0.35 + Math.random() * 0.75);
        this.particles.push({
            kind: 'dot',
            x, y,
            vx: Math.cos(angle) * v,
            vy: Math.sin(angle) * v - lift,
            gravity,
            r: 1.4 + Math.random() * grain,
            color: ParticleField.pick(colors),
            life: life * (0.7 + Math.random() * 0.6),
            age: 0,
        });
    }
};

// Heavier motes falling mostly DOWNWARD -- a setback should read as things falling, not
// popping, so this is the one family that never arcs up.
ParticleField.prototype.spawnDust = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 12;
    const colors = opts.colors || ['188,68,48'];
    const spread = opts.spread || 26;
    const speed = opts.speed || 50;
    const life = opts.life || 0.6;
    for (let i = 0; i < count; i++) {
        const angle = Math.PI * 0.5 + (Math.random() - 0.5) * 1.4;   // a downward cone
        const v = speed * (0.4 + Math.random() * 0.9);
        this.particles.push({
            kind: 'dot',
            x: x + (Math.random() - 0.5) * spread,
            y,
            vx: Math.cos(angle) * v * 0.4,
            vy: Math.sin(angle) * v,
            gravity: 200,
            r: 1.6 + Math.random() * 2,
            color: ParticleField.pick(colors),
            life: life * (0.7 + Math.random() * 0.5),
            age: 0,
        });
    }
};

// Four-point glints scattered around a point. They spin and fade where they are; they do not
// travel.
ParticleField.prototype.spawnSparkle = function (x, y, opts) {
    opts = opts || {};
    const count = opts.count || 10;
    const spread = opts.spread || 40;
    const size = opts.size || 9;
    const color = opts.color || '236,229,211';
    const life = opts.life || 0.6;
    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * spread;
        this.particles.push({
            kind: 'sparkle',
            x: x + Math.cos(angle) * dist,
            y: y + Math.sin(angle) * dist,
            rot: Math.random() * Math.PI,
            spin: (Math.random() - 0.5) * 5,
            size: size * (0.6 + Math.random() * 0.8),
            color,
            life: life * (0.75 + Math.random() * 0.5),
            age: 0,
        });
    }
};

// One expanding outline. shape 'circle', or 'stamp' for a rounded square like a hanko seal.
ParticleField.prototype.spawnRing = function (x, y, opts) {
    opts = opts || {};
    this.rings.push({
        x, y,
        shape: opts.shape || 'circle',
        r0: opts.r0 != null ? opts.r0 : 6,
        r1: opts.r1 != null ? opts.r1 : 70,
        width: opts.width || 3,
        color: opts.color || '127,191,158',
        life: opts.life || 0.5,
        age: 0,
    });
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
            continue;
        }
        p.age += dt;
        if (p.age >= p.life) continue;
        if (p.kind === 'dot') {
            p.vy += p.gravity * dt;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
        }
        next.push(p);
    }
    this.particles = next;
    this.rings = this.rings.filter(r => { r.age += dt; return r.age < r.life; });
};

ParticleField.prototype.draw = function () {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        if (p.kind === 'sparkle') { this.drawSparkle(p); continue; }
        let alpha, r;
        if (p.kind === 'ambient') { alpha = p.alpha; r = p.r; }
        else { const t = p.age / p.life; alpha = 1 - t; r = p.r * (1 - t * 0.4); }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${Math.max(alpha, 0)})`;
        ctx.arc(p.x, p.y, Math.max(r, 0), 0, Math.PI * 2);
        ctx.fill();
    }
    for (let i = 0; i < this.rings.length; i++) this.drawRing(this.rings[i]);
};

// A quick pop to full size, then a gentle shrink -- a different silhouette AND a different
// motion from the round dots, which only ever shrink.
ParticleField.prototype.drawSparkle = function (p) {
    const ctx = this.ctx;
    const t = p.age / p.life;
    const scale = Math.sin(Math.min(t * 3, 1) * Math.PI / 2) * (1 - t * 0.25);
    const s = p.size;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot + p.spin * p.age);
    ctx.scale(scale, scale);
    ctx.fillStyle = `rgba(${p.color},${Math.max(1 - t, 0)})`;
    ctx.beginPath();
    ctx.moveTo(0, -s); ctx.lineTo(s * 0.28, -s * 0.28); ctx.lineTo(s, 0); ctx.lineTo(s * 0.28, s * 0.28);
    ctx.lineTo(0, s); ctx.lineTo(-s * 0.28, s * 0.28); ctx.lineTo(-s, 0); ctx.lineTo(-s * 0.28, -s * 0.28);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
};

ParticleField.prototype.drawRing = function (r) {
    const ctx = this.ctx;
    const t = r.age / r.life;
    const rad = r.r0 + (r.r1 - r.r0) * t;
    const alpha = Math.max(1 - t, 0);
    ctx.save();
    ctx.strokeStyle = `rgba(${r.color},${alpha})`;
    ctx.lineWidth = r.width;
    ctx.shadowColor = `rgba(${r.color},${Math.min(alpha + 0.3, 1)})`;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    if (r.shape === 'stamp') {
        const k = rad * 0.78;
        ctx.moveTo(r.x - k, r.y - rad);
        ctx.quadraticCurveTo(r.x + rad, r.y - rad, r.x + rad, r.y - k);
        ctx.quadraticCurveTo(r.x + rad, r.y + rad, r.x + k, r.y + rad);
        ctx.quadraticCurveTo(r.x - rad, r.y + rad, r.x - rad, r.y + k);
        ctx.quadraticCurveTo(r.x - rad, r.y - rad, r.x - k, r.y - rad);
        ctx.closePath();
    } else {
        ctx.arc(r.x, r.y, Math.max(rad, 0), 0, Math.PI * 2);
    }
    ctx.stroke();
    ctx.restore();
};
