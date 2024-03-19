import { Container, Graphics, Text } from 'pixi.js';

const WIDTH = 300;
const HEIGHT = 100;

export class Crashed extends Container {
    private bkg: Graphics;
    private text: Text;

    constructor() {
        super();
        this.build();
    }

    private build(): void {
        this.buildBkg();
        this.buildText();
    }

    private buildBkg(): void {
        this.bkg = new Graphics();
        this.bkg.beginFill(0x2a3c49, 1);
        this.bkg.drawRoundedRect(0, 0, WIDTH, HEIGHT, 20);
        this.bkg.endFill();
        this.addChild(this.bkg);
    }

    private buildText(): void {
        this.text = new Text(`Crashed`, {
            fontSize: 55,
            align: 'center',
            fill: 0xffffff,
        });
        this.text.anchor.set(0.5);
        this.text.position.set(WIDTH / 2, HEIGHT / 2);

        this.addChild(this.text);
    }
}
