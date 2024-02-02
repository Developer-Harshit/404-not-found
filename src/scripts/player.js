import { BullerHandler } from "./bullet";
import { Game } from "./game";

export class Player {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.speed = 0.05;
    this.mag = 0;
    this.bullets = new BullerHandler(game, 2);
  }
  resize(rx, ry) {
    this.w = this.game.size * 2;
    this.h = this.game.size;

    this.bullets.resize(rx, ry);
    this.x *= rx;
    this.set_ground();
  }
  set_ground() {
    let y = this.game.height - this.game.size * 2;
    console.log();
    this.y = y;
  }
  shoot() {
    this.bullets.add(this.x + this.game.size, this.y);
  }
  update(dt) {
    // updating bullets
    this.bullets.update(dt);

    // updating speed
    this.speed += (this.mag - this.speed) * 0.05;

    // updating pos
    this.x += this.speed * this.game.size * dt;

    // checking wall collide
    if (this.x < 0) {
      this.x = 0;
      this.speed *= -0.5;
    }
    if (this.x > this.game.width - this.game.size * 2) {
      this.x = this.game.width - this.game.size * 2;
      this.speed *= -0.5;
    }
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    this.bullets.render(ctx);

    ctx.drawImage(this.game.sprites.player, this.x, this.y, this.w, this.h);
  }
  init() {
    this.bullets.init(0, -0.34);
    this.set_ground();
  }
}
