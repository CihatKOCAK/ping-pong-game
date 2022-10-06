import Phaser from "phaser";

export default class GameBackground extends Phaser.Scene {
  create(data) {
    //console.log(data);

    let gameOverText = this.add
      .text(400, 300, "Game Over", {
        fontSize: 48,
        fill: "#fff",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5, 0.5);

    let scoreText = this.add
      .text(400, 400, "Score: " + data.score, {
        fontSize: 24,
        fill: "#fff",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5, 0.5);

    let winner = this.add
      .text(400, 450, "Winner: " + data.winner, {
        fontSize: 24,
        fill: "#fff",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5, 0.5);

      let pressSpaceText = this.add
        .text(400, 500, "Press Space to Restart", {
            fontSize: 24,
            fill: "#fff",
            fontFamily: '"Press Start 2P"',
        })
        .setOrigin(0.5, 0.5);

    this.input.keyboard.on("keydown-SPACE", () => {
        this.scene.start("game", { watchMode: data.mode });
        }
    );
  }
}
