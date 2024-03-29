import { delayRunnable, loopRunnable, removeRunnable } from '../Utils';
import {
    ACCELERATION,
    MAX_FPS,
    MULTIPLIERS_CHECKPOINTS,
    MULTIPLIER_SPEED,
    RND_CHECKPOINTS,
    START_DURATION,
    TIME_FOR_RESTART,
} from '../configs/Constants';
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
    private _startingIn = START_DURATION;

    private _timerComplete = false;

    private _timePassed = 0;

    constructor() {
        super('GameModel');

        this._state = GameState.Unknown;
        this.makeObservable(
            '_state',
            '_targetMultiplier',
            '_hasReachedTargetMultiplier',
            '_multiplierValue',
            '_startingIn',
            '_timerComplete',
            '_timePassed',
        );
    }

    get state(): GameState {
        return this._state;
    }

    set state(value: GameState) {
        this._state = value;
    }

    get startingIn(): number {
        return this._startingIn;
    }

    set startingIn(value: number) {
        this._startingIn = value;
    }

    get targetMultiplier(): number {
        return this._targetMultiplier;
    }

    set targetMultiplier(value: number) {
        this._targetMultiplier = value;
    }

    get timePassed(): number {
        return this._timePassed;
    }

    set timePassed(value: number) {
        this._timePassed = value;
    }

    get multiplierValue(): string {
        return this._multiplierValue;
    }

    set multiplierValue(value: string) {
        this._multiplierValue = value;
    }

    get timerComplete(): boolean {
        return this._timerComplete;
    }

    set timerComplete(value: boolean) {
        this._timerComplete = value;
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
        this.startCountdownForStart();

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
        delayRunnable(TIME_FOR_RESTART, this.setToStartingState, this);
    }

    public startMultiplierUpdate(): void {
        loopRunnable(this.updateMultiplier, this);
    }

    private setNewMultiplier(): void {
        this._targetMultiplier = this.getMultiplier();
    }

    private startCountdownForStart(): void {
        this._timerComplete = false;
        loopRunnable(this.loop, this);
    }

    private loop(): void {
        this._startingIn = this._startingIn - 1000 / MAX_FPS;
        if (this._startingIn <= 0) {
            this._startingIn = 0;
            this._timerComplete = true;
            removeRunnable(this.loop, this);
        }
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
        this._timePassed += 1 / MAX_FPS;
        this.trueValue += this.animationSpeed;
        this._multiplierValue = this.trueValue.toFixed(2);

        if (this.trueValue > 2) {
            this.animationSpeed += ACCELERATION;
        }

        if (+this._multiplierValue >= this._targetMultiplier) {
            this._hasReachedTargetMultiplier = true;
            removeRunnable(this.updateMultiplier, this);

            return;
        }
    }

    private getMultiplier(): number {
        const r = Math.random();
        const data = this.intervalsData.find((data) => data.minR <= r && data.maxR >= r) as IntervalsData;

        return +(Math.random() * (data.maxM - data.minM) + data.minM).toFixed(2);
    }
}
