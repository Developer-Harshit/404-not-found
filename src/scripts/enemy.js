export class EnemyHandler {
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

class Enemy {}
// 20 green
const greenSettings = {};
// 15 red
const redSettings = {};
// 10 pink
const pinkSettings = {};
// 6 yellow
const yellowSettings = {};
