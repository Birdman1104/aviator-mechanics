import { lp } from '../../Utils';

export const getGameViewGridConfig = () => {
    return lp(getGameViewGridLandscapeConfig, getGameViewGridPortraitConfig).call(null);
};

const getGameViewGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'game',
        debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'graph',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

const getGameViewGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'game',
        debug: { color: 0xd9ff27 },
        bounds,
        cells: [
            {
                name: 'graph',
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};
