import Character from './character.js';

export default class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.tileW = 40;
        this.tileH = 40;
        this.currentSecond = 0;
        this.frameCount = 0;
        this.framesLastSecond = 0;
        this.lastFrameTime = 0;
        this.gameMap = [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
            0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0,
            0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0,
            0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0,
            0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0,
            0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0,
            0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
            0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0,
            0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
        ];
        this.mapW = 20;
        this.mapH = 20;
        this.keysDown = {
            37 : false, //left arrow
            38 : false, //up arrow
            39 : false,//right arrow
            40 : false //down arrow
        };
        
        this.player = new Character(this.tileW,this.tileH);
    }

    drawGame(){
        if(this.ctx === null) return;

        let currentFrameTime = Date.now();
        let timeElapsed = currentFrameTime - this.lastFrameTime;
        let sec = Math.floor(Date.now()/1000);
        if (sec!== this.currentSecond){
            this.currentSecond = sec;
            this.framesLastSecond = this.frameCount;
            this.frameCount = 1;
        } else{
            this.frameCount++;
        }

        if(!this.player.processMovement(currentFrameTime)){ // if the player is currently NOT moving

            if(this.keysDown[38] && //check to see if up arrow is pressed and that tile above is a valid tile to move to
                this.player.tileFrom[1]>0 && 
                this.gameMap[this.toIndex(this.player.tileFrom[0],this.player.tileFrom[1]-1)]===1){
                    // this.player.tileTo[1]--;
                    this.player.tileTo[1]-=1;    

            }else if (this.keysDown[40] &&
                    this.player.tileFrom[1] < (this.mapH-1) &&
                    this.gameMap[this.toIndex(this.player.tileFrom[0],this.player.tileFrom[1]+1)]===1){
                    // this.player.tileTo[1]++;    
                    this.player.tileTo[1]+=1;    
            }else if(this.keysDown[37] && 
                this.player.tileFrom[0]>0 && 
                this.gameMap[this.toIndex(this.player.tileFrom[0]-1,this.player.tileFrom[1])]===1){
                    // this.player.tileTo[0]--;   
                    this.player.tileTo[0]-=1;   

            }else if (this.keysDown[39] &&
                    this.player.tileFrom[0] < (this.mapW-1) &&
                    this.gameMap[this.toIndex(this.player.tileFrom[0]+1,this.player.tileFrom[1])]===1){
                    // this.player.tileTo[0]++;    
                    this.player.tileTo[0]+=1;    
            }
            
            if(this.player.tileFrom[0] !== this.player.tileFrom[0] ||
                this.player.tileFrom[1] !== this.player.tileFrom[1]){
                    this.player.timeMoved = currentFrameTime;
            }

        }

        for(let y = 0; y < this.mapH; ++y){ // nested loops to fill in the gameMap based on the gameMap array
		    for(let x = 0; x < this.mapW; ++x){
                switch(this.gameMap[((y*this.mapW)+x)]){
                    case 0:
                        this.ctx.fillStyle = "#000000";
                        break;
                    default:
                        this.ctx.fillStyle = "#ffffff";
			    }
			this.ctx.fillRect( x*this.tileW, y*this.tileH, this.tileW, this.tileH);
             }
        }
        this.ctx.fillStyle = "#0000ff";
        this.ctx.fillRect(this.player.position[0],this.player.position[1],this.player.dimensions[0],this.player.dimensions[1]);
        
        
        this.ctx.fillStyle = "#ff0000";
	    this.ctx.fillText("FPS: " + this.framesLastSecond, 10, 20);

        this.lastFrameTime =  currentFrameTime;
	    requestAnimationFrame(this.drawGame.bind(this));
    }
    
    toIndex(x, y){
        return((y * this.mapW) + x);
    }
}



