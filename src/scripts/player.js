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
    this.speed = 0.5;
    this.mag = 0;
    this.bullets = new BullerHandler(game, 2);
  }
  resize(size_ratio) {
    this.bullets.resize(size_ratio);

    this.x = this.x * size_ratio;
    this.set_ground();
  }
  set_ground() {
    let y = this.game.height - this.game.size * 2;
    console.log();
    this.y = y;
  }
  shoot() {
    this.bullets.add(this.x, this.y);
    this.bullets.add(this.x + this.game.size * 1.5, this.y);
  }
  update() {
    // updating bullets
    this.bullets.update();

    // updating speed
    this.speed += (this.mag - this.speed) * 0.05;

    // updating pos
    this.x += this.speed * this.game.size;

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

    ctx.drawImage(
      this.game.sprites.player,
      this.x,
      this.y,
      2 * this.game.size,
      this.game.size
    );
  }
  init() {
    this.bullets.init(0, -0.4);
    this.set_ground();
  }
}
