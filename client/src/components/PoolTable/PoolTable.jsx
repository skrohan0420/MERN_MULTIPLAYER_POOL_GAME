import React, { useRef, useEffect, useState } from "react";
import { drawTable, drawCue } from "../../utils/game";
import { CueBall } from "../Balls/CueBall/CueBall";
import "./PoolTable.css";
import CueTrigger from "../CueTrigger/CueTrigger";

const PoolTable = ({ width = 520, height = 280 }) => {
    const canvasRef = useRef(null);
    const cueBallRef = useRef(null);
    const [pointer, setPointer] = useState(null);
    const animationRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        canvas.width = width;
        canvas.height = height;

        cueBallRef.current = new CueBall(width / 2, height / 2);

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            drawTable(ctx, width, height);
            cueBallRef.current?.draw(ctx);
            drawCue(ctx, cueBallRef.current, pointer);
        };

        const update = () => {
            if (cueBallRef.current) {
               cueBallRef.current.update(width, height);
                cueBallRef.current.applyFriction();
                if (cueBallRef.current.isMoving()) {
                    animationRef.current = requestAnimationFrame(update);
                }
            }
            draw();
        };

        const getPointerPos = (e) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const getTouchPos = (touch) => {
            const rect = canvas.getBoundingClientRect();
            return {
                x: touch.clientX - rect.left,
                y: touch.clientY - rect.top
            };
        };

        const onMouseMove = (e) => {
            setPointer(getPointerPos(e));
        };

        const onTouchMove = (e) => {
            setPointer(getTouchPos(e.touches[0]));
        };

        draw(); // Initial draw

        canvas.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("mousedown", () => draw());
        canvas.addEventListener("touchmove", onTouchMove);
        canvas.addEventListener("touchstart", () => draw());

        return () => {
            cancelAnimationFrame(animationRef.current);
            canvas.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("mousedown", () => draw());
            canvas.removeEventListener("touchmove", onTouchMove);
            canvas.removeEventListener("touchstart", () => draw());
        };
    }, [width, height, pointer]);

    const handleShoot = () => {
        const cueBall = cueBallRef.current;
        if (!cueBall || !pointer) return;

        const dx = pointer.x - cueBall.x;
        const dy = pointer.y - cueBall.y;
        const angle = Math.atan2(dy, dx);
        const power = 8;

        cueBall.vx = Math.cos(angle) * power;
        cueBall.vy = Math.sin(angle) * power;

        animationRef.current = requestAnimationFrame(function animate() {
            cueBall.update();
            cueBall.applyFriction();
            if (cueBall.isMoving()) {
                animationRef.current = requestAnimationFrame(animate);
            }
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, width, height);
            drawTable(ctx, width, height);
            cueBall.draw(ctx);
        });
    };

    return (
        <div className="pool-container">
            <canvas ref={canvasRef} className="pool-canvas" />
            <CueTrigger cueBall={cueBallRef.current} pointer={pointer} onShoot={handleShoot} />
        </div>
    );
};

export default PoolTable;
