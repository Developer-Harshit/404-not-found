export class BullerHandler {
  /**
   * @param {Game} game
   *@param {Number} maxsize
   */
  constructor(game, maxsize) {
    this.game = game;
    this.maxsize = maxsize;
    this.pool = [];
  }
  resize(rx, ry) {
    // new / old size
    this.w = this.game.size / 4;
    this.h = this.game.size / 2;
    this.pool.forEach((element) => {
      element.x *= rx;
      element.y *= ry;
    });
  }
  add_dir(x, y, dx, dy) {
    for (let i = 0; i < this.maxsize; i++) {
      let bul = this.pool[i];
      if (!bul.active) {
        bul.x = x;
        bul.y = y;
        bul.dx = dx;
        bul.dy = dy;
        return true;
      }
    }
  }

  update(dt) {
    for (let i = 0; i < this.maxsize; i++) {
      let bul = this.pool[i];
      if (!bul.active) continue;
      bul.x += bul.dx * this.game.size * dt;
      bul.y += bul.dy * this.game.size * dt;
      if (
        bul.x < -this.w ||
        bul.x > this.game.width + this.w ||
        bul.y < -this.h ||
        bul.y > this.game.height + this.h
      ) {
        bul.active = false;
      }
    }
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    for (let i = 0; i < this.maxsize; i++) {
      let bul = this.pool[i];
      if (!bul.active) continue;
      ctx.drawImage(this.game.sprites.bullet, bul.x, bul.y, this.w, this.h);
    }
  }
  add(x, y) {
    for (let i = 0; i < this.maxsize; i++) {
      let bul = this.pool[i];
      if (!bul.active) {
        bul.x = x;
        bul.y = y;
        bul.active = true;
        return true;
      }
    }
    return false;
  }

  init(dx = 0, dy = 0) {
    for (let i = 0; i < this.maxsize; i++) {
      this.pool.push(new Bullet(dx, dy));
    }
  }
}
// 100 max

class Bullet {
  constructor(dx = 0, dy = 0) {
    this.x = 0;
    this.y = 0;
    this.dx = dx;
    this.dy = dy;
    this.active = false;
  }
}
