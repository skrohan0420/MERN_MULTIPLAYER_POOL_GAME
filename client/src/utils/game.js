export const drawBall = (ctx, { x, y, radius, color }) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
};

export const drawTable = (ctx, width, height) => {
    ctx.fillStyle = "#35654d"; // green table
    ctx.fillRect(0, 0, width, height);
};
export function drawCue(ctx, cueBall, pointer) {
    if (!pointer) return;

    const dx = pointer.x - cueBall.x;
    const dy = pointer.y - cueBall.y;
    const angle = Math.atan2(dy, dx);

    const cueLength = 100;
    const offset = 10;

    // ⬅️ Draw cue in same direction as pointer (not opposite)
    const cueX = cueBall.x + Math.cos(angle) * offset;
    const cueY = cueBall.y + Math.sin(angle) * offset;
    const endX = cueBall.x + Math.cos(angle) * (offset + cueLength);
    const endY = cueBall.y + Math.sin(angle) * (offset + cueLength);

    ctx.beginPath();
    ctx.moveTo(cueX, cueY);
    ctx.lineTo(endX, endY);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#b8860b"; // cue color
    ctx.stroke();
}

