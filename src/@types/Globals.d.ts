interface Window {
    game: any;
}

type TutorialSequenceConfig = {
    text: string;
    duration: number;
    clickToComplete: boolean;
};

type AssetNameAndPath = {
    name: string;
    path: string;
};

type BezierPoint = {
    x: number;
    y: number;
};

type IntervalsData = {
    minM: number;
    maxM: number;
    minR: number;
    maxR: number;
};

declare namespace GlobalMixins {
    interface DisplayObjectEvents {
        hideComplete: [string];
        showComplete: [string];
        click: [string];
    }
}
