import Character from './character.js';
import {CovidSprite} from './character.js';

var floorTypes = {
    solid: 0,
    path: 1,
    water: 2,
};

var speeds = [
    {name: "level1", multiplier:1},
    {name: "level2", multiplier:1.2},
    {name: "level3", multiplier:1.5},
    {name: "level4", multiplier:2},
    {name: "paused", multiplier:0},
];
var currentSpeed = 0;
var prevSpeed = 0;
var gameTime = 0;
var score = 0;
var paused = false;
setInterval(()=>{if(!paused) ++score;},1000);
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
    0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 4, 1, 1, 1, 1, 1, 3, 2, 1, 0,
    0, 1, 2, 3, 3, 2, 2, 2, 1, 1, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4,
    0, 1, 2, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0,
    0, 1, 2, 3, 4, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0,
    0, 3, 2, 3, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 1, 0,
    0, 3, 2, 3, 4, 4, 3, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
    0, 3, 2, 3, 4, 1, 3, 2, 1, 3, 1, 1, 1, 2, 1, 1, 1, 2, 3, 0,
    0, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 3, 0,
    0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 4, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

var tileTypes = {
    0 : { floor:floorTypes.solid, loc:[{x:0,y:0,w:40,h:40}]	},
    1 : { floor:floorTypes.path,	loc:[{x:40,y:0,w:40,h:40}]	},
    2 : { floor:floorTypes.path,	loc:[{x:80,y:0,w:40,h:40}]	},
    3 : { floor:floorTypes.solid,	loc:[{x:120,y:0,w:40,h:40}]},
    4 : { floor:floorTypes.water,	loc:[{x:160,y:0,w:40,h:40}]	}
};

var mapW = 20;
var mapH = 20;
var tileW = 40;
var tileH = 40;
export {floorTypes,grid,tileTypes,mapW,mapH,tileW,tileH};


export default class Game {
    constructor(ctx){
        this.ctx = ctx;
       
        this.lastFrameTime = 0;

        
        this.keysDown = {
            'ArrowLeft' : false, //left arrow
            'ArrowUp' : false, //up arrow
            'ArrowRight' : false,//right arrow
            'ArrowDown' : false //down arrow
        };
        
        this.player = new Character([1,1],[45,45]);
        this.sprite = new CovidSprite([5,5],[5*tileW,5*tileH]);
        // debugger
    }

    drawGame(){
        if(this.ctx === null) return;

        if (score > 10 && score < 50){
            currentSpeed= 1;
        }else if (score > 50 && score < 100){
            currentSpeed= 2;
        }else if (score > 100){
            currentSpeed= 3;
        }
        let currentFrameTime = Date.now();
        let timeElapsed = currentFrameTime - this.lastFrameTime;
        gameTime += Math.floor(timeElapsed * speeds[currentSpeed].multiplier);


        if(!this.player.move(gameTime) && speeds[currentSpeed].name !== "paused"){ // if the player is currently NOT moving

            if(this.keysDown['ArrowUp'] && //check to see if up arrow is pressed and that tile above is a valid tile to move to
                this.player.canMoveUp()){
                    this.player.moveUp(gameTime);

            }else if (this.keysDown['ArrowDown'] &&
                    this.player.canMoveDown()){
                    this.player.moveDown(gameTime);    
            }else if(this.keysDown['ArrowLeft'] && 
                this.player.canMoveLeft()){
                    this.player.moveLeft(gameTime);   

            }else if (this.keysDown['ArrowRight'] &&
                    this.player.canMoveRight()){
                    this.player.moveRight(gameTime);    
            }
            
            if( JSON.stringify(this.player.currentPos) !== JSON.stringify(this.player.destination)){
                    this.player.timeMoved = gameTime;
            }

        }

        let tileImage = document.querySelector("#tileset");

        for(let y = 0; y < mapH; ++y){ // nested loops to fill in the grid based on the grid array
		    for(let x = 0; x < mapW; ++x){
                let tile = tileTypes[grid[this.toGridIndex(x,y)]];
                let dX = (x * tileW);
                let dY = (y * tileH);
                this.ctx.drawImage(tileImage, tile.loc[0].x, tile.loc[0].y,tile.loc[0].w,tile.loc[0].h,dX,dY,tileW, tileH);

             }
        }

       let mainCharacter = document.querySelector("#player");
        this.ctx.drawImage(mainCharacter,this.player.position[0],this.player.position[1],this.player.dimensions[0],this.player.dimensions[1]);    
    
        let covidSpriteEl = document.querySelector("#covidSprite");
        this.ctx.drawImage(covidSpriteEl,this.sprite.position[0],this.sprite.position[1],this.sprite.dimensions[0],this.sprite.dimensions[1]);    


        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText(`Score: ${score}`,10,20);
        this.ctx.fillText(`Game speed: ${speeds[currentSpeed].name}`,10,40);
        // debugger
    
        this.lastFrameTime =  currentFrameTime;
        
        // debugger
        if(speeds[currentSpeed].name !== "paused"){
            // debugger
            setInterval(this.sprite.moveHelper.bind(this.sprite,gameTime),1000);
        }
        
        // debugger
	    requestAnimationFrame(this.drawGame.bind(this));
    }
    
    toGridIndex(x, y){
        return((y * mapW) + x);
    }

     togglePause(){
        if (!paused){
            paused = true;
            prevSpeed = currentSpeed;
            currentSpeed = 4; // 4 represents "paused" game state
        } else if (paused){
           paused= false;
           currentSpeed = prevSpeed;
        }
    }

}

