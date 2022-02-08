import Character from './character.js';
import {CovidSprite} from './covidSprite.js';
import Vaccine from './vaccine.js';

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


var grid = [
    0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 2, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0,
    0, 2, 3, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 2, 0,
    0, 2, 3, 1, 4, 4, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0,
    0, 2, 3, 1, 1, 4, 4, 1, 2, 3, 3, 2, 1, 1, 1, 1, 1, 2, 1, 0, 0, 0, 0,
    0, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 2, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 0,
    0, 1, 1, 1, 1, 2, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 0,
    0, 1, 1, 1, 1, 2, 3, 2, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 3, 3, 2, 1, 0,
    0, 1, 2, 2, 2, 2, 2, 2, 1, 1, 4, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1, 0,
    0, 1, 2, 3, 3, 2, 2, 2, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2, 4, 4,
    0, 1, 2, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 0,
    0, 1, 2, 3, 4, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 2, 1, 0,
    0, 3, 2, 3, 4, 4, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 1, 0,
    0, 3, 2, 3, 4, 4, 3, 2, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 3, 0,
    0, 3, 2, 3, 4, 1, 3, 2, 1, 3, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 3, 0,
    0, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0,
    0, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];

var tileTypes = {
    0 : { floor:floorTypes.solid, loc:[{x:0,y:0,w:40,h:40}]	},
    1 : { floor:floorTypes.path,	loc:[{x:40,y:0,w:40,h:40}]	},
    2 : { floor:floorTypes.path,	loc:[{x:80,y:0,w:40,h:40}]	},
    3 : { floor:floorTypes.solid,	loc:[{x:120,y:0,w:40,h:40}]},
    4 : { floor:floorTypes.water,	loc:[{x:160,y:0,w:40,h:40}]	}
};

var mapW = 23;
var mapH = 20;
var tileW = 40;
var tileH = 40;


export {floorTypes,grid,tileTypes,mapW,mapH,tileW,tileH};


export default class Game {
    constructor(ctx,canvasEl){
        this.ctx = ctx;
        this.canvasEl = canvasEl;
        this.lastFrameTime = 0;
        this.keysDown = {
            'ArrowLeft' : false, 
            'ArrowUp' : false, 
            'ArrowRight' : false,
            'ArrowDown' : false 
        };
        this.score = 0;
        setInterval(()=>{if(!this.paused) ++this.score;},1000);

        this.currentSpeed = 0;
        this.prevSpeed = 0;
        this.sprites = [];
        this.spriteElements = [];
        this.vaccineElements = [];

        this.frameCounter = 0;
        this.gameTime = 0;
        this.paused = false;
        this.spriteSpeed = 25;

        this.player = new Character([1,1],[45,45]);
        this.sprite1 = new CovidSprite([5,5],[5*tileW,5*tileH]);
        this.sprite2 = new CovidSprite([17,11],[17*tileW,11*tileH]);
        this.vaccine = new Vaccine([20,2]); //20,2
        this.vaccine.addVaccine(this.vaccineElements);
        
        this.sprites.push(this.sprite1);
        this.addSprites(this.sprite1);
        this.sprites.push(this.sprite2);
        this.addSprites(this.sprite2);
    }

    drawGame(){
        if(this.ctx === null) return;

        if (this.score > 10 && this.score < 40 && speeds[this.currentSpeed].name !== "paused"){
            this.currentSpeed= 1;
        }else if (this.score > 40 && this.score < 60 && speeds[this.currentSpeed].name !== "paused"){
            this.currentSpeed= 2;
        }else if (this.score > 60 && speeds[this.currentSpeed].name !== "paused"){
            this.currentSpeed= 3;
        }
        
        let currentFrameTime = Date.now();
        let timeElapsed = currentFrameTime - this.lastFrameTime;
        this.gameTime += Math.floor(timeElapsed * speeds[this.currentSpeed].multiplier);


        if(!this.player.move(this.gameTime) && speeds[this.currentSpeed].name !== "paused"){ // if the player is currently NOT moving

            if(this.keysDown['ArrowUp'] && //check to see if up arrow is pressed and that tile above is a valid tile to move to
                this.player.canMoveUp()){
                    this.player.moveUp(this.gameTime);

            }else if (this.keysDown['ArrowDown'] &&
                    this.player.canMoveDown()){
                    this.player.moveDown(this.gameTime);    
            }else if(this.keysDown['ArrowLeft'] && 
                this.player.canMoveLeft()){
                    this.player.moveLeft(this.gameTime);   

            }else if (this.keysDown['ArrowRight'] &&
                    this.player.canMoveRight()){
                    this.player.moveRight(this.gameTime);    
            }
            
            if( JSON.stringify(this.player.currentPos) !== JSON.stringify(this.player.destination)){
                    this.player.timeMoved = this.gameTime;
            }

        }


        let tileImage = document.querySelector("#tileset");

        for(let y = 0; y < mapH; ++y){ // nested loops to fill in the grid based on the grid array
		    for(let x = 0; x < mapW; ++x){
                let tile = tileTypes[grid[this.toGridIndex(x,y)]];
                this.ctx.drawImage(tileImage, tile.loc[0].x, tile.loc[0].y,tile.loc[0].w,tile.loc[0].h,(x * tileW),(y * tileH),tileW, tileH);
             }
        }

       let mainCharacter = document.querySelector("#player");
        this.ctx.drawImage(mainCharacter,this.player.position[0],this.player.position[1],this.player.dimensions[0],this.player.dimensions[1]);    
    
        for(let i=0;i<this.sprites.length;i++){
            this.ctx.drawImage(this.spriteElements[i],this.sprites[i].position[0],this.sprites[i].position[1],this.sprites[i].dimensions[0],this.sprites[i].dimensions[1]);    
        }
        if(this.score > 5){
            for(let i=0;i<this.vaccineElements.length;i++){
                this.ctx.drawImage(this.vaccineElements[i],this.vaccine.position[0],this.vaccine.position[1],this.vaccine.dimensions[0],this.vaccine.dimensions[1]);    
            }
        }

        if(this.player.covidImmunity){
            this.ctx.fillStyle = "#ffffff";
            this.ctx.font = "bold 20pt calibri";

            this.ctx.fillText(`You are immune for 10 seconds!`,this.canvasEl.width-600,80);
    
        }
        
        // if the player captures the vaccine, then remove that vaccine from the vaccines list
        if(JSON.stringify(this.vaccine.currentPos) === JSON.stringify(this.player.currentPos) && this.vaccineElements.length !== 0){
            this.player.covidImmunity = true;
            this.vaccineElements.pop();
            this.player.hasVaccineBeenUsed = true;
        }
        if(this.player.hasVaccineBeenUsed) {
            setTimeout(()=>{  
                   this.player.hasVaccineBeenUsed = false;
                   this.player.covidImmunity = false; 
            },10000);
        }

        //logic for Sprites Movement
        if(speeds[this.currentSpeed].name !== "paused"){
            let move = false;
            this.frameCounter +=1;
            this.frameCounter = this.frameCounter % this.spriteSpeed;
            if (this.frameCounter === this.spriteSpeed-1) {move = true};
            
            if (this.score === 10 && this.frameCounter===0){
                let newSprite = new CovidSprite([5,12],[5*tileW,12*tileH]);
                this.sprites.push(newSprite);
                this.addSprites(newSprite); 
                this.spriteSpeed = 20;
            } else if (this.score === 20 && this.frameCounter===0){
                // debugger
                let newSprite = new CovidSprite([17,17],[17*tileW,17*tileH]);
                this.sprites.push(newSprite);
                this.addSprites(newSprite); 
            }else if (this.score === 5 && this.frameCounter===0){
                // debugger
                let newSprite = new CovidSprite([15,4],[15*tileW,4*tileH]);
                this.sprites.push(newSprite);
                this.addSprites(newSprite); 
            }  
            

            if (move) {
                this.sprites.forEach(sprite => sprite.moveHelper(this.gameTime));
            }
        }

        if(this.collided() && !this.player.covidImmunity){ // If collision occurs, the game ends
             this.ctx.fillStyle = '#000';

            this.ctx.drawImage(document.querySelector("#game-over"),100,150,this.canvasEl.width-200,400);    
            this.ctx.font = "bold 30pt calibri";
            this.ctx.fillText(`Final Score: ${this.score}`,this.canvasEl.width/3+20,600);
            return; 
        }

        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = "bold 20pt comic-sans";
        this.ctx.fillText(`Score: ${this.score}`,10,25);
        // this.ctx.fillText(`Game speed: ${speeds[this.currentSpeed].name}`,10,40);
        
        this.lastFrameTime = currentFrameTime;
    
          
	    requestAnimationFrame(this.drawGame.bind(this));
    }
    
    toGridIndex(x, y){
        return((y * mapW) + x);
    }

     togglePause(){
        //  debugger
        if (!this.paused){
            this.paused = true;
            this.prevSpeed = this.currentSpeed;
            this.currentSpeed = 4; // 4 represents "this.paused" game state
        } else if (this.paused){
           this.paused= false;
           this.currentSpeed = this.prevSpeed;
        }
    }

    addSprites(...spriteArr){
        let bodyEl = document.getElementsByTagName("body")[0];
        spriteArr.forEach(el => {
            let covidSpriteEl = document.createElement("img");
            covidSpriteEl.src = "./images/covidSprite.png";
            this.spriteElements.push(covidSpriteEl);
            bodyEl.append(covidSpriteEl);
        });
    }


    collided(){
        let collided = false;
        this.sprites.forEach(sprite => {
            let infectedArea = this.infectedArea(sprite);
            if (find(infectedArea,this.player.currentPos)|| find(infectedArea,this.player.destination)){
                collided = true;
            }
        });
        return collided;
    }

    infectedArea(sprite){
        let validMoves = [[sprite.currentPos[0],sprite.currentPos[1]],
                        [sprite.currentPos[0],sprite.currentPos[1]-1],
                        [sprite.currentPos[0],sprite.currentPos[1]+1],
                        [sprite.currentPos[0]-1,sprite.currentPos[1]],
                        [sprite.currentPos[0]+1,sprite.currentPos[1]],
                        [sprite.currentPos[0]+1,sprite.currentPos[1]+1],
                        [sprite.currentPos[0]-1,sprite.currentPos[1]+1],
                        [sprite.currentPos[0]-1,sprite.currentPos[1]-1],
                        [sprite.currentPos[0]+1,sprite.currentPos[1]-1]
                     ];
        return validMoves;
    }




}

function find(array, criteria) {
    for (let i = 0; i < array.length; i++) {
      return JSON.stringify(array[i])===JSON.stringify(criteria) ?  true : false;
  }
}