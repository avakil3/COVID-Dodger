
<p align="center"><img src="/images/gameLogo.png" width="400">  </p>

### Background
COVID Dodger is a javascript-based game where the goal is to direct the main character around the screen while navigating a slew of COVID-infected humans. 
The player must use the arrow keys to move the character and maintain a 6-feet distance from incoming people to avoid infection. The longer the player survives, the higher the score will be. As time progresses, the difficulty of the game will rise as more infected people will move across the screen more quickly and with more random switching of direction. 

[Click here](https://avakil3.github.io/COVID-Dodger/) for the live site. 

### Selected Game Features
In COVID Dodger, key features include:

1. The ability to control the animated main character across the screen using the keyboard arrow keys
    * Using a combination of eventListeners and canvas animations, I was able to not move the character across the grid-based game space while also animating the main character sprite based on the direction of movement.
    * Animating the main character proved somewhat difficult given that the game was structured to refresh the canvas at every animation. This lead to the legs of the sprite moving much too quickly. I had to slow the refresh rate of the animation to account for this.
    * The speed of the main character and the sprites increases over time, making the game more difficult and exciting.
2. After a certain amount of time, a covid vaccine item will appear on the screen, which will give the player immunity for 10 seconds.
    * This feature utilizes much of the same collision logic used for the enemy sprites. Once the player collides with the vaccine item on the screen, the player's collision detection loop is turned off for 10 seconds, simulating immunity. 
    * The code has been structured to be easily able to add additional power items in the future, such as food items to boost player speed


### Selected Code Snippets
* Below code is responsible for giving the player immunity for 10 seconds. In the event that the user collides with the covid vaccine item, the below code sets the 'covidImmunity' boolean to true, which temporarily disables collision detection. After 10 seconds, the immunity variable is reset.

```
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
```
* Below code represents the controller of player movement. This checks which keyboard keys have been pressed and executes the associated change in player position. This also updates the frame position of the animation towards the new player direction.
```
 if(!this.player.move(this.gameTime) && speeds[this.currentSpeed].name !== "paused"){ // if the player is currently NOT moving

            if(this.keysDown['ArrowUp'] && this.player.canMoveUp()){
                    this.player.moveUp(this.gameTime);
                    this.player.playerFrameY = 3;
                    (this.player.playerFrameX < 3) ? this.player.playerFrameX++ : this.player.playerFrameX = 0;

            }else if (this.keysDown['ArrowDown'] && this.player.canMoveDown()){
                    this.player.moveDown(this.gameTime);  
                    this.player.playerFrameY = 0;
                    (this.player.playerFrameX < 3) ? this.player.playerFrameX++ : this.player.playerFrameX = 0;

            }else if(this.keysDown['ArrowLeft'] && this.player.canMoveLeft()){
                    this.player.moveLeft(this.gameTime);   
                    this.player.playerFrameY = 1;
                    (this.player.playerFrameX < 3) ? this.player.playerFrameX++ : this.player.playerFrameX = 0;

            }else if (this.keysDown['ArrowRight'] && this.player.canMoveRight()){
                    this.player.moveRight(this.gameTime);    
                    this.player.playerFrameY = 2;
                    (this.player.playerFrameX < 3) ? this.player.playerFrameX++ : this.player.playerFrameX = 0;
            }
            
            if( JSON.stringify(this.player.currentPos) !== JSON.stringify(this.player.destination)){
                    this.player.timeMoved = this.gameTime;
            }
        }
  ```


### Technologies & APIs
This project uses the following technologies:

* The Canvas API
* Font Awesome API for social icons
* Game assests from [Itch.io](https://itch.io/game-assets/free)
* Webpack and Babel to bundle and transpile the source JavaScript code
* npm to manage project dependencies

### Future Additions
1. Include additional "power" items such as food that gives a speed boost or ice that slows the enemy sprites down. 
2. The ability to select a skin for the main character 
3. Add logic to the enemy sprites so that they progress towards the player vs. in a random direction

