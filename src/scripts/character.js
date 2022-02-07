import {floorTypes,grid,tileTypes} from './game.js';

export default class Character{
    constructor(tileW,tileH,mapW,mapH){
        this.tileW = tileW;
        this.tileH = tileH; 
        this.mapW = mapW;
        this.mapH = mapH;
        this.currentPos = [1,1];
        this.destination = [1,1];
        this.timeMoved = 0;
        this.dimensions	= [60,30];
        this.position	= [45,45];
        this.delayMove	= 300; //represents time it takes to move one tile
        
    }

    placeAt(x,y){
        this.currentPos = [x,y];
	    this.destination = [x,y];
	    this.position = [((this.tileW*x)+((this.tileW-this.dimensions[0])/2)),
		((this.tileH*y)+((this.tileH-this.dimensions[1])/2))];
    }

    processMovement(t){
        // if the character's currentPos position equals its TileTo position, then the character is not currently moving
        if(JSON.stringify(this.currentPos) === JSON.stringify(this.destination)) { 
            return false; 
        }

        if((t-this.timeMoved)>=this.delayMove){
            // debugger
		    this.placeAt(this.destination[0], this.destination[1]);
	    }else{
            debugger
            //this gives the pixel position at the currentPos
            this.position[0] = (this.currentPos[0] * this.tileW) + ((this.tileW-this.dimensions[0])/2);
		    this.position[1] = (this.currentPos[1] * this.tileH) + ((this.tileH-this.dimensions[1])/2);
        }
        // if the character is moving horizonatlly, then calculate the difference in position and add / subtract that from the current position
        if(this.destination[0] !== this.currentPos[0]){
			var diff = (this.tileW / this.delayMove) * (t-this.timeMoved);
            if(this.destination[0]<this.currentPos[0]){
                this.position[0]-= diff;
            }else{
                this.position[0]+= diff;
            }
		}
        // if the character is moving vertically, then calculate the difference in position and add / subtract that from the current position
		if(this.destination[1] != this.currentPos[1]){
			var diff = (this.tileH / this.delayMove) * (t-this.timeMoved);
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
        if(x < 0 || x >= this.mapW || y < 0 || y >= this.mapH) {
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
        return((y * this.mapW) + x);
    }
}