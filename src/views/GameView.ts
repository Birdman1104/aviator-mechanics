import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { Board } from './Board';
import { MultiplierView } from './MultiplierView';

export class GameView extends PixiGrid {
    private board: Board;
    private state: GameState;
    private multiplier: MultiplierView;

    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onStateUpdate, this);
        this.build();
    }

    public update(): void {
        if (this.state === GameState.Action) {
            this.board?.update();
        }
    }

    public getGridConfig(): ICellConfig {
        return getGameViewGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.board = new Board();
        this.setChild('graph', this.board);

        this.multiplier = new MultiplierView();
        this.setChild('multiplier', this.multiplier);
    }

    private onStateUpdate(newState: GameState): void {
        this.state = newState;

        switch (newState) {
            case GameState.Crash:
                this.board.disable();
                break;
            case GameState.Starting:
                this.board.reset();
                this.multiplier.reset();
                break;

            default:
                break;
        }
    }
}
