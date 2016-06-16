"use strict";

import GameState from "./gamestate";

export default class WinScreen extends ps.Entity {

    constructor() {
        super([0, 0], [0, 0], 0);
    }

    render(ctx: CanvasRenderingContext2D, state: GameState) {
        if (state.isWinner) {
            ctx.fillStyle = "green";
            ctx.font = "80px comic sans";
            let textWidth = ctx.measureText("WINNER").width;
            ctx.fillText("WINNER", (state.dimensions[0] - textWidth) / 2, state.dimensions[1] / 2);
        }
    }
}