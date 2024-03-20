import { Container, Graphics, Rectangle } from 'pixi.js';
import { Graph } from './Graph';
import { YAxis } from './YAxis';

const WIDTH = 800;
const HEIGHT = 600;

export class Board extends Container {
    private graph: Graph;
    private yAxis: YAxis;

    constructor() {
        super();

        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, WIDTH, HEIGHT);
    }

    public reset() {
        this.graph.reset();
        this.yAxis.reset();
    }

    public disable(): void {
        this.graph.disable();
    }

    public update(): void {
        this.graph?.update();
    }

    private build(): void {
        const { width, height } = this.getBounds();

        const gr = new Graphics();
        gr.beginFill(0x3344cc, 0.5);
        gr.drawRect(0, 0, width, height);
        gr.endFill();
        this.addChild(gr);

        this.buildYAxes();
        this.buildGraph();
    }

    private buildYAxes(): void {
        this.yAxis = new YAxis();
        this.yAxis.position.set(10, 40);
        this.addChild(this.yAxis);
    }

    private buildGraph(): void {
        this.graph = new Graph();
        this.graph.position.set(80, 40);
        this.addChild(this.graph);
    }
}
