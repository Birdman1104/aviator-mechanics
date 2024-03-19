import { lego } from '@armathai/lego';
import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getForegroundGridConfig } from '../configs/gridConfigs/ForegroundViewGC';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
export class ForegroundView extends PixiGrid {
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
        //
    }

    private onGameStateUpdate(newState: GameState): void {
        // switch (newState) {
        //     case GameState.Action:
        //         this.startMultiplierTween();
        //         break;
        //     default:
        //         break;
        // }
    }
}
