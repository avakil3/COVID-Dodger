
<p align="center"><img src="/images/gameLogo.png" width="400">  </p>

### Background
COVID Dodger is a javascript-based game where the goal is to direct the main character around the screen while navigating a slew of COVID-infected humans. 
The player must use the arrow keys to move the character and maintain a 6-feet distance from incoming people to avoid infection. The longer the player survives, the higher the score will be. As time progresses, the difficulty of the game will rise as more infected people will move across the screen more quickly and with more random switching of direction. 

Click here for link to live site.

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
In COVID Dodger, key features include:


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

