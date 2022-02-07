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

  //keyCode is DEPRECATED
  document.addEventListener("keydown", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { game.keysDown[e.keyCode] = true; }
	});
	document.addEventListener("keyup", function(e) {
		if(e.keyCode>=37 && e.keyCode<=40) { game.keysDown[e.keyCode] = false; }
	});
  


});

