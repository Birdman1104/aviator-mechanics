import { ICellConfig, PixiGrid } from '@armathai/pixi-grid';
import { getBackgroundGridConfig } from '../configs/gridConfigs/BackgroundViewGC';

export class BackgroundView extends PixiGrid {
    constructor() {
        super();
        this.build();
    }

    public getGridConfig(): ICellConfig {
        return getBackgroundGridConfig();
    }

    public rebuild(config?: ICellConfig | undefined): void {
        super.rebuild(this.getGridConfig());
    }

    private build(): void {
        // const bkg = Sprite.from('bkg.jpg');
        // this.setChild('background', bkg);
    }
}
