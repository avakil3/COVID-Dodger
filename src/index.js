import Game from './scripts/game.js';
// import {hasGameEnded} from './scripts/game.js';

document.addEventListener("DOMContentLoaded", playGame);


function playGame(){
  
    const canvasEl = document.getElementsByTagName("canvas")[0];
    canvasEl.width = 920;
    canvasEl.height = 800;
  
    let ctx = canvasEl.getContext("2d");
    const game = new Game(ctx,canvasEl);
    requestAnimationFrame(game.drawGame.bind(game));
    
  
    document.addEventListener("keydown", function(e) {
      if(['ArrowDown','ArrowUp','ArrowRight','ArrowLeft'].includes(e.key)) game.keysDown[e.key] = true; 
    });
    document.addEventListener("keyup", function(e) {
      if(['ArrowDown','ArrowUp','ArrowRight','ArrowLeft'].includes(e.key)) game.keysDown[e.key] = false;
    });
    
    const pauseButton = document.getElementById("pause-button");
    pauseButton.addEventListener('click',game.togglePause.bind(game));
  
  
  
    const restartButton = document.getElementById("restart-button");
    restartButton.addEventListener('click',()=>{
      ctx.clearRect(0,0,canvasEl.width,canvasEl.height);
      playGame();
    
    });



}