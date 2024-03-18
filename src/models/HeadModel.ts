import { GameModel } from './GameModel';
import { ObservableModel } from './ObservableModel';

class HeadModel extends ObservableModel {
    private _gameModel: GameModel | null = null;

    public constructor() {
        super('HeadModel');
        this.makeObservable();
    }

    set gameModel(value: GameModel) {
        this._gameModel = value;
    }

    get gameModel(): GameModel {
        return this._gameModel as GameModel;
    }

    public init(): void {
        //
    }

    public initGameModel(): void {
        this._gameModel = new GameModel();
        this._gameModel.init();
    }
}

const Head = new HeadModel();

export default Head;
