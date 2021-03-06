"use strict";

import GameState from "./gamestate";

export default class Background extends ps.Entity {

    constructor() {
        super([0, 0], [0, 0], 0);
    }

    render(ctx: CanvasRenderingContext2D, state: GameState) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, state.dimensions[0], state.dimensions[1]);
    }
}