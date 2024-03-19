import { MULTIPLIERS_CHECKPOINTS, RND_CHECKPOINTS } from '../configs/Constants';
import { ObservableModel } from './ObservableModel';

export enum GameState {
    Unknown,
    Starting,
    Action,
    Crash,
}

export class GameModel extends ObservableModel {
    private _state: GameState;
    private _multiplier: number = -1;
    private intervalsData: IntervalsData[] = [];

    constructor() {
        super('GameModel');

        this._state = GameState.Unknown;
        this.makeObservable();
    }

    get state(): GameState {
        return this._state;
    }

    set state(value: GameState) {
        this._state = value;
    }

    get multiplier(): number {
        return this._multiplier;
    }

    set multiplier(value: number) {
        this._multiplier = value;
    }

    public init(): void {
        this.initIntervalsData();
        this._state = GameState.Starting;
    }

    public setNewMultiplier(): void {
        this._multiplier = this.getMultiplier();
    }

    public setToActionState(): void {
        this._state = GameState.Action;
    }

    public setToCrashState(): void {
        this._state = GameState.Crash;
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
