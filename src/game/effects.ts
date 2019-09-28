import { Dispatch } from 'redux';
import { loadGameBegin, loadGameRejected, loadGameSuccess, pickRandomPlayers } from './actions';
import { fetchPlayers } from './api';
import { Player } from './player';

export function initGame(dispatch: Dispatch) {
    dispatch(loadGameBegin());
    fetchPlayers()
        .then(players => {
            dispatch(loadGameSuccess(players));
            dispatch(generateRandomPlayers(players));
        })
        .catch(error => dispatch(loadGameRejected()));
}

export function generateRandomPlayers(players: Player[]) {
    const ids = players.map(p => p.id);

    // TODO: make sure user can not pick one player twice
    return pickRandomPlayers([getRandomValue(ids), getRandomValue(ids)]);
}

function getRandomValue<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}
