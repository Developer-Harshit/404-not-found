import { BullerHandler } from "./bullet";
import { EnemyHandler } from "./enemy";
import { Player } from "./player";
import { Renderer } from "./renderer";
import { Ui } from "./ui";
export class Game {
  /**
   * @param {Ui} ui
   * @param {Renderer} renderer
   * @param {HTMLCanvasElement} cnv
   */
  constructor(ui, renderer, cnv) {
    this.renderer = renderer;
    this.ui = ui;
    this.cnv = cnv;

    this.width = 100;
    this.height = 100;
    this.size = 1;
    this.sprites = {};

    this.player = new Player(this);
    this.enemies = new EnemyHandler(this);
    this.bullets = new BullerHandler(this);
  }
  resize() {
    this.renderer.resize();
    this.width = this.cnv.width;
    this.height = this.cnv.height;

    let old_size = this.size;
    this.size = Math.floor(Math.min(this.width, this.height) / 8);

    this.player.resize(old_size, this.size);
    this.enemies.resize(old_size, this.size);
    this.bullets.resize(old_size, this.size);
  }
  render(time) {
    // calculating dt
    let dt = time - this.prevTime;
    this.prevTime = time;

    //bg
    let ctx = this.renderer.surf;
    ctx.drawImage(this.sprites.bg, 0, 0, ctx.canvas.width, ctx.canvas.height);

    // text
    let h = ctx.canvas.height / 2;
    ctx.font = `900 ${this.size}px monospace`;
    ctx.lineWidth = 1;

    // text 1
    ctx.strokeStyle = "black";
    ctx.strokeText("Not Found", 10, h);
    ctx.strokeText(1000 / dt, 10, h + this.size);

    // text 2
    ctx.fillStyle = "white";
    ctx.fillText("Not Found", 10, h);
    ctx.fillText(1000 / dt, 10, h + this.size);
    // must be called last
    this.renderer.render(time);
  }
  update() {
    //
  }
  load_image(src = "/", size = 1) {
    // let ctx = document.createElement("canvas").getContext("2d");
    let img = document.createElement("img");
    img.src = src;

    img.addEventListener(
      "load",
      () => {
        let ratio = img.width / img.height;
        img.width = size;
        img.height = size / ratio;
        // ctx.canvas.width = size;
        // ctx.canvas.height = size / ratio;
        // ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
      },
      { once: true }
    );

    return img;
  }
  init() {
    this.renderer.init();
    this.ui.init(this, this.renderer);
    this.resize();

    // bg black
    this.sprites.bg = this.load_image("/bg.jpg", this.renderer.cnv.width);
    console.log(this.sprites.bg);

    // // idk
    // this.sprites.ground;
    // // blue
    // this.sprites.player;
    // // yellow or white
    // this.sprites.bullet;
    // // enemies - green,red,pink,yellow
    // this.sprites.green;
    // this.sprites.red;
    // this.sprites.pink;
    // this.sprites.yellow;

    this.player.init();
  }
}
