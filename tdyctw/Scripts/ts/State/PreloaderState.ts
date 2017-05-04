/// <reference path="../../typings/phaser.d.ts"/>

module tdyctw {

    export class PreloaderState extends Phaser.State {

        private static LOADING_MESSAGE: string = "LOADING: {0}%";

        loadingText: Phaser.Text;
        loadingStyle: any = { font: "14px 'Share Tech Mono'", fill: "#00ff00" };
        
        preload() {

            var titleString = PreloaderState.LOADING_MESSAGE.replace("{0}", "0");            
            this.loadingText = this.add.text(this.world.centerX, this.world.centerY, titleString, this.loadingStyle);
            this.loadingText.anchor.set(0.5);
            
            this.load.onFileComplete.add(this.fileComplete, this);
            this.load.onLoadComplete.add(this.loadComplete, this);

            // Strings
            this.load.json("strings", "/Content/txt/strings_en.json");

            // Images
            this.load.image("base", "/Content/img/base.png");
            this.load.spritesheet("baseSprite", "/Content/img/base_sprite.png", 32, 32, 2);

            // Audio
            this.load.audio("menuMusic", "/Content/audio/menu.mp3", true);
            this.load.audio("menuHoverSFX", "/Content/audio/beep-29.wav");
            this.load.audio("menuClickSFX", "/Content/audio/button-35.wav");
            this.load.audio("baseSelectSFX", "/Content/audio/button-33a.wav");
        }

        create() {
        }

        update() {
            this.loadingText.position = new Phaser.Point(this.world.centerX, this.world.centerY);
        }

        fileComplete(progress: any, cacheKey: any, success: any, totalLoaded: any, totalFiles: any) {
            this.loadingText.text = PreloaderState.LOADING_MESSAGE.replace("{0}", progress);
        }

        loadComplete(progress: any, cacheKey: any, success: any, totalLoaded: any, totalFiles: any) {
            this.add.tween(this.loadingText).to({ alpha: 0 }, 1000, Phaser.Easing.Exponential.Out, true, 500).onComplete.add(function () {
                this.state.start("MainMenuState", true, false);
            }, this);
        }
    }

}