var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var tdyctw;
(function (tdyctw) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game(width, height) {
            var _this = _super.call(this, width, height, Phaser.AUTO, "gameContainer", null) || this;
            _this.state.add("BootState", tdyctw.BootState, false);
            _this.state.add("PreloaderState", tdyctw.PreloaderState, false);
            _this.state.add("MainMenuState", tdyctw.MainMenuState, false);
            _this.state.add("PlayState", tdyctw.PlayState, false);
            _this.state.start("BootState");
            return _this;
        }
        return Game;
    }(Phaser.Game));
    tdyctw.Game = Game;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var Test = (function () {
        function Test() {
        }
        Test.generateUID = function () {
            var firstPart = (Math.random() * 46656) | 0;
            var secondPart = (Math.random() * 46656) | 0;
            var firstPartString = ("000" + firstPart.toString(36)).slice(-3);
            var secondPartString = ("000" + secondPart.toString(36)).slice(-3);
            return firstPartString + secondPartString;
        };
        return Test;
    }());
    tdyctw.Test = Test;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var Misc = (function () {
        function Misc() {
        }
        Misc.generateUID = function () {
            var firstPart = (Math.random() * 46656) | 0;
            var secondPart = (Math.random() * 46656) | 0;
            var firstPartString = ("000" + firstPart.toString(36)).slice(-3);
            var secondPartString = ("000" + secondPart.toString(36)).slice(-3);
            return firstPartString + secondPartString;
        };
        return Misc;
    }());
    tdyctw.Misc = Misc;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var ZoomCamera = (function (_super) {
        __extends(ZoomCamera, _super);
        function ZoomCamera(game) {
            var _this = _super.call(this, game) || this;
            _this.zoomButtonStyle = { font: "20px 'Share Tech Mono'", fill: "#00ff00" };
            _this.zoomTo(ZoomCamera.ZOOM_RESET);
            _this.zoomInButton = _this.game.add.text(_this.game.world.width - 60, 10, "+", _this.zoomButtonStyle);
            _this.zoomInButton.inputEnabled = true;
            _this.zoomInButton.alpha = 0.75;
            _this.zoomInButton.events.onInputDown.add(function () {
                this.zoomIn();
            }, _this);
            _this.zoomResetButton = _this.game.add.text(_this.game.world.width - 40, 10, "*", _this.zoomButtonStyle);
            _this.zoomResetButton.inputEnabled = true;
            _this.zoomResetButton.alpha = 0.75;
            _this.zoomResetButton.events.onInputDown.add(function () {
                this.zoomTo(ZoomCamera.ZOOM_RESET);
            }, _this);
            _this.zoomOutButton = _this.game.add.text(_this.game.world.width - 20, 10, "-", _this.zoomButtonStyle);
            _this.zoomOutButton.inputEnabled = true;
            _this.zoomOutButton.alpha = 0.75;
            _this.zoomOutButton.events.onInputDown.add(function () {
                this.zoomOut();
            }, _this);
            return _this;
        }
        ZoomCamera.prototype.zoomTo = function (scale) {
            this.currentZoom = scale;
            this.game.add.tween(this.scale).to({ x: scale, y: scale }, 200).start();
        };
        ZoomCamera.prototype.inputPosition = function () {
            var inverse = 1 / this.currentZoom;
            return this.game.input.position.clone().multiply(inverse, inverse);
        };
        ZoomCamera.prototype.zoomIn = function () {
            if (this.currentZoom <= ZoomCamera.ZOOM_MAX) {
                this.zoomTo(this.currentZoom + ZoomCamera.ZOOM_STEP);
            }
        };
        ZoomCamera.prototype.zoomOut = function () {
            if (this.currentZoom >= ZoomCamera.ZOOM_MIN) {
                this.zoomTo(this.currentZoom - ZoomCamera.ZOOM_STEP);
            }
        };
        ZoomCamera.prototype.update = function () {
            this.zoomInButton.alpha = this.zoomInButton.input.pointerOver() ? 1 : 0.75;
            this.zoomResetButton.alpha = this.zoomResetButton.input.pointerOver() ? 1 : 0.75;
            this.zoomOutButton.alpha = this.zoomOutButton.input.pointerOver() ? 1 : 0.75;
            this.zoomInButton.position = new Phaser.Point(this.game.world.width - 60, 10);
            this.zoomResetButton.position = new Phaser.Point(this.game.world.width - 40, 10);
            this.zoomOutButton.position = new Phaser.Point(this.game.world.width - 20, 10);
        };
        return ZoomCamera;
    }(Phaser.Group));
    ZoomCamera.ZOOM_RESET = 1;
    ZoomCamera.ZOOM_CLOSE = 1.2;
    ZoomCamera.ZOOM_FAR = 0.8;
    ZoomCamera.ZOOM_MAX = 10;
    ZoomCamera.ZOOM_MIN = 0.01;
    ZoomCamera.ZOOM_STEP = 0.1;
    tdyctw.ZoomCamera = ZoomCamera;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var BootState = (function (_super) {
        __extends(BootState, _super);
        function BootState() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        BootState.prototype.preload = function () {
            this.load.audio("introSound", "/Content/audio/intro.mp3");
            this.load.image("bjlogo", "/Content/img/bjs-green.png");
        };
        BootState.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;
            this.time.advancedTiming = true;
            this.scale.fullScreenScaleMode = Phaser.ScaleManager.RESIZE;
            this.logo = this.add.sprite(this.world.centerX, this.world.centerY, "bjlogo");
            this.logo.anchor.setTo(0.5, 0.5);
            this.logo.alpha = 0;
            this.introSound = this.game.add.audio("introSound", 0.5);
            this.introSound.play();
            var fadeIn = this.add.tween(this.logo).to({ alpha: 1 }, 1200, Phaser.Easing.Linear.None, true);
            fadeIn.onComplete.add(this.fadeInComplete, this);
        };
        BootState.prototype.update = function () {
            this.logo.position = new Phaser.Point(this.world.centerX, this.world.centerY);
        };
        BootState.prototype.fadeInComplete = function () {
            var fadeOut = this.add.tween(this.logo).to({ alpha: 0 }, 1200, Phaser.Easing.Linear.None, true, 1000);
            fadeOut.onComplete.add(this.startPreloader, this);
        };
        BootState.prototype.startPreloader = function () {
            this.state.start("PreloaderState", true, false);
        };
        return BootState;
    }(Phaser.State));
    tdyctw.BootState = BootState;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var MainMenuState = (function (_super) {
        __extends(MainMenuState, _super);
        function MainMenuState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.titleStyle = { font: "18px 'Nova Mono'", fill: "#00ff00" };
            _this.optionStyle = { font: "14px 'Share Tech Mono'", fill: "#00ff00" };
            return _this;
        }
        MainMenuState.prototype.create = function () {
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
        };
        MainMenuState.prototype.musicReady = function () {
            this.menuMusic.loopFull();
        };
        MainMenuState.prototype.update = function () {
            this.titleText.position = new Phaser.Point(this.world.centerX, this.world.centerY);
            this.optionStartText.position = new Phaser.Point(this.world.centerX, this.world.centerY + 100);
            this.option2Text.position = new Phaser.Point(this.world.centerX, this.world.centerY + 125);
            this.option3Text.position = new Phaser.Point(this.world.centerX, this.world.centerY + 150);
            if (this.inputEnabled) {
                this.optionStartText.alpha = this.optionStartText.input.pointerOver() ? 1 : 0.75;
                this.option2Text.alpha = this.option2Text.input.pointerOver() ? 1 : 0.75;
                this.option3Text.alpha = this.option3Text.input.pointerOver() ? 1 : 0.75;
            }
        };
        MainMenuState.prototype.startGame = function () {
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
        };
        MainMenuState.prototype.toggleInputEnabled = function (enabled) {
            this.inputEnabled = enabled;
        };
        MainMenuState.prototype.playRolloverSound = function () {
            if (this.inputEnabled) {
                this.hoverSound.play();
            }
        };
        MainMenuState.prototype.shakeTitle = function () {
        };
        return MainMenuState;
    }(Phaser.State));
    tdyctw.MainMenuState = MainMenuState;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var PlayState = (function (_super) {
        __extends(PlayState, _super);
        function PlayState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.trailOffset = 0;
            _this.trailOffsetIncrement = 0.5;
            _this.trailLength = 4;
            _this.trailWidth = 1;
            return _this;
        }
        PlayState.prototype.create = function () {
            this.selectSound = this.add.audio("baseSelectSFX", 1.0);
            var debugTextStyle = { font: "12px 'Share Tech Mono'", fill: "#00ff00" };
            this.debugText = this.add.text(0, 0, "", debugTextStyle);
            this.zoomCamera = new tdyctw.ZoomCamera(this.game);
            this.add.existing(this.zoomCamera);
            this.bases = [];
            for (var i = 0; i < 4; i++) {
                this.addBase(this.rnd.integerInRange(50, this.world.width - 50), this.rnd.integerInRange(50, this.world.height - 50));
            }
            this.input.onDown.add(function (sprite, pointer) {
                for (var i = 0; i < this.bases.length; i++) {
                    this.bases[i].animations.stop(null, true);
                    this.selectedBase = null;
                    this.selectedBaseIndex = -1;
                }
            }, this);
            this.trailLine = this.add.graphics(0, 0);
            this.trailOffset = 0;
            this.voronoiPoints = [];
            this.delaunayPoints = [];
            this.voronoiDebug = new Phaser.Graphics(this.game, 0, 0);
            this.zoomCamera.add(this.voronoiDebug);
            $.ajax({
                url: "/play/generateFixedMap",
                context: this,
                success: function (data) {
                    console.log(data);
                    this.serverVoronoi = data;
                }
            });
        };
        PlayState.prototype.update = function () {
            this.voronoiDebug.clear();
            this.updateClientVoronoi();
            this.updateServerVoronoi();
            this.trailLine.clear();
            this.trailLine.lineStyle(this.trailWidth, 0x008800, 1.0);
            if (this.selectedBase != null) {
                var zoom = this.zoomCamera.currentZoom;
                var basePosition = this.selectedBase.position.clone().multiply(zoom, zoom);
                var draw = true;
                var point = basePosition.clone();
                var norm = Phaser.Point.subtract(this.game.input.position, basePosition).normalize().setMagnitude(this.trailLength);
                var offset = norm.clone().setMagnitude(this.trailOffset);
                point.add(offset.x, offset.y);
                while (Phaser.Point.distance(basePosition, point) < Phaser.Point.distance(basePosition, this.game.input.position)) {
                    this.trailLine.moveTo(point.x, point.y);
                    point.add(norm.x, norm.y);
                    if (draw) {
                        this.trailLine.lineTo(point.x, point.y);
                    }
                    draw = !draw;
                }
                this.trailOffset += this.trailOffsetIncrement;
                if (this.trailOffset >= this.trailLength * 2) {
                    this.trailOffset = 0;
                }
            }
        };
        PlayState.prototype.updateServerVoronoi = function () {
            if (this.serverVoronoi) {
                this.voronoiDebug.lineStyle(1, 0x0000ff, 1);
                for (var i = 0; i < this.serverVoronoi.Diagram.length; i++) {
                    var p = this.serverVoronoi.Diagram[i];
                    this.voronoiDebug.moveTo(p.p0.x, p.p0.y);
                    this.voronoiDebug.lineTo(p.p1.x, p.p1.y);
                }
                this.voronoiDebug.lineStyle(1, 0xff0000, 1);
                for (var i = 0; i < this.serverVoronoi.HullPoints.length; i++) {
                    var p = this.serverVoronoi.HullPoints[i];
                    this.voronoiDebug.moveTo(p.x - 2, p.y - 2);
                    this.voronoiDebug.lineTo(p.x + 2, p.y + 2);
                    this.voronoiDebug.moveTo(p.x + 2, p.y - 2);
                    this.voronoiDebug.lineTo(p.x - 2, p.y + 2);
                }
            }
        };
        PlayState.prototype.updateClientVoronoi = function () {
            if (this.voronoiDiagram) {
                this.voronoiDebug.lineStyle(1, 0xffffff, 1);
                for (var i = 0; i < this.voronoiPoints.length; i++) {
                    var p = this.voronoiPoints[i];
                    this.voronoiDebug.moveTo(p.x, p.y);
                    this.voronoiDebug.lineTo(p.x + 1, p.y + 1);
                }
                this.voronoiDebug.lineStyle(1, 0x0000ff, 1);
                for (var i = 0; i < this.voronoiDiagram.edges.length; i++) {
                    var e = this.voronoiDiagram.edges[i];
                    if (e.va.x > 0 && e.va.y > 0 && e.vb.x > 0 && e.vb.y > 0 &&
                        e.va.x < this.world.width && e.va.y < this.world.height && e.vb.x < this.world.width && e.vb.y < this.world.height) {
                        this.voronoiDebug.moveTo(e.va.x, e.va.y);
                        this.voronoiDebug.lineTo(e.vb.x, e.vb.y);
                    }
                }
                this.voronoiDebug.lineStyle(1, 0xff0000, 1);
                for (var i = 0; i < this.voronoiDiagram.vertices.length; i++) {
                    var v = this.voronoiDiagram.vertices[i];
                    if (v.x > 0 && v.y > 0 && v.x < this.world.width && v.y < this.world.height) {
                        this.voronoiDebug.moveTo(v.x, v.y);
                        this.voronoiDebug.lineTo(v.x + 1, v.y + 1);
                    }
                }
                this.voronoiDebug.lineStyle(1, 0xff00ff, 1);
                for (var i = this.delaunayDiagram.length; i;) {
                    --i;
                    var p1 = new Phaser.Point(this.delaunayPoints[this.delaunayDiagram[i]][0], this.delaunayPoints[this.delaunayDiagram[i]][1]);
                    --i;
                    var p2 = new Phaser.Point(this.delaunayPoints[this.delaunayDiagram[i]][0], this.delaunayPoints[this.delaunayDiagram[i]][1]);
                    --i;
                    var p3 = new Phaser.Point(this.delaunayPoints[this.delaunayDiagram[i]][0], this.delaunayPoints[this.delaunayDiagram[i]][1]);
                    this.voronoiDebug.moveTo(p1.x, p1.y);
                    this.voronoiDebug.lineTo(p2.x, p2.y);
                    this.voronoiDebug.lineTo(p3.x, p3.y);
                    this.voronoiDebug.lineTo(p1.x, p1.y);
                }
            }
        };
        PlayState.prototype.addBase = function (x, y) {
            var base = new tdyctw.BaseSprite(this.game, this.rnd.integerInRange(50, this.world.width - 50), this.rnd.integerInRange(50, this.world.height - 50));
            base.baseIndex = this.bases.length;
            base.events.onInputDown.add(function (sprite, pointer) {
                this.selectSound.play();
                sprite.animations.play("pulse", 6, true);
                this.selectedBase = sprite;
                this.selectedBaseIndex = sprite.baseIndex;
            }, this);
            this.bases.push(base);
            this.zoomCamera.add(base);
        };
        PlayState.prototype.generateMap = function () {
            var voronoi = new Voronoi();
            var bbox = { xl: 10, xr: this.world.width - 10, yt: 10, yb: this.world.height - 10 };
            this.voronoiPoints = [];
            this.delaunayPoints = [];
            this.voronoiPoints.push({ x: 100, y: 100 });
            this.delaunayPoints.push([100, 100]);
            this.voronoiPoints.push({ x: 200, y: 300 });
            this.delaunayPoints.push([200, 300]);
            this.voronoiPoints.push({ x: 40, y: 60 });
            this.delaunayPoints.push([40, 60]);
            this.voronoiPoints.push({ x: 50, y: 150 });
            this.delaunayPoints.push([50, 150]);
            this.voronoiPoints.push({ x: 256, y: 123 });
            this.delaunayPoints.push([256, 123]);
            this.voronoiPoints.push({ x: 545, y: 411 });
            this.delaunayPoints.push([545, 411]);
            this.voronoiDiagram = voronoi.compute(this.voronoiPoints, bbox);
            this.delaunayDiagram = Delaunay.triangulate(this.delaunayPoints);
            for (var i = 0; i < 1; i++) {
                this.relax();
            }
        };
        PlayState.prototype.relax = function () {
            var cells = this.voronoiDiagram.cells, iCell = cells.length, cell, site, sites = [], again = false, rn, dist;
            var p = 1 / iCell * 0.1;
            while (iCell--) {
                cell = cells[iCell];
                rn = Math.random();
                if (rn < p) {
                    continue;
                }
                site = this.cellCentroid(cell);
                dist = this.distance(site, cell.site);
                again = again || dist > 1;
                if (dist > 2) {
                    site.x = (site.x + cell.site.x) / 2;
                    site.y = (site.y + cell.site.y) / 2;
                }
                if (rn > (1 - p)) {
                    dist /= 2;
                    sites.push({
                        x: site.x + (site.x - cell.site.x) / dist,
                        y: site.y + (site.y - cell.site.y) / dist,
                    });
                }
                sites.push(site);
            }
            var voronoi = new Voronoi();
            var bbox = { xl: 10, xr: this.world.width - 10, yt: 10, yb: this.world.height - 10 };
            this.voronoiPoints = sites;
            this.voronoiDiagram = voronoi.compute(this.voronoiPoints, bbox);
            this.delaunayPoints = [];
            for (var i = 0; i < this.voronoiPoints.length; i++) {
                this.delaunayPoints.push([this.voronoiPoints[i].x, this.voronoiPoints[i].y]);
            }
            this.delaunayDiagram = Delaunay.triangulate(this.delaunayPoints);
        };
        PlayState.prototype.distance = function (a, b) {
            var dx = a.x - b.x, dy = a.y - b.y;
            return Math.sqrt(dx * dx + dy * dy);
        };
        PlayState.prototype.cellCentroid = function (cell) {
            var x = 0, y = 0, halfedges = cell.halfedges, iHalfedge = halfedges.length, halfedge, v, p1, p2;
            while (iHalfedge--) {
                halfedge = halfedges[iHalfedge];
                p1 = halfedge.getStartpoint();
                p2 = halfedge.getEndpoint();
                v = p1.x * p2.y - p2.x * p1.y;
                x += (p1.x + p2.x) * v;
                y += (p1.y + p2.y) * v;
            }
            v = this.cellArea(cell) * 6;
            return { x: x / v, y: y / v };
        };
        PlayState.prototype.cellArea = function (cell) {
            var area = 0, halfedges = cell.halfedges, iHalfedge = halfedges.length, halfedge, p1, p2;
            while (iHalfedge--) {
                halfedge = halfedges[iHalfedge];
                p1 = halfedge.getStartpoint();
                p2 = halfedge.getEndpoint();
                area += p1.x * p2.y;
                area -= p1.y * p2.x;
            }
            area /= 2;
            return area;
        };
        return PlayState;
    }(Phaser.State));
    tdyctw.PlayState = PlayState;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var PreloaderState = (function (_super) {
        __extends(PreloaderState, _super);
        function PreloaderState() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.loadingStyle = { font: "14px 'Share Tech Mono'", fill: "#00ff00" };
            return _this;
        }
        PreloaderState.prototype.preload = function () {
            var titleString = PreloaderState.LOADING_MESSAGE.replace("{0}", "0");
            this.loadingText = this.add.text(this.world.centerX, this.world.centerY, titleString, this.loadingStyle);
            this.loadingText.anchor.set(0.5);
            this.load.onFileComplete.add(this.fileComplete, this);
            this.load.onLoadComplete.add(this.loadComplete, this);
            this.load.json("strings", "/Content/txt/strings_en.json");
            this.load.image("base", "/Content/img/base.png");
            this.load.spritesheet("baseSprite", "/Content/img/base_sprite.png", 32, 32, 2);
            this.load.audio("menuMusic", "/Content/audio/menu.mp3", true);
            this.load.audio("menuHoverSFX", "/Content/audio/beep-29.wav");
            this.load.audio("menuClickSFX", "/Content/audio/button-35.wav");
            this.load.audio("baseSelectSFX", "/Content/audio/button-33a.wav");
        };
        PreloaderState.prototype.create = function () {
        };
        PreloaderState.prototype.update = function () {
            this.loadingText.position = new Phaser.Point(this.world.centerX, this.world.centerY);
        };
        PreloaderState.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.loadingText.text = PreloaderState.LOADING_MESSAGE.replace("{0}", progress);
        };
        PreloaderState.prototype.loadComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
            this.add.tween(this.loadingText).to({ alpha: 0 }, 1000, Phaser.Easing.Exponential.Out, true, 500).onComplete.add(function () {
                this.state.start("MainMenuState", true, false);
            }, this);
        };
        return PreloaderState;
    }(Phaser.State));
    PreloaderState.LOADING_MESSAGE = "LOADING: {0}%";
    tdyctw.PreloaderState = PreloaderState;
})(tdyctw || (tdyctw = {}));
var tdyctw;
(function (tdyctw) {
    var BaseSprite = (function (_super) {
        __extends(BaseSprite, _super);
        function BaseSprite(game, x, y) {
            var _this = _super.call(this, game, x, y, "baseSprite") || this;
            _this.anchor.setTo(0.5, 0.5);
            _this.inputEnabled = true;
            _this.animations.add("pulse");
            return _this;
        }
        BaseSprite.prototype.update = function () {
        };
        return BaseSprite;
    }(Phaser.Sprite));
    tdyctw.BaseSprite = BaseSprite;
})(tdyctw || (tdyctw = {}));
//# sourceMappingURL=tdyctw.js.map