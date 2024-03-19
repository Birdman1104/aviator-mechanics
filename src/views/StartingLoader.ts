import { lego } from '@armathai/lego';
import anime from 'animejs';
import { Container, Graphics, Text } from 'pixi.js';
import { START_DURATION } from '../configs/Constants';
import { ForegroundViewEvents } from '../events/MainEvents';

const WIDTH = 500;
const HEIGHT = 100;

export class StartingLoader extends Container {
    private bkg: Graphics;
    private fill: Graphics;
    private text: Text;

    constructor() {
        super();
        this.build();
    }

    public reset(): void {
        this.fill.width = WIDTH;
    }

    public startAnimation(): void {
        anime({
            targets: this.fill,
            width: 0,
            duration: START_DURATION,
            easing: 'linear',
            complete: () => lego.event.emit(ForegroundViewEvents.StartTimerComplete),
        });
    }

    private build(): void {
        this.buildBkg();
        this.buildFill();
        this.buildText();
    }

    private buildBkg(): void {
        this.bkg = new Graphics();
        this.bkg.beginFill(0x2a3c49, 1);
        this.bkg.drawRoundedRect(0, 0, WIDTH, HEIGHT, 20);
        this.bkg.endFill();
        this.addChild(this.bkg);
    }

    private buildFill(): void {
        this.fill = new Graphics();
        this.fill.beginFill(0xf6900a, 1);
        this.fill.drawRoundedRect(0, 0, WIDTH, HEIGHT, 20);
        this.fill.endFill();
        this.addChild(this.fill);
    }

    private buildText(): void {
        this.text = new Text(`Starting in`, {
            fontSize: 55,
            align: 'center',
            fill: 0xffffff,
        });
        this.text.anchor.set(0.5);
        this.text.position.set(WIDTH / 2, HEIGHT / 2);

        this.addChild(this.text);
    }
}
