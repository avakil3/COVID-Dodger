import Character from './character.js';

var floorTypes = {
    solid: 0,
    path: 1,
    water: 2,
};

var speeds = [
    {name: "level1", multiplier:1},
    {name: "level2", multiplier:1.1},
    {name: "level3", multiplier:1.2},
    {name: "level4", multiplier:1.3},
    {name: "paused", multiplier:0},
];
var currentSpeed = 1;
var gameTime = 0;
var score = 0;
setInterval(()=>{++score},1000);
var grid = [
    0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0,
    0, 2, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0,
    0, 2, 3, 1, 4, 4, 1, 1, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 0,
    0, 2, 3, 1, 1, 4, 4, 1, 2, 3, 3, 2, 1, 1, 2, 1, 0, 0, 0, 0,
    0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 1, 1, 1, 2, 2, 2, 2, 1, 0,
    0, 1, 1, 1, 1, 2, 3, 2, 1, 1, 4, 1, 1, 1, 1, 3, 3, 2, 1, 0,
    0, 1, 2, 2, 2, 2, 1, 2, 1, 1, 4, 1, 1, 1, 1, 1, 3, 2, 1, 0,
    0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4,
    0, 1, 2, 3, 3, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0,
    0, 1, 2, 3, 4, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0,
    0, 3, 2, 3, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 1, 0,
    0, 3, 2, 3, 4, 4, 3, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
    0, 3, 2, 3, 4, 1, 3, 2, 1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
    0, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 3, 0,
    0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 4, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

var tileTypes = {
    0 : { color:"#685b48", floor:floorTypes.solid, loc:[{x:0,y:0,w:40,h:40}]	},
    1 : { color:"#5aa457", floor:floorTypes.path,	loc:[{x:40,y:0,w:40,h:40}]	},
    2 : { color:"#e8bd7a", floor:floorTypes.path,	loc:[{x:80,y:0,w:40,h:40}]	},
    3 : { color:"#286625", floor:floorTypes.solid,	loc:[{x:120,y:0,w:40,h:40}]},
    4 : { color:"#678fd9", floor:floorTypes.water,	loc:[{x:160,y:0,w:40,h:40}]	}
};
export {floorTypes,grid,tileTypes };


export default class Game {
    constructor(ctx){
        this.ctx = ctx;
        this.tileW = 40;
        this.tileH = 40;
        this.lastFrameTime = 0;

        this.mapW = 20;
        this.mapH = 20;
        this.keysDown = {
            37 : false, //left arrow
            38 : false, //up arrow
            39 : false,//right arrow
            40 : false //down arrow
        };
        
        this.player = new Character(this.tileW,this.tileH, this.mapW, this.mapH);
    }

    drawGame(){
        if(this.ctx === null) return;

        let currentFrameTime = Date.now();
        let timeElapsed = currentFrameTime - this.lastFrameTime;
        gameTime += Math.floor(timeElapsed * speeds[currentSpeed].multiplier);

        if(!this.player.processMovement(gameTime) && speeds[currentSpeed].name != "paused"){ // if the player is currently NOT moving

            if(this.keysDown[38] && //check to see if up arrow is pressed and that tile above is a valid tile to move to
                this.player.canMoveUp()){
                    this.player.moveUp(gameTime);

            }else if (this.keysDown[40] &&
                    this.player.canMoveDown()){
                    this.player.moveDown(gameTime);    
            }else if(this.keysDown[37] && 
                this.player.canMoveLeft()){
                    this.player.moveLeft(gameTime);   

            }else if (this.keysDown[39] &&
                    this.player.canMoveRight()){
                    this.player.moveRight(gameTime);    
            }
            
            if( JSON.stringify(this.player.currentPos) !== JSON.stringify(this.player.destination)){
                    // debugger
                    this.player.timeMoved = currentFrameTime;
            }

        }

        let tileImage = document.querySelector("#tileset");

        for(let y = 0; y < this.mapH; ++y){ // nested loops to fill in the grid based on the grid array
		    for(let x = 0; x < this.mapW; ++x){
                let tile = tileTypes[grid[this.toGridIndex(x,y)]];
                // debugger
                let dX = (x * this.tileW);
                let dY = (y * this.tileH);
                this.ctx.drawImage(tileImage, tile.loc[0].x, tile.loc[0].y,tile.loc[0].w,tile.loc[0].h,dX,dY,this.tileW, this.tileH);

             }
        }

       let mainCharacter = document.querySelector("#player");
        this.ctx.drawImage(mainCharacter,this.player.position[0],this.player.position[1],this.player.dimensions[0],this.player.dimensions[1]);    
    
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(`Score: ${score}`,10,20);
        this.ctx.fillText(`Game speed: ${speeds[currentSpeed].name}`,10,40);
        // debugger
    
        this.lastFrameTime =  currentFrameTime;
	    requestAnimationFrame(this.drawGame.bind(this));
    }
    
    toGridIndex(x, y){
        return((y * this.mapW) + x);
    }
}



