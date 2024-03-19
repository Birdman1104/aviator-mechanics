import { GameState } from '../models/GameModel';
import Head from '../models/HeadModel';

export const gameStateStartingGuard = (): boolean => {
    return Head.gameModel.state === GameState.Starting;
};

export const gameStateCrashGuard = (): boolean => {
    return Head.gameModel.state === GameState.Crash;
};
