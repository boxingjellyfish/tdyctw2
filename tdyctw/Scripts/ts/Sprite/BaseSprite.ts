/// <reference path="../../typings/phaser.d.ts"/>

module tdyctw {

    export class BaseSprite extends Phaser.Sprite {

        public baseIndex: number;

        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, "baseSprite");
            this.anchor.setTo(0.5, 0.5);
            this.inputEnabled = true;
            this.animations.add("pulse");
        }

        update() {

        }
    }

}