import Game from './scripts/game.js';
// const GameView = require("./game_view");


document.addEventListener("DOMContentLoaded", function () {

  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 800;
  canvasEl.height = 800;
  

  let ctx = canvasEl.getContext("2d");
  ctx.font = "bold 10pt sans-serif";
  const game = new Game(ctx);
  requestAnimationFrame(game.drawGame.bind(game));


  document.addEventListener("keydown", function(e) {
		if(['ArrowDown','ArrowUp','ArrowRight','ArrowLeft'].includes(e.key)) { game.keysDown[e.key] = true; }
	});
	document.addEventListener("keyup", function(e) {
		if(e.key>=37 && e.key<=40) { game.keysDown[e.key] = false; }
	});
  
  const pauseButton = document.getElementById("pause-button");
  pauseButton.addEventListener('click',game.togglePause);


});

