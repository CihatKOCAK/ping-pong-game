import Phaser from "phaser";

class TitleScene extends Phaser.Scene {
  preload() {
    // this.load.image("title", "assets/title.png");
  }

  create() {
    console.log(this);
    //this.add.image(400, 300, "title");

    const text = this.add.text(400, 200, "Hello World", { fill: "#0f0" });
    text.setOrigin(0.5, 0.5); // set the origin to the center of the text
  }

  update() {}
}

export default TitleScene;
