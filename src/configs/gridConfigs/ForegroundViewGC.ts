import { isNarrowScreen, lp } from '../../Utils';

export const getForegroundGridConfig = () => {
    return lp(getForegroundGridLandscapeConfig, getForegroundGridPortraitConfig).call(null);
};

const getForegroundGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            {
                name: 'loader',
                bounds: { x: 0, y: 0.6, width: 1, height: 0.1 },
            },
        ],
    };
};

const getForegroundGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    const loaderHeight = isNarrowScreen() ? 0.085 : 0.1;

    return {
        name: 'foreground',
        // debug: { color: 0xff5027 },
        bounds,
        cells: [
            {
                name: 'loader',
                bounds: { x: 0, y: 0.6, width: 1, height: loaderHeight },
            },
        ],
    };
};
