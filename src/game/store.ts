import { Actions } from './actions';
import { Player } from './player';

export interface State {
    initState: 'not-started' | 'loading' | 'rejected' | 'initialized';
    players: Player[];
    randomPlayers: string[];
    correctGuesses: number;
}

const initialState: State = {
    initState: 'not-started',
    correctGuesses: 0,
    players: [],
    randomPlayers: [],
};

export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case 'game/load-begin': return { ...state, initState: 'loading' };
        case 'game/load-rejected': return { ...state, initState: 'rejected' };
        case 'game/load-success': return { ...state, initState: 'initialized', players: action.payload.players };
        case 'game/make-correct-guess': return { ...state, correctGuesses: state.correctGuesses + 1 };
        case 'game/pick-random-players': return { ...state, randomPlayers: action.payload.playerIds };
    }
    return state;
}

export function selectPlayer(state: State, id: string): Player | undefined {
    return state.players.find(p => p.id === id);
}
