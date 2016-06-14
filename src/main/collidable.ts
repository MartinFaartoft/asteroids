"use strict";

import Entity from "./entity";
import GameState from "./gamestate";

interface Collidable {
    collideWith(other: Entity, state: GameState);
}

export default Collidable;