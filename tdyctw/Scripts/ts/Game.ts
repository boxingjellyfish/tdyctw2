/// <reference path="../typings/phaser.d.ts"/>

module tdyctw {

    export class Game extends Phaser.Game {

        constructor(width: number, height: number) {
            super(width, height, Phaser.AUTO, "gameContainer", null);

            this.state.add("BootState", BootState, false);
            this.state.add("PreloaderState", PreloaderState, false);
            this.state.add("MainMenuState", MainMenuState, false);
            this.state.add("PlayState", PlayState, false);

            this.state.start("BootState");
        }


    }

} 