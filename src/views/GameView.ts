import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { Graph } from './Graph';
import { MultiplierView } from './MultiplierView';

export class GameView extends PixiGrid {
    private graph: Graph;
    private state: GameState;
    private multiplier: MultiplierView;

    constructor() {
        super();

        lego.event.on(GameModelEvents.StateUpdate, this.onStateUpdate, this);
        this.build();
    }

    public update(): void {
        if (this.state === GameState.Action) {
            this.graph?.update();
            this.multiplier?.update();
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

        this.multiplier = new MultiplierView();
        this.setChild('multiplier', this.multiplier);
    }

    private onStateUpdate(newState: GameState): void {
        this.state = newState;

        switch (newState) {
            case GameState.Crash:
                this.graph.disable();
                break;
            case GameState.Starting:
                this.graph.reset();
                this.multiplier.reset();
                break;

            default:
                break;
        }
    }
}
