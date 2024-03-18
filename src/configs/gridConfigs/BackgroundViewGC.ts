import { CellScale } from '@armathai/pixi-grid';
import { lp } from '../../Utils';

export const getBackgroundGridConfig = () => {
    return lp(getBackgroundGridLandscapeConfig, getBackgroundGridPortraitConfig).call(null);
};

const getBackgroundGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'background',
        debug: { color: 0xd95027 },
        bounds,
        cells: [
            {
                name: 'background',
                scale: CellScale.envelop,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};

const getBackgroundGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'background',
        debug: { color: 0xd95027 },
        bounds,
        cells: [
            {
                name: 'background',
                scale: CellScale.envelop,
                bounds: { x: 0, y: 0, width: 1, height: 1 },
            },
        ],
    };
};
