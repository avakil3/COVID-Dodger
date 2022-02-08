import {floorTypes,grid,tileTypes,mapW,mapH} from './game.js';
var tileW = 40;
var tileH = 40;

export default class Character{
    constructor(currentPos,position){
        this.currentPos = currentPos.slice();
        this.destination = currentPos.slice();
        this.timeMoved = 0;
        this.dimensions	= [60,30];
        this.position	= position;
        this.delayMove	= 300; //represents time it takes to move one tile
        // debugger
    }

    placeAt(x,y){
        this.currentPos = [x,y];
	    this.destination = [x,y];
	    this.position = [((tileW*x)+((tileW-this.dimensions[0])/2)),
		((tileH*y)+((tileH-this.dimensions[1])/2))];
    }

    move(t){
        // if the character's currentPos position equals its TileTo position, then the character is not currently moving
        if(JSON.stringify(this.currentPos) === JSON.stringify(this.destination)) { 
            return false; 
        }

        if((t-this.timeMoved)>=this.delayMove){
            // debugger
		    this.placeAt(this.destination[0], this.destination[1]);
	    }else{
            // debugger
            //this gives the pixel position at the currentPos
            this.position[0] = (this.currentPos[0] * tileW) + ((tileW-this.dimensions[0])/2);
		    this.position[1] = (this.currentPos[1] * tileH) + ((tileH-this.dimensions[1])/2);
       }
        // if the character is moving horizonatlly, then calculate the difference in position and add / subtract that from the current position
        if(this.destination[0] !== this.currentPos[0]){
			let diff = (tileW / this.delayMove) * (t-this.timeMoved);
            if(this.destination[0]<this.currentPos[0]){
                this.position[0]-= diff;
            }else{
                this.position[0]+= diff;
            }
		}
        // if the character is moving vertically, then calculate the difference in position and add / subtract that from the current position
		if(this.destination[1] != this.currentPos[1]){
			let diff = (tileH / this.delayMove) * (t-this.timeMoved);
            if(this.destination[1]<this.currentPos[1]){
                this.position[1]-= diff;
            }else{
                this.position[1]+= diff;
            }
		}
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
        return true;
    }


    canMoveTo(x,y){
        if(x < 0 || x >= mapW || y < 0 || y >= mapH) {
            return false;
        } 
        else if(tileTypes[grid[this.toGridIndex(x,y)]].floor!=floorTypes.path) {
            return false;
        } else{
            return true;
        } 
    }

    canMoveUp(){
        return this.canMoveTo(this.currentPos[0], this.currentPos[1]-1);
    }
    canMoveDown(){
        return this.canMoveTo(this.currentPos[0], this.currentPos[1]+1);
    }
    canMoveLeft(){
        return this.canMoveTo(this.currentPos[0]-1, this.currentPos[1]);
    }
    canMoveRight(){
        return this.canMoveTo(this.currentPos[0]+1, this.currentPos[1]);
    }

    moveLeft(time){
        this.destination[0]-=1; this.timeMoved = time; 
    }	
    moveRight(time){
        this.destination[0]+=1; this.timeMoved = time; 
    }
    moveUp(time){
        this.destination[1]-=1; this.timeMoved = time; 
    }
    moveDown(time){
        this.destination[1]+=1; this.timeMoved = time; 
    }


    toGridIndex(x, y){
        return((y * mapW) + x);
    }
}


export class CovidSprite extends Character {
    constructor(currentPos,position){
        super(currentPos,position);
        this.timeMoved1 = 0;
        this.dimensions = [35,35];
    }

    move(t){

        if((t-this.timeMoved1)>=this.delayMove){
            // debugger
		    this.placeAt(this.destination[0], this.destination[1]);
            this.timeMoved1 = t;
	    }else{
            // debugger
            //this gives the pixel position at the currentPos
            this.position[0] = (this.destination[0] * tileW) + ((tileW-this.dimensions[0])/2);
		    this.position[1] = (this.destination[1] * tileH) + ((tileH-this.dimensions[1])/2);
       }
        
		this.currentPos = this.destination.slice();
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
     
        return true;
    }

    moveHelper(gameTime){
        this.move(gameTime);
        this.timeMoved1 = gameTime;
        let validMoves = [];
        if (this.canMoveUp()) validMoves.push(this.moveUp.bind(this));
        if (this.canMoveDown()) validMoves.push(this.moveDown.bind(this));
        if (this.canMoveLeft()) validMoves.push(this.moveLeft.bind(this));
        if (this.canMoveRight()) validMoves.push(this.moveRight.bind(this));
        let randomMove = validMoves[Math.floor(Math.random()*validMoves.length)];
        randomMove(gameTime);
    }

}