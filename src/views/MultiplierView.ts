import { lego } from '@armathai/lego';
import { Container, Text } from 'pixi.js';
import { GameModelEvents } from '../events/ModelEvents';

export class MultiplierView extends Container {
    private multiplierText: Text;
    private multiplierTarget: number;

    constructor() {
        super();

        lego.event.on(GameModelEvents.TargetMultiplierUpdate, this.onTargetMultiplierUpdate, this);
        lego.event.on(GameModelEvents.MultiplierValueUpdate, this.onMultiplierValueUpdate, this);
        lego.event.on(GameModelEvents.HasReachedTargetMultiplierUpdate, this.onTargetReach, this);
        this.build();
    }

    public reset(): void {
        this.multiplierText.text = `1.00x`;
        this.multiplierText.style.fill = 0xffffff;
    }

    private build(): void {
        this.multiplierText = new Text(`1.00x`, {
            fontSize: 55,
            align: 'center',
            fill: 0xffffff,
        });
        this.multiplierText.anchor.set(0.5);

        this.addChild(this.multiplierText);
    }

    private onTargetMultiplierUpdate(multiplier: number): void {
        this.multiplierTarget = multiplier;
    }

    private onMultiplierValueUpdate(value: string): void {
        this.multiplierText.text = `${value}x`;
    }

    private onTargetReach(value: boolean): void {
        if (!value) return;
        this.multiplierText.text = `${this.multiplierTarget.toFixed(2)}x`;
        this.multiplierText.style.fill = 0xcc2222;
    }
}
