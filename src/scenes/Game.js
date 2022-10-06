import Phaser from "phaser";

class Game extends Phaser.Scene {
  preload() {}
  create() {
    // this.add.text(400, 200, "Game", { fill: "#0f0" });
   const ball = this.add.circle(400, 250, 10, 0xff0000, 1);
   this.physics.add.existing(ball); // add physics to the ball
}
}

export default Game;