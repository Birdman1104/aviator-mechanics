import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getForegroundGridConfig } from '../configs/gridConfigs/ForegroundViewGC';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import { Crashed } from './Crashed';
import { StartingLoader } from './StartingLoader';
export class ForegroundView extends PixiGrid {
    private startingLoader: StartingLoader;
    private crashed: Crashed;

    constructor() {
        super();
        lego.event.on(GameModelEvents.StateUpdate, this.onGameStateUpdate, this);
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getForegroundGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        this.buildStartingLoader();
        this.buildCrashed();
    }

    private onGameStateUpdate(newState: GameState): void {
        switch (newState) {
            case GameState.Starting:
                this.showStartingLoader();
                this.startingLoader.startAnimation();
                break;
            case GameState.Action:
                this.hideStartingLoader();
                break;
            case GameState.Crash:
                this.showCrashed();
                break;
            default:
                break;
        }
    }

    private buildStartingLoader(): void {
        this.startingLoader = new StartingLoader();
        this.hideStartingLoader();
        this.setChild('loader', this.startingLoader);
    }

    private buildCrashed(): void {
        this.crashed = new Crashed();
        this.hideCrashed();
        this.setChild('loader', this.crashed);
    }

    private showStartingLoader(): void {
        this.startingLoader.visible = true;
    }

    private hideStartingLoader(): void {
        this.startingLoader.visible = false;
        this.startingLoader.reset();
    }

    private showCrashed(): void {
        this.crashed.visible = true;
    }

    private hideCrashed(): void {
        this.crashed.visible = false;
    }
}
