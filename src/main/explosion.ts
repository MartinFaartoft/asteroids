import Entity from "./entity";
import GameState from "./gamestate";
import Sprite from "./sprite";

export default class Explosion extends Entity {
    static LIFESPAN: number = .5;
    sprite: Sprite;
    age: number = 0;
    
    constructor(pos: number[]) {
        super(pos, [0, 0], 60);

        this.sprite = new Sprite([0, 0], [120, 120], [0, 2, 1, 0, 1, 2, 0], 8, "assets/explosion.png");
    }

    update(dt: number, state: GameState) {
        super.update(dt, state);
        this.sprite.update(dt);
        this.age += dt;
        if (this.age > Explosion.LIFESPAN) {
            this.destroyed = true;
        }
    }

    render(ctx: CanvasRenderingContext2D, state: GameState) {
        for (let bc of this.getWrappedBoundingCircles(state.dimensions)) {
            this.renderInternal(ctx, bc.pos[0], bc.pos[1], state);
        }
    }

    private renderInternal(ctx: CanvasRenderingContext2D, x: number, y: number, state: GameState) {
        this.sprite.render(ctx, state.resourceManager, [x, y], this.sprite.spriteSize, 0);
    }

}