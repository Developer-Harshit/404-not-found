import { Game } from "./game";

export class Ui {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game;
    this.dt = 30;
    this.txt_queue = 0;
  }
  message_queue(text = "") {
    setTimeout(() => {
      this._message(text);
    }, this.dt * this.txt_queue * 3);
    this.txt_queue += text.length;
  }
  message(text = "") {
    const messagePara = document.querySelector("#msg .para");
    messagePara.innerText = text;
  }
  _message(text = "") {
    const messagePara = document.querySelector("#msg .para");
    messagePara.innerText = "";
    const wordCount = text.length;

    let i = 0;

    const interval = setInterval(() => {
      if (wordCount <= i) {
        clearInterval(interval);

        return;
      }
      this.txt_queue -= 1;
      this.txt_queue = Math.min(0, this.txt_queue);
      messagePara.innerText += text[i];
      i++;
    }, this.dt);
  }

  init() {
    addEventListener("resize", () => {
      this.game.resize();
    });

    const shader_btn = document.getElementById("shader-input");
    shader_btn.addEventListener("change", (e) => {
      this.game.renderer.is_gl = e.target.checked;
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
