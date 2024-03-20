import { Rectangle } from 'pixi.js';

export const lp = (l, p) => {
    const { clientWidth: w, clientHeight: h } = document.body;
    return w > h ? l : p;
};

export const fitDimension = (
    dim: { width: number; height: number },
    minRatio: number,
    maxRatio: number,
): { width: number; height: number } => {
    const ratioW = dim.width / dim.height;
    const ratioH = dim.height / dim.width;

    if (ratioW < ratioH) {
        if (ratioW > maxRatio) {
            dim.width = dim.width * (maxRatio / ratioW);
        } else if (ratioW < minRatio) {
            dim.height = dim.height * (ratioW / minRatio);
        }
    } else {
        if (ratioH > maxRatio) {
            dim.height = dim.height * (maxRatio / ratioH);
        } else if (ratioH < minRatio) {
            dim.width = dim.width * (ratioH / minRatio);
        }
    }

    return dim;
};

export const delayRunnable = (delay, runnable, context, ...args) => {
    let delayMS = delay * 1000;
    const delayWrapper = () => {
        delayMS -= window.game.ticker.deltaMS;
        if (delayMS <= 0) {
            runnable.call(context, ...args);
            window.game.ticker.remove(delayWrapper);
        }
    };
    window.game.ticker.add(delayWrapper);
    return delayWrapper;
};

export const loopRunnable = (runnable, context?, ...args) => {
    return window.game.ticker.add(runnable, context, ...args);
};

export const removeRunnable = (runnable, context?) => window.game.ticker.remove(runnable, context);

export const callIfExists = (callback: any): void => {
    if (typeof callback === 'function') {
        callback();
    }
};

export const getGameBounds = () => {
    const { clientWidth: width, clientHeight: height } = document.body;

    return new Rectangle(0, 0, width, height);
};

export const isSquareLikeScreen = (): boolean => {
    const { width, height } = getGameBounds();
    return Math.min(width, height) / Math.max(width, height) > 0.7;
};

export const isNarrowScreen = (): boolean => {
    const { width, height } = getGameBounds();
    return Math.min(width, height) / Math.max(width, height) < 0.5;
};

export const getEqualProportionsBetween = (min: number, max: number, proportionsCount: number): number[] => {
    const arr: number[] = [];
    const diff = max - min;
    const ratio = diff / (proportionsCount - 1);

    for (let i = 0; i < proportionsCount; i++) {
        arr.push(min + i * ratio);
    }

    return arr;
};
