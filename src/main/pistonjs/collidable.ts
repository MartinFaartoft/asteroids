"use strict";

import Entity from "./entity";
import BaseGameState from "./basegamestate";

interface Collidable {
    collideWith(other: Entity, state: BaseGameState);
}

export default Collidable;