import Game from './scripts/game.js';
// const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function () {

  const canvasEl = document.getElementsByTagName("canvas")[0];
  canvasEl.width = 400;
  canvasEl.height = 400;
  

  let ctx = canvasEl.getContext("2d");
  ctx.font = "bold 10pt sans-serif";
  const game = new Game(ctx);
  requestAnimationFrame(game.drawGame.bind(game));

  //keyCode is DEPRECATED
  window.addEventListener("keydown", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { game.keysDown[e.keyCode] = true; }
	});
	window.addEventListener("keyup", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { game.keysDown[e.keyCode] = false; }
	});
  


});

