import { Container } from 'pixi.js';
import { callIfExists } from './Utils';
import { BackgroundView } from './views/BackgroundView';
import { ForegroundView } from './views/ForegroundView';
import { GameView } from './views/GameView';

class PixiStage extends Container {
    private started = false;
    private bgView: BackgroundView;
    private gameView: GameView;
    private foregroundView: ForegroundView;

    constructor() {
        super();
    }

    public update(): void {
        if (!this.started) return;
        callIfExists(() => this.gameView?.update());
    }

    public resize(): void {
        this.bgView?.rebuild();
        this.gameView?.rebuild();
        this.foregroundView?.rebuild();
    }

    public start(): void {
        this.bgView = new BackgroundView();
        this.addChild(this.bgView);
        this.gameView = new GameView();
        this.addChild(this.gameView);
        this.foregroundView = new ForegroundView();
        this.addChild(this.foregroundView);

        this.started = true;
    }
}

export default PixiStage;
