export class BullerHandler {
  /**
   * @param {Game} game
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
  init() {}
}
// 100 max

class Bullet {}
