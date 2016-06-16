"use strict";

import GameState from "./gamestate";

export default class DebugDisplay extends ps.Entity {
    fps: number = 0;
    
    constructor() {
        super([0, 0], [0, 0], 0);
    }

    render(ctx: CanvasRenderingContext2D, state: GameState) {
        if (state.debug) {
            ctx.fillStyle = "white";
            ctx.font = "20px Arial";
            ctx.fillText("player: ", 10, 20);
            ctx.fillText("heading: " + this.roundToTwo(state.spaceship.heading), 20, 40);

            ctx.fillText("pos_x: " + this.roundToTwo(state.spaceship.pos[0]), 20, 60 );
            ctx.fillText("pos_y: " + this.roundToTwo(state.spaceship.pos[1]), 20, 80 );

            ctx.fillText("FPS: " + this.fps, 10, 100);
        }
    }

    roundToTwo(num: number) {
        return Math.round(num * 100) / 100;
    }

    update(dt: number) {
        this.fps = Math.round(1 / dt);
    }
}