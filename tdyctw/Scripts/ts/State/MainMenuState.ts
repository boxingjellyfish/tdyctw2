/// <reference path="../../typings/phaser.d.ts"/>

module tdyctw {

    export class MainMenuState extends Phaser.State {
        
        titleText: Phaser.Text;
        optionStartText: Phaser.Text;
        option2Text: Phaser.Text;
        option3Text: Phaser.Text;
        menuMusic: Phaser.Sound;
        hoverSound: Phaser.Sound;
        clickSound: Phaser.Sound;

        inputEnabled: boolean;

        titleStyle: any = { font: "18px 'Nova Mono'", fill: "#00ff00" };
        optionStyle: any = { font: "14px 'Share Tech Mono'", fill: "#00ff00" };

        create() {
            this.inputEnabled = false;
            
            var titleString = this.cache.getJSON("strings")["main_menu_title"];
            this.titleText = this.add.text(this.world.centerX, this.world.centerY, titleString, this.titleStyle);
            this.titleText.anchor.set(0.5);
            this.titleText.alpha = 0;
            
            var optionStartString = this.cache.getJSON("strings")["main_menu_start"];
            this.optionStartText = this.add.text(this.world.centerX, this.world.centerY + 100, optionStartString, this.optionStyle);
            this.optionStartText.anchor.set(0.5);
            this.optionStartText.alpha = 0;
            this.optionStartText.inputEnabled = true;
            this.optionStartText.events.onInputDown.add(this.startGame, this);
            this.optionStartText.events.onInputOver.add(this.playRolloverSound, this);
            
            var option2String = this.cache.getJSON("strings")["main_menu_lorem"];
            this.option2Text = this.add.text(this.world.centerX, this.world.centerY + 125, option2String, this.optionStyle);
            this.option2Text.anchor.set(0.5);
            this.option2Text.alpha = 0;
            this.option2Text.inputEnabled = true;
            this.option2Text.events.onInputOver.add(this.playRolloverSound, this);
            
            var option3String = this.cache.getJSON("strings")["main_menu_ipsum"];
            this.option3Text = this.add.text(this.world.centerX, this.world.centerY + 150, option3String, this.optionStyle);
            this.option3Text.anchor.set(0.5);
            this.option3Text.alpha = 0;
            this.option3Text.inputEnabled = true;
            this.option3Text.events.onInputOver.add(this.playRolloverSound, this);
            
            var fadeInTitle = this.add.tween(this.titleText).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true);
            fadeInTitle.onComplete.add(function () {
                this.add.tween(this.optionStartText).to({ alpha: 0.75 }, 1000, Phaser.Easing.Linear.None, true);
                this.add.tween(this.option2Text).to({ alpha: 0.75 }, 1000, Phaser.Easing.Linear.None, true, 500);
                this.add.tween(this.option3Text).to({ alpha: 0.75 }, 1000, Phaser.Easing.Linear.None, true, 1000).onComplete.add(function () {
                    this.toggleInputEnabled(true);
                }, this);
            }, this);
            
            this.hoverSound = this.add.audio("menuHoverSFX", 1.0);
            this.clickSound = this.add.audio("menuClickSFX", 1.0);
            this.menuMusic = this.add.audio("menuMusic", 0.5, true);
            this.menuMusic.onDecoded.add(this.musicReady, this);

            this.shakeTitle();
        }

        musicReady() {
            this.menuMusic.loopFull();
        }

        update() {
            this.titleText.position = new Phaser.Point(this.world.centerX, this.world.centerY);
            this.optionStartText.position = new Phaser.Point(this.world.centerX, this.world.centerY + 100);
            this.option2Text.position = new Phaser.Point(this.world.centerX, this.world.centerY + 125);
            this.option3Text.position = new Phaser.Point(this.world.centerX, this.world.centerY + 150);

            if (this.inputEnabled) {
                this.optionStartText.alpha = this.optionStartText.input.pointerOver() ? 1 : 0.75;
                this.option2Text.alpha = this.option2Text.input.pointerOver() ? 1 : 0.75;
                this.option3Text.alpha = this.option3Text.input.pointerOver() ? 1 : 0.75;
            }
        }

        startGame() {
            if (this.inputEnabled) {
                this.clickSound.play();
                this.inputEnabled = false;
                this.menuMusic.fadeOut(1000);
                this.add.tween(this.optionStartText).to({ x: this.titleText.x - 5 }, 10, Phaser.Easing.Bounce.InOut, true, 50, 2, true);
                this.add.tween(this.titleText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                this.add.tween(this.option2Text).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
                this.add.tween(this.option3Text).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(function () {
                    this.game.state.start("PlayState", true, false);
                }, this);
            }
        }

        toggleInputEnabled(enabled: boolean) {
            this.inputEnabled = enabled;
        }

        playRolloverSound() {
            if (this.inputEnabled) {
                this.hoverSound.play();
            }
        }

        shakeTitle() {
            /*
            var quake = this.add.tween(this.titleText)
                .to({ x: this.titleText.x - 5 }, this.rnd.between(10,100), Phaser.Easing.Bounce.InOut, false, this.rnd.between(1000,4000), 4, true);

            // we're using this line for the example to run indefinitely
            quake.onComplete.addOnce(this.shakeTitle, this);

            // let the earthquake begins
            quake.start();
            */
        }
    }

}