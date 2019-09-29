import { Player } from './player';

export type Actions = LoadGameBegin | LoadGameRejected | LoadGameSuccess | ResetStats | MakeGuess | PickRandomPlayers;

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

interface ResetStats {
    readonly type: 'game/reset-stats';
}

interface MakeGuess {
    readonly type: 'game/make-guess';
    payload: { playerId: string };
}

interface PickRandomPlayers {
    readonly type: 'game/pick-random-players';
    payload: { playerIds: string[] };
}

export function makeGuess(playerId: string): MakeGuess {
    return { type: 'game/make-guess', payload: { playerId } };
}

export function resetStats(): ResetStats {
    return { type: 'game/reset-stats' };
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
