import "./css/retro.css";
import "./css/styles.css";
import { Game } from "./scripts/game";
import { Renderer } from "./scripts/renderer";
import { Ui } from "./scripts/ui";

import { getRequestAnimationFrame } from "./scripts/utils";

window.onload = () => {
  const RAF = getRequestAnimationFrame();
  // game
  // ui
  // renderer
  const cnv = document.getElementById("c");

  const ui = new Ui();
  const renderer = new Renderer(cnv);
  const game = new Game(ui, renderer, cnv);
  game.init();

  function draw(time) {
    RAF(draw);
    game.update();
    game.render(time);
  }
  RAF(draw);
};
