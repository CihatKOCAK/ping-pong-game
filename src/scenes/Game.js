import Phaser from "phaser";

class Game extends Phaser.Scene {
  preload() {}

  init() {
    this.rightGamerSpeed = new Phaser.Math.Vector2(0, 0); // create a vector to store the speed of the rightGamer
  }

  create() {
    // this.add.text(400, 200, "Game", { fill: "#0f0" });
    this.ball = this.add.circle(400, 250, 10, 0xff0000, 1);
    this.physics.add.existing(this.ball); // add physics to the ball

    const angle = Phaser.Math.Between(0, 360); // get a random angle
    const vec = this.physics.velocityFromAngle(angle, 500); // get a vector based on the angle and speed
    console.log(vec);

    this.ball.body.setVelocity(vec.x, vec.y); // set the velocity of the ball


    this.ball.body.setCollideWorldBounds(true, 1, 1); // make the ball collide with the world bounds

    this.leftGamer = this.add.rectangle(50, 300, 10, 100, 0x00ff00, 1);
    this.physics.add.existing(this.leftGamer, true); // add physics to the leftGamer and make it immovable
    this.physics.add.collider(this.leftGamer, this.ball); // make the ball collide with the leftGamer

    this.rightGamer = this.add.rectangle(750, 300, 10, 100, 0x0000ff, 1);
    this.physics.add.existing(this.rightGamer, true);
    this.physics.add.collider(this.rightGamer, this.ball);

    this.ball.body.setBounce(1, 1); // make the ball bounce when it collides with the world bounds

    this.keyboard = this.input.keyboard.createCursorKeys(); // create the keyboard object
  }

  update() {

    const pcSpeed = 5; // set the speed of the rightGamer

    //if press up arrow
    if (this.keyboard.down.isDown) {
      this.leftGamer.y += 5;
    } else if (this.keyboard.up.isDown) {
      this.leftGamer.y -= 5;
    }
    this.leftGamer.body.updateFromGameObject(); // update the position of the leftGamer

    const diff = this.ball.y - this.rightGamer.y;
    // if (diff < 0) {
    //   // if the ball is above the rightGamer
    //   this.rightGamer.y -= 10;
    //   this.rightGamer.body.updateFromGameObject(); // update the position of the rightGamer
    // } else if (diff > 0) {
    //   this.rightGamer.y += 10;
    //   this.rightGamer.body.updateFromGameObject();
    // }

    this.rightGamer.y += this.rightGamerSpeed.y;
    this.rightGamer.body.updateFromGameObject();

    
    if (diff < 0) {
      this.rightGamerSpeed.y = -pcSpeed;
      if(this.rightGamerSpeed.y < -10) {
        this.rightGamerSpeed.y = -10;
      }
    } else if (diff > 0) {
      this.rightGamerSpeed.y = pcSpeed;
        if(this.rightGamerSpeed.y > 10) {
        this.rightGamerSpeed.y = 10;
      }

    } else {
      this.rightGamerSpeed.y = 0;
    }

    if (Math.abs(diff) < 10) {
      return;
    }
  }
}

export default Game;
