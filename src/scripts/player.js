import { ProjectileHandler } from "./projectiles";

export class Player {
  constructor(game) {
    this.game = game;
    this.vel = 5;
    this.x = 0;
    this.y = 0;
    this.size = 40;
    this.life = 3;
    this.projectiles = new ProjectileHandler(game, -1);
  }
  update() {
    // updating projectiles
    this.projectiles.update();

    this.y = this.game.bottom - this.size;
    this.vel += (this.game.inc - this.vel) * 0.05;

    this.x += this.vel;

    if (this.x < 0) {
      this.x = 0;
      this.vel *= -0.9;
    } else if (this.x > this.game.width - this.size) {
      this.x = this.game.width - this.size;
      this.vel *= -0.9;
    }
  }
  shoot() {
    this.projectiles.add(this.x + this.size / 2, this.y);
  }
  render() {
    // rendering player's projectile
    this.projectiles.render();

    // rendering player
    this.game.draw_rect(this.x, this.y, this.size, this.size);
  }
}

export function draw_projectile(projectiles, game) {
  projectiles.forEach((pjt) => {
    game.draw_rect(pjt.x, pjt.y, 10, 10);
  });
}

export function update_projectile(projectiles, game, dir) {
  projectiles.forEach((pjt) => {
    pjt.y += dir;
  });
}
