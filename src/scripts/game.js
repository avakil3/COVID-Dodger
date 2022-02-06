import Character from './character.js';

export default class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.tileW = 40;
        this.tileH = 40;
        this.currentSecond = 0;
        this.frameCount = 0;
        this.framesLastSecond = 0;
        this.gameMap = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
            0, 1, 0, 0, 0, 1, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 0, 1, 0, 0, 0, 1, 1, 0,
            0, 1, 0, 1, 0, 1, 0, 0, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
            0, 1, 1, 1, 0, 1, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        this.mapW = 10;
        this.mapH = 10;
        this.keysDown = {
            37 : false,
            38 : false,
            39 : false,
            40 : false
        };
        
        this.player = new Character(this.tileW,this.tileH);
    }

    drawGame(){
        if(this.ctx === null) return;

        let currentFrameTime = Date.now();
        let timeElapsed = currentFrameTime - lastFrameTime;
        let sec = Math.floor(Date.now()/1000);
        if (sec!== this.currentSecond){
            this.currentSecond = sec;
            this.framesLastSecond = this.frameCount;
            this.frameCount = 1;
        } else{
            this.frameCount++;
        }

        if(!this.player.processMovement(currentFrameTime)){ // if the player is currently NOT moving
            // check to see if any keys are pressed down
            if(this.keysDown[38] && this.player.tileFrom[1]>0 && this.gameMap[toIndex(this.player.tileFrom[0],this.player.tileFrom[1]-1)]===1){

            }
        }

        for(let y = 0; y < this.mapH; ++y){ // nested loops to fill in the gameMap based on the gameMap array
		    for(let x = 0; x < this.mapW; ++x){
                switch(this.gameMap[((y*this.mapW)+x)]){
                    case 0:
                        this.ctx.fillStyle = "#000000";
                        break;
                    default:
                        this.ctx.fillStyle = "#ccffcc";
			    }
			this.ctx.fillRect( x*this.tileW, y*this.tileH, this.tileW, this.tileH);
             }
        }
        this.ctx.fillStyle = "#ff0000";
	    this.ctx.fillText("FPS: " + this.framesLastSecond, 10, 20);

	    requestAnimationFrame(this.drawGame.bind(this));
    }


    toIndex(x, y){
	    return((y * this.mapW) + x);
    }
}

