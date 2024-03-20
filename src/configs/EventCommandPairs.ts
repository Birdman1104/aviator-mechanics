import { lego } from '@armathai/lego';
import { ForegroundViewEvents, MainGameEvents } from '../events/MainEvents';
import { GameModelEvents } from '../events/ModelEvents';
import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';
import { gameStateCrashGuard, gameStateStartingGuard } from './Guards';

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

const prepareActionCommand = (): void => {
    Head.gameModel.prepareForAction();
};

const onStartTimerCompleteCommand = (): void => {
    Head.gameModel.setToActionState();
    Head.gameModel.startMultiplierUpdate();
};

const onHasReachedTargetMultiplierUpdateCommand = (value: boolean): void => {
    if (value) Head.gameModel.setToCrashState();
};

const setTimerForStartingCommand = (): void => {
    Head.gameModel.setTimerForStarting();
};

const onGameStateUpdateCommand = (newState: GameState): void => {
    lego.command
        //
        .guard(gameStateStartingGuard)
        .execute(prepareActionCommand)

        .guard(gameStateCrashGuard)
        .execute(setTimerForStartingCommand);
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
    {
        event: ForegroundViewEvents.StartTimerComplete,
        command: onStartTimerCompleteCommand,
    },
    {
        event: GameModelEvents.HasReachedTargetMultiplierUpdate,
        command: onHasReachedTargetMultiplierUpdateCommand,
    },
]);
