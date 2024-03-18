import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getGameViewGridConfig } from '../configs/gridConfigs/GameViewGC';
import { Graph } from './Graph';

export class GameView extends PixiGrid {
    private graph: Graph;

    constructor() {
        super();

        this.build();
    }

    public update(delta): void {
        this.graph?.update(delta);
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
    }
}
