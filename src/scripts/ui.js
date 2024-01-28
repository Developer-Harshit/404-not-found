import { Renderer } from "./renderer";

export class Ui {
  /**
   *
   * @param {Renderer} renderer
   */
  constructor(renderer) {
    this.renderer = renderer;
  }
  init() {
    const shader_btn = document.getElementById("shader-input");
    shader_btn.addEventListener("change", (e) => {
      this.renderer.is_gl = e.target.checked;
    });

    const left_div = document.getElementById("left-div");
    left_div.addEventListener("pointerdown", () => {
      left_div.classList.add("active");
    });

    left_div.addEventListener("pointercancel", () => {
      left_div.classList.remove("active");
    });
    left_div.addEventListener("pointerup", () => {
      left_div.classList.remove("active");
    });

    const right_div = document.getElementById("right-div");
    right_div.addEventListener("pointerdown", () => {
      right_div.classList.add("active");
    });

    right_div.addEventListener("pointercancel", () => {
      right_div.classList.remove("active");
    });
    right_div.addEventListener("pointerup", () => {
      right_div.classList.remove("active");
    });
  }
}
