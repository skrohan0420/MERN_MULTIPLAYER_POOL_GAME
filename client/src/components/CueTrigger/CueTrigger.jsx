import React, { useState } from "react";
import "./CueTrigger.css";

const CueTrigger = ({ cueBall, pointer, onShoot }) => {
    const [power, setPower] = useState(50);
    const [pulling, setPulling] = useState(false);

    const handlePullStart = () => {
        setPulling(true);
    };

    const handleRelease = () => {
        setPulling(false);
        if (onShoot && cueBall && pointer) {
            const dx = pointer.x - cueBall.x;
            const dy = pointer.y - cueBall.y;
            const angle = Math.atan2(dy, dx);
            const force = power / 10;

            const velocity = {
                x: Math.cos(angle) * force,
                y: Math.sin(angle) * force,
            };

            onShoot(velocity);
        }
    };

    return (
        <div className="cue-trigger-container">
            <div
                className={`cue-stick ${pulling ? "pulling" : ""}`}
                onMouseDown={handlePullStart}
                onMouseUp={handleRelease}
                // onTouchStart={handlePullStart}
                // onTouchEnd={handleRelease}
            >
                <div className="cue-stick-label">Tap & Pull</div>
            </div>

            <input
                type="range"
                min="10"
                max="100"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                className="power-slider"
            />
        </div>
    );
};

export default CueTrigger;
