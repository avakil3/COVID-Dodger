import Character from './character.js';

export class CovidSprite extends Character {
    constructor(currentPos,position){
        super(currentPos,position);
        this.timeMoved1 = 0;
        this.dimensions = [60,60];
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