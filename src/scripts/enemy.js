import { ProjectileHandler } from "./projectiles";

export class EnemyHandler {
  constructor(game) {
    this.enemies = [];
    this.projectiles = new ProjectileHandler(game, 1);
    this.game = game;
  }
  spawn_group() {
    for (let i = 0; i < 10; i++) {
      const x = i * this.game.block_size;
      for (let j = 0; j < 10; j++) {
        const y = j * this.game.block_size;
        this.add(x, y);
      }
    }
  }
  remove(idx) {
    this.enemies.splice(idx, 1);
  }
  update(projectiles) {
    for (let i = 0; i < this.enemies.length; i++) {
      const enemy = this.enemies[i];
      if (projectiles.is_colliding(enemy.x, enemy.y)) {
        enemy.life -= 1;
      }
      if (enemy.life <= 0) {
        this.remove(i);
        i--;
      }
    }
  }
  add(x, y) {
    this.enemies.push({
      x,
      y,
      life: 2,
    });
  }
  render() {
    this.enemies.forEach((e) => {
      this.game.draw_rect(
        e.x,
        e.y,
        this.game.block_size * 0.9,
        this.game.block_size * 0.9
      );
    });
  }
}
