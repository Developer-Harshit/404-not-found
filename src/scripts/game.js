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

    this.count = 0;
  }
  resize() {
    this.renderer.resize();
    this.width = this.cnv.width;
    this.height = this.cnv.height;

    let s_ratio = this.size;
    this.size = Math.floor(Math.min(this.width, this.height) / 20);
    s_ratio = this.size / s_ratio;

    this.player.resize(s_ratio);
    this.enemies.resize(s_ratio);
  }
  render(time) {
    // calculating dt
    let dt = time - this.prevTime;
    this.prevTime = time;

    //bg
    let ctx = this.renderer.surf;
    ctx.drawImage(this.sprites.bg, 0, 0, this.width, this.height);

    // ground
    ctx.drawImage(
      this.sprites.ground,
      0,
      this.height - this.size,
      this.width,
      this.size
    );

    // player
    this.player.render(ctx);
    // text
    let h = this.height / 2;
    ctx.font = `900 ${this.size}px monospace`;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeText(1000 / dt, 10, h + this.size);
    ctx.fillStyle = "white";
    ctx.fillText(1000 / dt, 10, h + this.size);

    // must be called last
    this.renderer.render(time);
  }
  update() {
    this.count += 1;
    // player
    this.player.update();

    if (this.count % 5 == 0) this.player.shoot();
  }
  load_image(src = "/") {
    // let ctx = document.createElement("canvas").getContext("2d");
    let img = document.createElement("img");
    img.src = src;

    return img;
  }
  init() {
    this.renderer.init();
    this.ui.init(this, this.renderer);
    this.resize();

    // bg black
    this.sprites.bg = this.load_image("/bg.jpg", this.renderer.cnv.width);
    console.log(this.sprites.bg);

    // idk
    this.sprites.ground = this.load_image("/ground.png");

    // // blue
    this.sprites.player = this.load_image("/player.png");
    // // yellow or white
    this.sprites.bullet = this.load_image("/bullet.png");
    // // enemies - green,red,pink,yellow
    this.sprites.green = this.load_image("/green.png");
    // this.sprites.red;
    // this.sprites.pink;
    // this.sprites.yellow;

    this.player.init();
  }
}
