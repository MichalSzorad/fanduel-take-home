import { createSelector } from 'reselect';
import { Actions } from './actions';
import { Player } from './player';

export interface State {
    initState: 'not-started' | 'loading' | 'rejected' | 'initialized';
    players: Player[];
    randomPlayers: string[];
    correctGuesses: number;
    guessId: string | null;
}

const initialState: State = {
    initState: 'not-started',
    correctGuesses: 0,
    players: [],
    randomPlayers: [],
    guessId: null,
};

export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case 'game/load-begin': return { ...state, initState: 'loading' };
        case 'game/load-rejected': return { ...state, initState: 'rejected' };
        case 'game/load-success': return { ...state, initState: 'initialized', players: action.payload.players };
        case 'game/make-guess':
            const randomPlayers = state.randomPlayers.map(id => findPlayer(state.players, id)!);
            const correctPlayerId = findPlayerWithHighestFppg(randomPlayers)!.id;
            const isCorrect = action.payload.playerId === correctPlayerId;
            const correctGuesses = isCorrect ? state.correctGuesses + 1 : state.correctGuesses;

            return { ...state, guessId: action.payload.playerId, correctGuesses };
        case 'game/pick-random-players': return { ...state, randomPlayers: action.payload.playerIds, guessId: null };
        case 'game/reset-stats': return { ...state, correctGuesses: 0 };
    }

    return state;
}

export const selectPlayers = (state: State) => state.players;
export const selectRandomPlayerIds = (state: State) => state.randomPlayers;
export const selectGuess = (state: State) => state.guessId;

export const randomPlayersSelector = createSelector(
    selectRandomPlayerIds,
    selectPlayers,
    (randomPlayerIds, players) => randomPlayerIds.map(p => players.find(player => player.id === p)!)
);

export const randomPlayerWithHighestFppgSelector = createSelector(
    randomPlayersSelector,
    players => findPlayerWithHighestFppg(players)
);

export const guessCorrectSelector = createSelector(
    randomPlayerWithHighestFppgSelector,
    selectGuess,
    (player, guess) => !!player && player.id === guess
);

function findPlayerWithHighestFppg(players: Player[]): Player | undefined {
    return players.reduce<Player | undefined>((prev, current) => !prev || current.fppg > prev.fppg ? current : prev, undefined);
}

function findPlayer(players: Player[], id: string): Player | undefined {
    return players.find(p => p.id === id);
}
