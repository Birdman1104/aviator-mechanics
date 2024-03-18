import { lp } from '../../Utils';

export const getUIGridConfig = () => {
    return lp(getUIGridLandscapeConfig, getUIGridPortraitConfig).call(null);
};

const getUIGridLandscapeConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'score',
                bounds: { x: 0, y: 0, width: 0.11, height: 0.11 },
            },
        ],
    };
};

const getUIGridPortraitConfig = () => {
    const bounds = { x: 0, y: 0, width: document.body.clientWidth, height: document.body.clientHeight };
    return {
        name: 'ui',
        debug: { color: 0xd950ff },
        bounds,
        cells: [
            {
                name: 'score',
                bounds: { x: 0, y: 0, width: 0.11, height: 0.11 },
            },
        ],
    };
};
