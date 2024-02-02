import { Game } from "./game";
import { Renderer } from "./renderer";

export class Ui {
  message(text = "") {
    const messagePara = document.querySelector("#msg .para");
    messagePara.innerText = text;
  }
  _message(text = "") {
    const messagePara = document.querySelector("#msg .para");
    messagePara.innerText = "";
    const wordCount = text.length;
    let i = 0;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (wordCount <= i) {
        clearInterval(this.interval);

        return;
      }

      messagePara.innerText += text[i];
      i++;
    }, 100);
  }

  /**
   * @param {Game} game
   */
  init(game) {
    const dir = 0.33;
    addEventListener("resize", () => {
      game.resize();
    });

    const shader_btn = document.getElementById("shader-input");
    shader_btn.addEventListener("change", (e) => {
      game.renderer.is_gl = e.target.checked;
    });

    const left_div = document.getElementById("left-div");
    this.init_div(game, left_div, -dir);

    const right_div = document.getElementById("right-div");
    this.init_div(game, right_div, dir);

    // key events
    addEventListener("keydown", (e) => {
      if (e.key == "a") {
        game.player.mag = -dir;
      }
      if (e.key == "d") {
        game.player.mag = dir;
      }
    });
    addEventListener("keyup", (e) => {
      if (
        (e.key == "a" && game.player.mag < 0) ||
        (e.key == "d" && game.player.mag > 0)
      ) {
        game.player.mag = 0;
      }
    });
  }
  /**
   * @param {Game} game
   * @param {HTMLDivElement} divEle
   * @param {Number} dir
   */
  init_div(game, divEle, dir = 1) {
    divEle.addEventListener("pointerdown", () => {
      divEle.classList.add("active");
      game.player.mag = dir;
    });

    const reset = () => {
      divEle.classList.remove("active");
      if (
        (dir > 0 && game.player.mag > 0) ||
        (dir < 0 && game.player.mag < 0)
      ) {
        game.player.mag = 0;
      }
    };
    divEle.addEventListener("pointerup", reset);
    divEle.addEventListener("pointercancel", reset);
    divEle.addEventListener("pointerleave", reset);
  }
}
