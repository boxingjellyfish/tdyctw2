/// <reference path="../../typings/phaser.d.ts"/>
/// <reference path="../../typings/voronoi.d.ts"/>
/// <reference path="../../typings/delaunay.d.ts"/>
/// <reference path="../../typings/jquery.d.ts"/>

module tdyctw {

    export class PlayState extends Phaser.State {

        debugText: Phaser.Text;
        bases: Phaser.Sprite[];
        selectedBase: Phaser.Sprite;
        selectedBaseIndex: number;
        trailLine: Phaser.Graphics;
        trailOffset: number = 0;
        trailOffsetIncrement: number = 0.5;
        trailLength: number = 4;
        trailWidth: number = 1;
        zoomCamera: ZoomCamera;
        selectSound: Phaser.Sound;
        voronoiDiagram: any;
        voronoiPoints: any[];
        delaunayDiagram: any[];
        delaunayPoints: any[];
        voronoiDebug: Phaser.Graphics;

        serverVoronoi: any;

        create() {
            this.selectSound = this.add.audio("baseSelectSFX", 1.0);

            var debugTextStyle = { font: "12px 'Share Tech Mono'", fill: "#00ff00" };
            this.debugText = this.add.text(0, 0, "", debugTextStyle);

            this.zoomCamera = new ZoomCamera(this.game);
            this.add.existing(this.zoomCamera);

            this.bases = [];
            for (var i = 0; i < 4; i++) {
                this.addBase(this.rnd.integerInRange(50, this.world.width - 50), this.rnd.integerInRange(50, this.world.height - 50));
            }

            this.input.onDown.add(function (sprite: BaseSprite, pointer: any) {
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
            //this.generateMap();
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
        }
        
        update() {
            // Voronoi
            this.voronoiDebug.clear();

            this.updateClientVoronoi();

            this.updateServerVoronoi();

            this.trailLine.clear();
            this.trailLine.lineStyle(this.trailWidth, 0x008800, 1.0);
            // this.debugText.text = "FPS: " + this.time.fps + "|" + this.input.position + "|" + this.zoomCamera.inputPosition();
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

        }

        updateServerVoronoi() {
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
        }

        updateClientVoronoi() {
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
        }

        addBase(x: number, y: number) {
            var base = new BaseSprite(this.game, this.rnd.integerInRange(50, this.world.width - 50), this.rnd.integerInRange(50, this.world.height - 50));
            base.baseIndex = this.bases.length;
            base.events.onInputDown.add(function (sprite: BaseSprite, pointer: any) {
                this.selectSound.play();
                sprite.animations.play("pulse", 6, true);
                this.selectedBase = sprite;
                this.selectedBaseIndex = sprite.baseIndex;
            }, this);
            this.bases.push(base);
            this.zoomCamera.add(base);
        }

        generateMap() {
            var voronoi = new Voronoi();
            var bbox = { xl: 10, xr: this.world.width - 10, yt: 10, yb: this.world.height - 10 };
            this.voronoiPoints = [];
            this.delaunayPoints = [];
            /*
            while (this.voronoiPoints.length < 200) {
                var x = this.rnd.integerInRange(10, this.world.width - 10);
                var y = this.rnd.integerInRange(10, this.world.height - 10);
                this.voronoiPoints.push({ x: x, y: y });
                this.delaunayPoints.push([x, y]);
            }
            */
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
        }

        relax() {
            var cells = this.voronoiDiagram.cells,
                iCell = cells.length,
                cell,
                site, sites = [],
                again = false,
                rn, dist;
            var p = 1 / iCell * 0.1;
            while (iCell--) {
                cell = cells[iCell];
                rn = Math.random();
                // probability of apoptosis
                if (rn < p) {
                    continue;
                }
                site = this.cellCentroid(cell);
                dist = this.distance(site, cell.site);
                again = again || dist > 1;
                // don't relax too fast
                if (dist > 2) {
                    site.x = (site.x + cell.site.x) / 2;
                    site.y = (site.y + cell.site.y) / 2;
                }
                // probability of mytosis
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
        }

        distance(a: any, b: any) {
            var dx = a.x - b.x,
                dy = a.y - b.y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        cellCentroid(cell: any) {
            var x = 0, y = 0,
                halfedges = cell.halfedges,
                iHalfedge = halfedges.length,
                halfedge,
                v, p1, p2;
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
        }

        cellArea(cell: any) {
            var area = 0,
                halfedges = cell.halfedges,
                iHalfedge = halfedges.length,
                halfedge,
                p1, p2;
            while (iHalfedge--) {
                halfedge = halfedges[iHalfedge];
                p1 = halfedge.getStartpoint();
                p2 = halfedge.getEndpoint();
                area += p1.x * p2.y;
                area -= p1.y * p2.x;
            }
            area /= 2;
            return area;
        }
    }

}