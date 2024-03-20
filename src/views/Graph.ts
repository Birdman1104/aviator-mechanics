import { Container, Graphics, LINE_CAP, Rectangle } from 'pixi.js';
import { GRAPH_SPEED, MAX_FPS, ONE_TO_TWO_DURATION } from '../configs/Constants';

const WIDTH = 660;
const HEIGHT = 500;

export class Graph extends Container {
    private startPoint: BezierPoint;
    private endPoint: BezierPoint;
    private endPointTarget: BezierPoint;
    private displacementPoint: BezierPoint;
    private displacementPointTarget1: BezierPoint;
    private displacementPointTarget2: BezierPoint;
    private orangeBkg: Graphics | null;
    private bezierLine: Graphics | null;

    private progress = 0;
    private pointsGraphics: Graphics | null;

    constructor() {
        super();

        this.init();
        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, WIDTH, HEIGHT);
    }

    public reset() {
        this.progress = 0;
        this.removeGraphs();
        this.init();
        this.draw();
    }

    public disable(): void {
        this.clearGraphs();
        this.draw(true);
    }

    public update(): void {
        const dx = (this.endPointTarget.x - this.startPoint.x) / (ONE_TO_TWO_DURATION / MAX_FPS);
        const dy = Math.abs(this.endPointTarget.y - this.startPoint.y) / (ONE_TO_TWO_DURATION / MAX_FPS);

        if (this.endPoint.x < this.endPointTarget.x) {
            this.endPoint.x += dx;
        } else {
            this.endPoint.x = this.endPointTarget.x;
        }

        if (this.endPoint.y > this.endPointTarget.y) {
            this.endPoint.y -= dy;
        } else {
            this.endPoint.y = this.endPointTarget.y;
        }

        this.progress = this.endPoint.x / this.endPointTarget.x;

        if (this.progress <= 0.6 && this.progress > 0.1) {
            this.displacementPoint.x += (this.displacementPointTarget1.x - this.displacementPoint.x) * GRAPH_SPEED;
            this.displacementPoint.y += (this.displacementPointTarget1.y - this.displacementPoint.y) * GRAPH_SPEED;
        } else if (this.progress > 0.6) {
            this.displacementPoint.x +=
                (this.displacementPointTarget2.x - this.displacementPoint.x) * (GRAPH_SPEED / 3);
            this.displacementPoint.y +=
                (this.displacementPointTarget2.y - this.displacementPoint.y) * (GRAPH_SPEED / 3);
        }

        this.clearGraphs();
        this.draw();
    }

    private build(): void {
        this.draw();
    }

    private draw(drawBW = false): void {
        this.drawOrangeBkg(drawBW);
        this.drawWhiteLine(drawBW);
        this.drawPoints();
    }

    private init(): void {
        this.startPoint = { x: 0, y: HEIGHT };
        this.endPoint = { x: 0, y: HEIGHT };
        this.displacementPoint = { x: 0, y: HEIGHT };

        this.endPointTarget = { x: WIDTH, y: 0 };
        this.displacementPointTarget1 = { x: WIDTH / 2, y: HEIGHT / 2 + 100 };
        this.displacementPointTarget2 = { x: WIDTH * 0.9, y: HEIGHT * 0.9 };
    }

    private drawPoints(): void {
        this.pointsGraphics = new Graphics();
        this.pointsGraphics.beginFill(0xffffff, 1);
        this.pointsGraphics.drawCircle(this.endPoint.x, this.endPoint.y, 15);
        this.pointsGraphics.endFill();
        this.addChild(this.pointsGraphics);
    }

    private drawOrangeBkg(drawBW: boolean): void {
        this.orangeBkg = new Graphics();
        this.orangeBkg.beginFill(drawBW ? 0x48555e : 0xff9e02, 1);
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

    private drawWhiteLine(drawBW: boolean): void {
        this.bezierLine = new Graphics();
        this.bezierLine.lineStyle({
            width: 10,
            color: drawBW ? 0x3c4a54 : 0xffffff,
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
        this.orangeBkg?.clear();
        this.pointsGraphics?.clear();
        this.bezierLine?.clear();
    }

    private removeGraphs(): void {
        this.clearGraphs();
        this.orangeBkg = null;
        this.pointsGraphics = null;
        this.bezierLine = null;
    }
}
