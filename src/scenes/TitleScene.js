import Phaser from "phaser";
import WebFontFile from "./WebFontFile";

class TitleScene extends Phaser.Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    console.log(this);
    // this.load.image("title", "assets/title.png");
    this.load.addFile(new WebFontFile(this.load, "Press Start 2P", "google"));
  }

  create() {
    const text = this.add
      .text(400, 300, "Ping Pong Game", {
        fontSize: 48,
        fill: "#fff",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(400, 400, "Press Space to Start", {
        fontSize: 24,
        fill: "#fff",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5, 0.5);

    this.add
      .text(400, 450, "Press Tab to Watch Mode", {
        fontSize: 24,
        fill: "#fff",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5, 0.5);

    //add effect text 2
    this.add
      .text(400, 500, "Press ESC to Exit", {
        fontSize: 24,
        fill: "#fff",
        fontFamily: '"Press Start 2P"',
      })
      .setOrigin(0.5, 0.5)
      .setAlpha(0.5)
      .setTint(0xff0000)
      .setStroke("#000", 16)
      .setShadow(2, 2, "#333333", 2, true, true);

    this.input.keyboard.on("keydown-TAB", () => {
      this.scene.start("game", { watchMode: false });
    });

    this.input.keyboard.on("keydown-SPACE", () => {
      // set the mode to play
      this.scene.start("game", { watchMode: true });
    });
  }

  update() {}
}

export default TitleScene;
