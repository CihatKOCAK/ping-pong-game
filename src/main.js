import Phaser from "phaser";
import TitleScene from "./scenes/TitleScene";
import Game from "./scenes/Game";

const config = {
  width: 800,
  height: 600,
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);

game.scene.add("titleScene", TitleScene); // add the scene to the game
game.scene.add("game", Game); // add the scene to the game
//game.scene.start('titleScene'); // start the scene
game.scene.start("game"); // start the scene
