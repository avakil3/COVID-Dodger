import Game from './scripts/game.js';
// const GameView = require("./game_view");


document.addEventListener("DOMContentLoaded", function () {

  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 920;
  canvasEl.height = 800;
  

  let ctx = canvasEl.getContext("2d");
  ctx.font = "bold 12pt comic-sans";
  const game = new Game(ctx);
  requestAnimationFrame(game.drawGame.bind(game));


  document.addEventListener("keydown", function(e) {
		if(['ArrowDown','ArrowUp','ArrowRight','ArrowLeft'].includes(e.key)) game.keysDown[e.key] = true; 
	});
	document.addEventListener("keyup", function(e) {
		if(['ArrowDown','ArrowUp','ArrowRight','ArrowLeft'].includes(e.key)) game.keysDown[e.key] = false;
	});
  
  const pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener('click',game.togglePause);

  const restartButton = document.getElementById("restart-button");
  restartButton.addEventListener('click',()=>{
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    // debugger
  });

});


