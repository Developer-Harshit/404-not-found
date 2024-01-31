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
  resize(size_ratio) {
    // new / old size
    this.pool.forEach((element) => {
      element.x *= size_ratio;
      element.y *= size_ratio;
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
  update() {
    for (let i = 0; i < this.maxsize; i++) {
      let bul = this.pool[i];
      if (!bul.active) continue;
      bul.x += bul.dx * this.game.size;
      bul.y += bul.dy * this.game.size;
      if (
        bul.x < 0 ||
        bul.x > this.game.width + this.game.size / 2 ||
        bul.y < 0 ||
        bul.y > this.game.height + this.game.size
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
      ctx.drawImage(
        this.game.sprites.bullet,
        bul.x,
        bul.y,
        this.game.size / 4,
        this.game.size / 2
      );
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
