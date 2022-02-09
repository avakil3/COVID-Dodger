import Game from './scripts/game.js';
export {backgroundMusic};


const backgroundMusic = document.createElement('audio');
backgroundMusic.src = './sounds/background-music.mp3';



document.addEventListener("DOMContentLoaded", ()=>{
  const playGameButton = document.getElementById("play-button");
 

  playGameButton.addEventListener("click",()=>{
    playGame();
    playGameButton.remove();
    document.getElementById("instructions").remove();


    const gameButtons = document.getElementById("game-buttons");
    gameButtons.style.display = "block";

    const musicButton = document.getElementById("sound");
    musicButton.addEventListener("click", function(e) {
    if(backgroundMusic.paused) {
      backgroundMusic.play();
      backgroundMusic.loop = true;
    }else{
      backgroundMusic.pause();
    }
    
    });
    backgroundMusic.play();
  });
});






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
      backgroundMusic.currentTime = 0
      backgroundMusic.play();
      
    });


}