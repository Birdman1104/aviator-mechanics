import { lego } from '@armathai/lego';
import { Container, Text } from 'pixi.js';
import { ACCELERATION, MULTIPLIER_SPEED } from '../configs/Constants';
import { MultiplierEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';

export class MultiplierView extends Container {
    private multiplierText: Text;
    private multiplierTarget: number;
    private multiplierValue = '1';
    private trueValue = 1;
    private hasReachedTargetMultiplier = false;
    private animationSpeed = MULTIPLIER_SPEED;

    constructor() {
        super();

        lego.event.on(GameModelEvents.MultiplierUpdate, this.onMultiplierUpdate, this);
        this.build();
    }

    public update(): void {
        this.updateMultiplier();
    }

    public reset(): void {
        this.multiplierValue = '1';
        this.trueValue = 1;
        this.hasReachedTargetMultiplier = false;
        this.animationSpeed = MULTIPLIER_SPEED;
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

    private onMultiplierUpdate(multiplier: number): void {
        this.multiplierTarget = multiplier;
    }

    private updateMultiplier(): void {
        if (this.hasReachedTargetMultiplier) return;

        this.trueValue += this.animationSpeed;
        this.animationSpeed += ACCELERATION;
        this.multiplierValue = this.trueValue.toFixed(2);
        this.multiplierText.text = `${this.multiplierValue}x`;

        if (+this.multiplierValue >= this.multiplierTarget) {
            this.hasReachedTargetMultiplier = true;
            this.multiplierText.text = `${this.multiplierTarget.toFixed(2)}x`;
            this.multiplierText.style.fill = 0xcc2222;

            lego.event.emit(MultiplierEvents.TargetReached);
            return;
        }
    }
}
