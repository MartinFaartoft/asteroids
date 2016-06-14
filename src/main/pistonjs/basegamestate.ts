"use strict";

import ResourceManager from "./resourcemanager";


abstract class BaseGameState {
    
    constructor(public dimensions: number[]) {}
    
    abstract update(dt: number);
    abstract render(ctx: CanvasRenderingContext2D);
}

export default BaseGameState;