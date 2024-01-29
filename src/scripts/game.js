import { EnemyHandler } from "./enemy";
import { Player } from "./player";
import { Renderer } from "./renderer";
import { Ui } from "./ui";

export class Game {
  constructor() {
    this.cnv = document.getElementById("c");

    this.renderer = new Renderer(this.cnv);
    this.ui = new Ui(this);
    this.bg = document.createElement("img");
    this.bg.src = "/bg.jpg";
    this.ctx = this.renderer.surf;

    this.inc = 0;
    this.player = new Player(this);

    this.enemies = new EnemyHandler(this);
    // projectiles shooted by enemies
    this.projectiles = [];

    this.bottom = 100;

    this.framecount = 0;

    this.resize();
  }
  resize() {
    this.renderer.resize();
    this.width = this.cnv.width;
    this.height = this.cnv.height;

    this.block_size = Math.min(this.width, this.height) / 20;
  }

  draw_rect(x, y, w, h) {
    this.ctx.strokeRect(x, y, w, h);
    this.ctx.fillRect(x, y, w, h);
  }
  update() {
    if (this.framecount % 20 == 0) this.player.shoot();
    this.bottom = this.ctx.canvas.height - 4;
    this.player.update();

    this.enemies.update(this.player.projectiles);
  }
  render() {
    this.framecount += 1;

    const ctx = this.ctx;
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";

    // drawing background
    ctx.drawImage(this.bg, 0, 0, ctx.canvas.width, ctx.canvas.height);

    // bottom line
    this.draw_rect(0, this.bottom, ctx.canvas.width, 4);
    // player
    ctx.fillStyle = "red";
    this.player.render();

    // enemy
    ctx.fillStyle = "blue";
    this.enemies.render();

    // drawing to main canvas

    this.renderer.render();
  }

  init() {
    this.renderer.init();
    this.ui.init();
    this.resize();
    this.enemies.spawn_group();
  }
}
