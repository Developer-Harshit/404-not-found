import "./css/retro.css";
import "./css/styles.css";
import { Game } from "./scripts/game";
import { Renderer } from "./scripts/renderer";
import { Ui } from "./scripts/ui";

import { getRequestAnimationFrame } from "./scripts/utils";
window.addEventListener(
  "DOMContentLoaded",
  () => {
    const RAF = getRequestAnimationFrame();
    // game
    // ui
    // renderer
    const cnv = document.getElementById("c");

    const ui = new Ui();
    const renderer = new Renderer(cnv);
    const game = new Game(ui, renderer, cnv);
    game.init();

    let prev_time = 0;
    function draw(time) {
      let dt = time - prev_time;
      prev_time = time;
      RAF(draw);
      game.update(dt / 10);
      game.render(dt);
    }
    RAF(draw);
  },
  { once: true }
);
