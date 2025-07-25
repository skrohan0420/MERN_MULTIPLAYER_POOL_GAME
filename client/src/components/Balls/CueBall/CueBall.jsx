export class CueBall {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.vx = 0;
        this.vy = 0;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
    }

    applyFriction() {
        const friction = 0.98;
        this.vx *= friction;
        this.vy *= friction;
        if (Math.abs(this.vx) < 0.1) this.vx = 0;
        if (Math.abs(this.vy) < 0.1) this.vy = 0;
    }

    isMoving() {
        return this.vx !== 0 || this.vy !== 0;
    }
}
