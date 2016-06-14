import Entity from "./entity";
import Explosion from "./explosion";
import Collidable from "./collidable";
import GameState from "./gamestate";
import Meteor from "./meteor";

export default class Bullet extends Entity implements Collidable {
    public static RADIUS: number = 5; // pixels
    public static LIFESPAN: number = 1; // seconds
    private age: number = 0; // seconds

    constructor(pos: number[], speed: number[]) {
        super(pos, speed, Bullet.RADIUS);
    }

    update(dt: number, state: GameState) {
        super.update(dt, state);
        this.age += dt;
        if (this.age > Bullet.LIFESPAN) {
            this.destroyed = true;
        }
    }

    collideWith(other: Entity, state: GameState) {
        if (other instanceof Meteor) {
            this.destroyed = true;
            state.explosions.push(new Explosion([this.pos[0], this.pos[1]]))
        }
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
}