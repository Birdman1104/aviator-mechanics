import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { Text } from 'pixi.js';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { Graph } from './Graph';

const ACCELERATION = 0.0000005;
export class GameView extends PixiGrid {
    private graph: Graph;
    private state: GameState;

    private multiplierTarget: number;
    private multiplierValue = '1';
    private trueValue = 1;

    private multiplierText: Text;

    private hasReachedTargetMultiplier = false;

    private animationSpeed = 0.001;

    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onStateUpdate, this);
        lego.event.on(GameModelEvents.MultiplierUpdate, this.onMultiplierUpdate, this);
        this.build();
    }

    public update(): void {
        if (this.state === GameState.Action) {
            this.graph?.update();
            this.updateMultiplier();
        }
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.graph = new Graph();
        this.setChild('graph', this.graph);

        this.buildMultiplier();
    }

    private buildMultiplier(): void {
        this.multiplierText = new Text(`1.00x`, {
            fontSize: 55,
            align: 'center',
        });

        this.setChild('multiplier', this.multiplierText);
    }

    private onStateUpdate(newState: GameState): void {
        console.warn(GameState[newState]);

        this.state = newState;

        switch (newState) {
            case GameState.Action:
                // this.startMultiplierTween();
                break;

            default:
                break;
        }
    }

    private onMultiplierUpdate(multiplier: number): void {
        this.multiplierTarget = multiplier;
    }

    private updateMultiplier(): void {
        if (this.hasReachedTargetMultiplier) {
            return;
        }

        this.trueValue += this.animationSpeed;
        this.animationSpeed += ACCELERATION;
        this.multiplierValue = this.trueValue.toFixed(2);
        if (+this.multiplierValue === this.multiplierTarget) {
            this.hasReachedTargetMultiplier = true;
        }

        this.multiplierText.text = `${this.multiplierValue}x`;
    }
}
