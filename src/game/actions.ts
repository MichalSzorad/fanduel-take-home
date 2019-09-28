import { Dispatch } from 'redux';
import { fetchPlayers } from './api';
import { Player } from './player';
import { State } from './store';

export type Actions = LoadGameBegin | LoadGameRejected | LoadGameSuccess | ResetGame | MakeCorrectGuess | PickRandomPlayers;

interface LoadGameBegin {
    readonly type: 'game/load-begin';
}

interface LoadGameRejected {
    readonly type: 'game/load-rejected';
}

interface LoadGameSuccess {
    readonly type: 'game/load-success';
    payload: { players: Player[] };
}

interface ResetGame {
    readonly type: 'game/reset';
}

interface MakeCorrectGuess {
    readonly type: 'game/make-correct-guess';
}

interface PickRandomPlayers {
    readonly type: 'game/pick-random-players';
    payload: { playerIds: string[] };
}

export function makeCorrectGuess(): MakeCorrectGuess {
    return { type: 'game/make-correct-guess' };
}

export function resetGame(): ResetGame {
    return { type: 'game/reset' };
}

export function loadGameBegin(): LoadGameBegin {
    return { type: 'game/load-begin' };
}

export function loadGameRejected(): LoadGameRejected {
    return { type: 'game/load-rejected' };
}

export function loadGameSuccess(players: Player[]): LoadGameSuccess {
    return { type: 'game/load-success', payload: { players } };
}

export function pickRandomPlayers(playerIds: string[]): PickRandomPlayers {
    return { type: 'game/pick-random-players', payload: { playerIds } };
}
