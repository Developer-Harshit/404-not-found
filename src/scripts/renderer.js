import vert from "../glsl/shader.vert?raw";
import frag from "../glsl/shader.frag?raw";
import {
  createProgramInfo,
  createBufferInfoFromArrays,
  createTexture,
  setBuffersAndAttributes,
  setUniforms,
  drawBufferInfo,
} from "twgl.js";
export class Renderer {
  /**
   * @param {HTMLCanvasElement} cnv
   */
  constructor(cnv) {
    this.cnv = cnv;

    this.main = cnv.getContext("2d");
    addEventListener("resize", () => {
      this.resize();
    });

    const effect = document.createElement("canvas");

    this.gl = effect.getContext("webgl2");

    const surfCnv = document.createElement("canvas");
    this.surf = surfCnv.getContext("2d");

    this.framecount = 0;

    this.is_gl = true;
  }

  resize() {
    this.surf.canvas.width = this.cnv.width;
    this.surf.canvas.height = this.cnv.height;

    if (this.is_gl) this.reisize_gl();
  }
  reisize_gl() {
    this.gl.canvas.width = this.cnv.width;
    this.gl.canvas.height = this.cnv.height;

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }

  init_gl() {
    this.program_info = createProgramInfo(this.gl, [vert, frag]);
    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };
    this.buffer_info = createBufferInfoFromArrays(this.gl, arrays);
  }
  init() {
    if (this.is_gl) this.init_gl();

    this.resize();
    this.set_texture();
  }
  set_texture() {
    this.tex = createTexture(this.gl, { src: this.surf.canvas });
  }
  render_gl() {
    const uniforms = {
      time: this.framecount * 0.05,
      resolution: [this.gl.canvas.width, this.gl.canvas.height],
      utex0: this.tex,
    };

    this.gl.useProgram(this.program_info.program);
    setBuffersAndAttributes(this.gl, this.program_info, this.buffer_info);
    setUniforms(this.program_info, uniforms);
    drawBufferInfo(this.gl, this.buffer_info);
  }
  render_element(ele) {
    this.main.drawImage(ele, 0, 0, this.cnv.width, this.cnv.height);
  }

  render() {
    this.main.fillStyle = "black";
    this.main.fillRect(0, 0, this.cnv.width, this.cnv.height);
    this.framecount += 1;
    // render bg
    // render game objects

    if (this.is_gl) {
      this.set_texture();
      this.render_gl();

      this.render_element(this.gl.canvas);
    } else this.render_element(this.surf.canvas);

    this.main.fillStyle = "white";
    this.main.fillRect(40, this.cnv.height - 60, 100, 100);

    // render ui
  }
}
