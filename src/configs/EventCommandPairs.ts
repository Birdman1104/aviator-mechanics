import { lego } from '@armathai/lego';
import { MainGameEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';
import { gameStateStartingGuard } from './Guards';

export const mapCommands = () => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.on(event, command);
    });
};

export const unMapCommands = (): void => {
    eventCommandPairs.forEach(({ event, command }) => {
        lego.event.off(event, command);
    });
};

const onMainViewReadyCommand = (): void => {
    Head.init();
    Head.initGameModel();
};

const getNewMultiplierCommand = (): void => {
    Head.gameModel.setNewMultiplier();
};

const setTimerForActionStateCommand = (): void => {
    Head.gameModel.setTimerToStartActionState();
};

const onGameStateUpdateCommand = (newState: GameState): void => {
    lego.command.guard(gameStateStartingGuard).execute(getNewMultiplierCommand).execute(setTimerForActionStateCommand);
};

const eventCommandPairs = Object.freeze([
    {
        event: MainGameEvents.MainViewReady,
        command: onMainViewReadyCommand,
    },
    {
        event: GameModelEvents.StateUpdate,
        command: onGameStateUpdateCommand,
    },
]);
