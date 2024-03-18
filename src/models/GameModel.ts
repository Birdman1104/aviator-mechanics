import { ObservableModel } from './ObservableModel';

export enum GameState {
    Unknown,
}

export class GameModel extends ObservableModel {
    private _state: GameState;

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

    public init(): void {
        this._state = GameState.Unknown;
    }
}
