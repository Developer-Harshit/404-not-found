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
    this.enemies = new EnemyHandler(this, 50);
    this.count = 0;
  }
  resize() {
    this.renderer.resize();
    let ratio_x = this.cnv.width / this.width;
    let ratio_y = this.cnv.height / this.height;

    this.width = this.cnv.width;
    this.height = this.cnv.height;

    this.size = Math.floor(Math.min(this.width, this.height) / 20);

    this.player.resize(ratio_x, ratio_y);
    this.enemies.resize(ratio_x, ratio_y);
  }
  render(dt) {
    this.enemies.spawn_wave();

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
    // enemies
    this.enemies.render(ctx);
    // text
    let h = this.height / 2;
    ctx.font = `900 ${this.size * 4}px monospace`;
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    ctx.strokeText(parseInt(1000 / dt), 10, h + this.size);
    ctx.fillStyle = "white";
    ctx.fillText(parseInt(1000 / dt), 10, h + this.size);

    // must be called last
    this.renderer.render(this.count);
  }
  update(dt) {
    this.count += 1;
    // player
    this.player.update(dt);
    // enemies
    this.enemies.update(dt);
    this.enemies.check_bullet_collision(this.player.bullets);

    if (this.count % 40 == 0) this.player.shoot();
  }
  load_image(src = "/", size = 10) {
    let ctx = document.createElement("canvas").getContext("2d", {});

    // smooth
    ctx.mozImageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    let img = document.createElement("img");
    img.src = src;

    img.onload = () => {
      let imgRatio = img.width / img.height;
      ctx.canvas.width = size;
      ctx.canvas.height = size / imgRatio;
      ctx.drawImage(img, 0, 0);
    };

    return img;
  }
  init() {
    this.renderer.init();
    this.ui.init(this, this.renderer);
    this.resize();

    // bg black

    this.sprites.bg = this.load_image("/bg.jpg", 100);

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
    this.enemies.init();
  }
}
