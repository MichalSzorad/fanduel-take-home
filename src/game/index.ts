import { Actions, makeCorrectGuess, pickRandomPlayers, resetGame } from './actions';
import { initGame } from './effects';
import { Player } from './player';
import { reducer, selectPlayer, State } from './store';

export type Actions = Actions;
export type State = State;
export type Player = Player;

export {
    reducer,
    selectPlayer,
    initGame,
    makeCorrectGuess,
    pickRandomPlayers,
    resetGame,
};
