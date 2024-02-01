import { BullerHandler } from "./bullet";

export class EnemyHandler {
  /**
   * @param {Game} game
   */
  constructor(game, maxsize) {
    this.game = game;
    this.maxsize = maxsize;
    this.bullets = new BullerHandler(this, 10);
    this.pool = [];

    // this.left = false
    // this.right = false
    // this.wander_dir = -1
  }
  resize(size_ratio) {
    // new / old size
    this.pool.forEach((element) => {
      element.x *= size_ratio;
      element.y *= size_ratio;
    });
  }
  wander() {
    // wander every nth frame
    // wander left and right then eventually charge
  }
  settle() {
    //
  }
  charge() {
    //
  }
  update() {
    //
  }
  render() {
    //
  }
  add(x, y, e_type = "blue", phase = "wander") {
    for (let i = 0; i < this.maxsize; i++) {
      let ene = this.pool[i];
      if (!ene.active) {
        ene.x = x;
        ene.y = y;
        ene.type = e_type;
        ene.phase = phase;
        ene.life = 3;
        ene.active = true;
        return true;
      }
    }
  }
  init() {
    for (let i = 0; i < this.maxsize; i++) {
      this.pool.push(new Enemy());
    }
  }
}

class Enemy {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.type = "blue";
    this.phase = "wander";
    this.active = false;
    this.life = 3;
  }
}
// 20 green
const greenSettings = {};
// 15 red
const redSettings = {};
// 10 pink
const pinkSettings = {};
// 6 yellow
const yellowSettings = {};
