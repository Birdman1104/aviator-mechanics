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
    // TODO - remove radius
    r: number;
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
