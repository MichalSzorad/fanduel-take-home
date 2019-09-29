import { Actions, makeGuess, pickRandomPlayers, resetStats } from './actions';
import { initGame } from './effects';
import { Player } from './player';
import { guessCorrectSelector, randomPlayersSelector, reducer, State } from './store';

export type Actions = Actions;
export type State = State;
export type Player = Player;

export {
    reducer,
    initGame,
    makeGuess,
    pickRandomPlayers,
    resetStats,
    randomPlayersSelector,
    guessCorrectSelector,
};
