/// <reference path="../../typings/phaser.d.ts"/>

module tdyctw {

    export class BootState extends Phaser.State {

        logo: Phaser.Sprite;
        introSound: Phaser.Sound;

        preload() {
            this.load.audio("introSound", "/Content/audio/intro.mp3");
            this.load.image("bjlogo", "/Content/img/bjs-green.png");
        }

        create() {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;

            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            this.time.advancedTiming = true;

            // Stretch to fill
            //this.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

            // Keep original size
            //this.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

            // Maintain aspect ratio
            //this.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

            // Resize
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;

            // Studio logo
            this.logo = this.add.sprite(this.world.centerX, this.world.centerY, "bjlogo");
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.alpha = 0;

            this.introSound = this.game.add.audio("introSound", 0.5);
            this.introSound.play();

            var fadeIn = this.add.tween(this.logo).to({ alpha: 1 }, 1200, Phaser.Easing.Linear.None, true);
            fadeIn.onComplete.add(this.fadeInComplete, this);
        }

        update() {
            this.logo.position = new Phaser.Point(this.world.centerX, this.world.centerY);
        }

        fadeInComplete() {
            var fadeOut = this.add.tween(this.logo).to({ alpha: 0 }, 1200, Phaser.Easing.Linear.None, true, 1000);
            fadeOut.onComplete.add(this.startPreloader, this);
        }

        startPreloader() {
            this.state.start("PreloaderState", true, false);
        }

    }

}