/// <reference path="../../typings/phaser.d.ts"/>

module tdyctw {

    export class ZoomCamera extends Phaser.Group {

        public static ZOOM_RESET: number = 1;
        public static ZOOM_CLOSE: number = 1.2;
        public static ZOOM_FAR: number = 0.8;

        static ZOOM_MAX: number = 10;
        static ZOOM_MIN: number = 0.01;
        static ZOOM_STEP: number = 0.1;

        public currentZoom: number;

        zoomInButton: Phaser.Text;
        zoomOutButton: Phaser.Text;
        zoomResetButton: Phaser.Text;

        zoomButtonStyle: any = { font: "20px 'Share Tech Mono'", fill: "#00ff00" };

        constructor(game: Phaser.Game) {
            super(game);
            this.zoomTo(ZoomCamera.ZOOM_RESET);

            this.zoomInButton = this.game.add.text(this.game.world.width - 60, 10, "+", this.zoomButtonStyle);
            this.zoomInButton.inputEnabled = true;
            this.zoomInButton.alpha = 0.75;
            this.zoomInButton.events.onInputDown.add(function () {
                this.zoomIn();
            }, this);

            this.zoomResetButton = this.game.add.text(this.game.world.width - 40, 10, "*", this.zoomButtonStyle);
            this.zoomResetButton.inputEnabled = true;
            this.zoomResetButton.alpha = 0.75;
            this.zoomResetButton.events.onInputDown.add(function () {
                this.zoomTo(ZoomCamera.ZOOM_RESET);
            }, this);

            this.zoomOutButton = this.game.add.text(this.game.world.width - 20, 10, "-", this.zoomButtonStyle);
            this.zoomOutButton.inputEnabled = true;
            this.zoomOutButton.alpha = 0.75;
            this.zoomOutButton.events.onInputDown.add(function () {
                this.zoomOut();
            }, this);
            
            //this.game.scale.setResizeCallback(this.onResize, this);
        }        

        public zoomTo(scale: number) {
            this.currentZoom = scale;
            this.game.add.tween(this.scale).to({ x: scale, y: scale }, 200).start();
        }

        public inputPosition(): Phaser.Point {
            var inverse = 1 / this.currentZoom;
            return this.game.input.position.clone().multiply(inverse, inverse);
        }

        public zoomIn() {
            if (this.currentZoom <= ZoomCamera.ZOOM_MAX) {
                this.zoomTo(this.currentZoom + ZoomCamera.ZOOM_STEP);
            }
        }

        public zoomOut() {
            if (this.currentZoom >= ZoomCamera.ZOOM_MIN) {
                this.zoomTo(this.currentZoom - ZoomCamera.ZOOM_STEP);
            }
        }

        update() {
            this.zoomInButton.alpha = this.zoomInButton.input.pointerOver() ? 1 : 0.75;
            this.zoomResetButton.alpha = this.zoomResetButton.input.pointerOver() ? 1 : 0.75;
            this.zoomOutButton.alpha = this.zoomOutButton.input.pointerOver() ? 1 : 0.75;
            this.zoomInButton.position = new Phaser.Point(this.game.world.width - 60, 10);
            this.zoomResetButton.position = new Phaser.Point(this.game.world.width - 40, 10);
            this.zoomOutButton.position = new Phaser.Point(this.game.world.width - 20, 10);
        }
        
    }

}