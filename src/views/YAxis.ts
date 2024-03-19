import { Container, Rectangle, Sprite, Text } from 'pixi.js';

const WIDTH = 519;
const HEIGHT = 52;

const CONFIG = [
    { value: '1.0x', y: 498 },
    { value: '1.2x', y: 403 },
    { value: '1.3x', y: 308 },
    { value: '1.5x', y: 214 },
    { value: '1.7x', y: 117 },
    { value: '1.8x', y: 22 },
];

export class YAxis extends Container {
    private sprite: Sprite;
    private text1: Text;
    private text2: Text;
    private text3: Text;
    private text4: Text;
    private text5: Text;
    private text6: Text;

    constructor() {
        super();

        this.build();
    }

    public getBounds(): Rectangle {
        return new Rectangle(0, 0, WIDTH, HEIGHT);
    }

    private build(): void {
        this.buildYAxes();
        this.buildTexts();
    }

    private buildYAxes(): void {
        this.sprite = Sprite.from('y-axis.png');
        this.addChild(this.sprite);
    }

    private buildTexts(): void {
        this.text1 = this.getTextInstance(CONFIG[0]);
        this.text2 = this.getTextInstance(CONFIG[1]);
        this.text3 = this.getTextInstance(CONFIG[2]);
        this.text4 = this.getTextInstance(CONFIG[3]);
        this.text5 = this.getTextInstance(CONFIG[4]);
        this.text6 = this.getTextInstance(CONFIG[5]);
    }

    private getTextInstance({ value, y }: { value: string; y: number }): Text {
        const text = new Text(value, {
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

    private getMutableTexts(): Text[] {
        return [this.text2, this.text3, this.text4, this.text5, this.text6];
    }
}
