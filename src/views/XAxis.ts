import { Container, Rectangle, Text } from 'pixi.js';
import { getEqualProportionsBetween } from '../Utils';
import { INITIAL_MAX_X_VALUE } from '../configs/Constants';

const WIDTH = 680;
const HEIGHT = 60;
const PARTITIONS = 6;

const PARTITIONS_X_POS = [{ x: 0 }, { x: 133 }, { x: 266 }, { x: 399 }, { x: 532 }, { x: 665 }];

export class XAxis extends Container {
    private text1: Text;
    private text2: Text;
    private text3: Text;
    private text4: Text;
    private text5: Text;
    private text6: Text;
    private currentMax = INITIAL_MAX_X_VALUE;

    constructor() {
        super();

        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, WIDTH, HEIGHT);
    }

    public updateValues(time: number): void {
        if (time > INITIAL_MAX_X_VALUE) {
            this.currentMax = time;
            this.updateTextValues();
        }

        const values = getEqualProportionsBetween(0, this.currentMax, PARTITIONS);
        this.getMutableTexts().forEach((text, i) => {
            text.text = `${Math.trunc(values[i])}s`;
        });
    }

    public reset(): void {
        this.currentMax = INITIAL_MAX_X_VALUE;
        this.updateTextValues();
    }

    private build(): void {
        this.buildTexts();
    }

    private buildTexts(): void {
        const values = getEqualProportionsBetween(0, INITIAL_MAX_X_VALUE, PARTITIONS);
        const config = values.map((v, i) => {
            return { x: PARTITIONS_X_POS[i].x, value: `${Math.trunc(v)}` };
        });
        this.text1 = this.getTextInstance(config[0]);
        this.text2 = this.getTextInstance(config[1]);
        this.text3 = this.getTextInstance(config[2]);
        this.text4 = this.getTextInstance(config[3]);
        this.text5 = this.getTextInstance(config[4]);
        this.text6 = this.getTextInstance(config[5]);
    }

    private getTextInstance({ value, x }: { value: string; x: number }): Text {
        const text = new Text(`${value}s`, {
            fill: 0xcecece,
            align: 'center',
            fontSize: 18,
            fontWeight: 'bold',
        });
        text.anchor.set(0.5);
        text.position.set(x, 0);
        this.addChild(text);
        return text;
    }

    private updateTextValues(): void {
        const values = getEqualProportionsBetween(1, this.currentMax, PARTITIONS);
        this.getMutableTexts().forEach((text, i) => {
            text.text = `${Math.trunc(values[i])}s`;
        });
    }

    private getMutableTexts(): Text[] {
        return [this.text1, this.text2, this.text3, this.text4, this.text5, this.text6];
    }
}
