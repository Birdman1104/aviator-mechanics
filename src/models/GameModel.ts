import { delayRunnable, loopRunnable, removeRunnable } from '../Utils';
import { ACCELERATION, MULTIPLIERS_CHECKPOINTS, MULTIPLIER_SPEED, RND_CHECKPOINTS } from '../configs/Constants';
import { ObservableModel } from './ObservableModel';

export enum GameState {
    Unknown,
    Starting,
    Action,
    Crash,
}

export class GameModel extends ObservableModel {
    private _state: GameState;
    private _targetMultiplier: number = -1;
    private intervalsData: IntervalsData[] = [];

    private _hasReachedTargetMultiplier = false;
    private animationSpeed = MULTIPLIER_SPEED;
    private _multiplierValue = '1.00';
    private trueValue = 1;

    constructor() {
        super('GameModel');

        this._state = GameState.Unknown;
        this.makeObservable('_state', '_targetMultiplier', '_hasReachedTargetMultiplier', '_multiplierValue');
    }

    get state(): GameState {
        return this._state;
    }

    set state(value: GameState) {
        this._state = value;
    }

    get targetMultiplier(): number {
        return this._targetMultiplier;
    }

    set targetMultiplier(value: number) {
        this._targetMultiplier = value;
    }

    get multiplierValue(): string {
        return this._multiplierValue;
    }

    set multiplierValue(value: string) {
        this._multiplierValue = value;
    }

    get hasReachedTargetMultiplier(): boolean {
        return this._hasReachedTargetMultiplier;
    }

    set hasReachedTargetMultiplier(value: boolean) {
        this._hasReachedTargetMultiplier = value;
    }

    public init(): void {
        this.initIntervalsData();
        this._state = GameState.Starting;
    }

    public prepareForAction(): void {
        this.setNewMultiplier();

        this._hasReachedTargetMultiplier = false;
        this.animationSpeed = MULTIPLIER_SPEED;
        this._multiplierValue = '1.00';
        this.trueValue = 1;
    }

    public setToActionState(): void {
        this._state = GameState.Action;
    }

    public setToCrashState(): void {
        this._state = GameState.Crash;
    }

    public setToStartingState(): void {
        this._state = GameState.Starting;
    }

    public setTimerForStarting(): void {
        delayRunnable(3, this.setToStartingState, this);
    }

    public startMultiplierUpdate(): void {
        loopRunnable(this.updateMultiplier, this);
    }

    private setNewMultiplier(): void {
        this._targetMultiplier = this.getMultiplier();
    }

    private initIntervalsData(): void {
        MULTIPLIERS_CHECKPOINTS.forEach((m, i) => {
            this.intervalsData.push({
                minM: m,
                maxM: MULTIPLIERS_CHECKPOINTS[i + 1],
                minR: RND_CHECKPOINTS[i],
                maxR: RND_CHECKPOINTS[i + 1],
            });
        });
    }

    private updateMultiplier(): void {
        if (this._hasReachedTargetMultiplier) return;
        this.trueValue += this.animationSpeed;
        if (this.trueValue > 2) {
            this.animationSpeed += ACCELERATION;
        }
        this._multiplierValue = this.trueValue.toFixed(2);

        if (+this._multiplierValue >= this._targetMultiplier) {
            this._hasReachedTargetMultiplier = true;
            removeRunnable(this.updateMultiplier, this);

            return;
        }
    }

    private getMultiplier(): number {
        /*
         * probability of wining
         * 36% to get multiplier between [1, 5]
         * 19% to get multiplier between [5, 10]
         * 18% to get multiplier between [10, 20]
         * 8% to get multiplier between [20, 50]
         * 7% to get multiplier between [50, 100]
         * 5% to get multiplier between [100, 1000]
         * 4% to get multiplier between [1000, 10000]
         * 2% to get multiplier between [10000, 100000]
         * 1% to get multiplier between [100000, 1000000]
         */

        const r = Math.random();
        const data = this.intervalsData.find((data) => data.minR <= r && data.maxR >= r) as IntervalsData;

        return +(Math.random() * (data.maxM - data.minM) + data.minM).toFixed(2);
    }
}
