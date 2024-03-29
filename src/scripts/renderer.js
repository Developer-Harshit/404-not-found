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
import { getGLContext } from "./utils";
export class Renderer {
  /**
   * @param {HTMLCanvasElement} cnv
   */
  constructor(cnv) {
    this.time = 0;
    this.is_gl = true;

    this.cnv = cnv;
    this.surf = cnv.getContext("2d", {
      willReadFrequently: true,
      alpha: false,
    });

    const effect = document.createElement("canvas");
    this.gl = getGLContext(effect);

    // moz
    this.surf.mozImageSmoothingEnabled = false;
    this.gl.mozImageSmoothingEnabled = false;

    // webkit
    this.surf.webkitImageSmoothingEnabled = false;
    this.gl.webkitImageSmoothingEnabled = false;

    // general
    this.surf.imageSmoothingEnabled = false;
    this.gl.imageSmoothingEnabled = false;
  }

  resize() {
    // setting cnv size
    let ratio = this.cnv.clientWidth / this.cnv.clientHeight;

    let size = Math.min(outerHeight, outerWidth) / 2.7;
    console.log(size);
    this.surf.canvas.width = size;
    this.surf.canvas.height = size / ratio;

    // setting gl size

    try {
      this._reisize_gl();
    } catch (e) {
      console.log("Error in resize gl");
    }
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

    this.gl.useProgram(this.program_info.program);
    setBuffersAndAttributes(this.gl, this.program_info, this.buffer_info);
    drawBufferInfo(this.gl, this.buffer_info);
  }
  check_gl() {
    return this.is_gl && !this.gl.isContextLost() && this.gl;
  }
  init() {
    try {
      this._init_gl();
    } catch (e) {
      console.log("Error in init gl");
    }
  }

  _render_gl() {
    // setting texture
    this.tex = createTexture(this.gl, {
      src: this.cnv,

      // min: this.gl.NEAREST,
      // mag: this.gl.NEAREST,
    });
    // setting uniforms
    const uniforms = {
      time: this.time * 0.01,
      resolution: [this.gl.canvas.width, this.gl.canvas.height],
      utex0: this.tex,
    };
    // setting it into shader program
    setUniforms(this.program_info, uniforms);
    drawBufferInfo(this.gl, this.buffer_info);

    // drawing it into main canvas

    this.surf.drawImage(this.gl.canvas, 0, 0, this.cnv.width, this.cnv.height);
  }

  render(time) {
    this.time = time;

    if (this.check_gl()) {
      try {
        this._render_gl();
      } catch (e) {
        //
      }
    }
  }
}
