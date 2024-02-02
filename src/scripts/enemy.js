import { BullerHandler } from "./bullet";
import { is_colliding } from "./utils";

export class EnemyHandler {
  /**
   * @param {Game} game
   * * @param {Number} maxsize
   */
  constructor(game, maxsize) {
    this.game = game;
    this.maxsize = maxsize;
    this.bullets = new BullerHandler(this, 10);
    this.pool = [];

    this.w = 10;
    this.h = 10;
  }
  resize(rx, ry) {
    this.w = this.game.size;
    this.h = this.game.size;
    this.pool.forEach((element) => {
      element.x *= rx;
      element.y *= ry;
    });
  }
  /**
   * @param {BullerHandler} bullets
   */
  check_bullet_collision(bullets) {
    for (let i = 0; i < this.maxsize; i++) {
      let ene = this.pool[i];

      if (!ene.active) continue;

      for (let i = 0; i < bullets.maxsize; i++) {
        let bul = bullets.pool[i];
        if (!bul.active) continue;

        if (is_colliding(bul, bullets, ene, this)) {
          ene.life = 0;
          // ene.active = false;
          bul.active = false;
          break;
        }
      }
    }
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
  update(dt) {
    for (let i = 0; i < this.maxsize; i++) {
      let ene = this.pool[i];
      if (!ene.active) continue;
      if (ene.life < 1) {
        ene.active = false;
        continue;
      }
    }
  }
  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  render(ctx) {
    //
    for (let i = 0; i < this.maxsize; i++) {
      let ene = this.pool[i];
      if (!ene.active) continue;
      // console.log("bye");
      ctx.drawImage(this.game.sprites.green, ene.x, ene.y, this.w, this.h);
    }
  }

  spawn_wave() {
    let w = parseInt(this.game.width / this.game.size) - 2;

    let y = 2;
    let x = 1.5;
    for (let i = 0; i < this.maxsize; i++) {
      this.add(x * this.game.size, y * this.game.size, "green", "wander");
      if (x >= w - 1) {
        y += 1.5;
        x = 0;
      }
      x += 1.5;
    }
  }
  resize(rx, ry) {
    this.pool.forEach((ene) => {
      if (ene.active) {
        ene.x *= rx;
        ene.y *= ry;
      }
    });
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
