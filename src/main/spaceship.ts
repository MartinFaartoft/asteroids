import Entity from "./entity";
import Explosion from "./explosion";
import EntityWithSprites from "./entitywithsprites";
import Collidable from "./collidable";
import GameState from "./gamestate";
import Sprite from "./sprite";
import Bullet from "./bullet";
import Meteor from "./meteor";

export default class Spaceship extends EntityWithSprites implements Collidable {
    static SHOT_DELAY: number = .1; // seconds
    static RADIUS: number = 29;
    
    private spaceShipSprite: Sprite;
    private burnSprite: Sprite;

    heading: number = Math.PI / 2.0; // facing north by default
    rotation_speed: number = 150 * Math.PI / 180.0;
    acceleration: number = 300;
    timeSinceLastFiring: number = Spaceship.SHOT_DELAY; // seconds
    burning: boolean = false;

    constructor(pos: number[]) {
        super(pos, [0, 0], Spaceship.RADIUS);

        this.spaceShipSprite = new Sprite([0, 0], [59, 59], [0, 1, 2], 5, "assets/spaceship.png");
        this.burnSprite = new Sprite([0, 0], [59, 59], [0, 1, 2, 1], 8, "assets/burn.png");
        this.sprites.push(this.spaceShipSprite, this.burnSprite);
    }

    update(dt: number, state: GameState) {
        super.update(dt, state);
        this.timeSinceLastFiring += dt;
    }

    burn(dt: number): void {
        let d_x = Math.cos(this.heading);
        let d_y = Math.sin(this.heading);

        this.speed[0] -= d_x * this.acceleration * dt;
        this.speed[1] -= d_y * this.acceleration * dt;

        this.burning = true;
    }

    stopBurn() {
        this.burning = false;
    }

    private gunPosition(): number[] {
        return [this.pos[0] - Math.cos(this.heading) * this.radius,
                this.pos[1] - Math.sin(this.heading) * this.radius];
    }

    private canFire(): boolean {
        return this.timeSinceLastFiring >= Spaceship.SHOT_DELAY;
    }

    fire(state: GameState): void {
        if (this.canFire()) {
            let gunPos = this.gunPosition();
            let speed_x = this.speed[0] - Math.cos(this.heading) * 8 * 60;
            let speed_y = this.speed[1] - Math.sin(this.heading) * 8 * 60;
            this.timeSinceLastFiring = 0;

            state.bullets.push(new Bullet([gunPos[0], gunPos[1]], [speed_x, speed_y]));
        }
    }

    rotateClockWise(dt): void {
        this.heading += this.rotation_speed * dt;
        this.heading = this.heading % (Math.PI * 2);
    }

    rotateCounterClockWise(dt): void {
        this.heading -= this.rotation_speed * dt;
        this.heading = this.heading % (Math.PI * 2);
    }

    collideWith(other: Entity, state: GameState) {
        if (!state.isGameOver && other instanceof Meteor) {
            this.destroyed = true;
            state.isGameOver = true;
            state.explosions.push(new Explosion([this.pos[0], this.pos[1]]));
        }
    }

    render(ctx: CanvasRenderingContext2D, state: GameState) {
        if (!this.destroyed) {
            for (let bc of this.getWrappedBoundingCircles(state.dimensions)) {
                this.renderInternal(ctx, bc.pos[0], bc.pos[1], this.heading, state);
            }
        }
    }

    private renderInternal(ctx: CanvasRenderingContext2D, x: number, y: number, heading: number, state: GameState) {
        if (this.burning) {
            this.burnSprite.render(ctx, state.resourceManager, [x, y], this.burnSprite.spriteSize, this.heading);
        }
        this.spaceShipSprite.render(ctx, state.resourceManager, [x, y], this.spaceShipSprite.spriteSize, this.heading);
    }
}