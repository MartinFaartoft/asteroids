import Entity from "./entity";
import Bullet from "./bullet";
import Collidable from "./collidable";
import GameState from "./gamestate";
import EntityWithSprites from "./entitywithsprites";
import Sprite from "./sprite";

export default class Meteor extends EntityWithSprites implements Collidable {
    public static SCALING_FACTOR: number = 30;
    public static SPLIT_FACTOR: number = 3;
    public static POST_EXPLOSION_MAX_SPEED: number = 200;

    private rotation: number = Math.random() * Math.PI * 2;
    private rotationSpeed: number = Math.random() * 1.5;

    constructor(pos: number[], speed: number[], public size: number) {
        super(pos, speed, size * Meteor.SCALING_FACTOR);

        this.sprites.push(new Sprite([0, 0], [90, 90], [0, 1, 2], 3, "assets/meteor.png"));
    }

    update(dt: number, state: GameState) {
        super.update(dt, state);
        this.rotation += this.rotationSpeed * dt;
        this.rotation = this.rotation % (Math.PI * 2);
    }

    private explode(): Meteor[] {
        if (this.size === 1) {
            return [];
        }

        let meteors: Meteor[] = [];

        for (let i = 0; i < Meteor.SPLIT_FACTOR; i++) {
            let initialSpeed = Math.random() * Meteor.POST_EXPLOSION_MAX_SPEED;
            let direction = Math.random() * Math.PI * 2;

            let pos: number[] = [this.pos[0], this.pos[1]];
            let speed: number[] = [initialSpeed * Math.cos(direction), initialSpeed * Math.sin(direction)];

            meteors.push(new Meteor(pos, speed, this.size - 1));
        }

        return meteors;
    }

    collideWith(other: Entity, state: GameState) {
        if (other instanceof Bullet) {
            this.destroyed = true;

            for (let meteor of this.explode()) {
                state.meteors.push(meteor);
            }
        }
    }

    render(ctx: CanvasRenderingContext2D, state: GameState) {
        for (let bc of this.getWrappedBoundingCircles(state.dimensions)) {
            this.renderInternal(ctx, bc.pos[0], bc.pos[1], bc.radius, state);
        }
    }

    private renderInternal(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, state: GameState) {
        this.sprites[0].render(ctx, state.resourceManager, [x, y], [radius * 2, radius * 2], this.rotation);
    }
}