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

    update(width, height) {
        this.x += this.vx;
        this.y += this.vy;
        this.checkWallCollision(width, height);
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

    checkWallCollision(width, height) {
        // Left or right walls
        if (this.x - this.radius <= 0) {
            this.x = this.radius;
            this.vx = -this.vx;
        } else if (this.x + this.radius >= width) {
            this.x = width - this.radius;
            this.vx = -this.vx;
        }

        // Top or bottom walls
        if (this.y - this.radius <= 0) {
            this.y = this.radius;
            this.vy = -this.vy;
        } else if (this.y + this.radius >= height) {
            this.y = height - this.radius;
            this.vy = -this.vy;
        }
    }
}
