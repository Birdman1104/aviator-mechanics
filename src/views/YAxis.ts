import { Container, Rectangle, Sprite, Text } from 'pixi.js';
import { getEqualProportionsBetween } from '../Utils';
import { INITIAL_MAX_Y_VALUE } from '../configs/Constants';

const HEIGHT = 519;
const WIDTH = 52;
const PARTITIONS = 6;

const PARTITIONS_Y_POS = [{ y: 498 }, { y: 403 }, { y: 308 }, { y: 214 }, { y: 117 }, { y: 22 }];

export class YAxis extends Container {
    private sprite: Sprite;
    private text1: Text;
    private text2: Text;
    private text3: Text;
    private text4: Text;
    private text5: Text;
    private text6: Text;
    private currentMax = INITIAL_MAX_Y_VALUE;

    constructor() {
        super();

        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, WIDTH, HEIGHT);
    }

    public updateValues(value: string): void {
        const m = +value;
        if (m >= 100) {
            const r = Math.trunc(m).toString().length - 2;
            const scaleX = r / 10 + 1.1;
            this.sprite.scale.set(scaleX, 1);
            this.updateTextPositions();
        }
        if (m - this.currentMax > 0.1) {
            this.currentMax = m;
            this.updateTextValues();
        }
    }

    public reset(): void {
        this.currentMax = INITIAL_MAX_Y_VALUE;
        this.updateTextValues();
        this.sprite.scale.set(1);
        this.updateTextPositions();
    }

    private build(): void {
        this.buildSprite();
        this.buildTexts();
    }

    private buildSprite(): void {
        this.sprite = Sprite.from('y-axis.png');
        this.sprite.anchor.set(0, 0.5);
        this.sprite.position.set(0, HEIGHT / 2);
        this.addChild(this.sprite);
    }

    private buildTexts(): void {
        const values = getEqualProportionsBetween(1, INITIAL_MAX_Y_VALUE, PARTITIONS);
        const config = values.map((v, i) => {
            return { y: PARTITIONS_Y_POS[i].y, value: `${v.toFixed(1)}` };
        });
        this.text1 = this.getTextInstance(config[0]);
        this.text2 = this.getTextInstance(config[1]);
        this.text3 = this.getTextInstance(config[2]);
        this.text4 = this.getTextInstance(config[3]);
        this.text5 = this.getTextInstance(config[4]);
        this.text6 = this.getTextInstance(config[5]);
    }

    private getTextInstance({ value, y }: { value: string; y: number }): Text {
        const text = new Text(`${value}x`, {
            fill: 0xcecece,
            align: 'center',
            fontSize: 18,
            fontWeight: 'bold',
        });
        text.anchor.set(0.5);
        text.position.set(this.sprite.width / 2, y);
        this.addChild(text);
        return text;
    }

    private updateTextPositions(): void {
        this.getMutableTexts().forEach((t) => (t.x = this.sprite.x + this.sprite.width / 2));
    }

    private updateTextValues(): void {
        const values = getEqualProportionsBetween(1, this.currentMax, PARTITIONS);
        this.getMutableTexts().forEach((text, i) => {
            text.text = `${values[i].toFixed(1)}x`;
        });
    }

    private getMutableTexts(): Text[] {
        return [this.text1, this.text2, this.text3, this.text4, this.text5, this.text6];
    }
}
