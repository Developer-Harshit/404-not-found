import { Game } from "./game";

export class Player {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game;
    this.x = 0;
    this.y = 0;
    this.rw = 2;
    this.rh = 1;
  }
  resize(old_size, new_size) {
    this.x = (this.x * new_size) / old_size;
    this.set_ground();
  }
  set_ground() {
    let y = this.game.height - this.game.size * (this.rh + 1);
    this.y = y;
  }

  init() {
    this.set_ground();
  }
}
