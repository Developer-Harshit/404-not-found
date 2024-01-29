import { Renderer } from "./scripts/renderer";
import "./css/retro.css";
import "./css/styles.css";
import { Ui } from "./scripts/ui";
import { Game } from "./scripts/game";

// 1 . Canvas to draw game objects
// 2.  Canvas to apply shader
// 3.  Canvas to draw Ui and layered canvas

window.onload = () => {
  const game = new Game();
  game.init();

  function draw(time) {
    requestAnimationFrame(draw);
    game.update();
    game.render();
  }
  requestAnimationFrame(draw);
};
