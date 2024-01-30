import "./css/retro.css";
import "./css/styles.css";

import { Game } from "./scripts/game";
import { getRequestAnimationFrame } from "./scripts/utils";

// 1 . Canvas to draw game objects
// 2.  Canvas to apply shader
// 3.  Canvas to draw Ui and layered canvas

window.onload = () => {
  const game = new Game();
  const RAF = getRequestAnimationFrame();
  console.dir(RAF);
  game.init();

  let prevTime = 0;
  function draw(time) {
    let dt = time - prevTime;
    prevTime = time;
    game.ui.message(parseInt(1000 / dt));
    game.update();
    game.render();
    RAF(draw);
  }
  RAF(draw);
};
