import { lego } from '@armathai/lego';
import { Container, Rectangle } from 'pixi.js';
import { GameModelEvents } from '../events/ModelEvents';
import { Graph } from './Graph';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';

const WIDTH = 800;
const HEIGHT = 600;

export class Board extends Container {
    private graph: Graph;
    private yAxis: YAxis;
    private xAxis: XAxis;

    constructor() {
        super();
        lego.event.on(GameModelEvents.MultiplierValueUpdate, this.onMultiplierValueUpdate, this);
        lego.event.on(GameModelEvents.TimePassedUpdate, this.onTimeUpdate, this);

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
        this.buildYAxes();
        this.buildXAxes();
        this.buildGraph();
    }

    private buildYAxes(): void {
        this.yAxis = new YAxis();
        this.yAxis.position.set(10, 40);
        this.addChild(this.yAxis);
    }

    private buildXAxes(): void {
        this.xAxis = new XAxis();
        this.xAxis.position.set(80, 580);
        this.addChild(this.xAxis);
    }

    private buildGraph(): void {
        this.graph = new Graph();
        this.graph.position.set(80, 50);
        this.addChild(this.graph);
    }

    private onMultiplierValueUpdate(value: string): void {
        this.yAxis.updateValues(value);
    }

    private onTimeUpdate(time: number): void {
        this.xAxis.updateValues(time);
    }
}
