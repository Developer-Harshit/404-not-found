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
   * @param {Renderer} renderer
   */
  init(game, renderer) {
    addEventListener("resize", () => {
      game.resize();
    });

    const shader_btn = document.getElementById("shader-input");
    shader_btn.addEventListener("change", (e) => {
      renderer.is_gl = e.target.checked;
    });

    const left_div = document.getElementById("left-div");
    this.init_div(left_div, -1);

    const right_div = document.getElementById("right-div");
    this.init_div(right_div, 1);
  }
  /**
   * @param {HTMLDivElement} divEle
   * @param {Number} mag
   */
  init_div(divEle, mag = 1) {
    divEle.addEventListener("pointerdown", () => {
      divEle.classList.add("active");
      this.game.inc = 3 * mag;
    });

    const reset = () => {
      divEle.classList.remove("active");
      this.game.inc = 0;
    };
    divEle.addEventListener("pointerup", reset);

    divEle.addEventListener("pointercancel", reset);
    divEle.addEventListener("pointerleave", reset);
  }
}
