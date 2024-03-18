import { Container, Graphics, Rectangle } from 'pixi.js';

export class Graph extends Container {
    private startPoint: BezierPoint;
    private endPoint: BezierPoint;
    private endPointTarget: BezierPoint;
    private displacementPoint: BezierPoint;
    private displacementPointTarget1: BezierPoint;
    private displacementPointTarget2: BezierPoint;
    private bezier: Graphics;

    // TODO remove points graphics
    private pointsGraphics: Graphics;
    private progress = 0;
    constructor() {
        super();

        this.init();
        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, 800, 600);
    }

    public update(delta): void {
        this.endPoint.x += (this.endPointTarget.x - this.endPoint.x) * 0.001;
        this.endPoint.y += (this.endPointTarget.y - this.endPoint.y) * 0.001;

        this.progress = this.endPoint.x / this.endPointTarget.x;

        if (this.progress <= 0.5) {
            this.displacementPoint.x += (this.displacementPointTarget1.x - this.displacementPoint.x) * 0.001;
            this.displacementPoint.y += (this.displacementPointTarget1.y - this.displacementPoint.y) * 0.001;
        } else {
            this.displacementPoint.x += (this.displacementPointTarget2.x - this.displacementPoint.x) * 0.0005;
            this.displacementPoint.y += (this.displacementPointTarget2.y - this.displacementPoint.y) * 0.0005;
        }

        this.clearGraphs();
        this.buildPoints();
        this.buildBezier();
    }

    public rebuild(): void {
        //
    }

    private build(): void {
        const { width, height } = this.getBounds();

        const gr = new Graphics();
        gr.beginFill(0x3344cc, 0.5);
        gr.drawRect(0, 0, width, height);
        gr.endFill();
        this.addChild(gr);

        this.buildPoints();
        this.buildBezier();
    }

    private init(): void {
        this.startPoint = { x: 0, y: 600, r: 15 };
        this.endPoint = { x: 0, y: 600, r: 15 };
        this.displacementPoint = { x: 0, y: 600, r: 15 };

        this.endPointTarget = { x: 800, y: 0, r: 35 };
        this.displacementPointTarget1 = { x: 400, y: 300, r: 5 };
        this.displacementPointTarget2 = { x: 800, y: 600, r: 5 };
    }

    private buildPoints(): void {
        const arr = this.getPointsArray();
        this.pointsGraphics = new Graphics();

        this.pointsGraphics.beginFill(0xff0000, 1);
        arr.forEach((point) => {
            const { x, y, r } = point;
            this.pointsGraphics.drawCircle(x, y, r);
        });

        this.pointsGraphics.endFill();
        this.addChild(this.pointsGraphics);
    }

    private buildBezier(): void {
        this.bezier = new Graphics();
        this.bezier.lineStyle(2, 0x000000, 1);
        this.bezier.moveTo(this.startPoint.x, this.startPoint.y);
        this.bezier.bezierCurveTo(
            this.displacementPoint.x,
            this.displacementPoint.y,
            this.displacementPoint.x,
            this.displacementPoint.y,
            this.endPoint.x,
            this.endPoint.y,
        );

        this.addChild(this.bezier);
    }

    private clearGraphs(): void {
        this.bezier.clear();
        this.pointsGraphics.clear();
    }

    private getPointsArray(): BezierPoint[] {
        return [this.startPoint, this.displacementPoint, this.endPoint];
    }
}
