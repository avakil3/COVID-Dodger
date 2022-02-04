## COVID Dodger
### Background
COVID Dodger is a javascript-based game where the goal is to direct the main character around the busy city while navigating a slew of COVID-infected humans. 
The player must control a character and maintain a 6-feet distance from incoming people to avoid infection. The longer the player survives, the higher the score will be. As time progresses, the difficulty of the game will rise as more infected people will move across the screen more quickly and with more random switching of direction. There will also be various obstacles such as trees, cars, and buildings that will hinder the player's moveable area over time. 

### Features
In COVID Dodger, users will be able to:

1. Select the skin of the character they choose to play with
2. Control the main character across the city using the keyboard arrow keys
3. After a certain amount of time, a "covid vaccine" may appear on the screen, which will give the player immunity for 5 seconds.
4. Over time, obstacles such as trees, cars, and buildings may appear to increase the difficulty of the game.
5. The user must avoid coming into contact with an infected person for as long as possible.

In addition, this project will include:
1. an instructions section on which can be accessed with a button on the intro page
2. An About modal describing the background and rules of the game
3. a production README file which will walk through some of the underlying code

### Wireframe
![alt text](https://github.com/avakil3/COVID-Dodger/blob/deae5bec40d4b3160a2c6b693263eeebc7109e6a/Screen%20Shot%202022-02-03%20at%2010.49.23%20PM.png)
* Game controls will primarily be based on keyboard arrow keys.
* There will be buttons at the bottom to reset and start the game.
* There will be a score counter on the right hand side which continually increments based on time and bonus items picked up
* Nav links include links to this project's Github repo, my LinkedIn, and the About modal.

### Technologies & APIs
This project will be implemented with the following technologies:

* The Canvas API to render the game board
* Game assests from [Itch.io](https://itch.io/game-assets/free)
* Webpack and Babel to bundle and transpile the source JavaScript code
* npm to manage project dependencies

### Implementation Timeline
* Friday Afternoon & Weekend: Setup project, including getting webpack up and running. Get canvas to show up on the screen, and spend time getting comfortable with the Canvas API. Create Board and User classes. Get a grid rendered to the canvas reflecting the initial state of the game space (city).
* Monday: This day will focus on  implementing the logic behind the moving infected people and the obstacles. I'd like to be able to have them move randomly with their speed increasing gradually over time.
* Tuesday: I should have the human obstacles moving by then. Next, I'll focus on giving the user the ability to control the main character using the arrow keyboard keys. This day will also include work on setting up the collision logic for the infected humans. Given that a collision with an infected person causes the game to stop, this day will also include the work for stopping the game and showing the final score.I'll also work on some of the other buttons on the page, including the start and reset buttons. 

* Wednesday: Finish implementing user controls, and focus on styling, as well as implementing different player skins for the main character (which the user will be able to select at the beginning of the game) and nav links.

* Thursday Morning: Deploy to GitHub pages. If time, rewrite this proposal as a production README.

