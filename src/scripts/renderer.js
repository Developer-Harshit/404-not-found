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

    const effect = document.createElement("canvas");

    this.gl = effect.getContext("webgl2");

    const surfCnv = document.createElement("canvas");
    this.surf = surfCnv.getContext("2d");

    this.framecount = 0;

    this.is_gl = true;
  }

  resize() {
    // setting cnv size
    this.cnv.width = this.cnv.clientWidth/2;
    this.cnv.height = this.cnv.clientHeight/2;

    // setting surf size
    this.surf.canvas.width = this.cnv.width;
    this.surf.canvas.height = this.cnv.height;

    // setting gl size
    if (this.is_gl) this._reisize_gl();
  }
  _reisize_gl() {
    this.gl.canvas.width = this.cnv.width;
    this.gl.canvas.height = this.cnv.height;

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
  }

  _init_gl() {
    this.program_info = createProgramInfo(this.gl, [vert, frag]);
    const arrays = {
      position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0],
    };
    this.buffer_info = createBufferInfoFromArrays(this.gl, arrays);
  }
  init() {
    if (this.is_gl) this._init_gl();

    this.resize();
  }

  _render_gl() {
    // setting texture
    this.tex = createTexture(this.gl, { src: this.surf.canvas });
    // setting uniforms
    const uniforms = {
      time: this.framecount * 0.01,
      resolution: [this.gl.canvas.width, this.gl.canvas.height],
      utex0: this.tex,
    };
    // setting it into shader program
    this.gl.useProgram(this.program_info.program);
    setBuffersAndAttributes(this.gl, this.program_info, this.buffer_info);
    setUniforms(this.program_info, uniforms);
    drawBufferInfo(this.gl, this.buffer_info);

    // drawing it into main canvas
    this._render_layer(this.gl.canvas);
  }
  _render_layer(ele) {
    this.main.drawImage(ele, 0, 0, this.cnv.width, this.cnv.height);
  }

  render() {
    this.framecount += 1;

    if (this.is_gl) this._render_gl();
    else this._render_layer(this.surf.canvas);
  }
}
