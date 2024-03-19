import { Container, Graphics, LINE_CAP, Rectangle } from 'pixi.js';

const SPEED = 0.001;
const WIDTH = 800;
const HEIGHT = 600;

export class Graph extends Container {
    private startPoint: BezierPoint;
    private endPoint: BezierPoint;
    private endPointTarget: BezierPoint;
    private displacementPoint: BezierPoint;
    private displacementPointTarget1: BezierPoint;
    private displacementPointTarget2: BezierPoint;
    private orangeBkg: Graphics;
    private bezierLine: Graphics;

    private progress = 0;
    // TODO remove points graphics
    private pointsGraphics: Graphics;

    constructor() {
        super();

        this.init();
        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, WIDTH, HEIGHT);
    }

    public update(delta): void {
        this.endPoint.x += (this.endPointTarget.x - this.endPoint.x) * SPEED;
        this.endPoint.y += (this.endPointTarget.y - this.endPoint.y) * SPEED;

        this.progress = this.endPoint.x / this.endPointTarget.x;

        if (this.progress <= 0.6) {
            this.displacementPoint.x += (this.displacementPointTarget1.x - this.displacementPoint.x) * SPEED;
            this.displacementPoint.y += (this.displacementPointTarget1.y - this.displacementPoint.y) * SPEED;
        } else {
            this.displacementPoint.x += (this.displacementPointTarget2.x - this.displacementPoint.x) * (SPEED / 4);
            this.displacementPoint.y += (this.displacementPointTarget2.y - this.displacementPoint.y) * (SPEED / 4);
        }

        this.clearGraphs();
        this.draw();
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

        this.draw();
    }

    private draw(): void {
        this.drawOrangeBkg();
        this.drawWhiteLine();
        this.drawPoints();
    }

    private init(): void {
        this.startPoint = { x: 0, y: HEIGHT, r: 15 };
        this.endPoint = { x: 0, y: HEIGHT, r: 15 };
        this.displacementPoint = { x: 0, y: HEIGHT, r: 15 };

        this.endPointTarget = { x: WIDTH, y: 0, r: 35 };
        this.displacementPointTarget1 = { x: WIDTH / 2, y: HEIGHT / 2, r: 5 };
        this.displacementPointTarget2 = { x: WIDTH * 0.8, y: HEIGHT * 0.8, r: 5 };
    }

    private drawPoints(): void {
        this.pointsGraphics = new Graphics();

        this.pointsGraphics.beginFill(0xff0000, 1);
        this.getPointsArray().forEach((point) => {
            const { x, y, r } = point;
            this.pointsGraphics.drawCircle(x, y, r);
        });

        this.pointsGraphics.endFill();
        this.addChild(this.pointsGraphics);
    }

    private drawOrangeBkg(): void {
        this.orangeBkg = new Graphics();
        this.orangeBkg.beginFill(0xff9e02, 1);
        this.orangeBkg.moveTo(this.startPoint.x, this.startPoint.y);
        this.orangeBkg.bezierCurveTo(
            this.displacementPoint.x,
            this.displacementPoint.y,
            this.displacementPoint.x,
            this.displacementPoint.y,
            this.endPoint.x,
            this.endPoint.y,
        );
        this.orangeBkg.lineTo(this.endPoint.x, HEIGHT);
        this.orangeBkg.lineTo(this.startPoint.x, this.startPoint.y);

        this.addChild(this.orangeBkg);
    }

    private drawWhiteLine(): void {
        this.bezierLine = new Graphics();
        this.bezierLine.lineStyle({
            width: 10,
            color: 0xffffff,
            cap: LINE_CAP.ROUND,
        });
        this.bezierLine.moveTo(this.startPoint.x, this.startPoint.y);
        this.bezierLine.bezierCurveTo(
            this.displacementPoint.x,
            this.displacementPoint.y,
            this.displacementPoint.x,
            this.displacementPoint.y,
            this.endPoint.x,
            this.endPoint.y,
        );
        this.addChild(this.bezierLine);
    }

    private clearGraphs(): void {
        this.orangeBkg.clear();
        this.pointsGraphics.clear();
        this.bezierLine.clear();
    }

    private getPointsArray(): BezierPoint[] {
        return [this.displacementPoint, this.endPoint];
    }
}