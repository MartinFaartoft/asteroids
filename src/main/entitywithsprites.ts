"use strict";

import Entity from "./entity";
import Sprite from "./sprite";

abstract class EntityWithSprites extends Entity {
    public sprites: Sprite[] = [];
    constructor(pos: number[], speed: number[], radius: number) {
        super(pos, speed, radius);
    }

    update(dt, state) {
        super.update(dt, state);
        for (let sprite of this.sprites) {
            sprite.update(dt);
        }
    }
}

export default EntityWithSprites;