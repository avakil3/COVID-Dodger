export default class Character{
    constructor(tileW,tileH){
        this.tileW = tileW;
        this.tileH = tileH;
        this.tileFrom = [1,1];
        this.tileTo	= [1,1];
        this.timeMoved = 0;
        this.dimensions	= [60,30];
        this.position	= [45,45];
        this.delayMove	= 700;
        
    }

    placeAt(x,y){
        this.tileFrom = [x,y];
	    this.tileTo	= [x,y];
	    this.position = [((this.tileW*x)+((this.tileW-this.dimensions[0])/2)),
		((this.tileH*y)+((this.tileH-this.dimensions[1])/2))];
    }

    processMovement(t){
        // if the character's tileFrom position equals its TileTo position, then the character is not currently moving
        if(this.tileFrom[0]===this.tileTo[0] && this.tileFrom[1]===this.tileTo[1]) { 
            return false; 
        }

        if((t-this.timeMoved)>=this.delayMove){
		    this.placeAt(this.tileTo[0], this.tileTo[1]);
	    }else{
            this.position[0] = (this.tileFrom[0] * tileW) + ((tileW-this.dimensions[0])/2);
		    this.position[1] = (this.tileFrom[1] * tileH) + ((tileH-this.dimensions[1])/2);
        }
        // if the character is moving horizonatlly, then calculate the difference in position and add / subtract that from the current position
        if(this.tileTo[0] != this.tileFrom[0]){
			var diff = (tileW / this.delayMove) * (t-this.timeMoved);
			this.position[0]+= (this.tileTo[0]<this.tileFrom[0] ? 0 - diff : diff);
		}
        // if the character is moving vertically, then calculate the difference in position and add / subtract that from the current position
		if(this.tileTo[1] != this.tileFrom[1]){
			var diff = (tileH / this.delayMove) * (t-this.timeMoved);
			this.position[1]+= (this.tileTo[1]<this.tileFrom[1] ? 0 - diff : diff);
		}
        this.position[0] = Math.round(this.position[0]);
        this.position[1] = Math.round(this.position[1]);
        return true;
    }

}