"use strict";

import GameState from "./gamestate";

abstract class Entity {
    destroyed: boolean = false;

    constructor(public pos: number[], public speed: number[], public radius: number) {

    }

    update(dt: number, state: GameState): void {
        this.pos[0] += this.speed[0] * dt;
        this.pos[1] += this.speed[1] * dt;

        this.wrap(state.dimensions);
    }

    private wrap(dimensions: number[]) {
        // exit right edge
        if (this.pos[0] > dimensions[0]) {
            this.pos[0] -= dimensions[0];
        }

        // exit left edge
        if (this.pos[0] < 0) {
            this.pos[0] += dimensions[0];
        }

        // exit top
        if (this.pos[1] < 0) {
            this.pos[1] += dimensions[1];
        }

        // exit bottom
        if (this.pos[1] > dimensions[1]) {
            this.pos[1] -= dimensions[1];
        }
    }

    getWrappedBoundingCircles(dimensions: number[]) {
        let boundingCircles: any[] = [this];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                boundingCircles.push({
                    pos: [this.pos[0] + i * dimensions[0], this.pos[1] + j * dimensions[1]],
                    radius: this.radius,
                    entity: this
                });
            }
        }
        return boundingCircles;
    }

    abstract render(ctx: CanvasRenderingContext2D, state: GameState);
}

export default Entity;

export class Background extends Entity {

    constructor() {
        super([0, 0], [0, 0], 0);
    }

    render(ctx: CanvasRenderingContext2D, state: GameState) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, state.dimensions[0], state.dimensions[1]);
    }
}

export class GameOverScreen extends Entity {

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

export class WinScreen extends Entity {

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

export class DebugDisplay extends Entity {
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
