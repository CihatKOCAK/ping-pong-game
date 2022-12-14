import Phaser from "phaser";
import WebFontFile from "./WebFontFile";

const gameState = {
  stillGame: true,
  winnerSide: "",
  gameOver: false,
};

class Game extends Phaser.Scene {
  preload() {
    this.load.addFile(new WebFontFile(this.load, "Press Start 2P"));

    this.load.audio("peb", "assets/ping_pong_8bit_beeep.ogg");
    this.load.audio("plop", "assets/ping_pong_8bit_plop.ogg");
    this.load.audio("peeeeeep", "assets/ping_pong_8bit_peeeeeep.ogg");
  }

  init() {
    this.autoGamerSpeed = new Phaser.Math.Vector2(0, 0); // create a vector to store the speed of the rightGamer

    this.leftGamerScore = 0;
    this.rightGamerScore = 0;

    this.gameState = gameState.stillGame;
    this.paused = false;
  }

  create() {
    this.sound.play("peeeeeep");
    this.scene.run("gameBackground"); // run the gameBackground scene

    //exit game
    this.input.keyboard.on("keydown-ESC", () => {
      this.scene.start("titleScene");
    });

    const scoreStyle = {
      fontSize: 48,
      fill: "#fff",
      fontFamily: '"Press Start 2P"',
    };

    this.leftGamerScoreText = this.add
      .text(300, 100, "0", scoreStyle)
      .setOrigin(0.5, 0.5);
    this.rightGamerScoreText = this.add
      .text(500, 100, "0", scoreStyle)
      .setOrigin(0.5, 0.5);

    // this.add.text(400, 200, "Game", { fill: "#0f0" });
    this.ball = this.add.circle(400, 250, 10, 0xff0000, 1);
    this.physics.add.existing(this.ball); // add physics to the ball

    this.ball.body.setCollideWorldBounds(true, 1, 1); // make the ball collide with the world bounds

    this.leftGamer = this.add.rectangle(50, 300, 10, 100, 0x00ff00, 1);
    this.physics.add.existing(this.leftGamer, true); // add physics to the leftGamer and make it immovable
    this.physics.add.collider(this.leftGamer, this.ball); // make the ball collide with the leftGamer

    this.rightGamer = this.add.rectangle(750, 300, 10, 100, 0x0000ff, 1);
    this.physics.add.existing(this.rightGamer, true);
    this.physics.add.collider(this.rightGamer, this.ball);

    this.ball.body.setBounce(1, 1); // make the ball bounce when it collides with the world bounds

    this.keyboard = this.input.keyboard.createCursorKeys(); // create the keyboard object

    this.physics.world.setBounds(-100, 0, 1000, 600); // set the bounds of the world

    this.resetBall(); // reset the position of the ball
  }

  resetBall() {
    this.ball.setPosition(400, 250); // set the position of the ball to the center of the screen
    const angle = Phaser.Math.Between(0, 360); // get a random angle
    const vec = this.physics.velocityFromAngle(angle, 500); // get a vector based on the angle and speed
    this.ball.body.setVelocity(vec.x, vec.y); // set the velocity of the ball
  }

  changeScore(player) {
    if (player === "left") {
      this.leftGamerScore += 1;
      this.leftGamerScoreText.text = this.leftGamerScore;
    } else {
      this.rightGamerScore += 1;
      this.rightGamerScoreText.text = this.rightGamerScore;
    }
  }

  update() {
    if (this.paused || this.gameState !== gameState.stillGame) return;

    const pcSpeed = 5; // set the speed of the rightGamer
    const diff = this.ball.y - this.rightGamer.y;
    //if press up arrow
    //console.log(this.scene.settings.data.watchMode);
    if (this.scene.settings.data.watchMode) {
      if (this.keyboard.down.isDown) {
        this.leftGamer.y += 5;
      } else if (this.keyboard.up.isDown) {
        this.leftGamer.y -= 5;
      }
      this.leftGamer.body.updateFromGameObject(); // update the position of the leftGamer
    } else {
      //auto move for leftGamer
      if (diff < 0) {
        this.leftGamer.y += 5;
        this.leftGamer.body.updateFromGameObject(); // update the position of the leftGamer
      } else if (diff > 0) {
        this.leftGamer.y -= 5;
        this.leftGamer.body.updateFromGameObject(); // update the position of the leftGamer
      }
    }

    // sound effect
    if (this.ball.body.blocked.left) {
      this.sound.play("peb");
    } else if (this.ball.body.blocked.right) {
      this.sound.play("plop");
    }

    // if (diff < 0) {
    //   // if the ball is above the rightGamer
    //   this.rightGamer.y -= 10;
    //   this.rightGamer.body.updateFromGameObject(); // update the position of the rightGamer
    // } else if (diff > 0) {
    //   this.rightGamer.y += 10;
    //   this.rightGamer.body.updateFromGameObject();
    // }

    this.rightGamer.y += this.autoGamerSpeed.y;
    this.rightGamer.body.updateFromGameObject();

    if (diff < 0) {
      this.autoGamerSpeed.y = -pcSpeed;
      if (this.autoGamerSpeed.y < -10) {
        this.autoGamerSpeed.y = -10;
      }
    } else if (diff > 0) {
      this.autoGamerSpeed.y = pcSpeed;
      if (this.autoGamerSpeed.y > 10) {
        this.autoGamerSpeed.y = 10;
      }
    } else {
      this.autoGamerSpeed.y = 0;
    }

    if (Math.abs(diff) < 10) {
      return;
    }

    if (this.ball.x < 30 || this.ball.x > 830) {
      if (this.ball.x < 30) {
        this.changeScore("right");
      } else if (this.ball.x > 830) {
        this.changeScore("left");
      }
      this.resetBall();
    }

    const maxScore = this.scene.settings.data.watchMode ? 5 : 10;
    if (this.leftGamerScore >= maxScore) {
      //console.log("leftGamer win");
      this.winnerSide = 1;
      this.gameState = gameState.gameOver;
    } else if (this.rightGamerScore >= maxScore) {
      //console.log("rightGamer win");
      this.winnerSide = 2;
      this.gameState = gameState.gameOver;
    }

    if (this.gameState !== gameState.stillGame) {
      this.ball.active = false;
      this.physics.world.remove(this.ball.body);
      this.paused = true;
      this.scene.stop("gameBackground");
      this.scene.start("gameOver", {
        score: this.leftGamerScore + " : " + this.rightGamerScore,
        gameState: this.gameState,
        winner:
          this.winnerSide === 1 ? "Left Player WIN!" : "Right Player WIN!",
        mode: this.scene.settings.data.watchMode,
      });
    }
  }
}

export default Game;
