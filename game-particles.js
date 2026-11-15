// Particle system for Word Match — one canvas per layer (ambient drift, and the burst that
// marks a cleared level), scoped to the .game-main container's own box rather than the viewport, so the
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
};

ParticleField.prototype.draw = function () {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.w, this.h);
    for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        let alpha, r;
        if (p.kind === 'ambient') { alpha = p.alpha; r = p.r; }
        else { const t = p.age / p.life; alpha = 1 - t; r = p.r * (1 - t * 0.4); }
        ctx.beginPath();
        ctx.fillStyle = `rgba(${p.color},${Math.max(alpha, 0)})`;
        ctx.arc(p.x, p.y, Math.max(r, 0), 0, Math.PI * 2);
        ctx.fill();
    }
};
