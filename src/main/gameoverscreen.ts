"use strict";

import GameState from "./gamestate";

export default class GameOverScreen extends ps.Entity {

    constructor() {
        super([0, 0], [0, 0], 0);
    }

    render(ctx: CanvasRenderingContext2D, state: GameState) {
        if (state.isGameOver) {
            ctx.fillStyle = "red";
            ctx.font = "80px comic sans";
            let textWidth = ctx.measureText("GAME OVER").width;
            ctx.fillText("GAME OVER", (state.dimensions[0] - textWidth) / 2, state.dimensions[1] / 2);
        }
    }
}
