export class ProjectileHandler {
  constructor(game, dir) {
    this.game = game;
    this.projectiles = [];
    this.dir = dir;
  }
  add(x, y) {
    this.projectiles.push({
      x,
      y,
    });
  }
  update() {
    for (let i = 0; i < this.projectiles.length; i++) {
      const pjt = this.projectiles[i];
      if (pjt.y > this.game.height || pjt.y < 0) {
        this.remove(i);
        i--;
        continue;
      }
      pjt.y += this.dir;
    }
  }
  remove(idx) {
    this.projectiles.splice(idx, 1);
  }
  render() {
    this.projectiles.forEach((pjt) => {
      this.game.draw_rect(pjt.x, pjt.y, 10, 10);
    });
  }
  is_colliding(x, y) {
    let colliding = false;
    for (let i = 0; i < this.projectiles.length; i++) {
      const pjt = this.projectiles[i];
      let px = pjt.x + 5;
      let py = pjt.y + 5;
      if (
        px >= x &&
        py >= y &&
        px <= x + this.game.block_size &&
        py <= y + this.game.block_size
      ) {
        colliding = true;
        this.remove(i);
        break;
      }
    }
    return colliding;
  }
}
