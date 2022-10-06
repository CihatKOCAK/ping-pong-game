import Phaser from "phaser";

export default class GameBackground extends Phaser.Scene {
    preload(){}
    create(){
        const color = 0xffffff;
        const alpha = 0.5;
        this.add.line (400, 250, 0, 0, 0, 800, color, alpha).setLineWidth(2, 2);

        this.add.circle(400, 250, 5, color, alpha);
        this.add.circle(400, 250, 50).setStrokeStyle(1, color, alpha);
    }
}